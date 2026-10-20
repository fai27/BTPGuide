// Layar A: Onboarding / Welcome Screen (Modern Split Hero Workstation)
import { getIcon } from '../components/icons.js';
import { StorageService } from '../services/storage.js';

export function renderOnboardingScreen(navigateTo) {
  const container = document.createElement('div');
  container.className = 'onboarding-screen';

  container.innerHTML = `
    <div class="onboarding-container">
      <!-- ================= LEFT COLUMN: Value Proposition & Features ================= -->
      <div class="onboarding-left-pane">
        <div class="onboarding-badge">
          ${getIcon('leaf', 16, '', '#176B45')}
          <span>Proyek Edukasi Pangan Terbuka • BPOM RI</span>
        </div>

        <h1 class="onboarding-headline">
          Lebih Kenal dengan <span class="highlight-text">Isi Makananmu</span>
        </h1>

        <p class="onboarding-description">
          Pindai barcode atau foto komposisi kemasan untuk mengenali Bahan Tambahan Pangan (BTP) pada produk makanan & minuman secara akurat, ilmiah, dan mudah dipahami.
        </p>

        <!-- 3 Sleek Feature Value Cards -->
        <div class="onboarding-feature-grid">
          <div class="onboarding-feature-card">
            <div class="onboarding-feature-icon">
              ${getIcon('barcode', 20)}
            </div>
            <div>
              <h4 class="onboarding-feature-title">Scan Barcode Cepat</h4>
              <p class="onboarding-feature-desc">Akses komposisi & BTP pada 30+ sampel produk kemasan populer instan tanpa repot.</p>
            </div>
          </div>

          <div class="onboarding-feature-card">
            <div class="onboarding-feature-icon">
              ${getIcon('camera', 20)}
            </div>
            <div>
              <h4 class="onboarding-feature-title">Analisis Foto Komposisi (OCR)</h4>
              <p class="onboarding-feature-desc">Ekstraksi teks label kemasan otomatis dan pencocokan BTP berteknologi tinggi.</p>
            </div>
          </div>

          <div class="onboarding-feature-card">
            <div class="onboarding-feature-icon">
              ${getIcon('shield-check', 20)}
            </div>
            <div>
              <h4 class="onboarding-feature-title">Edukasi Berbasis Sains</h4>
              <p class="onboarding-feature-desc">Penjelasan ramah awam berdasar Peraturan BPOM No. 11/2019 & FAO/WHO Codex tanpa rasa takut.</p>
            </div>
          </div>
        </div>

        <!-- Action & Start Buttons Group -->
        <div class="onboarding-actions-group">
          <div class="flex items-center gap-3 flex-wrap">
            <button class="btn btn-primary btn-lg onboarding-cta-btn" id="onboarding-start-btn">
              <span>Mulai Sekarang</span>
              ${getIcon('chevron-right', 20)}
            </button>
            <button class="btn btn-outline btn-lg" id="onboarding-skip-btn">
              <span>Langsung ke Beranda</span>
            </button>
          </div>

          <div class="onboarding-pref-row">
            <label class="onboarding-checkbox-label">
              <input type="checkbox" id="dont-show-onboarding-cb" checked />
              <span>Jangan tampilkan panduan ini lagi saat membuka aplikasi</span>
            </label>
          </div>

          <p class="onboarding-disclaimer">
            ${getIcon('info', 14)} Informasi edukatif untuk membantu memahami label makanan. Bukan pengganti sertifikasi atau diagnosis medis.
          </p>
        </div>
      </div>

      <!-- ================= RIGHT COLUMN: Interactive Live Mockup Card ================= -->
      <div class="onboarding-right-pane">
        <div class="onboarding-preview-wrapper">
          <!-- Floating Pill 1: BPOM Verified -->
          <div class="onboarding-floating-pill float-pill-top">
            <span class="pulse-dot"></span>
            ${getIcon('shield-check', 16, '', '#176B45')}
            <strong>Basis Data BPOM RI</strong>
          </div>

          <!-- Floating Pill 2: OCR Ready -->
          <div class="onboarding-floating-pill float-pill-bottom">
            ${getIcon('search', 16, '', '#176B45')}
            <span>AI OCR Pencocok Istilah</span>
          </div>

          <!-- Main Mockup Card -->
          <div class="onboarding-mockup-card">
            <div class="mockup-card-header">
              <div class="flex items-center gap-2">
                <span class="mockup-indicator"></span>
                <span class="text-xs font-bold text-text-primary">Simulasi Hasil Pemindaian</span>
              </div>
              <span class="badge badge-verified text-[11px]">Terverifikasi BPOM</span>
            </div>

            <div class="mockup-product-row">
              <div class="mockup-product-icon">
                ${getIcon('barcode', 28, '', '#176B45')}
              </div>
              <div>
                <div class="mockup-product-name">Susu UHT Cokelat 200ml</div>
                <div class="mockup-product-meta">8992753123456 • Minuman Susu Olahan</div>
              </div>
            </div>

            <div class="mockup-divider"></div>

            <div class="mockup-btp-section-title">
              Bahan Tambahan Pangan Terdeteksi (3 BTP)
            </div>

            <div class="mockup-btp-list">
              <!-- BTP 1 -->
              <div class="mockup-btp-item">
                <div class="mockup-btp-badge">INS 407</div>
                <div class="mockup-btp-info">
                  <div class="mockup-btp-name">Karagenan (Carrageenan)</div>
                  <div class="mockup-btp-role">Penstabil & Pengental Nabati</div>
                </div>
                <span class="badge badge-verified text-[10px]">Aman Sesuai ADI</span>
              </div>

              <!-- BTP 2 -->
              <div class="mockup-btp-item">
                <div class="mockup-btp-badge">INS 150c</div>
                <div class="mockup-btp-info">
                  <div class="mockup-btp-name">Karamel III (Ammonia Process)</div>
                  <div class="mockup-btp-role">Pewarna Alami Cokelat</div>
                </div>
                <span class="badge badge-verified text-[10px]">BPOM Diizinkan</span>
              </div>

              <!-- BTP 3 -->
              <div class="mockup-btp-item">
                <div class="mockup-btp-badge">Perisa</div>
                <div class="mockup-btp-info">
                  <div class="mockup-btp-name">Perisa Sintetik Cokelat</div>
                  <div class="mockup-btp-role">Penguat Aroma & Rasa</div>
                </div>
                <span class="badge badge-neutral text-[10px]">CPPOB Sesuai</span>
              </div>
            </div>

            <!-- Bottom Notice within Mockup -->
            <div class="mockup-safety-summary">
              ${getIcon('shield-check', 16, '', '#176B45')}
              <span>Semua BTP berada dalam Batas Maksimum Penggunaan (BTM).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const startBtn = container.querySelector('#onboarding-start-btn');
  const skipBtn = container.querySelector('#onboarding-skip-btn');
  const checkbox = container.querySelector('#dont-show-onboarding-cb');

  const proceed = () => {
    if (checkbox.checked) {
      StorageService.setOnboardingSeen(true);
    }
    navigateTo('home');
  };

  startBtn.addEventListener('click', proceed);
  skipBtn.addEventListener('click', proceed);

  return container;
}
