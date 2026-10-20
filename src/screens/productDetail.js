// Layar G: Product Detail & BTP Result Screen (Halaman Terpenting Aplikasi)
import { getIcon } from '../components/icons.js';
import { getProductById } from '../data/products.js';
import { getAdditiveById } from '../data/additives.js';
import { StorageService } from '../services/storage.js';
import { ScanLogService } from '../services/api/scanLogService.js';
import { openBtpDetailModal } from '../components/btpModal.js';
import { showToast } from '../components/toast.js';

export function renderProductDetailScreen(navigateTo, data = {}) {
  const container = document.createElement('div');
  container.className = 'detail-screen';

  let product = null;
  let additivesList = [];
  let isFromOcr = false;
  let sourceLabel = 'Database sampel BPOM';
  let productTitle = '';
  let brandName = '';
  let barcodeNum = '';
  let categoryName = '';
  let productImage = '';
  let rawIngredients = '';

  if (data.isFromOcr) {
    isFromOcr = true;
    sourceLabel = 'Hasil pembacaan label foto (OCR)';
    productTitle = data.productTitle || 'Produk Kemasan (Label Terfoto)';
    brandName = 'Pembacaan Label Komposisi';
    barcodeNum = 'Non-barcode (OCR)';
    categoryName = 'Hasil Analisis Foto';
    productImage = data.image || 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80';
    rawIngredients = data.customCompositionText || '';

    // Ambil BTP dari hasil analisis OCR
    if (data.analysis && data.analysis.detectedAdditives) {
      additivesList = data.analysis.detectedAdditives.map(a => ({
        ...a,
        status: a.status || 'terdeteksi'
      }));
    }
  } else {
    // Mode dari barcode atau list produk
    const productId = data.productId || 'indomie-mi-goreng';
    product = getProductById(productId);

    if (!product) {
      // Fallback aman
      product = getProductById('indomie-mi-goreng');
    }

    productTitle = product.name;
    brandName = product.brand;
    barcodeNum = product.barcode;
    categoryName = product.category;
    productImage = product.image;
    sourceLabel = product.source || 'Database sampel terverifikasi';
    rawIngredients = product.ingredients;

    // Load full additive data objects
    additivesList = product.additives.map(item => {
      const full = getAdditiveById(item.id);
      return full ? { ...full, status: item.status || 'terdeteksi' } : null;
    }).filter(Boolean);
  }

  // Render container
  container.innerHTML = `
    <!-- Top Nav Action Bar -->
    <div class="flex items-center justify-between">
      <button class="header-action-btn" id="detail-back-btn" aria-label="Kembali">
        ${getIcon('arrow-left', 20)}
      </button>
      <div class="flex items-center gap-2">
        <button class="header-action-btn" id="detail-share-btn" title="Salin Info Produk">
          ${getIcon('copy', 18)}
        </button>
        <button class="header-action-btn" id="detail-bookmark-btn" title="Simpan ke Riwayat">
          ${getIcon('bookmark', 18)}
        </button>
      </div>
    </div>

    <div class="detail-desktop-layout">
      <!-- Left Column: Sticky Product Info & Actions -->
      <div class="detail-left-sticky">
        <div class="product-hero-card">
          <img src="${productImage}" alt="${productTitle}" class="product-hero-cover" />
          
          <div class="product-hero-content">
            <span class="product-source-tag">
              ${getIcon('shield-check', 14)} ${sourceLabel}
            </span>

            <h1 class="product-detail-name">${productTitle}</h1>
            <p class="text-xs text-secondary font-medium">${brandName}</p>

            <div class="product-meta-row">
              <span>Barcode: <strong class="font-mono text-primary">${barcodeNum}</strong></span>
              <span>Kategori: <strong>${categoryName}</strong></span>
            </div>
          </div>
        </div>

        <!-- Desktop Quick Actions -->
        <div class="card p-4 flex flex-col gap-2">
          <button class="btn btn-primary btn-block" id="detail-scan-other-btn">
            ${getIcon('barcode', 18)} Scan Produk Lain
          </button>
          <button class="btn btn-secondary btn-block" id="detail-bookmark-btn-desktop">
            ${getIcon('bookmark', 18)} Simpan ke Riwayat
          </button>
          <button class="btn btn-outline btn-block text-xs" id="detail-view-all-edu-btn">
            ${getIcon('book-open', 16)} Ensiklopedia BTP Lengkap
          </button>
        </div>
      </div>

      <!-- Right Column: Results, Notice, and Additives Accordion List -->
      <div class="flex flex-col gap-4">
        <!-- Summary Section -->
        <div class="card p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-base">Hasil Pengenalan Komposisi</h3>
            <span class="badge ${additivesList.length > 0 ? 'badge-primary' : 'badge-neutral'}">
              ${additivesList.length} BTP Dikenali
            </span>
          </div>
          <p class="text-xs text-secondary leading-relaxed">
            ${additivesList.length > 0 
              ? `Ditemukan ${additivesList.length} bahan yang tergolong Bahan Tambahan Pangan (BTP) resmi menurut regulasi keamanan pangan.` 
              : `Tidak terdeteksi BTP kimia sintetik pada komposisi produk ini.`}
          </p>

          ${rawIngredients ? `
            <div class="mt-3 p-3 bg-surface-alt rounded text-xs text-secondary" style="line-height: 1.5; border-left: 3px solid var(--border-dark);">
              <strong>Daftar Komposisi:</strong> ${escapeHtml(rawIngredients)}
            </div>
          ` : ''}
        </div>

        <!-- MANDATORY SCIENTIFIC EDUCATIONAL NOTE -->
        <div class="notice-box">
          <span class="notice-icon">${getIcon('info', 22)}</span>
          <div class="notice-content">
            <strong>Catatan Edukasi Penting:</strong>
            <p class="mt-1">
              "Keberadaan BTP tidak otomatis berarti produk berbahaya. Penilaian perlu mempertimbangkan jenis bahan, jumlah penggunaannya, kategori pangan, dan ketentuan yang berlaku sesuai standar BPOM RI dan Codex Alimentarius."
            </p>
          </div>
        </div>

        <!-- BTP Additives List Section -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-base">Rincian Bahan Tambahan Pangan (BTP)</h3>
            <span class="text-xs text-muted">Ketuk kartu untuk buka detail</span>
          </div>

          <div class="additives-accordion-list" id="additives-accordion-container">
            ${additivesList.length === 0 ? `
              <div class="empty-state p-6 card">
                <span class="empty-state-icon">${getIcon('shield-check', 32, '', '#176B45')}</span>
                <h4 class="font-bold text-sm">Produk Ini Tanpa BTP Sintetik</h4>
                <p class="text-xs text-secondary">Hanya mengandung bahan pangan primer alami tanpa penambahan pengawet atau pewarna sintetik.</p>
              </div>
            ` : additivesList.map((item, index) => `
              <div class="additive-card ${index === 0 ? 'open' : ''}" data-additive-id="${item.id}">
                <div class="additive-card-header">
                  <div class="additive-card-title-group">
                    <span class="additive-name">${item.name}</span>
                    <span class="additive-ins">${item.insOrECode || 'Resmi BPOM'} • ${item.function}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="badge ${item.status === 'terdeteksi' ? 'badge-verified' : 'badge-warning'} text-xs">
                      ${item.status === 'terdeteksi' ? 'Terdeteksi' : 'Perlu Verifikasi'}
                    </span>
                    <span class="text-muted accordion-arrow">
                      ${getIcon('chevron-down', 18)}
                    </span>
                  </div>
                </div>

                <div class="additive-card-body">
                  <div class="additive-field-block">
                    <div class="additive-field-label">Fungsi Teknologi Pangan:</div>
                    <p class="text-sm font-semibold text-primary">${item.function}</p>
                  </div>

                  <div class="additive-field-block">
                    <div class="additive-field-label">Penjelasan Sederhana untuk Awam:</div>
                    <p class="text-sm text-secondary">${item.explanation}</p>
                  </div>

                  <div class="additive-field-block">
                    <div class="additive-field-label">Mengapa Digunakan Industri:</div>
                    <p class="text-sm text-secondary">${item.whyUsed}</p>
                  </div>

                  <div class="additive-field-block">
                    <div class="additive-field-label">Evaluasi Keamanan (ADI & Batas BPOM):</div>
                    <p class="text-sm text-secondary">${item.safetyContext}</p>
                  </div>

                  <div class="additive-field-block">
                    <div class="additive-field-label">Contoh Penggunaan Lain:</div>
                    <div class="flex flex-wrap gap-1 mt-1">
                      ${(item.commonFoods || []).map(f => `<span class="badge badge-neutral text-xs">${f}</span>`).join('')}
                    </div>
                  </div>

                  <div class="additive-actions-footer">
                    <span class="text-xs text-muted" style="max-width: 50%;">
                      Sumber: ${item.referenceSource || 'Peraturan BPOM No. 11/2019'}
                    </span>
                    <div class="flex items-center gap-2">
                      <button type="button" class="btn btn-sm btn-outline open-btp-modal-btn" data-additive-id="${item.id}">
                        ${getIcon('eye', 14)} Pop-up Detail
                      </button>
                      <button type="button" class="btn btn-sm btn-secondary open-additive-full-btn" data-additive-id="${item.id}">
                        ${getIcon('book-open', 14)} Halaman BTP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;

  // Accordion Expand/Collapse Behavior
  container.querySelectorAll('.additive-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.additive-card');
      const arrow = header.querySelector('.accordion-arrow');
      card.classList.toggle('open');
      if (card.classList.contains('open')) {
        arrow.innerHTML = getIcon('chevron-up', 18);
      } else {
        arrow.innerHTML = getIcon('chevron-down', 18);
      }
    });
  });

  // Pop-up Modal Detail BTP (PRD Figma UI Strategy)
  container.querySelectorAll('.open-btp-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const aid = btn.dataset.additiveId;
      const btpData = additivesList.find(a => a.id === aid);
      if (btpData) {
        openBtpDetailModal(btpData, (targetId) => {
          navigateTo('additive-detail', { additiveId: targetId });
        });
      }
    });
  });

  // Deep Dive to Specific BTP
  container.querySelectorAll('.open-additive-full-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const aid = btn.dataset.additiveId;
      navigateTo('additive-detail', { additiveId: aid });
    });
  });

  // Bookmark / Save to History action (Syncing to ScanLogService)
  const saveToHistory = async () => {
    await ScanLogService.logScan({
      productId: product ? product.id : null,
      barcode: barcodeNum !== 'Non-barcode (OCR)' ? barcodeNum : null,
      productName: productTitle,
      method: isFromOcr ? 'composition' : 'barcode',
      status: 'tersedia',
      additivesCount: additivesList.length
    });

    StorageService.addHistory({
      productId: product ? product.id : null,
      barcode: barcodeNum !== 'Non-barcode (OCR)' ? barcodeNum : null,
      name: productTitle,
      brand: brandName,
      image: productImage,
      method: isFromOcr ? 'composition' : 'barcode',
      status: 'tersedia',
      additivesCount: additivesList.length,
      category: categoryName
    });
    showToast('Tersimpan di riwayat & log pemindaian!', 'success', 2500);
  };

  container.querySelector('#detail-bookmark-btn')?.addEventListener('click', saveToHistory);
  container.querySelector('#detail-bookmark-btn-desktop')?.addEventListener('click', saveToHistory);

  // Copy share info
  container.querySelector('#detail-share-btn').addEventListener('click', () => {
    const textToCopy = `${productTitle} (${brandName}) - Ditemukan ${additivesList.length} BTP melalui aplikasi KenaliBTP.`;
    navigator.clipboard?.writeText(textToCopy);
    showToast('Ringkasan produk disalin ke clipboard!', 'info', 2000);
  });

  // Scan Other Product
  container.querySelector('#detail-scan-other-btn').addEventListener('click', () => {
    navigateTo('scanner');
  });

  // View All Education
  container.querySelector('#detail-view-all-edu-btn').addEventListener('click', () => {
    navigateTo('education');
  });

  // Back button
  container.querySelector('#detail-back-btn').addEventListener('click', () => {
    if (isFromOcr) {
      navigateTo('home');
    } else {
      navigateTo('home');
    }
  });

  return container;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}
