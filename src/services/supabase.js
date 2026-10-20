// Supabase BaaS Client Abstraction (PostgreSQL Simulation with Modular Schema)
// Sesuai PRD & table.md:
// Mengelola 6 tabel entitas relasional:
// 1. CATEGORIES (id, name, description, icon_url)
// 2. ADDITIVES (id, category_id, name, alternative_names, ins_e_code, tech_function, simple_explanation, common_uses, safety_boundary, reference_source)
// 3. PRODUCTS (id, barcode, name, brand, category, image_url, raw_ingredients, data_source, updated_at)
// 4. PRODUCT_ADDITIVES (id, product_id, additive_id, detected_via)
// 5. USERS (id, session_uuid, user_agent, created_at)
// 6. SCAN_HISTORIES (id, user_id, product_id, scan_method, scanned_barcode, raw_ocr_text, identified_additives, scanned_at)

import { SAMPLE_PRODUCTS } from '../data/products.js';
import { BTP_ADDITIVES } from '../data/additives.js';
import { BTP_CATEGORIES } from '../data/categories.js';

// Inisialisasi Mock Database State dari LocalStorage
const STORAGE_TABLES = {
  CATEGORIES: 'btpguide_db_categories',
  ADDITIVES: 'btpguide_db_additives',
  PRODUCTS: 'btpguide_db_products',
  PRODUCT_ADDITIVES: 'btpguide_db_product_additives',
  USERS: 'btpguide_db_users',
  SCAN_HISTORIES: 'btpguide_db_scan_histories',
  // Backward compatibility alias keys:
  BTP: 'btpguide_db_additives',
  PRODUCT_BTP: 'btpguide_db_product_additives',
  SCAN_LOGS: 'btpguide_db_scan_histories'
};

// 1. Skema Tabel CATEGORIES
function getInitialCategories() {
  return BTP_CATEGORIES.map((c, idx) => ({
    id: idx + 1,
    name: c.name,
    description: c.description || c.summary,
    icon_url: c.icon
  }));
}

// 2. Skema Tabel ADDITIVES
function getInitialAdditives() {
  return BTP_ADDITIVES.map((b, idx) => ({
    id: idx + 1,
    slug: b.id,
    category_id: b.categoryId,
    name: b.name,
    alternative_names: (b.searchKeywords || []).join(', '),
    ins_e_code: b.insOrECode,
    tech_function: b.function,
    simple_explanation: b.explanation,
    common_uses: (b.commonFoods || []).join(', '),
    safety_boundary: b.safetyContext,
    reference_source: b.referenceSource || 'Peraturan BPOM No. 11/2019',
    // Compatibility fields
    ins_code: b.insOrECode,
    chemical_name: b.searchKeywords?.[1] || b.name,
    technical_function: b.function,
    description: b.explanation,
    why_used: b.whyUsed,
    health_notes: b.safetyContext,
    common_foods: b.commonFoods,
    created_at: '2024-10-15T00:00:00Z'
  }));
}

// 3. Skema Tabel PRODUCTS
function getInitialProducts() {
  return SAMPLE_PRODUCTS.map((p, idx) => ({
    id: p.id,
    num_id: idx + 1,
    barcode: p.barcode,
    name: p.name,
    brand: p.brand,
    manufacturer: p.brand,
    category: p.category,
    image_url: p.image,
    raw_ingredients: p.ingredients,
    ingredients_text: p.ingredients,
    data_source: p.source,
    source: p.source,
    updated_at: p.lastUpdated || '2024-10-15T00:00:00Z',
    created_at: '2024-10-15T00:00:00Z'
  }));
}

// 4. Skema Tabel PRODUCT_ADDITIVES (Junction Many-to-Many)
function getInitialProductAdditives() {
  const relations = [];
  let relId = 1;
  SAMPLE_PRODUCTS.forEach(p => {
    (p.additives || []).forEach(a => {
      relations.push({
        id: relId++,
        product_id: p.id,
        additive_id: a.id,
        btp_id: a.id,
        detected_via: a.status || 'label_komposisi',
        status: a.status || 'terdeteksi',
        created_at: '2024-10-15T00:00:00Z'
      });
    });
  });
  return relations;
}

// 5. Skema Tabel USERS
function getInitialUsers() {
  return [
    {
      id: 1,
      session_uuid: 'anon-user-session-001',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 WebClient',
      created_at: '2024-10-15T00:00:00Z'
    }
  ];
}

