// Layar E: Composition Capture / Upload Screen
import { getIcon } from '../components/icons.js';
import { DEMO_COMPOSITION_PRESETS } from '../data/demoScans.js';
import { showToast } from '../components/toast.js';

export function renderCompositionScreen(navigateTo, data = {}) {
  const container = document.createElement('div');
  container.className = 'composition-screen';

  let selectedImage = null;
  let selectedPreset = null;

  container.innerHTML = `
    <!-- Screen Header -->
    <div class="flex items-center gap-3">
      <button class="header-action-btn" id="comp-back-btn" aria-label="Kembali">
        ${getIcon('arrow-left', 20)}
      </button>
      <div>
        <h2 class="text-lg font-bold">Foto Komposisi Produk</h2>
        <p class="text-xs text-secondary">Pastikan tulisan komposisi terlihat jelas dan tidak terpotong</p>
      </div>
    </div>

    <!-- Hidden inputs for Camera and Gallery -->
    <input type="file" id="comp-camera-input" accept="image/*" capture="environment" style="display: none;" />
    <input type="file" id="comp-gallery-input" accept="image/*" style="display: none;" />

    <div class="composition-desktop-layout">
      <!-- Left Column: Upload / Preview & Quality Checklist -->
      <div class="flex flex-col gap-4">
        <!-- Upload / Preview Box -->
        <div id="comp-dropzone-view" class="upload-dropzone">
          <div class="upload-icon-circle">
            ${getIcon('camera', 28)}
          </div>
          <div>
            <h4 class="font-bold text-sm">Ambil Foto atau Pilih Gambar</h4>
            <p class="text-xs text-muted mt-1">Format JPG, PNG atau WebP (maks 10 MB)</p>
          </div>
          <div class="flex gap-2 mt-2">
            <button type="button" class="btn btn-primary btn-sm" id="btn-open-camera">
              ${getIcon('camera', 16)} Buka Kamera
            </button>
            <button type="button" class="btn btn-outline btn-sm" id="btn-open-gallery">
              ${getIcon('upload', 16)} Pilih dari Galeri
            </button>
          </div>
        </div>

        <!-- Image Preview Area (Hidden initially) -->
        <div id="comp-preview-view" style="display: none;" class="flex-col gap-3">
          <div class="preview-container">
            <img id="comp-preview-img" src="" alt="Preview Komposisi" class="preview-image" />
            <span class="badge badge-primary text-xs" style="position: absolute; top: 12px; left: 12px;" id="comp-preview-badge">
              Foto Siap Dianalisis
            </span>
          </div>

          <div class="flex gap-2">
            <button class="btn btn-primary flex-1 btn-lg" id="btn-proceed-analysis">
              ${getIcon('search', 20)} Analisis Komposisi
            </button>
            <button class="btn btn-outline" id="btn-retake-photo" title="Ambil Ulang">
              ${getIcon('refresh-cw', 18)} Ambil Ulang
            </button>
          </div>
        </div>

        <!-- Photo Quality Checklist -->
        <div class="checklist-card">
          <div class="checklist-title">
            ${getIcon('shield-check', 18, '', '#176B45')}
            <span>Petunjuk Pengambilan Foto yang Baik</span>
          </div>

          <div class="checklist-item">
            <span class="checklist-icon">${getIcon('check', 16)}</span>
            <span>Tulisan tabel komposisi (ingredients) terlihat tajam dan tidak buram.</span>
          </div>
          <div class="checklist-item">
            <span class="checklist-icon">${getIcon('check', 16)}</span>
            <span>Pencahayaan cukup, hindari bayangan gelap atau pantulan lampu blitz berlebih.</span>
          </div>
          <div class="checklist-item">
            <span class="checklist-icon">${getIcon('check', 16)}</span>
            <span>Seluruh daftar bahan masuk ke dalam bingkai dari awal hingga akhir.</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Quick Test Samples for Prototype Demo -->
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-base">Sampel Label Siap Uji (Preset OCR)</h3>
            <p class="text-xs text-secondary mt-0.5">Pilih label kemasan di bawah untuk uji instan tanpa perlu memotret:</p>
          </div>
          <span class="badge badge-primary text-xs">5 Preset</span>
        </div>

        <div class="presets-grid">
          ${DEMO_COMPOSITION_PRESETS.map((preset, idx) => `
            <div class="preset-card-item" data-preset-idx="${idx}">
              <div class="flex items-center gap-3">
                <span class="brand-logo-badge" style="width: 36px; height: 36px; font-size: 0.8rem;">
                  ${getIcon('file-text', 18, '', '#FFF')}
                </span>
                <div>
                  <div class="text-sm font-semibold">${preset.title}</div>
                  <div class="text-xs text-secondary">${preset.category} • Akurasi ~${preset.estimatedConfidence}%</div>
                </div>
              </div>
              <span class="btn btn-sm btn-secondary">Pilih Sampel</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const dropzoneView = container.querySelector('#comp-dropzone-view');
  const previewView = container.querySelector('#comp-preview-view');
  const previewImg = container.querySelector('#comp-preview-img');
  const cameraInput = container.querySelector('#comp-camera-input');
  const galleryInput = container.querySelector('#comp-gallery-input');
  const previewBadge = container.querySelector('#comp-preview-badge');

  function showPreview(imageSrc, presetData = null) {
    selectedImage = imageSrc;
    selectedPreset = presetData;
    previewImg.src = imageSrc;
    dropzoneView.style.display = 'none';
    previewView.style.display = 'flex';
    if (presetData && previewBadge) {
      previewBadge.textContent = presetData.imageBadge || 'Label Sampel';
    }
  }

  function resetPreview() {
    selectedImage = null;
    selectedPreset = null;
    previewImg.src = '';
    dropzoneView.style.display = 'flex';
    previewView.style.display = 'none';
  }

  // Camera & Gallery triggers
  container.querySelector('#btn-open-camera').addEventListener('click', () => cameraInput.click());
  container.querySelector('#btn-open-gallery').addEventListener('click', () => galleryInput.click());

  const handleFileChosen = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      showPreview(e.target.result, null);
      showToast('Foto label berhasil dimuat', 'success', 2000);
    };
    reader.readAsDataURL(file);
  };

  cameraInput.addEventListener('change', (e) => handleFileChosen(e.target.files?.[0]));
  galleryInput.addEventListener('change', (e) => handleFileChosen(e.target.files?.[0]));

  // Drag and drop support
  dropzoneView.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzoneView.style.borderColor = '#176B45';
  });

  dropzoneView.addEventListener('dragleave', () => {
    dropzoneView.style.borderColor = '#CBD6CD';
  });

  dropzoneView.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzoneView.style.borderColor = '#CBD6CD';
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChosen(file);
  });

  // Retake photo
  container.querySelector('#btn-retake-photo').addEventListener('click', resetPreview);

  // Quick Preset Sample click
  container.querySelectorAll('.preset-card-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.presetIdx, 10);
      const preset = DEMO_COMPOSITION_PRESETS[idx];
      showPreview(preset.imageUrl, preset);
      showToast(`Memuat sampel: ${preset.title}`, 'info', 1800);
    });
  });

  // Proceed to OCR Analysis
  container.querySelector('#btn-proceed-analysis').addEventListener('click', () => {
    let ocrText = '';
    if (selectedPreset) {
      ocrText = selectedPreset.rawOcrText;
    } else {
      // Default sample composition text when user uploads custom image
      ocrText = 'KOMPOSISI: Gula, garam, tepung terigu, minyak nabati (mengandung antioksidan TBHQ), pengatur keasaman asam sitrat, penguat rasa mononatrium glutamat, dinatrium inosinat, perisa identik alami, pewarna karamel kelas IV.';
    }

    navigateTo('ocr-analysis', {
      image: selectedImage,
      preset: selectedPreset,
      rawOcrText: ocrText
    });
  });

  // Back button
  container.querySelector('#comp-back-btn').addEventListener('click', () => {
    navigateTo('home');
  });

  return container;
}
