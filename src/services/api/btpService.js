// BTP (Bahan Tambahan Pangan) Service - Modular API Layer berbasis Supabase
import { supabase } from '../supabase.js';

export const BtpService = {
  // Ambil seluruh katalog BTP
  async getAllBTP() {
    const { data } = await supabase.from('btp').select('*');
    return data || [];
  },

  // Ambil BTP berdasarkan ID
  async getBTPById(id) {
    if (!id) return null;
    const { data } = await supabase.from('btp').select('*').eq('id', id).single();
    return data;
  },

  // Pencarian BTP berdasarkan nama, nama kimia, kode INS, atau fungsi
  async searchBTP(query) {
    if (!query) return this.getAllBTP();
    const clean = query.toLowerCase().trim();
    const { data: all } = await supabase.from('btp').select('*');
    return (all || []).filter(b => 
      b.name.toLowerCase().includes(clean) ||
      (b.chemical_name && b.chemical_name.toLowerCase().includes(clean)) ||
      (b.ins_code && b.ins_code.toLowerCase().includes(clean)) ||
      (b.technical_function && b.technical_function.toLowerCase().includes(clean))
    );
  },

  // Filter BTP berdasarkan Kategori Fungsi
  async getBTPByCategory(categoryId) {
    const { data: all } = await supabase.from('btp').select('*');
    if (!categoryId || categoryId === 'all') return all;
    return (all || []).filter(b => b.category_id === categoryId);
  }
};
