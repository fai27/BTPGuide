// Komponen Modal untuk Input Barcode Manual & Konfirmasi Aksi
import { getIcon } from './icons.js';
import { SAMPLE_PRODUCTS } from '../data/products.js';

export function openManualBarcodeModal(onSubmit) {
  let modalOverlay = document.getElementById('manual-barcode-modal');
  if (modalOverlay) {
    modalOverlay.remove();
  }

  modalOverlay = document.createElement('div');
  modalOverlay.id = 'manual-barcode-modal';
  modalOverlay.className = 'modal-overlay';

  // 4 contoh barcode cepat
  const quickBarcodes = SAMPLE_PRODUCTS.slice(0, 4);

  modalOverlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title-group">
          <span class="modal-header-icon">${getIcon('barcode', 22, '', '#176B45')}</span>
          <div>
            <h3 class="modal-title">Input Barcode Manual</h3>
            <p class="modal-subtitle">Ketikkan 12-13 digit nomor barcode pada kemasan</p>
          </div>
        </div>
        <button class="modal-close-btn" id="modal-close-btn" aria-label="Tutup">
          ${getIcon('x', 20)}
        </button>
      </div>

      <div class="modal-body">
        <form id="manual-barcode-form">
          <div class="form-group">
            <label for="barcode-input-field" class="form-label">Nomor Barcode (EAN-13 / UPC)</label>
            <div class="input-with-icon">
              <span class="input-icon">${getIcon('barcode', 18)}</span>
              <input 
                type="text" 
                id="barcode-input-field" 
                class="form-input" 
                placeholder="Contoh: 8998866200224"
                pattern="[0-9]*" 
                inputmode="numeric" 
                maxlength="16"
                autofocus
                required
              />
            </div>
            <p class="input-hint">Biasanya tertera di sudut bawah belakang kemasan produk.</p>
          </div>

          <div class="quick-pick-section">
            <p class="quick-pick-title">Atau pilih sampel uji cepat:</p>
            <div class="quick-pick-chips">
              ${quickBarcodes.map(p => `
                <button type="button" class="quick-chip" data-barcode="${p.barcode}">
                  ${p.name.split(' ')[0]} ${p.name.split(' ')[1] || ''}
                </button>
              `).join('')}
              <button type="button" class="quick-chip quick-chip-notfound" data-barcode="8991234567890">
                Uji: Tidak Terdaftar
              </button>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Batal</button>
            <button type="submit" class="btn btn-primary" id="modal-submit-btn">
              ${getIcon('search', 18)} Cari Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // Focus input
  const input = modalOverlay.querySelector('#barcode-input-field');
  setTimeout(() => input?.focus(), 100);

  // Close handlers
  const closeModal = () => {
    modalOverlay.classList.remove('modal-active');
    setTimeout(() => modalOverlay.remove(), 250);
  };

  modalOverlay.querySelector('#modal-close-btn').addEventListener('click', closeModal);
  modalOverlay.querySelector('#modal-cancel-btn').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Quick chips click
  modalOverlay.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const barcode = chip.dataset.barcode;
      input.value = barcode;
      input.focus();
    });
  });

  // Form submit
  modalOverlay.querySelector('#manual-barcode-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const barcode = input.value.trim();
    if (barcode) {
      closeModal();
      if (onSubmit) onSubmit(barcode);
    }
  });

  // Animate in
  requestAnimationFrame(() => {
    modalOverlay.classList.add('modal-active');
  });
}

export function openConfirmModal({ title, message, confirmText = 'Ya, Lanjutkan', confirmVariant = 'danger', onConfirm }) {
  let modalOverlay = document.getElementById('confirm-modal');
  if (modalOverlay) modalOverlay.remove();

  modalOverlay = document.createElement('div');
  modalOverlay.id = 'confirm-modal';
  modalOverlay.className = 'modal-overlay';

  modalOverlay.innerHTML = `
    <div class="modal-card modal-card-sm">
      <div class="modal-body text-center p-6">
        <div class="confirm-icon-wrapper ${confirmVariant}">
          ${getIcon(confirmVariant === 'danger' ? 'trash-2' : 'alert-circle', 28)}
        </div>
        <h3 class="modal-title mt-4 mb-2">${escapeHtml(title)}</h3>
        <p class="text-secondary text-sm mb-6">${escapeHtml(message)}</p>
        <div class="modal-actions-horizontal">
          <button type="button" class="btn btn-secondary flex-1" id="confirm-cancel-btn">Batal</button>
          <button type="button" class="btn btn-${confirmVariant} flex-1" id="confirm-proceed-btn">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  const closeModal = () => {
    modalOverlay.classList.remove('modal-active');
    setTimeout(() => modalOverlay.remove(), 200);
  };

  modalOverlay.querySelector('#confirm-cancel-btn').addEventListener('click', closeModal);
  modalOverlay.querySelector('#confirm-proceed-btn').addEventListener('click', () => {
    closeModal();
    if (onConfirm) onConfirm();
  });

  requestAnimationFrame(() => modalOverlay.classList.add('modal-active'));
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
