// Scan Log Service - Entitas Riwayat Pindai & Analisis Tren berbasis Supabase
import { supabase } from '../supabase.js';

export const ScanLogService = {
  // Ambil log riwayat pemindaian
  async getLogs() {
    const { data } = await supabase
      .from('scan_logs')
      .select('*')
      .order('scanned_at', { ascending: false });
    return data || [];
  },

  // Tambah log pemindaian baru
  async logScan({ productId, barcode, productName, method = 'barcode', additivesCount = 0, status = 'tersedia' }) {
    const newLog = {
      session_id: 'anon-user-session',
      product_id: productId || null,
      scanned_barcode: barcode || null,
      product_name: productName || (barcode ? `Produk (${barcode})` : 'Pindai Label Foto'),
      scan_method: method, // 'barcode' | 'composition'
      additives_detected_count: additivesCount,
      status: status,
      scanned_at: new Date().toISOString()
    };

    const { data } = await supabase.from('scan_logs').insert(newLog);
    return data?.[0] || newLog;
  },

  // Hapus satu log
  async deleteLog(id) {
    const delQuery = await supabase.from('scan_logs').delete();
    await delQuery.eq('id', id);
    return this.getLogs();
  },

  // Bersihkan semua log
  async clearAllLogs() {
    supabase.setTableData('scan_logs', []);
    return [];
  },

  // Analisis Tren Pemindaian (Sesuai PRD: Analisis Tren Pengguna/Anonim)
  async getTrendStatistics() {
    const logs = await this.getLogs();
    const totalScans = logs.length;
    const barcodeScans = logs.filter(l => l.scan_method === 'barcode').length;
    const compositionScans = logs.filter(l => l.scan_method === 'composition').length;

    // Frekuensi produk yang paling sering dipindai
    const productFrequency = {};
    logs.forEach(l => {
      if (l.product_name) {
        productFrequency[l.product_name] = (productFrequency[l.product_name] || 0) + 1;
      }
    });

    const topProducts = Object.entries(productFrequency)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalScans,
      barcodeScans,
      compositionScans,
      topProducts
    };
  }
};
