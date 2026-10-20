// Layar K: Profil, Pengaturan Sistem, Landasan Regulasi & Arsitektur Database (table.md)
import { getIcon, getBrandLogo } from '../components/icons.js';
import { StorageService } from '../services/storage.js';
import { openConfirmModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export function renderProfileScreen(navigateTo) {
  const container = document.createElement('div');
  container.className = 'profile-screen';

  const history = StorageService.getHistory();

  container.innerHTML = `
    <!-- Top Action Bar -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <button class="header-action-btn" id="profile-back-btn" aria-label="Kembali ke Beranda">
          ${getIcon('arrow-left', 20)}
        </button>
        <div>
          <h2 class="text-xl font-bold">Profil & Pengaturan</h2>
          <p class="text-xs text-secondary">Pusat kontrol pengguna, preferensi, regulasi BPOM & dokumentasi teknis</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="badge badge-primary text-xs font-mono font-bold">BTPGuide v1.0.0</span>
      </div>
    </div>

    <!-- Hero Profile Dashboard Card -->
    <div class="profile-hero-card">
      <div class="profile-hero-content">
        <!-- User identity -->
        <div class="profile-user-summary">
          <div class="profile-avatar-wrapper">
            <div class="profile-avatar-circle">
              ${getIcon('user', 34)}
            </div>
            <div class="profile-status-indicator" title="Sistem Aktif & Terhubung"></div>
          </div>
          <div class="profile-user-details">
            <h3 class="profile-user-name">Pengguna Tamu BTPGuide</h3>
            <div class="profile-user-role-row">
              <span class="profile-role-pill">
                ${getIcon('shield-check', 14)} Akun Tamu / Mahasiswa
              </span>
              <span class="profile-session-pill">
                ID: anon-user-001
              </span>
            </div>
          </div>
        </div>

        <!-- 4 Key Metric Stat Cards -->
        <div class="profile-stats-grid">
          <div class="profile-metric-box">
            <div class="metric-header">
              <span class="metric-label">Pemeriksaan</span>
              ${getIcon('history', 15)}
            </div>
            <div class="metric-value">${history.length}</div>
          </div>

          <div class="profile-metric-box">
            <div class="metric-header">
              <span class="metric-label">Katalog BTP</span>
              ${getIcon('book-open', 15)}
            </div>
            <div class="metric-value">29</div>
          </div>

          <div class="profile-metric-box">
            <div class="metric-header">
              <span class="metric-label">Sampel Siap</span>
              ${getIcon('barcode', 15)}
            </div>
            <div class="metric-value">30</div>
          </div>

          <div class="profile-metric-box">
            <div class="metric-header">
              <span class="metric-label">Regulasi</span>
              ${getIcon('shield-check', 15)}
            </div>
            <div class="metric-value text-xs font-bold pt-1">BPOM '19</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Segmented Tabs Navigation -->
    <div class="profile-tabs-nav" role="tablist">
      <button class="profile-tab-btn active" data-tab="account" role="tab" aria-selected="true">
        ${getIcon('user', 18)} Ringkasan Akun
      </button>
      <button class="profile-tab-btn" data-tab="regulations" role="tab" aria-selected="false">
        ${getIcon('shield-check', 18)} Landasan Regulasi BPOM
      </button>
      <button class="profile-tab-btn" data-tab="database" role="tab" aria-selected="false">
        ${getIcon('database', 18)} Arsitektur Data (table.md)
      </button>
    </div>

    <!-- ================= TAB PANE 1: RINGKASAN AKUN ================= -->
    <div class="profile-tab-pane active" id="pane-account" role="tabpanel">
      <div class="profile-overview-layout">
        <!-- Card 1: Informasi Sesi & Sistem -->
        <div class="card p-5">
          <div class="flex items-center gap-2 mb-3 pb-2 border-b border-border-light">
            <span class="text-primary">${getIcon('info', 18)}</span>
            <h4 class="font-bold text-sm text-text-primary">Informasi Sesi & Perangkat</h4>
          </div>

          <div class="profile-info-list">
            <div class="profile-info-row">
              <span class="profile-info-label">ID Sesi Pengguna</span>
              <span class="profile-info-val font-mono text-primary">anon-user-001</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label">Status Penyimpanan</span>
              <span class="badge badge-verified text-[11px]">Tersimpan Lokal (Browser)</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label">Model Arsitektur</span>
              <span class="profile-info-val">Next.js PWA & PostgreSQL Ready</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label">Jenis Akun</span>
              <span class="profile-info-val">Tamu Akademik / Purwarupa</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label">Versi Engine</span>
              <span class="profile-info-val">BTPGuide Core v1.0.0</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Pengaturan & Aksi Aplikasi -->
        <div class="card p-5">
          <div class="flex items-center gap-2 mb-3 pb-2 border-b border-border-light">
            <span class="text-primary">${getIcon('settings', 18)}</span>
            <h4 class="font-bold text-sm text-text-primary">Pengaturan & Aksi Cepat</h4>
          </div>

          <div class="profile-action-list">
            <button class="profile-action-btn-item" id="profile-repeat-onboarding-btn">
              <span class="flex items-center gap-2.5">
                ${getIcon('book-open', 18, '', '#176B45')}
                <span>Tampilkan Panduan Awal (Onboarding)</span>
              </span>
              ${getIcon('chevron-right', 16, '', '#8C9E93')}
            </button>

            <button class="profile-action-btn-item" id="profile-start-scan-btn">
              <span class="flex items-center gap-2.5">
                ${getIcon('camera', 18, '', '#176B45')}
                <span>Mulai Pindai Produk Kemasan</span>
              </span>
              ${getIcon('chevron-right', 16, '', '#8C9E93')}
            </button>

            <button class="profile-action-btn-item danger-item" id="profile-reset-demo-btn">
              <span class="flex items-center gap-2.5">
                ${getIcon('refresh-cw', 18, '', '#DC3545')}
                <span>Reset Semua Data Demo & Riwayat</span>
              </span>
              ${getIcon('chevron-right', 16, '', '#DC3545')}
            </button>
          </div>
        </div>

        <!-- Card 3: Visi Platform & Edukasi Non-Chemophobia (Full Width) -->
        <div class="profile-vision-card">
          <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div class="flex items-center gap-2.5">
              <span class="brand-logo-badge" style="width: 34px; height: 34px;" title="BTPGuide Logo">
                ${getBrandLogo(18, '', '#FFF')}
              </span>
              <div>
                <h4 class="font-bold text-sm text-primary">BTPGuide Platform</h4>
                <p class="text-xs text-secondary italic">"Kenali isi makananmu, pilih dengan lebih bijak."</p>
              </div>
            </div>
            <span class="badge badge-neutral text-[11px]">Proyek Akademik 2024/2025</span>
          </div>

          <p class="text-xs text-secondary leading-relaxed mb-3">
            <strong>BTPGuide</strong> adalah platform edukasi kesehatan berbasis web modern yang dirancang untuk membantu masyarakat mengenali istilah Bahan Tambahan Pangan (BTP) pada label kemasan makanan olahan secara akurat, ilmiah, dan objektif.
          </p>

          <div class="notice-box text-xs">
            <span class="notice-icon">${getIcon('shield-check', 18)}</span>
            <div class="notice-content">
              <strong>Prinsip Objektif (Non-Chemophobia):</strong> Keberadaan BTP pada makanan olahan berizin edar BPOM tidak otomatis berbahaya. BTP digunakan dengan fungsi teknologi terukur dan aman selama berada di bawah Batas Maksimum Penggunaan (BTM) serta nilai Acceptable Daily Intake (ADI).
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= TAB PANE 2: LANDASAN REGULASI ================= -->
    <div class="profile-tab-pane" id="pane-regulations" role="tabpanel">
      <div class="regulations-stack">
        <!-- Intro Note -->
        <div class="p-3 bg-secondary rounded-lg border border-primary/20 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div class="flex items-center gap-2">
            <span class="text-primary">${getIcon('info', 18)}</span>
            <span>Semua ambang batas keamanan dan kategori BTP pada BTPGuide merujuk pada standar hukum resmi:</span>
          </div>
          <button class="btn btn-primary btn-sm text-xs py-1.5" id="reg-open-glossary-btn">
            ${getIcon('book-open', 14)} Buka Kamus 29 BTP
          </button>
        </div>

        <!-- Regulation 1 -->
        <div class="regulation-item-card">
          <div class="regulation-header-row">
            <div class="regulation-title-group">
              <div class="regulation-num-badge">01</div>
              <div>
                <h4 class="font-bold text-base text-text-primary">Peraturan BPOM RI No. 11 Tahun 2019</h4>
                <p class="text-xs text-primary font-semibold">Tentang Bahan Tambahan Pangan (BTP)</p>
              </div>
            </div>
            <a href="https://standarpangan.pom.go.id/peraturan" target="_blank" rel="noopener" class="btn btn-outline btn-sm text-xs">
              Portal BPOM ${getIcon('external-link', 14)}
            </a>
          </div>

          <p class="regulation-desc">
            Regulasi induk yang menetapkan <strong>27 golongan fungsional teknologi BTP</strong> yang diizinkan beredar di Indonesia, Batas Maksimum Penggunaan (BTM) numerik pada tiap kategori pangan olahan, serta prinsip Cara Produksi Pangan Olahan yang Baik (CPPOB).
          </p>

          <div class="regulation-highlights">
            <span class="reg-tag">27 Golongan Fungsional</span>
            <span class="reg-tag">Batas Maksimum Penggunaan (BTM)</span>
            <span class="reg-tag">Acceptable Daily Intake (ADI)</span>
            <span class="reg-tag">Prinsip CPPOB</span>
          </div>
        </div>

        <!-- Regulation 2 -->
        <div class="regulation-item-card">
          <div class="regulation-header-row">
            <div class="regulation-title-group">
              <div class="regulation-num-badge">02</div>
              <div>
                <h4 class="font-bold text-base text-text-primary">Peraturan BPOM RI No. 31 Tahun 2018</h4>
                <p class="text-xs text-primary font-semibold">Tentang Label Pangan Olahan</p>
              </div>
            </div>
            <a href="https://standarpangan.pom.go.id/peraturan" target="_blank" rel="noopener" class="btn btn-outline btn-sm text-xs">
              Portal BPOM ${getIcon('external-link', 14)}
            </a>
          </div>

          <p class="regulation-desc">
            Mewajibkan produsen mencantumkan komposisi bahan secara transparan, termasuk nama BTP, kode identifikasi internasional (INS/E-number), golongan fungsi BTP, peringatan khusus konsumsi (seperti pemanis buatan bagi penderita fenilketonurik), serta deklarasi alergen.
          </p>

          <div class="regulation-highlights">
            <span class="reg-tag">Kode INS / E-Number</span>
            <span class="reg-tag">Deklarasi Alergen Wajib</span>
            <span class="reg-tag">Peringatan Kelompok Rentan</span>
            <span class="reg-tag">Transparansi Label</span>
          </div>
        </div>

        <!-- Regulation 3 -->
        <div class="regulation-item-card">
          <div class="regulation-header-row">
            <div class="regulation-title-group">
              <div class="regulation-num-badge">03</div>
              <div>
                <h4 class="font-bold text-base text-text-primary">Codex Alimentarius Commission (FAO / WHO)</h4>
                <p class="text-xs text-primary font-semibold">General Standard for Food Additives (CXS 192-1995)</p>
              </div>
            </div>
            <a href="https://www.fao.org/fao-who-codexalimentarius" target="_blank" rel="noopener" class="btn btn-outline btn-sm text-xs">
              Portal Codex FAO ${getIcon('external-link', 14)}
            </a>
          </div>

          <p class="regulation-desc">
            Standar acuan internasional yang disepakati badan pangan dunia FAO dan WHO. Evaluasi toksikologis independen dilakukan secara berkala oleh <strong>JECFA</strong> (Joint FAO/WHO Expert Committee on Food Additives) untuk menjamin perlindungan kesehatan konsumen global.
          </p>

          <div class="regulation-highlights">
            <span class="reg-tag">Codex STAN 192-1995</span>
            <span class="reg-tag">Evaluasi Toksikologi JECFA</span>
            <span class="reg-tag">Standar Keamanan Pangan Global</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= TAB PANE 3: DATABASE ARCHITECTURE (table.md) ================= -->
    <div class="profile-tab-pane" id="pane-database" role="tabpanel">
      <div class="db-architecture-container">
        <!-- Architecture Intro Card -->
        <div class="card p-5">
          <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div class="flex items-center gap-2.5">
              <span class="text-primary">${getIcon('database', 22)}</span>
              <div>
                <h4 class="font-bold text-base text-text-primary">Arsitektur Database Relasional (table.md)</h4>
                <p class="text-xs text-secondary">Skema 6 entitas data relasional PostgreSQL / Supabase BaaS</p>
              </div>
            </div>
            <span class="badge badge-primary text-xs font-mono">PostgreSQL Ready</span>
          </div>

          <!-- Formula Diagram -->
          <div class="db-formula-banner mb-3">
            <div class="flex items-center gap-1.5 font-bold text-primary mb-1">
              ${getIcon('info', 16)} Relasi 6 Tabel Sesuai table.md:
            </div>
            <div class="text-secondary leading-relaxed font-mono text-[11px]">
              • <strong>CATEGORIES</strong> ||--o{ <strong>ADDITIVES</strong> : "memiliki 1 ke banyak katalog"<br/>
              • <strong>PRODUCTS</strong> ||--o{ <strong>PRODUCT_ADDITIVES</strong> }o--|| <strong>ADDITIVES</strong> : "relasi M:N produk dan BTP"<br/>
              • <strong>USERS</strong> ||--o{ <strong>SCAN_HISTORIES</strong> }o--|| <strong>PRODUCTS</strong> : "merekam log pemindaian"
            </div>
          </div>

          <div class="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-border-light text-xs">
            <span class="font-semibold text-text-primary">Teknologi Terintegrasi:</span>
            <div class="flex flex-wrap gap-1.5">
              <span class="badge badge-neutral font-semibold">⚡ Next.js Ready</span>
              <span class="badge badge-neutral font-semibold">🐘 Supabase PostgreSQL</span>
              <span class="badge badge-neutral font-semibold">📷 html5-qrcode</span>
              <span class="badge badge-neutral font-semibold">🎨 Modern CSS Modular</span>
            </div>
          </div>
        </div>

        <!-- 6 Entity Cards Grid -->
        <div class="entity-card-grid">
          <!-- 1. CATEGORIES -->
          <div class="entity-box">
            <div class="entity-box-header">
              <span class="entity-box-title">1. CATEGORIES</span>
              <span class="badge badge-primary text-[10px]">Master</span>
            </div>
            <p class="entity-box-desc">Golongan fungsi BTP sesuai regulasi BPOM No. 11/2019.</p>
            <table class="entity-fields-table">
              <tr>
                <td><span class="field-pk">id (PK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span>name</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>description</span></td>
                <td class="field-type">TEXT</td>
              </tr>
              <tr>
                <td><span>icon_url</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
            </table>
          </div>

          <!-- 2. ADDITIVES -->
          <div class="entity-box">
            <div class="entity-box-header">
              <span class="entity-box-title">2. ADDITIVES</span>
              <span class="badge badge-primary text-[10px]">Katalog BTP</span>
            </div>
            <p class="entity-box-desc">Katalog profil bahan tambahan pangan resmi dan batas aman.</p>
            <table class="entity-fields-table">
              <tr>
                <td><span class="field-pk">id (PK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span class="field-fk">category_id (FK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span>name, ins_e_code</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>tech_function</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>safety_boundary</span></td>
                <td class="field-type">TEXT</td>
              </tr>
            </table>
          </div>

          <!-- 3. PRODUCTS -->
          <div class="entity-box">
            <div class="entity-box-header">
              <span class="entity-box-title">3. PRODUCTS</span>
              <span class="badge badge-primary text-[10px]">Produk Fisik</span>
            </div>
            <p class="entity-box-desc">Data produk kemasan beredar (barcode, merek, & komposisi).</p>
            <table class="entity-fields-table">
              <tr>
                <td><span class="field-pk">id (PK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span class="field-pk">barcode (UK)</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>name, brand</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>category, image_url</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>raw_ingredients</span></td>
                <td class="field-type">TEXT</td>
              </tr>
            </table>
          </div>

          <!-- 4. PRODUCT_ADDITIVES -->
          <div class="entity-box">
            <div class="entity-box-header">
              <span class="entity-box-title">4. PRODUCT_ADDITIVES</span>
              <span class="badge badge-primary text-[10px]">Junction M:N</span>
            </div>
            <p class="entity-box-desc">Relasi Many-to-Many antara Produk dan BTP yang terkandung.</p>
            <table class="entity-fields-table">
              <tr>
                <td><span class="field-pk">id (PK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span class="field-fk">product_id (FK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span class="field-fk">additive_id (FK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span>detected_via</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
            </table>
          </div>

          <!-- 5. USERS -->
          <div class="entity-box">
            <div class="entity-box-header">
              <span class="entity-box-title">5. USERS</span>
              <span class="badge badge-primary text-[10px]">Sesi User</span>
            </div>
            <p class="entity-box-desc">Identitas sesi pengguna anonim untuk tracking riwayat.</p>
            <table class="entity-fields-table">
              <tr>
                <td><span class="field-pk">id (PK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span class="field-pk">session_uuid (UK)</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>user_agent</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>created_at</span></td>
                <td class="field-type">TIMESTAMP</td>
              </tr>
            </table>
          </div>

          <!-- 6. SCAN_HISTORIES -->
          <div class="entity-box">
            <div class="entity-box-header">
              <span class="entity-box-title">6. SCAN_HISTORIES</span>
              <span class="badge badge-primary text-[10px]">Log Riwayat</span>
            </div>
            <p class="entity-box-desc">Merekam riwayat pemindaian barcode & analisis foto label.</p>
            <table class="entity-fields-table">
              <tr>
                <td><span class="field-pk">id (PK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span class="field-fk">user_id (FK)</span></td>
                <td class="field-type">INT</td>
              </tr>
              <tr>
                <td><span class="field-fk">product_id (FK)</span></td>
                <td class="field-type">INT?</td>
              </tr>
              <tr>
                <td><span>scan_method</span></td>
                <td class="field-type">VARCHAR</td>
              </tr>
              <tr>
                <td><span>scanned_barcode</span></td>
                <td class="field-type">VARCHAR?</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // Setup Tab Switching Logic
  const tabButtons = container.querySelectorAll('.profile-tab-btn');
  const tabPanes = {
    'account': container.querySelector('#pane-account'),
    'regulations': container.querySelector('#pane-regulations'),
    'database': container.querySelector('#pane-database')
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update pane active state
      Object.entries(tabPanes).forEach(([tabKey, paneEl]) => {
        if (paneEl) {
          if (tabKey === targetTab) {
            paneEl.classList.add('active');
          } else {
            paneEl.classList.remove('active');
          }
        }
      });
    });
  });

  // Action Buttons
  // 1. Back button
  container.querySelector('#profile-back-btn')?.addEventListener('click', () => {
    navigateTo('home');
  });

  // 2. Start Scan button
  container.querySelector('#profile-start-scan-btn')?.addEventListener('click', () => {
    navigateTo('scanner');
  });

  // 3. Open Glossary button from Regulations tab
  container.querySelector('#reg-open-glossary-btn')?.addEventListener('click', () => {
    navigateTo('education');
  });

  // 4. Replay Onboarding
  container.querySelector('#profile-repeat-onboarding-btn')?.addEventListener('click', () => {
    StorageService.setOnboardingSeen(false);
    navigateTo('onboarding');
  });

  // 5. Reset Demo
  container.querySelector('#profile-reset-demo-btn')?.addEventListener('click', () => {
    openConfirmModal({
      title: 'Reset Semua Data Demo?',
      message: 'Riwayat pemindaian dan preferensi aplikasi akan dikembalikan ke kondisi awal demonstrasi.',
      confirmText: 'Reset Data',
      confirmVariant: 'danger',
      onConfirm: () => {
        localStorage.clear();
        showToast('Data aplikasi berhasil direset!', 'success', 2000);
        setTimeout(() => navigateTo('home'), 500);
      }
    });
  });

  return container;
}
