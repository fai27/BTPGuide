// Layar C: Barcode Scanner Screen
import { getIcon } from '../components/icons.js';
import { SAMPLE_PRODUCTS, getProductByBarcode } from '../data/products.js';
import { BarcodeScannerService } from '../services/scanner.js';
import { openManualBarcodeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { StorageService } from '../services/storage.js';
import { ScanLogService } from '../services/api/scanLogService.js';

export function renderScannerScreen(navigateTo) {
  const container = document.createElement('div');
  container.className = 'scanner-screen';

  // Sampel barcode uji cepat untuk demonstrasi instan prototype
  const demoChips = [
    { name: 'Indomie Mi Goreng', code: '8998866200224' },
    { name: 'Chitato Sapi', code: '8996001301017' },
    { name: 'Teh Pucuk', code: '8993005321124' },
    { name: 'Taro Net Seaweed', code: '8996001410146' },
    { name: 'Oreo Vanilla', code: '8992761001011' },
    { name: 'Beng-Beng', code: '8998838380121' },
    { name: 'Pocari Sweat', code: '8991001001215' },
    { name: 'Ultra Milk Cokelat', code: '8992753110226' },
    { name: 'Coca-Cola Zero', code: '8992761110010' },
    { name: 'Aqua Mineral', code: '8992775110013' },
    { name: 'Uji: Belum Terdaftar', code: '8991234567890', isNotFoundTest: true }
  ];

  container.innerHTML = `
    <!-- Scanner Header -->
    <div class="scanner-header">
      <button class="scanner-back-btn" id="scanner-back-btn" aria-label="Kembali">
        ${getIcon('arrow-left', 20)}
      </button>
      <h2 class="scanner-header-title">Pindai Barcode Produk</h2>
      <button class="scanner-back-btn" id="scanner-torch-btn" title="Nyalakan Lampu Flash">
        ${getIcon('flashlight', 18)}
      </button>
    </div>

    <!-- Hidden file input for uploading barcode image -->
    <input type="file" id="barcode-file-input" accept="image/*" style="display: none;" />
    <div id="temp-barcode-reader" style="display: none;"></div>

    <div class="scanner-desktop-split">
      <!-- Camera Viewport Area -->
      <div class="scanner-viewport-container">
        <div class="camera-preview-box">
          <div id="html5-scanner-element" style="width: 100%; height: 100%;"></div>

          <!-- Simulated camera feedback if webcam is not accessible -->
          <div id="camera-simulated-view" style="display: none; width: 100%; height: 100%; background: #132219; position: absolute; top:0; left:0; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px;">
            ${getIcon('camera', 44, '', '#2ECC71')}
            <span style="font-size: 0.8rem; font-weight: 700; color: #2ECC71; margin-top: 10px;">
              Kamera Simulasi Aktif
            </span>
            <p style="font-size: 0.72rem; color: #8E9E94; margin-top: 4px;">
              Arahkan barcode ke bingkai atau pilih barcode sampel uji cepat di sebelah.
            </p>
          </div>

          <!-- Viewfinder reticle corners -->
          <div class="scanner-reticle-corner corner-tl"></div>
          <div class="scanner-reticle-corner corner-tr"></div>
          <div class="scanner-reticle-corner corner-bl"></div>
          <div class="scanner-reticle-corner corner-br"></div>

          <!-- Scanning laser line -->
          <div class="scanner-laser"></div>
        </div>

        <div class="scanner-hint-text">
          <p>Arahkan barcode produk ke dalam bingkai</p>
          <span class="badge badge-neutral text-xs mt-1" id="camera-status-badge">
            Menghubungkan kamera...
          </span>
        </div>

        <!-- Action buttons under scanner -->
        <div class="scanner-control-bar">
          <button class="scanner-icon-btn" id="scanner-upload-img-btn" title="Unggah Foto Barcode">
            ${getIcon('upload', 20)}
          </button>
          <button class="scanner-icon-btn" id="scanner-manual-input-btn" title="Ketik Barcode Manual">
            ${getIcon('barcode', 22)}
          </button>
        </div>
      </div>

      <!-- Demo Barcode Quick Testing Drawer / Panel -->
      <div class="scanner-demo-tray">
        <div class="demo-tray-header">
          <div>
            <span class="demo-tray-title">Panel Barcode Uji Cepat</span>
            <p class="text-xs text-secondary mt-0.5" style="color: #8E9E94;">Klik salah satu kartu produk untuk menguji seketika:</p>
          </div>
          <span class="badge badge-primary text-xs">${demoChips.length} Sampel</span>
        </div>
        <div class="demo-barcodes-scroll">
          ${demoChips.map(chip => `
            <button class="demo-barcode-chip ${chip.isNotFoundTest ? 'quick-chip-notfound' : ''}" data-code="${chip.code}">
              <span>${chip.name}</span>
              <span class="demo-barcode-code">${chip.code}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Barcode Processing Logic
  async function handleDetectedBarcode(barcode) {
    if (!barcode) return;
    const cleanCode = barcode.toString().trim();
    showToast(`Membaca barcode: ${cleanCode}`, 'info', 1500);

    // Hentikan kamera
    BarcodeScannerService.stopCamera();

    // Cari di basis data sampel
    const product = getProductByBarcode(cleanCode);

    if (product) {
      // Catat ke Supabase scan_logs (Riwayat Pindai & Analisis Tren)
      await ScanLogService.logScan({
        productId: product.id,
        barcode: product.barcode,
        productName: product.name,
        method: 'barcode',
        additivesCount: product.additives.length,
        status: 'tersedia'
      });

      // Catat ke riwayat lokal
      StorageService.addHistory({
        productId: product.id,
        barcode: product.barcode,
        name: product.name,
        brand: product.brand,
        image: product.image,
        method: 'barcode',
        status: 'tersedia',
        additivesCount: product.additives.length,
        category: product.category
      });

      showToast(`Produk ditemukan: ${product.name}`, 'success', 2000);
      navigateTo('product-detail', { productId: product.id });
    } else {
      // Catat fallback ke scan_logs
      await ScanLogService.logScan({
        productId: null,
        barcode: cleanCode,
        productName: `Produk Belum Terdaftar (${cleanCode})`,
        method: 'barcode',
        additivesCount: 0,
        status: 'perlu-verifikasi'
      });

      StorageService.addHistory({
        productId: null,
        barcode: cleanCode,
        name: `Produk Belum Terdaftar (${cleanCode})`,
        brand: 'Tidak Dikenal',
        image: null,
        method: 'barcode',
        status: 'perlu-verifikasi',
        additivesCount: 0,
        category: 'Belum Terdaftar'
      });

      navigateTo('not-found', { scannedBarcode: cleanCode });
    }
  }

  // Start Camera with graceful simulation fallback
  const statusBadge = container.querySelector('#camera-status-badge');
  const simulatedView = container.querySelector('#camera-simulated-view');

  setTimeout(() => {
    BarcodeScannerService.startCamera(
      'html5-scanner-element',
      (decodedText) => handleDetectedBarcode(decodedText),
      (err) => {
        // Fallback to simulated view
        if (statusBadge) {
          statusBadge.textContent = 'Mode Simulasi Aktif (Gunakan Tombol Sampel)';
          statusBadge.className = 'badge badge-warning text-xs mt-1';
        }
        if (simulatedView) simulatedView.style.display = 'flex';
      }
    ).then(res => {
      if (res && res.isRealCamera) {
        if (statusBadge) {
          statusBadge.textContent = 'Kamera Aktif';
          statusBadge.className = 'badge badge-primary text-xs mt-1';
        }
      } else {
        if (simulatedView) simulatedView.style.display = 'flex';
        if (statusBadge) {
          statusBadge.textContent = 'Mode Simulasi (Klik Sampel Barcode)';
          statusBadge.className = 'badge badge-warning text-xs mt-1';
        }
      }
    });
  }, 100);

  // Event Listeners
  container.querySelector('#scanner-back-btn').addEventListener('click', () => {
    BarcodeScannerService.stopCamera();
    navigateTo('home');
  });

  // Torch Toggle
  const torchBtn = container.querySelector('#scanner-torch-btn');
  torchBtn.addEventListener('click', async () => {
    const res = await BarcodeScannerService.toggleTorch();
    if (res.supported) {
      torchBtn.classList.toggle('active', res.state);
      showToast(res.state ? 'Flash dinyalakan' : 'Flash dimatikan', 'info', 1500);
    } else {
      showToast('Lampu flash tidak didukung di perangkat ini', 'warning', 2000);
    }
  });

  // Manual Barcode Input
  container.querySelector('#scanner-manual-input-btn').addEventListener('click', () => {
    openManualBarcodeModal((manualBarcode) => {
      handleDetectedBarcode(manualBarcode);
    });
  });

  // Image File Upload for Barcode
  const fileInput = container.querySelector('#barcode-file-input');
  container.querySelector('#scanner-upload-img-btn').addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('Menganalisis gambar barcode...', 'info', 2000);
      const decoded = await BarcodeScannerService.scanImageFile(file);
      if (decoded) {
        handleDetectedBarcode(decoded);
      }
    } catch (err) {
      showToast('Barcode pada gambar tidak terbaca. Coba gunakan foto yang lebih terang atau input manual.', 'error', 3500);
    }
  });

  // Quick Demo Barcode Chips Click
  container.querySelectorAll('.demo-barcode-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const code = chip.dataset.code;
      handleDetectedBarcode(code);
    });
  });

  return container;
}
