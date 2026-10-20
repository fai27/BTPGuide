// Product Service - Modular API Layer berbasis Supabase
import { supabase } from '../supabase.js';

export const ProductService = {
  // Ambil semua produk
  async getAllProducts(limit = 50) {
    const { data } = await supabase.from('products').select('*').limit(limit);
    return data || [];
  },

  // Cari produk berdasarkan Barcode EAN-13
  async getProductByBarcode(barcode) {
    if (!barcode) return null;
    const clean = barcode.toString().trim();
    const { data } = await supabase.from('products').select('*').eq('barcode', clean).single();
    if (!data) return null;
    return this.attachBTP(data);
  },

  // Ambil produk berdasarkan ID
  async getProductById(id) {
    if (!id) return null;
    const { data } = await supabase.from('products').select('*').eq('id', id).single();
    if (!data) return null;
    return this.attachBTP(data);
  },

  // Relasi Many-to-Many: Menggabungkan data BTP terkait untuk satu produk
  async attachBTP(product) {
    const { data: relations } = await supabase.from('product_btp').select('*').eq('product_id', product.id);
    const { data: allBTP } = await supabase.from('btp').select('*');

    const btpList = (relations || []).map(rel => {
      const btpInfo = allBTP.find(b => b.id === rel.btp_id);
      return btpInfo ? { ...btpInfo, status: rel.status } : null;
    }).filter(Boolean);

    return {
      ...product,
      brand: product.manufacturer, // Aliasing produsen ke brand untuk kompatibilitas UI
      ingredients: product.ingredients_text,
      image: product.image_url,
      additives: btpList
    };
  },

  // Pencarian nama produk, produsen, atau barcode
  async searchProducts(query) {
    if (!query) return this.getAllProducts(8);
    const clean = query.toLowerCase().trim();
    const { data: all } = await supabase.from('products').select('*');
    return (all || []).filter(p => 
      p.name.toLowerCase().includes(clean) ||
      p.manufacturer.toLowerCase().includes(clean) ||
      p.barcode.includes(clean) ||
      p.category.toLowerCase().includes(clean)
    );
  }
};
