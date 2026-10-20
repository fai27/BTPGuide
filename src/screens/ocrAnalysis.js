import { getIcon } from '../components/icons.js';
import { analyzeCompositionText } from '../services/ocrMatcher.js';
import { showToast } from '../components/toast.js';
import { StorageService } from '../services/storage.js';
import { ScanLogService } from '../services/api/scanLogService.js';

export function renderOcrAnalysisScreen(navigateTo, data = {}) {
  const container = document.createElement('div');
  container.className = 'ocr-screen';

  const initialText = data.rawOcrText || 'KOMPOSISI: Gula, garam, tepung terigu, pengatur keasaman asam sitrat, penguat rasa monosodium glutamat, perisa identik alami, antioksidan TBHQ.';
  const previewImage = data.image || 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80';

  container.innerHTML = `
    <!-- Screen Header -->
    <div class="flex items-center gap-3">
      <button class="header-action-btn" id="ocr-back-btn" aria-label="Kembali">
        ${getIcon('arrow-left', 20)}
      </button>
      <div>
        <h2 class="text-lg font-bold">Proses Analisis Komposisi</h2>
        <p class="text-xs text-secondary">Pencocokan istilah BTP berbasis Peraturan BPOM</p>
      </div>
    </div>

    <!-- Multi-Step Progress Card -->
    <div class="ocr-progress-card" id="ocr-progress-card">
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-sm" id="progress-status-title">Memproses Label Gambar...</h4>
        <span class="badge badge-primary text-xs" id="progress-percentage-badge">0%</span>
      </div>

      <div class="progress-steps-list">
        <div class="progress-step-row" id="step-row-1">
          <div class="step-indicator-circle">1</div>
          <span>Membaca teks pada gambar (OCR)</span>
        </div>
        <div class="progress-step-row" id="step-row-2">
          <div class="step-indicator-circle">2</div>
          <span>Mengenali istilah bahan tambahan pangan (BTP)</span>
        </div>
        <div class="progress-step-row" id="step-row-3">
          <div class="step-indicator-circle">3</div>
          <span>Mencocokkan istilah dengan basis pengetahuan BPOM</span>
        </div>
        <div class="progress-step-row" id="step-row-4">
          <div class="step-indicator-circle">4</div>
          <span>Menyiapkan ringkasan edukasi</span>
        </div>
      </div>

      <div class="w-full bg-surface-alt rounded-full h-2 overflow-hidden" style="background-color: var(--border);">
        <div id="ocr-progress-bar-fill" style="width: 10%; height: 100%; background: var(--primary); transition: width 0.4s ease;"></div>
      </div>
    </div>

    <!-- Analysis Output (Revealed after progress completes) -->
    <div id="ocr-results-container" style="display: none;" class="flex-col gap-4">
      <!-- Notice Box -->
      <div class="notice-box">
        <span class="notice-icon">${getIcon('info', 20)}</span>
        <div class="notice-content">
          <strong>Hasil Pembacaan Label:</strong> Teks di bawah diperoleh dari pembacaan foto label. Kamu dapat memeriksa atau mengedit teks jika terdapat salah ketik dari kamera.
        </div>
      </div>

      <!-- Live Editable Text Area -->
      <div class="card p-4">
        <div class="flex items-center justify-between mb-2">
          <label for="ocr-live-editor" class="text-xs font-bold text-secondary uppercase">
            Teks Komposisi (Dapat Diedit):
          </label>
          <span class="badge badge-neutral text-xs">Ketuk untuk Koreksi</span>
        </div>
        <textarea id="ocr-live-editor" class="raw-text-editor-box" rows="4">${escapeHtml(initialText)}</textarea>
      </div>

      <!-- Highlighted Preview -->
      <div class="card p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-secondary uppercase">
            Highlight Istilah BTP Dikenali:
          </span>
          <span class="badge badge-primary text-xs" id="detected-count-badge">0 BTP</span>
        </div>

        <div id="ocr-highlighted-box" class="text-sm" style="line-height: 1.6; padding: 10px; background-color: var(--surface-alt); border-radius: var(--radius-md);">
        </div>

        <div class="extracted-tags-wrap" id="detected-tags-list"></div>
      </div>

      <!-- Categories breakdown summary -->
      <div class="card p-4">
        <h4 class="font-bold text-sm mb-2">Klasifikasi Bahan:</h4>
        <div class="flex flex-col gap-2 text-xs">
          <div class="flex items-center justify-between p-2 bg-surface-alt rounded">
            <span class="text-secondary font-medium">Bahan Tambahan Pangan (BTP):</span>
            <span class="font-bold text-brand" id="stat-btp-count">0 Ditemukan</span>
          </div>
          <div class="flex items-center justify-between p-2 bg-surface-alt rounded">
            <span class="text-secondary font-medium">Bahan Pangan Biasa (Gula, Tepung, dll):</span>
            <span class="font-bold text-secondary" id="stat-regular-count">0 Dikenali</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button class="btn btn-primary flex-1 btn-lg" id="btn-view-final-detail">
          ${getIcon('book-open', 20)} Lihat Hasil Analisis & Edukasi
        </button>
      </div>
    </div>
  `;

  // Simulation Timeline of OCR & AI Steps
  const progressCard = container.querySelector('#ocr-progress-card');
  const resultsContainer = container.querySelector('#ocr-results-container');
  const progressBarFill = container.querySelector('#ocr-progress-bar-fill');
  const progressPercentage = container.querySelector('#progress-percentage-badge');
  const progressTitle = container.querySelector('#progress-status-title');

  const step1 = container.querySelector('#step-row-1');
  const step2 = container.querySelector('#step-row-2');
  const step3 = container.querySelector('#step-row-3');
  const step4 = container.querySelector('#step-row-4');

  const editor = container.querySelector('#ocr-live-editor');
  const highlightedBox = container.querySelector('#ocr-highlighted-box');
  const detectedTagsList = container.querySelector('#detected-tags-list');
  const detectedCountBadge = container.querySelector('#detected-count-badge');
  const statBtpCount = container.querySelector('#stat-btp-count');
  const statRegularCount = container.querySelector('#stat-regular-count');

  let currentAnalysis = null;

  function updateAnalysisResult(text) {
    currentAnalysis = analyzeCompositionText(text);

    highlightedBox.innerHTML = currentAnalysis.highlightedHtml || '<span class="text-muted">Tidak ada teks.</span>';
    detectedCountBadge.textContent = `${currentAnalysis.summary.totalAdditives} BTP Dikenali`;
    statBtpCount.textContent = `${currentAnalysis.summary.totalAdditives} Bahan`;
    statRegularCount.textContent = `${currentAnalysis.summary.totalRegular} Bahan`;

    detectedTagsList.innerHTML = currentAnalysis.detectedAdditives.map(add => `
      <span class="badge badge-primary text-xs" style="cursor: pointer;" title="${add.function}">
        ${getIcon('check', 12)} ${add.name} (${add.insOrECode})
      </span>
    `).join('');

    if (currentAnalysis.unverifiedTerms.length > 0) {
      detectedTagsList.innerHTML += currentAnalysis.unverifiedTerms.map(term => `
        <span class="badge badge-warning text-xs" title="Istilah umum perlu verifikasi spesifik">
          ${getIcon('alert-triangle', 12)} ${term} (Perlu verifikasi)
        </span>
      `).join('');
    }
  }

  // Multi-step progress animation sequence
  setTimeout(() => {
    step1.classList.add('step-active');
    progressBarFill.style.width = '25%';
    progressPercentage.textContent = '25%';
    progressTitle.textContent = 'Membaca tulisan pada foto label...';
  }, 200);

  setTimeout(() => {
    step1.classList.remove('step-active');
    step1.classList.add('step-done');
    step2.classList.add('step-active');
    progressBarFill.style.width = '50%';
    progressPercentage.textContent = '50%';
    progressTitle.textContent = 'Mengenali istilah BTP pangan...';
  }, 700);

  setTimeout(() => {
    step2.classList.remove('step-active');
    step2.classList.add('step-done');
    step3.classList.add('step-active');
    progressBarFill.style.width = '75%';
    progressPercentage.textContent = '75%';
    progressTitle.textContent = 'Mencocokkan dengan basis data BPOM No. 11/2019...';
  }, 1200);

  setTimeout(() => {
    step3.classList.remove('step-active');
    step3.classList.add('step-done');
    step4.classList.add('step-active');
    progressBarFill.style.width = '100%';
    progressPercentage.textContent = '100%';
    progressTitle.textContent = 'Menyiapkan hasil edukasi...';
  }, 1600);

  setTimeout(() => {
    step4.classList.remove('step-active');
    step4.classList.add('step-done');
    progressCard.style.display = 'none';
    resultsContainer.style.display = 'flex';
    updateAnalysisResult(initialText);
    showToast('Analisis selesai! Istilah BTP berhasil dicocokkan.', 'success', 2500);
  }, 2000);

  // Live typing re-evaluates BTP highlights seamlessly!
  editor.addEventListener('input', (e) => {
    updateAnalysisResult(e.target.value);
  });

  // Action: View Final Detail (SaveHistory2 & Navigate to ProductDetail)
  container.querySelector('#btn-view-final-detail').addEventListener('click', async () => {
    const rawText = editor.value.trim();
    if (!currentAnalysis) {
      currentAnalysis = analyzeCompositionText(rawText);
    }

    const prodTitle = data.preset?.title || 'Produk Kemasan (Hasil Foto Komposisi)';
    const detectedCount = currentAnalysis.detectedAdditives?.length || 0;

    // Alur 3 flow.md: SaveHistory2 (Simpan Hasil OCR ke Riwayat)
    await ScanLogService.logScan({
      productId: null,
      barcode: null,
      productName: prodTitle,
      method: 'composition',
      additivesCount: detectedCount,
      status: 'tersedia'
    });

    StorageService.addHistory({
      productId: null,
      barcode: null,
      name: prodTitle,
      brand: 'Hasil Analisis Foto Label',
      image: previewImage,
      method: 'composition',
      status: 'tersedia',
      additivesCount: detectedCount,
      category: 'Hasil Analisis Foto'
    });

    navigateTo('product-detail', {
      isFromOcr: true,
      customCompositionText: rawText,
      analysis: currentAnalysis,
      image: previewImage,
      productTitle: prodTitle
    });
  });

  // Back button
  container.querySelector('#ocr-back-btn').addEventListener('click', () => {
    navigateTo('composition');
  });

  return container;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}
