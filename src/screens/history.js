// Layar I: Scan History Screen & Analisis Tren
import { getIcon } from '../components/icons.js';
import { StorageService } from '../services/storage.js';
import { ScanLogService } from '../services/api/scanLogService.js';
import { openConfirmModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export function renderHistoryScreen(navigateTo) {
  const container = document.createElement('div');
  container.className = 'history-screen';

  let currentFilter = 'all'; // 'all' | 'barcode' | 'composition'
  let searchQuery = '';

  function getFilteredHistory() {
    let items = StorageService.getHistory();
    if (currentFilter !== 'all') {
      items = items.filter(i => i.method === currentFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => {
        return (i.name && i.name.toLowerCase().includes(q)) ||
          (i.brand && i.brand.toLowerCase().includes(q)) ||
          (i.barcode && i.barcode.includes(q));
      });
    }
    return items;
  }

  async function renderTrendStats() {
    const statsContainer = container.querySelector('#history-trend-analytics');
    if (!statsContainer) return;

    try {
      const stats = await ScanLogService.getTrendStatistics();
      const allHistory = StorageService.getHistory();
      const totalCount = Math.max(stats.totalScans, allHistory.length);

      if (totalCount === 0) {
        statsContainer.innerHTML = '';
        return;
      }

      const barcodeRatio = totalCount > 0 ? Math.round(((stats.barcodeScans || allHistory.filter(h => h.method === 'barcode').length) / totalCount) * 100) : 0;
      const compRatio = 100 - barcodeRatio;

      statsContainer.innerHTML = `
        <div class="card p-4 bg-gradient-to-r from-primary-light/40 to-surface border border-primary/20">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="text-primary">${getIcon('trending-up', 20)}</span>
              <h3 class="font-bold text-sm text-text-primary">Analisis Tren Pemindaian</h3>
            </div>
            <span class="badge badge-primary text-xs">Riwayat Pindai (BaaS)</span>
          </div>

          <div class="grid grid-cols-3 gap-2 mb-3">
            <div class="p-2.5 bg-surface rounded-lg border border-border text-center">
              <div class="text-lg font-bold text-primary">${totalCount}</div>
              <div class="text-[11px] text-muted">Total Scan</div>
            </div>
            <div class="p-2.5 bg-surface rounded-lg border border-border text-center">
              <div class="text-lg font-bold text-text-primary">${barcodeRatio}%</div>
              <div class="text-[11px] text-muted">Barcode EAN</div>
            </div>
            <div class="p-2.5 bg-surface rounded-lg border border-border text-center">
              <div class="text-lg font-bold text-text-primary">${compRatio}%</div>
              <div class="text-[11px] text-muted">Foto Label</div>
            </div>
          </div>

          ${stats.topProducts && stats.topProducts.length > 0 ? `
            <div class="text-xs">
              <div class="font-medium text-secondary mb-1.5 flex items-center gap-1">
                ${getIcon('barcode', 13)} Produk Paling Sering Diperiksa:
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${stats.topProducts.map(p => `
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface border border-border text-xs text-text-primary">
                    <span>${p.name}</span>
                    <span class="badge badge-primary text-[10px] py-0 px-1 font-bold">${p.count}x</span>
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    } catch (e) {
      console.warn('Failed to render trend stats', e);
    }
  }

  function renderList() {
    const listContainer = container.querySelector('#history-items-list');
    const items = getFilteredHistory();

    if (items.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state card p-8">
          <span class="empty-state-icon">${getIcon('history', 36)}</span>
          <h4 class="font-bold text-base mt-2">Belum Ada Riwayat Pemindaian</h4>
          <p class="text-xs text-secondary max-w-xs">
            ${searchQuery || currentFilter !== 'all' ? 'Tidak ada riwayat yang cocok dengan filter pencarian.' : 'Pindai barcode atau foto label kemasan untuk mulai mengenali BTP.'}
          </p>
          ${!searchQuery && currentFilter === 'all' ? `
            <button class="btn btn-primary btn-sm mt-3" id="history-start-scan-btn">
              ${getIcon('barcode', 16)} Mulai Scan Sekarang
            </button>
          ` : ''}
        </div>
      `;

      listContainer.querySelector('#history-start-scan-btn')?.addEventListener('click', () => {
        navigateTo('scanner');
      });
      return;
    }

    listContainer.innerHTML = items.map(item => {
      const timeFormatted = formatTimeAgo(item.timestamp);
      const isBarcode = item.method === 'barcode';
      const isNotFound = !item.productId && item.status === 'perlu-verifikasi';

      return `
        <div class="history-item-card" data-history-id="${item.id}" data-product-id="${item.productId || ''}" data-barcode="${item.barcode || ''}">
          ${item.image ? `
            <img src="${item.image}" alt="${item.name}" class="history-thumb" />
          ` : `
            <div class="history-thumb" style="${isNotFound ? 'background: #FFF3E0; color: #E65100;' : ''}">
              ${getIcon(isBarcode ? 'barcode' : 'camera', 22)}
            </div>
          `}

          <div class="history-details">
            <h4 class="history-title">${item.name}</h4>
            <div class="history-meta">
              <span class="badge ${isBarcode ? 'badge-primary' : 'badge-neutral'} text-xs">
                ${isBarcode ? 'Barcode' : 'Foto Komposisi'}
              </span>
              <span>${timeFormatted}</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            ${item.additivesCount !== undefined && item.additivesCount > 0 ? `
              <span class="badge badge-primary text-xs font-bold">${item.additivesCount} BTP</span>
            ` : ''}
            <button class="btn-ghost delete-single-history-btn" data-history-id="${item.id}" title="Hapus" style="padding: 6px; border-radius: 50%;">
              ${getIcon('trash-2', 16, '', '#D9534F')}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Click item to view cached result
    listContainer.querySelectorAll('.history-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.delete-single-history-btn')) return;
        const pid = card.dataset.productId;
        const barcode = card.dataset.barcode;

        if (pid) {
          navigateTo('product-detail', { productId: pid });
        } else if (barcode) {
          navigateTo('not-found', { scannedBarcode: barcode });
        } else {
          navigateTo('composition');
        }
      });
    });

    // Single item delete
    listContainer.querySelectorAll('.delete-single-history-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const hid = btn.dataset.historyId;
        StorageService.deleteHistory(hid);
        showToast('Item riwayat dihapus', 'info', 1500);
        renderList();
        renderTrendStats();
      });
    });
  }

  container.innerHTML = `
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold">Riwayat Pemindaian</h2>
        <p class="text-xs text-secondary">Daftar produk yang pernah kamu periksa & analisis tren pemakaian</p>
      </div>
      <button class="header-action-btn" id="history-clear-all-btn" title="Hapus Semua Riwayat">
        ${getIcon('trash-2', 18)}
      </button>
    </div>

    <!-- Trend Analytics Widget (Riwayat Pindai & Tren) -->
    <div id="history-trend-analytics"></div>

    <!-- Search in History -->
    <div class="search-container">
      <span class="search-icon-pos">${getIcon('search', 18)}</span>
      <input 
        type="text" 
        class="search-input" 
        id="history-search-input" 
        placeholder="Cari dalam riwayat..." 
      />
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2">
      <button class="filter-tab active" data-filter="all">Semua</button>
      <button class="filter-tab" data-filter="barcode">Barcode</button>
      <button class="filter-tab" data-filter="composition">Foto Komposisi</button>
    </div>

    <!-- Items List -->
    <div class="flex flex-col gap-2" id="history-items-list"></div>
  `;

  // Search input handler
  const searchInput = container.querySelector('#history-search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderList();
  });

  // Filter tabs handler
  container.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderList();
    });
  });

  // Clear All History Confirmation
  container.querySelector('#history-clear-all-btn').addEventListener('click', () => {
    openConfirmModal({
      title: 'Hapus Semua Riwayat?',
      message: 'Seluruh daftar riwayat pemindaian barcode dan analisis foto komposisi akan dihapus dari penyimpanan perangkat Anda.',
      confirmText: 'Ya, Kosongkan',
      confirmVariant: 'danger',
      onConfirm: async () => {
        StorageService.clearAllHistory();
        await ScanLogService.clearAllLogs();
        showToast('Seluruh riwayat berhasil dikosongkan', 'success', 2000);
        renderList();
        renderTrendStats();
      }
    });
  });

  // Initial render
  setTimeout(() => {
    renderList();
    renderTrendStats();
  }, 0);

  return container;
}

function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Baru saja';
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 2) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days === 1) return 'Kemarin';
  return `${days} hari lalu`;
}
