// Layar D: Product Not Found Screen
import { getIcon } from '../components/icons.js';
import { openManualBarcodeModal } from '../components/modal.js';
import { getProductByBarcode } from '../data/products.js';

export function renderNotFoundScreen(navigateTo, data = {}) {
  const container = document.createElement('div');
  container.className = 'notfound-screen';

  const scannedBarcode = data.scannedBarcode || '8991234567890';

  container.innerHTML = `
    <div class="notfound-icon-bubble">
      ${getIcon('alert-triangle', 42, '', '#B26A00')}
    </div>

    <h2 class="notfound-title">Produk Belum Terdaftar</h2>

    <div class="scanned-barcode-badge">
      ${getIcon('barcode', 16)}
      <span>Barcode: <strong>${escapeHtml(scannedBarcode)}</strong></span>
    </div>

    <p class="notfound-description">
      Barcode ini belum tersedia dalam database sampel kami. Kamu tetap bisa memeriksa dan mengenali Bahan Tambahan Pangan (BTP) dengan memotret label komposisi pada kemasan produk!
    </p>

    <div class="notfound-actions">
      <button class="btn btn-primary btn-lg" id="notfound-goto-composition-btn">
        ${getIcon('camera', 20)} Foto Komposisi Sekarang
      </button>

      <button class="btn btn-secondary" id="notfound-manual-input-btn">
        ${getIcon('barcode', 18)} Coba Barcode Lain
      </button>

      <button class="btn btn-ghost text-sm mt-2" id="notfound-back-scanner-btn">
        ${getIcon('arrow-left', 16)} Kembali ke Scanner
      </button>
    </div>
  `;

  // Event Listeners
  container.querySelector('#notfound-goto-composition-btn').addEventListener('click', () => {
    navigateTo('composition', { previousBarcode: scannedBarcode });
  });

  container.querySelector('#notfound-manual-input-btn').addEventListener('click', () => {
    openManualBarcodeModal((barcode) => {
      const prod = getProductByBarcode(barcode);
      if (prod) {
        navigateTo('product-detail', { productId: prod.id });
      } else {
        navigateTo('not-found', { scannedBarcode: barcode });
      }
    });
  });

  container.querySelector('#notfound-back-scanner-btn').addEventListener('click', () => {
    navigateTo('scanner');
  });

  return container;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}
