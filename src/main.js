// Aplikasi Utama KenaliBTP - State, Routing, dan Render Shell
import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/screens.css';

import { createDesktopNavbar, createBottomNavigation, createWebFooter } from './components/navbar.js';
import { getIcon } from './components/icons.js';
import { StorageService } from './services/storage.js';

// Screens
import { renderOnboardingScreen } from './screens/onboarding.js';
import { renderHomeScreen } from './screens/home.js';
import { renderScannerScreen } from './screens/scanner.js';
import { renderNotFoundScreen } from './screens/notFound.js';
import { renderCompositionScreen } from './screens/composition.js';
import { renderOcrAnalysisScreen } from './screens/ocrAnalysis.js';
import { renderProductDetailScreen } from './screens/productDetail.js';
import { renderAdditiveDetailScreen } from './screens/additiveDetail.js';
import { renderHistoryScreen } from './screens/history.js';
import { renderEducationScreen } from './screens/education.js';
import { renderProfileScreen } from './screens/profile.js';

class KenaliBTPApp {
  constructor() {
    this.currentScreen = 'home';
    this.screenData = {};
    this.init();
  }

  init() {
    const hasSeen = StorageService.hasSeenOnboarding();
    // Jika belum pernah lihat onboarding, tampilkan onboarding
    this.currentScreen = hasSeen ? 'home' : 'onboarding';

    this.renderShell();
    this.renderCurrentScreen();

    // Listen to browser popstate for back button
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.screen) {
        this.navigateTo(e.state.screen, e.state.data, false);
      }
    });
  }

  navigateTo(screenName, data = {}, pushHistory = true) {
    this.currentScreen = screenName;
    this.screenData = data;

    if (pushHistory) {
      window.history.pushState({ screen: screenName, data }, '', `#${screenName}`);
    }

    this.renderShell();
    this.renderCurrentScreen();

    // Scroll to top of main content
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const content = document.getElementById('main-content-scroll');
    if (content) content.scrollTop = 0;
  }

  renderShell() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'app-wrapper';

    const navigate = (s, d) => this.navigateTo(s, d);

    // Desktop & Tablet Navigation Bar
    const navbar = createDesktopNavbar(this.currentScreen, navigate);
    wrapper.appendChild(navbar);

    // Main Web Container
    const main = document.createElement('main');
    main.className = 'main-content';

    const container = document.createElement('div');
    container.id = 'main-content-scroll';
    container.className = 'web-container';
    main.appendChild(container);

    wrapper.appendChild(main);

    // Mobile Bottom Navigation (shown only on mobile screens via CSS)
    if (this.currentScreen !== 'onboarding') {
      const bottomNav = createBottomNavigation(this.currentScreen, navigate);
      wrapper.appendChild(bottomNav);
    }

    // Professional Web Footer (shown on all pages except fullscreen scanner)
    if (this.currentScreen !== 'scanner' && this.currentScreen !== 'onboarding') {
      const footer = createWebFooter(navigate);
      wrapper.appendChild(footer);
    }

    app.appendChild(wrapper);
  }

  renderCurrentScreen() {
    const mainContent = document.getElementById('main-content-scroll');
    if (!mainContent) return;

    mainContent.innerHTML = '';
    let screenElement = null;

    const navigate = (s, d) => this.navigateTo(s, d);

    switch (this.currentScreen) {
      case 'onboarding':
        screenElement = renderOnboardingScreen(navigate);
        break;
      case 'home':
        screenElement = renderHomeScreen(navigate);
        break;
      case 'scanner':
        screenElement = renderScannerScreen(navigate);
        break;
      case 'not-found':
        screenElement = renderNotFoundScreen(navigate, this.screenData);
        break;
      case 'composition':
        screenElement = renderCompositionScreen(navigate, this.screenData);
        break;
      case 'ocr-analysis':
        screenElement = renderOcrAnalysisScreen(navigate, this.screenData);
        break;
      case 'product-detail':
        screenElement = renderProductDetailScreen(navigate, this.screenData);
        break;
      case 'additive-detail':
        screenElement = renderAdditiveDetailScreen(navigate, this.screenData);
        break;
      case 'history':
        screenElement = renderHistoryScreen(navigate);
        break;
      case 'education':
        screenElement = renderEducationScreen(navigate, this.screenData);
        break;
      case 'profile':
        screenElement = renderProfileScreen(navigate);
        break;
      default:
        screenElement = renderHomeScreen(navigate);
    }

    if (screenElement) {
      mainContent.appendChild(screenElement);
    }
  }
}

// Inisialisasi Aplikasi
function initKenaliApp() {
  if (!window.kenaliApp) {
    try {
      window.kenaliApp = new KenaliBTPApp();
    } catch (err) {
      console.error('Gagal menginisialisasi KenaliBTP:', err);
      const app = document.getElementById('app');
      if (app) {
        app.innerHTML = `
          <div style="padding: 32px 20px; text-align: center; font-family: system-ui, sans-serif;">
            <h2 style="color: #D9534F; font-size: 1.25rem; font-weight: 700;">Terjadi Kendala Memuat Aplikasi</h2>
            <p style="color: #66736A; margin: 12px 0; font-size: 0.9rem;">${err.message || 'Silakan muat ulang halaman.'}</p>
            <button onclick="location.reload()" style="background: #176B45; color: #fff; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
              Muat Ulang Halaman
            </button>
          </div>
        `;
      }
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKenaliApp);
} else {
  initKenaliApp();
}

