// Layar H: BTP Education Detail Screen (Profil Lengkap 1 BTP)
import { getIcon, getBrandLogo } from '../components/icons.js';
import { getAdditiveById, searchAdditives } from '../data/additives.js';

export function renderAdditiveDetailScreen(navigateTo, data = {}) {
  const container = document.createElement('div');
  container.className = 'edu-screen';

  const additiveId = data.additiveId || 'mononatrium-glutamat';
  const additive = getAdditiveById(additiveId) || getAdditiveById('mononatrium-glutamat');

  container.innerHTML = `
    <!-- Screen Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button class="header-action-btn" id="additive-back-btn" aria-label="Kembali">
          ${getIcon('arrow-left', 20)}
        </button>
        <div>
          <h2 class="text-base font-bold">Ensiklopedia BTP</h2>
          <p class="text-xs text-secondary">Profil Ilmiah & Edukasi Bahan</p>
        </div>
      </div>
      <button class="header-action-btn" id="additive-search-toggle-btn" title="Cari BTP Lain">
        ${getIcon('search', 18)}
      </button>
    </div>

    <!-- Quick Search Dropdown Drawer -->
    <div id="additive-search-box" class="search-container" style="display: none;">
      <span class="search-icon-pos">${getIcon('search', 18)}</span>
      <input 
        type="text" 
        class="search-input" 
        id="additive-search-input" 
        placeholder="Cari BTP lain (misal: tartrazin, pengawet, INS 621)..." 
      />
      <div id="additive-search-results" class="search-results-dropdown" style="display: none;"></div>
    </div>

    <!-- Main Additive Card Hero -->
    <div class="card p-5">
      <div class="flex items-center justify-between mb-2">
        <span class="badge badge-primary font-mono text-xs">
          ${additive.insOrECode || 'BTP Resmi'}
        </span>
        <span class="badge badge-neutral text-xs">
          ${additive.function.split('(')[0].trim()}
        </span>
      </div>

      <h1 class="text-xl font-extrabold text-primary mb-1">${additive.name}</h1>
      
      ${additive.alternativeNames && additive.alternativeNames.length > 0 ? `
        <div class="flex flex-wrap gap-1 mt-2 mb-3">
          <span class="text-xs text-muted font-medium">Nama lain / label:</span>
          ${additive.alternativeNames.map(alt => `
            <span class="badge badge-neutral text-xs">${alt}</span>
          `).join('')}
        </div>
      ` : ''}

      <div class="p-3 bg-surface-alt rounded-lg text-sm text-secondary leading-relaxed mt-2" style="border-left: 3px solid var(--primary);">
        ${additive.explanation}
      </div>
    </div>

    <!-- Accordion Sections -->
    <div class="flex flex-col gap-3">
      <!-- Section 1: Alasan Penggunaan -->
      <div class="card additive-card open">
        <div class="additive-card-header">
          <span class="font-bold text-sm">Mengapa Digunakan Industri Pangan?</span>
          <span class="text-muted">${getIcon('chevron-up', 18)}</span>
        </div>
        <div class="additive-card-body" style="display: block;">
          <p class="text-sm text-secondary">${additive.whyUsed}</p>
        </div>
      </div>

      <!-- Section 2: Penilaian Keamanan & Standar BPOM -->
      <div class="card additive-card open">
        <div class="additive-card-header">
          <span class="font-bold text-sm">Evaluasi Keamanan & Batas Asupan (ADI)</span>
          <span class="text-muted">${getIcon('chevron-up', 18)}</span>
        </div>
        <div class="additive-card-body" style="display: block;">
          <p class="text-sm text-secondary">${additive.safetyContext}</p>
          <div class="notice-box notice-warning mt-3">
            <span class="notice-icon">${getIcon('alert-triangle', 18)}</span>
            <div class="notice-content text-xs">
              <strong>Prinsip Ilmiah Keamanan:</strong> Fungsi teknologi pangan berbeda dengan penilaian bahaya. Suatu bahan yang memiliki fungsi kimiawi tertentu tidak berarti otomatis menimbulkan penyakit jika digunakan dalam takaran batas aman harian.
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Contoh Pangan Umum -->
      <div class="card additive-card open">
        <div class="additive-card-header">
          <span class="font-bold text-sm">Contoh Kategori Pangan Pengguna</span>
          <span class="text-muted">${getIcon('chevron-up', 18)}</span>
        </div>
        <div class="additive-card-body" style="display: block;">
          <div class="flex flex-wrap gap-2">
            ${(additive.commonFoods || []).map(food => `
              <span class="badge badge-primary text-xs font-semibold">${food}</span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Section 4: Sumber Regulasi -->
      <div class="card additive-card">
        <div class="additive-card-header">
          <span class="font-bold text-sm">Sumber Regulasi & Referensi Ilmiah</span>
          <span class="text-muted">${getIcon('chevron-down', 18)}</span>
        </div>
        <div class="additive-card-body">
          <p class="text-xs text-secondary leading-relaxed">
            ${additive.referenceSource || 'Peraturan BPOM No. 11 Tahun 2019 tentang Bahan Tambahan Pangan'}
          </p>
          <p class="text-xs text-muted mt-2">
            Codex Alimentarius Commission (FAO/WHO) General Standard for Food Additives (GSFA) CXS 192-1995.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div class="flex gap-2 mt-2">
      <button class="btn btn-primary flex-1 btn-lg" id="additive-goto-edu-btn">
        ${getIcon('book-open', 18)} Buka Kamus BTP Lengkap
      </button>
    </div>
  `;

  // Search Toggle
  const searchBox = container.querySelector('#additive-search-box');
  const searchInput = container.querySelector('#additive-search-input');
  const searchResults = container.querySelector('#additive-search-results');

  container.querySelector('#additive-search-toggle-btn').addEventListener('click', () => {
    const isHidden = searchBox.style.display === 'none';
    searchBox.style.display = isHidden ? 'block' : 'none';
    if (isHidden) searchInput.focus();
  });

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (!q) {
      searchResults.style.display = 'none';
      return;
    }
    const matches = searchAdditives(q);
    if (matches.length === 0) {
      searchResults.innerHTML = `<div class="p-3 text-xs text-secondary">Tidak ada BTP cocok dengan "${escapeHtml(q)}"</div>`;
      searchResults.style.display = 'block';
      return;
    }

    searchResults.innerHTML = matches.slice(0, 5).map(m => `
      <div class="search-result-item" data-additive-id="${m.id}">
        <span class="brand-logo-badge" style="width: 28px; height: 28px;" title="BTPGuide">${getBrandLogo(16, '', '#FFF')}</span>
        <div class="search-result-text">
          <div class="search-result-title">${m.name}</div>
          <div class="search-result-sub">${m.insOrECode} • ${m.function}</div>
        </div>
      </div>
    `).join('');
    searchResults.style.display = 'block';

    searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const aid = item.dataset.additiveId;
        navigateTo('additive-detail', { additiveId: aid });
      });
    });
  });

  // Accordion Toggle
  container.querySelectorAll('.additive-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.additive-card');
      const body = card.querySelector('.additive-card-body');
      const arrow = header.querySelector('.text-muted');
      const isOpen = card.classList.contains('open');

      card.classList.toggle('open');
      body.style.display = isOpen ? 'none' : 'block';
      arrow.innerHTML = isOpen ? getIcon('chevron-down', 18) : getIcon('chevron-up', 18);
    });
  });

  // Navigations
  container.querySelector('#additive-back-btn').addEventListener('click', () => {
    navigateTo('education');
  });

  container.querySelector('#additive-goto-edu-btn').addEventListener('click', () => {
    navigateTo('education');
  });

  return container;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}
