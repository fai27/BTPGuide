// Layar B: Home Dashboard
import { getIcon } from '../components/icons.js';
import { SAMPLE_PRODUCTS, searchProducts } from '../data/products.js';
import { BTP_CATEGORIES } from '../data/categories.js';
import { StorageService } from '../services/storage.js';

export function renderHomeScreen(navigateTo) {
  const container = document.createElement('div');
  container.className = 'home-screen';

  const history = StorageService.getHistory();
  const totalScanned = history.length;
  const uniqueProducts = new Set(history.map(h => h.name)).size;

  // 12 Produk Populer untuk grid responsif yang terisi penuh (2x6 atau 3x4 atau 4x3)
  const popularProducts = SAMPLE_PRODUCTS.slice(0, 12);

  container.innerHTML = `
    <!-- Top Hero Section (Desktop 2-column split) -->
    <div class="home-hero-split">
      <div class="flex flex-col justify-between gap-4">
        <div>
          <span class="greeting-sub">Halo, selamat datang! 👋</span>
          <h1 class="text-2xl lg:text-3xl font-extrabold text-primary mt-1 mb-2">
            Kenali Isi Makananmu, Pilih dengan Lebih Bijak
          </h1>
          <p class="text-secondary text-sm leading-relaxed max-w-xl">
            Periksa Bahan Tambahan Pangan (BTP) pada makanan & minuman kemasan dengan pemindaian barcode atau foto label komposisi sesuai standar BPOM RI.
          </p>
        </div>

        <!-- Search Input -->
        <div class="search-container mt-1">
          <span class="search-icon-pos">${getIcon('search', 20)}</span>
          <input 
            type="text" 
            class="search-input" 
            id="home-search-input" 
            placeholder="Ketik nama produk (misal: Indomie, Oreo, Chitato) atau nomor barcode..."
          />
          <div id="home-search-results" class="search-results-dropdown" style="display: none;"></div>
        </div>

        <!-- Activity Summary Counters -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">${totalScanned}</div>
            <div class="stat-label">Pernah Dipindai</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">30+</div>
            <div class="stat-label">Sampel Produk</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">29</div>
            <div class="stat-label">Basis Data BTP</div>
          </div>
          <div class="stat-card">
            <div class="stat-number text-primary font-bold">BPOM</div>
            <div class="stat-label">No. 11/2019</div>
          </div>
        </div>
      </div>

      <!-- Big Scanner Hero Card -->
      <div class="scan-hero-card">
        <div class="scan-hero-decor"></div>
        
        <div class="scan-hero-icon-bubble">
          ${getIcon('barcode', 28, '', '#FFFFFF')}
        </div>

        <h3 class="scan-hero-title">Pindai & Cek Produk</h3>
        <p class="scan-hero-desc">
          Arahkan kamera ke barcode kemasan atau potret tabel komposisi di bagian belakang untuk deteksi BTP instan.
        </p>

        <div class="scan-hero-actions">
          <button class="btn btn-white" id="home-start-scan-btn">
            ${getIcon('barcode', 20, '', '#176B45')} Mulai Scan Barcode
          </button>
          <button class="btn btn-white-outline" id="home-start-composition-btn">
            ${getIcon('camera', 18, '', '#FFFFFF')} Foto Komposisi
          </button>
        </div>
      </div>
    </div>

    <!-- Produk Populer -->
    <section class="mt-8">
      <div class="section-header">
        <div>
          <h3 class="section-title">Produk Populer Terdaftar</h3>
          <p class="text-xs text-secondary mt-0.5">Sampel produk kemasan beredar di Indonesia yang siap diuji</p>
        </div>
        <span class="section-more-link" id="view-all-products-btn">
          Lihat Semua ${getIcon('chevron-right', 16)}
        </span>
      </div>

      <div class="products-scroll-grid" id="popular-products-list">
        ${popularProducts.map(p => `
          <div class="product-mini-card" data-product-id="${p.id}">
            <div class="product-mini-img-wrap">
              <img src="${p.image}" alt="${p.name}" class="product-mini-img" loading="lazy" />
              <span class="badge ${p.additives.length > 0 ? 'badge-primary' : 'badge-neutral'} product-mini-badge">
                ${p.additives.length} BTP
              </span>
            </div>
            <div class="product-mini-info">
              <span class="product-mini-brand">${p.brand.split('(')[0].trim()}</span>
              <h4 class="product-mini-name">${p.name}</h4>
              <div class="product-mini-footer">
                <span>${p.category}</span>
                <span>${getIcon('chevron-right', 14)}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Belajar BTP (Functional Categories) -->
    <section>
      <div class="section-header">
        <h3 class="section-title">Belajar BTP</h3>
        <span class="section-more-link" id="home-view-edu-btn">
          Kamus & Kategori ${getIcon('chevron-right', 16)}
        </span>
      </div>

      <div class="category-pills-row">
        ${BTP_CATEGORIES.map(c => `
          <div class="category-pill-card" data-category-id="${c.id}">
            <span style="color: ${c.color}; display: flex;">
              ${getIcon(c.icon, 18, '', c.color)}
            </span>
            <span class="text-sm font-semibold">${c.name}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  // Event Listeners
  container.querySelector('#home-profile-btn')?.addEventListener('click', () => navigateTo('profile'));
  container.querySelector('#home-start-scan-btn')?.addEventListener('click', () => navigateTo('scanner'));
  container.querySelector('#home-start-composition-btn')?.addEventListener('click', () => navigateTo('composition'));
  container.querySelector('#home-view-edu-btn')?.addEventListener('click', () => navigateTo('education'));
  container.querySelector('#view-all-products-btn')?.addEventListener('click', () => {
    // Focus search input
    const input = container.querySelector('#home-search-input');
    input?.focus();
    input?.scrollIntoView({ behavior: 'smooth' });
  });

  // Product cards click
  container.querySelectorAll('.product-mini-card').forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.dataset.productId;
      navigateTo('product-detail', { productId: pid });
    });
  });

  // Category pills click
  container.querySelectorAll('.category-pill-card').forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.dataset.categoryId;
      navigateTo('education', { categoryId: catId });
    });
  });

  // Live Search
  const searchInput = container.querySelector('#home-search-input');
  const searchResults = container.querySelector('#home-search-results');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (!query) {
      searchResults.style.display = 'none';
      return;
    }

    const matches = searchProducts(query);
    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div class="search-item-empty">
          <p class="text-sm text-secondary">Tidak ditemukan produk dengan kata kunci "<strong>${escapeHtml(query)}</strong>"</p>
          <button class="btn btn-sm btn-outline mt-2" id="search-notfound-fallback">
            Cek Barcode atau Foto Komposisi
          </button>
        </div>
      `;
      searchResults.style.display = 'block';
      searchResults.querySelector('#search-notfound-fallback')?.addEventListener('click', () => {
        navigateTo('not-found', { scannedBarcode: query });
      });
      return;
    }

    searchResults.innerHTML = matches.slice(0, 6).map(p => `
      <div class="search-result-item" data-product-id="${p.id}">
        <img src="${p.image}" class="search-result-thumb" alt="${p.name}" />
        <div class="search-result-text">
          <div class="search-result-title">${p.name}</div>
          <div class="search-result-sub">${p.brand} • <span class="font-mono">${p.barcode}</span></div>
        </div>
        <span class="badge badge-primary text-xs">${p.additives.length} BTP</span>
      </div>
    `).join('');

    searchResults.style.display = 'block';

    searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const pid = item.dataset.productId;
        navigateTo('product-detail', { productId: pid });
      });
    });
  });

  return container;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}
