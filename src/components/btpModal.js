// Komponen Pop-up / Modal Detail BTP Interaktif (Sesuai PRD Figma UI/UX Strategy)
import { getIcon, getBrandLogo } from './icons.js';

export function openBtpDetailModal(btp, onNavigateFull = null) {
  let modalOverlay = document.getElementById('btp-detail-modal');
  if (modalOverlay) modalOverlay.remove();

  modalOverlay = document.createElement('div');
  modalOverlay.id = 'btp-detail-modal';
  modalOverlay.className = 'modal-overlay';

  modalOverlay.innerHTML = `
    <div class="modal-card" style="max-width: 540px; max-height: 90vh; display: flex; flex-direction: column;">
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="modal-title-group">
          <div class="brand-logo-badge" style="width: 38px; height: 38px;" title="BTPGuide Logo">
            ${getBrandLogo(22, '', '#FFFFFF')}
          </div>
          <div>
            <h3 class="modal-title">${btp.name}</h3>
            <span class="badge badge-primary text-xs font-mono mt-0.5">
              ${btp.ins_code || btp.insOrECode || 'BTP Resmi'}
            </span>
          </div>
        </div>
        <button class="modal-close-btn" id="btp-modal-close-btn" aria-label="Tutup">
          ${getIcon('x', 20)}
        </button>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="modal-body" style="overflow-y: auto; padding: 20px;">
        <!-- Technical & Chemical Info -->
        <div class="grid grid-cols-2 gap-2 mb-3 p-3 bg-surface-alt rounded-lg" style="background-color: var(--surface-alt); border: 1px solid var(--border);">
          <div>
            <span class="text-xs text-muted font-bold uppercase" style="font-size: 0.7rem;">Fungsi Teknis:</span>
            <div class="text-xs font-bold text-primary mt-0.5">${btp.technical_function || btp.function}</div>
          </div>
          <div>
            <span class="text-xs text-muted font-bold uppercase" style="font-size: 0.7rem;">Nama Kimia / Senyawa:</span>
            <div class="text-xs font-bold text-secondary mt-0.5">${btp.chemical_name || btp.name}</div>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <h4 class="text-xs font-bold text-secondary uppercase mb-1" style="letter-spacing: 0.04em;">Penjelasan Ringkas:</h4>
          <p class="text-sm text-primary leading-relaxed">${btp.description || btp.explanation}</p>
        </div>

        <!-- Health Notes / Catatan Kesehatan -->
        <div class="notice-box mb-4">
          <span class="notice-icon">${getIcon('shield-check', 20, '', '#176B45')}</span>
          <div class="notice-content">
            <strong class="text-xs">Catatan Kesehatan & Evaluasi ADI:</strong>
            <p class="text-xs text-secondary mt-1 leading-relaxed">
              ${btp.health_notes || btp.safetyContext}
            </p>
          </div>
        </div>

        <!-- Why Used -->
        <div class="mb-4">
          <h4 class="text-xs font-bold text-secondary uppercase mb-1" style="letter-spacing: 0.04em;">Alasan Digunakan Industri:</h4>
          <p class="text-xs text-secondary leading-relaxed">${btp.why_used || btp.whyUsed}</p>
        </div>

        <!-- Common Foods -->
        ${(btp.common_foods || btp.commonFoods) ? `
          <div class="mb-4">
            <h4 class="text-xs font-bold text-secondary uppercase mb-1.5" style="letter-spacing: 0.04em;">Contoh Produk Pangan:</h4>
            <div class="flex flex-wrap gap-1">
              ${(btp.common_foods || btp.commonFoods).map(f => `<span class="badge badge-neutral text-xs">${f}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Regulatory Reference -->
        <div class="text-xs text-muted pt-2 border-t border-border-light">
          Rujukan Resmi: ${btp.reference_source || btp.referenceSource || 'Peraturan BPOM RI No. 11/2019'}
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-header" style="border-top: 1px solid var(--border-light); border-bottom: none; justify-content: flex-end; gap: 8px;">
        <button type="button" class="btn btn-secondary btn-sm" id="btp-modal-dismiss-btn">Tutup</button>
        ${onNavigateFull ? `
          <button type="button" class="btn btn-primary btn-sm" id="btp-modal-full-btn">
            ${getIcon('book-open', 16)} Buka Halaman Lengkap
          </button>
        ` : ''}
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  const closeModal = () => {
    modalOverlay.classList.remove('modal-active');
    setTimeout(() => modalOverlay.remove(), 200);
  };

  modalOverlay.querySelector('#btp-modal-close-btn').addEventListener('click', closeModal);
  modalOverlay.querySelector('#btp-modal-dismiss-btn').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  const fullBtn = modalOverlay.querySelector('#btp-modal-full-btn');
  if (fullBtn && onNavigateFull) {
    fullBtn.addEventListener('click', () => {
      closeModal();
      onNavigateFull(btp.id);
    });
  }

  requestAnimationFrame(() => modalOverlay.classList.add('modal-active'));
}
