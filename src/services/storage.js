// Service untuk manajemen penyimpanan lokal (LocalStorage) riwayat scan & preferensi pengguna

const STORAGE_KEYS = {
  HISTORY: 'kenalibtp_history_v1',
  SEEN_ONBOARDING: 'kenalibtp_seen_onboarding_v1'
};

// Data riwayat awal untuk demonstrasi prototype
const INITIAL_DEMO_HISTORY = [
  {
    id: 'hist-1',
    productId: 'indomie-mi-goreng',
    barcode: '8998866200224',
    name: 'Indomie Mi Goreng Spesial',
    brand: 'Indomie',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=300&q=80',
    method: 'barcode', // 'barcode' | 'composition'
    status: 'tersedia', // 'tersedia' | 'perlu-verifikasi' | 'simulasi'
    timestamp: Date.now() - 1000 * 60 * 35, // 35 menit lalu
    additivesCount: 8,
    category: 'Mi Instan'
  },
  {
    id: 'hist-2',
    productId: 'teh-pucuk-harum',
    barcode: '8993005321124',
    name: 'Teh Pucuk Harum Melati 350ml',
    brand: 'Teh Pucuk',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80',
    method: 'barcode',
    status: 'tersedia',
    timestamp: Date.now() - 1000 * 60 * 180, // 3 jam lalu
    additivesCount: 2,
    category: 'Minuman Teh Siap Minum'
  },
  {
    id: 'hist-3',
    productId: null,
    barcode: null,
    name: 'Hasil Foto Komposisi: Snack Sapi Panggang',
    brand: 'Pembacaan Label Foto',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80',
    method: 'composition',
    status: 'simulasi',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // Kemarin
    additivesCount: 6,
    category: 'Makanan Ringan'
  },
  {
    id: 'hist-4',
    productId: null,
    barcode: '8991234567890',
    name: 'Produk Belum Terdaftar (8991234567890)',
    brand: 'Tidak Dikenal',
    image: null,
    method: 'barcode',
    status: 'perlu-verifikasi',
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 hari lalu
    additivesCount: 0,
    category: 'Belum Terdaftar'
  }
];

export const StorageService = {
  getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (!data) {
        // Inisialisasi awal dengan data demo agar halaman riwayat tidak kosong
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(INITIAL_DEMO_HISTORY));
        return INITIAL_DEMO_HISTORY;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Gagal memuat riwayat dari localStorage:', e);
      return INITIAL_DEMO_HISTORY;
    }
  },

  addHistory(item) {
    try {
      const current = this.getHistory();
      // Hindari duplikasi item persis yang baru saja ditambahkan dalam 1 menit
      const filtered = current.filter(h => !(h.barcode && h.barcode === item.barcode && (Date.now() - h.timestamp < 30000)));
      const newItem = {
        id: 'hist-' + Date.now(),
        timestamp: Date.now(),
        ...item
      };
      const updated = [newItem, ...filtered].slice(0, 50); // Simpan maksimal 50 riwayat
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      return newItem;
    } catch (e) {
      console.warn('Gagal menyimpan riwayat:', e);
      return null;
    }
  },

  deleteHistory(id) {
    try {
      const current = this.getHistory();
      const updated = current.filter(h => h.id !== id);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('Gagal menghapus riwayat:', e);
      return [];
    }
  },

  clearAllHistory() {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
      return [];
    } catch (e) {
      console.warn('Gagal mengosongkan riwayat:', e);
      return [];
    }
  },

  hasSeenOnboarding() {
    try {
      return localStorage.getItem(STORAGE_KEYS.SEEN_ONBOARDING) === 'true';
    } catch (e) {
      return false;
    }
  },

  setOnboardingSeen(val = true) {
    try {
      localStorage.setItem(STORAGE_KEYS.SEEN_ONBOARDING, val ? 'true' : 'false');
    } catch (e) {
      console.warn('Gagal menyimpan preferensi onboarding:', e);
    }
  }
};
