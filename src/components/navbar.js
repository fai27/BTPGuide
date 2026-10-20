// Komponen Desktop Navbar, Mobile Bottom Nav, dan Web Footer
import { getIcon, getBrandLogo } from './icons.js';

export function createDesktopNavbar(currentScreen, navigateTo) {
  const nav = document.createElement('header');
  nav.className = 'desktop-navbar';

  const navLinks = [
    { id: 'home', label: 'Beranda', icon: 'home' },
    { id: 'scanner', label: 'Scan Barcode', icon: 'barcode' },
    { id: 'composition', label: 'Foto Komposisi', icon: 'camera' },
    { id: 'education', label: 'Ensiklopedia BTP', icon: 'book-open' },
    { id: 'history', label: 'Riwayat', icon: 'history' },
    { id: 'profile', label: 'Profil', icon: 'user' }
  ];

  nav.innerHTML = `
    <div class="web-container">
      <div class="desktop-navbar-inner">
        <!-- Brand / Logo (BTPGuide di pojok kiri navbar) -->
        <div class="brand-link" id="nav-brand-click">
          <div class="brand-logo-badge" title="BTPGuide Logo">
            ${getBrandLogo(24, '', '#FFFFFF')}
          </div>
          <div class="brand-text-col">
            <span class="brand-title">BTPGuide</span>
            <span class="brand-slogan">Panduan Cerdas Bahan Tambahan Pangan</span>
          </div>
        </div>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav-links">
          ${navLinks.map(link => `
            <button 
              type="button" 
              class="desktop-nav-link ${currentScreen === link.id ? 'active' : ''}" 
              data-target="${link.id}"
            >
              ${getIcon(link.icon, 16)}
              <span>${link.label}</span>
            </button>
          `).join('')}

          <button type="button" class="desktop-nav-link desktop-nav-cta" data-target="scanner">
            ${getIcon('barcode', 16, '', '#FFFFFF')}
            <span>Scan Sekarang</span>
          </button>
        </nav>

        <!-- Right Side Shortcut (Mobile & Quick Action) -->
        <div class="navbar-right-actions">
          <button class="header-action-btn" id="navbar-quick-scan-btn" title="Scan Barcode">
            ${getIcon('barcode', 18)}
          </button>
          <button class="header-action-btn" id="navbar-quick-profile-btn" title="Profil & Info">
            ${getIcon('user', 18)}
          </button>
        </div>
      </div>
    </div>
  `;

  // Brand click
  nav.querySelector('#nav-brand-click').addEventListener('click', () => navigateTo('home'));

  // Nav links click
  nav.querySelectorAll('.desktop-nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      navigateTo(target);
    });
  });

  // Mobile quick actions
  nav.querySelector('#navbar-quick-scan-btn').addEventListener('click', () => navigateTo('scanner'));
  nav.querySelector('#navbar-quick-profile-btn').addEventListener('click', () => navigateTo('profile'));

  return nav;
}

export function createBottomNavigation(currentScreen, navigateTo) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';

  const items = [
    { id: 'home', label: 'Beranda', icon: 'home' },
    { id: 'education', label: 'Edukasi', icon: 'book-open' },
    { id: 'scanner', label: 'Scan', icon: 'barcode', isCenter: true },
    { id: 'history', label: 'Riwayat', icon: 'history' },
    { id: 'profile', label: 'Profil', icon: 'user' }
  ];

  nav.innerHTML = items.map(item => {
    if (item.isCenter) {
      return `
        <button class="nav-item nav-item-scan ${currentScreen === 'scanner' ? 'active' : ''}" data-nav="scanner" aria-label="Mulai Scan">
          <div class="scan-button-bubble">
            ${getIcon('barcode', 26, '', '#FFFFFF')}
          </div>
          <span>Scan</span>
        </button>
      `;
    }

    const isActive = currentScreen === item.id;
    return `
      <button class="nav-item ${isActive ? 'active' : ''}" data-nav="${item.id}" aria-label="${item.label}">
        <span class="nav-icon">${getIcon(item.icon, 20)}</span>
        <span>${item.label}</span>
      </button>
    `;
  }).join('');

  nav.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.nav;
      navigateTo(target);
    });
  });

  return nav;
}

export function createWebFooter(navigateTo) {
  const footer = document.createElement('footer');
  footer.className = 'web-footer';

  footer.innerHTML = `
    <div class="web-container">
      <div class="footer-grid">
        <div class="footer-col-brand">
          <div class="flex items-center gap-2 mb-3">
            <span class="brand-logo-badge" style="width: 34px; height: 34px;" title="BTPGuide Logo">
              ${getBrandLogo(20, '', '#FFFFFF')}
            </span>
            <span class="text-lg font-extrabold text-white">BTPGuide</span>
          </div>
          <p>
            Platform edukasi kesehatan berbasis web untuk mengenali dan memahami Bahan Tambahan Pangan (BTP) pada produk makanan & minuman kemasan secara objektif, ilmiah, dan transparan.
          </p>
          <p class="text-xs text-muted mt-3">
            Landasan Regulasi: Peraturan BPOM RI No. 11 Tahun 2019 & Codex STAN 192-1995.
          </p>
        </div>

        <div>
          <h4 class="footer-col-title">Navigasi Utama</h4>
          <ul class="footer-links">
            <li><button class="footer-link-btn" data-target="home">Beranda Platform</button></li>
            <li><button class="footer-link-btn" data-target="scanner">Pemindai Barcode (EAN-13)</button></li>
            <li><button class="footer-link-btn" data-target="composition">Foto & OCR Komposisi</button></li>
            <li><button class="footer-link-btn" data-target="education">Ensiklopedia & Kamus BTP</button></li>
            <li><button class="footer-link-btn" data-target="history">Riwayat Pemindaian</button></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Database & Arsitektur</h4>
          <ul class="footer-links">
            <li><button class="footer-link-btn" data-target="profile">Arsitektur Supabase & Next.js</button></li>
            <li><button class="footer-link-btn" data-target="education">Mitos vs Fakta BTP</button></li>
            <li><button class="footer-link-btn" data-target="onboarding">Panduan Awal Aplikasi</button></li>
            <li><a href="https://pom.go.id" target="_blank" rel="noopener" class="footer-link-btn" style="display: flex; align-items: center; gap: 4px;">Portal Resmi BPOM RI ${getIcon('external-link', 12)}</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom-row">
        <span>© 2024–2025 BTPGuide • Purwarupa Akademik Edukasi Pangan Terbuka</span>
        <span>Informasi bersifat edukatif untuk literasi label makanan masyarakat.</span>
      </div>
    </div>
  `;

  footer.querySelectorAll('.footer-link-btn[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      navigateTo(target);
    });
  });

  return footer;
}