// 6. Skema Tabel SCAN_HISTORIES
function getInitialScanHistories() {
  return [
    {
      id: 1,
      user_id: 1,
      session_id: 'anon-user-session-001',
      product_id: 'indomie-mi-goreng',
      scan_method: 'barcode',
      scanned_barcode: '8998866200224',
      product_name: 'Indomie Mi Goreng Spesial',
      raw_ocr_text: null,
      identified_additives: ['mononatrium-glutamat', 'tartrazin', 'tbhq'],
      additives_detected_count: 8,
      status: 'tersedia',
      scanned_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    {
      id: 2,
      user_id: 1,
      session_id: 'anon-user-session-001',
      product_id: 'chitato-sapi-panggang',
      scan_method: 'barcode',
      scanned_barcode: '8996001301017',
      product_name: 'Chitato Keripik Kentang Sapi Panggang',
      raw_ocr_text: null,
      identified_additives: ['mononatrium-glutamat', 'karamel-iv', 'tbhq'],
      additives_detected_count: 6,
      status: 'tersedia',
      scanned_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    },
    {
      id: 3,
      user_id: 1,
      session_id: 'anon-user-session-001',
      product_id: 'teh-pucuk-harum',
      scan_method: 'barcode',
      scanned_barcode: '8993005321124',
      product_name: 'Teh Pucuk Harum Melati 350ml',
      raw_ocr_text: null,
      identified_additives: ['asam-sitrat'],
      additives_detected_count: 2,
      status: 'tersedia',
      scanned_at: new Date(Date.now() - 1000 * 60 * 300).toISOString()
    },
    {
      id: 4,
      user_id: 1,
      session_id: 'anon-user-session-001',
      product_id: null,
      scan_method: 'composition',
      scanned_barcode: null,
      product_name: 'Hasil Foto Komposisi: Snack Sapi Panggang',
      raw_ocr_text: 'Kentang, minyak olein, penguat rasa MSG, pewarna karamel...',
      identified_additives: ['mononatrium-glutamat', 'karamel-iv'],
      additives_detected_count: 6,
      status: 'simulasi',
      scanned_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    }
  ];
}

class MockSupabaseClient {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    if (!localStorage.getItem(STORAGE_TABLES.CATEGORIES)) {
      localStorage.setItem(STORAGE_TABLES.CATEGORIES, JSON.stringify(getInitialCategories()));
    }
    if (!localStorage.getItem(STORAGE_TABLES.ADDITIVES)) {
      localStorage.setItem(STORAGE_TABLES.ADDITIVES, JSON.stringify(getInitialAdditives()));
    }
    if (!localStorage.getItem(STORAGE_TABLES.PRODUCTS)) {
      localStorage.setItem(STORAGE_TABLES.PRODUCTS, JSON.stringify(getInitialProducts()));
    }
    if (!localStorage.getItem(STORAGE_TABLES.PRODUCT_ADDITIVES)) {
      localStorage.setItem(STORAGE_TABLES.PRODUCT_ADDITIVES, JSON.stringify(getInitialProductAdditives()));
    }
    if (!localStorage.getItem(STORAGE_TABLES.USERS)) {
      localStorage.setItem(STORAGE_TABLES.USERS, JSON.stringify(getInitialUsers()));
    }
    if (!localStorage.getItem(STORAGE_TABLES.SCAN_HISTORIES)) {
      localStorage.setItem(STORAGE_TABLES.SCAN_HISTORIES, JSON.stringify(getInitialScanHistories()));
    }
  }

  normalizeTableName(name) {
    const n = name.toUpperCase().replace(/-/g, '_');
    if (n === 'BTP' || n === 'ADDITIVE' || n === 'ADDITIVES') return 'ADDITIVES';
    if (n === 'PRODUCT' || n === 'PRODUCTS') return 'PRODUCTS';
    if (n === 'CATEGORY' || n === 'CATEGORIES') return 'CATEGORIES';
    if (n === 'PRODUCT_BTP' || n === 'PRODUCT_ADDITIVE' || n === 'PRODUCT_ADDITIVES') return 'PRODUCT_ADDITIVES';
    if (n === 'USER' || n === 'USERS') return 'USERS';
    if (n === 'SCAN_LOGS' || n === 'SCAN_HISTORIES' || n === 'SCAN_HISTORY') return 'SCAN_HISTORIES';
    return n;
  }

  getTableData(tableName) {
    const norm = this.normalizeTableName(tableName);
    const key = STORAGE_TABLES[norm] || `btpguide_db_${tableName.toLowerCase()}`;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  setTableData(tableName, data) {
    const norm = this.normalizeTableName(tableName);
    const key = STORAGE_TABLES[norm] || `btpguide_db_${tableName.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Builder pattern menyerupai Supabase JS SDK: supabase.from(table).select(...)
  from(tableName) {
    const self = this;
    let data = [...self.getTableData(tableName)];

    const queryBuilder = {
      _data: data,
      _tableName: tableName,

      select(fields = '*') {
        // Query builder clone
        return this;
      },

      eq(field, value) {
        this._data = this._data.filter(row => row[field] === value);
        return this;
      },

      ilike(field, pattern) {
        const clean = pattern.replace(/%/g, '').toLowerCase();
        this._data = this._data.filter(row => {
          const val = row[field];
          return typeof val === 'string' && val.toLowerCase().includes(clean);
        });
        return this;
      },

      order(field, { ascending = true } = {}) {
        this._data.sort((a, b) => {
          if (a[field] < b[field]) return ascending ? -1 : 1;
          if (a[field] > b[field]) return ascending ? 1 : -1;
          return 0;
        });
        return this;
      },

      limit(count) {
        this._data = this._data.slice(0, count);
        return this;
      },

      async single() {
        return { data: this._data[0] || null, error: null };
      },

      // Eksekusi Promise
      async then(resolve, reject) {
        resolve({ data: this._data, error: null });
      },

      // Insert data (e.g. scan logs)
      async insert(records) {
        const rows = Array.isArray(records) ? records : [records];
        const currentData = self.getTableData(this._tableName);
        const newRecords = rows.map(r => ({
          id: r.id || `rec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          created_at: new Date().toISOString(),
          ...r
        }));
        const updated = [...newRecords, ...currentData];
        self.setTableData(this._tableName, updated);
        return { data: newRecords, error: null };
      },

      // Delete data
      async delete() {
        return {
          eq: (field, value) => {
            const currentData = self.getTableData(this._tableName);
            const filtered = currentData.filter(r => r[field] !== value);
            self.setTableData(this._tableName, filtered);
            return Promise.resolve({ data: null, error: null });
          }
        };
      }
    };

    return queryBuilder;
  }
}

// Instance tunggal Supabase Mock
export const supabase = new MockSupabaseClient();
