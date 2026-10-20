// Layar J: Education / Belajar BTP Screen
import { getIcon } from '../components/icons.js';
import { BTP_CATEGORIES } from '../data/categories.js';
import { BTP_MYTHS } from '../data/myths.js';
import { BTP_ADDITIVES, searchAdditives } from '../data/additives.js';

export function renderEducationScreen(navigateTo, data = {}) {
  const container = document.createElement('div');
  container.className = 'edu-screen';

  let selectedCategoryFilter = data.categoryId || 'all';

  container.innerHTML = `
    <!-- Header -->
    <div>
      <h2 class="text-xl font-bold">Pusat Edukasi BTP</h2>
      <p class="text-xs text-secondary">Pahami fungsi teknologi dan sains keamanan pangan secara objektif</p>
    </div>

    <!-- Search in Glossary -->
    <div class="search-container">
      <span class="search-icon-pos">${getIcon('search', 18)}</span>
      <input 
        type="text" 
        class="search-input" 
        id="edu-search-input" 
        placeholder="Cari BTP (contoh: MSG, Tartrazin, E211, Aspartam)..." 
      />
    </div>

    <!-- Mitos atau Fakta Interactive Grid -->
    <section>
      <div class="section-header">
        <div>
          <h3 class="section-title">Mitos atau Fakta Pangan</h3>
          <p class="text-xs text-secondary mt-0.5">Uji pemahamanmu seputar isu bahan pangan populer</p>
        </div>
        <span class="badge badge-warning text-xs">Klik Kartu untuk Buka Fakta</span>
      </div>

      <div class="glossary-desktop-grid" id="myths-list-container">
        ${BTP_MYTHS.map(myth => `
          <div class="myth-card" data-myth-id="${myth.id}">
            <div class="flex items-center justify-between mb-1">
              <span class="myth-badge ${myth.isFact ? 'badge-primary' : 'badge-danger'}">
                ${myth.verdict}
              </span>
              <span class="text-xs text-muted flex items-center gap-1">
                ${getIcon('eye', 14)} Buka Fakta
              </span>
            </div>

            <p class="myth-statement">"${myth.statement}"</p>

            <div class="myth-reveal-body">
              <p class="text-xs text-primary font-medium leading-relaxed">${myth.explanation}</p>
              <div class="mt-2 p-2 bg-surface-alt rounded text-xs text-secondary">
                💡 <strong>Rekomendasi:</strong> ${myth.recommendation}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Kategori Fungsi Teknologi BTP -->
    <section>
      <div class="section-header">
        <div>
          <h3 class="section-title">Kategori Golongan BTP (BPOM)</h3>
          <p class="text-xs text-secondary mt-0.5">7 Golongan fungsi teknologi pangan utama</p>
        </div>
        <span class="text-xs text-muted">Berdasarkan BPOM No. 11/2019</span>
      </div>

      <div class="category-grid">
        ${BTP_CATEGORIES.map(cat => `
          <div class="category-card" data-cat-id="${cat.id}">
            <div class="category-icon-wrapper" style="background-color: ${cat.bgColor}; color: ${cat.color};">
              ${getIcon(cat.icon, 20, '', cat.color)}
            </div>
            <h4 class="category-name">${cat.name}</h4>
            <p class="category-summary">${cat.summary}</p>
            <div class="mt-auto pt-2 flex items-center justify-between">
              <span class="text-xs font-bold" style="color: ${cat.color};">Pelajari</span>
              <span style="color: ${cat.color};">${getIcon('chevron-right', 14)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Kamus Lengkap BTP -->
    <section>
      <div class="section-header">
        <div>
          <h3 class="section-title">Kamus Bahan Tambahan Pangan</h3>
          <p class="text-xs text-secondary mt-0.5">Daftar BTP resmi dengan nomor INS/E, golongan teknologi, dan evaluasi keamanan BPOM</p>
        </div>
        <span class="badge badge-primary text-xs" id="glossary-count-badge">${BTP_ADDITIVES.length} Bahan</span>
      </div>

      <!-- Quick Category Filter Chips -->
      <div class="glossary-filter-bar" id="glossary-filter-chips">
        <button type="button" class="glossary-chip active" data-cat="all">Semua (${BTP_ADDITIVES.length})</button>
        ${BTP_CATEGORIES.map(cat => {
          const count = BTP_ADDITIVES.filter(a => a.categoryId === cat.id || a.function.toLowerCase().includes(cat.name.toLowerCase())).length;
          return `
            <button type="button" class="glossary-chip" data-cat="${cat.id}">
              <span class="btp-category-dot" style="background-color: ${cat.color};"></span>
              <span>${cat.name}</span>
              ${count > 0 ? `<span class="text-muted text-[11px]">(${count})</span>` : ''}
            </button>
          `;
        }).join('')}
      </div>

      <div class="glossary-desktop-grid" id="glossary-items-container">
        <!-- Rendered by function below -->
      </div>
    </section>
  `;

  // Myth card reveal toggle
  container.querySelectorAll('.myth-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('revealed');
    });
  });

  // Render Glossary items
  const glossaryContainer = container.querySelector('#glossary-items-container');
  const glossaryCountBadge = container.querySelector('#glossary-count-badge');
  const searchInput = container.querySelector('#edu-search-input');

  let activeCategory = 'all';
  let activeQuery = '';

  function renderGlossary() {
    let items = BTP_ADDITIVES;

    // Filter by Category
    if (activeCategory !== 'all') {
      const catObj = BTP_CATEGORIES.find(c => c.id === activeCategory);
      const catName = catObj ? catObj.name.toLowerCase() : '';
      items = items.filter(a => a.categoryId === activeCategory || a.function.toLowerCase().includes(catName));
    }

    // Filter by Search Query
    if (activeQuery) {
      const q = activeQuery.toLowerCase();
      items = items.filter(a => 
        a.name.toLowerCase().includes(q) ||
        a.insOrECode.toLowerCase().includes(q) ||
        a.function.toLowerCase().includes(q) ||
        (a.searchKeywords && a.searchKeywords.some(k => k.toLowerCase().includes(q)))
      );
    }

    glossaryCountBadge.textContent = `${items.length} Bahan`;

    if (items.length === 0) {
      glossaryContainer.innerHTML = `
        <div class="empty-state p-8 card text-center" style="grid-column: 1 / -1;">
          <span class="empty-state-icon">${getIcon('search', 32)}</span>
          <h4 class="font-bold text-sm mt-2">Bahan Tidak Ditemukan</h4>
          <p class="text-xs text-secondary mt-1">Tidak ada BTP yang cocok dengan kata kunci "${escapeHtml(activeQuery)}".</p>
          <button class="btn btn-outline btn-sm mt-3" id="reset-glossary-filter-btn">
            Tampilkan Semua Bahan
          </button>
        </div>
      `;
      glossaryContainer.querySelector('#reset-glossary-filter-btn')?.addEventListener('click', () => {
        activeCategory = 'all';
        activeQuery = '';
        searchInput.value = '';
        container.querySelectorAll('.glossary-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === 'all'));
        renderGlossary();
      });
      return;
    }

    glossaryContainer.innerHTML = items.map(add => {
      const catInfo = BTP_CATEGORIES.find(c => c.id === add.categoryId) || { color: '#176B45', name: add.function };
      const safeSummary = add.safetyContext ? add.safetyContext.split('.')[0] : 'Sesuai regulasi BPOM No. 11/2019';

      return `
        <div class="btp-glossary-card" data-additive-id="${add.id}">
          <div class="btp-card-header">
            <h4 class="btp-card-title">${add.name}</h4>
            <span class="btp-ins-pill">${add.insOrECode}</span>
          </div>

          <div class="btp-card-function-row">
            <span class="btp-category-dot" style="background-color: ${catInfo.color || '#176B45'};"></span>
            <span>${add.function}</span>
          </div>

          <div class="btp-card-footer">
            <span class="btp-card-safe" title="${safeSummary}">
              ${safeSummary}
            </span>
            <span class="btp-card-arrow" title="Buka Detail">
              ${getIcon('chevron-right', 16)}
            </span>
          </div>
        </div>
      `;
    }).join('');

    glossaryContainer.querySelectorAll('.btp-glossary-card').forEach(item => {
      item.addEventListener('click', () => {
        const aid = item.dataset.additiveId;
        navigateTo('additive-detail', { additiveId: aid });
      });
    });
  }

  // Live Glossary Search
  searchInput.addEventListener('input', (e) => {
    activeQuery = e.target.value.trim();
    renderGlossary();
  });

  // Filter chips click
  container.querySelectorAll('.glossary-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.glossary-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.cat;
      renderGlossary();
    });
  });

  // Category card click filters glossary
  container.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.dataset.catId;
      activeCategory = catId;
      container.querySelectorAll('.glossary-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.cat === catId);
      });
      renderGlossary();
      glossaryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Initial render
  setTimeout(() => renderGlossary(), 0);

  return container;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}
