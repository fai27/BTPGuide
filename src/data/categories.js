// Basis data kategori fungsi teknologi BTP berdasarkan Peraturan BPOM No. 11 Tahun 2019

export const BTP_CATEGORIES = [
  {
    id: 'pengawet',
    name: 'Pengawet',
    englishName: 'Preservatives',
    icon: 'shield-check',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    summary: 'Mencegah atau menghambat fermentasi, pengasaman, atau penguraian oleh mikroorganisme.',
    description: 'Bahan tambahan pangan untuk mencegah atau menghambat pembusukan yang disebabkan oleh mikroorganisme (bakteri, kapang, dan khamir), sehingga memperpanjang masa simpan produk pangan.',
    whyUsed: 'Menjaga keamanan pangan dari bahaya racun mikroba (seperti racun botulinum atau mikotoksin jamur) dan menjaga ketersediaan pangan tahan lama.',
    examples: ['Natrium Benzoat', 'Kalium Sorbat', 'Kalsium Propionat', 'Natrium Nitrit'],
    safetyNote: 'Penggunaan pengawet memiliki batas konsentrasi maksimum (BTM) ketat per kilogram produk yang ditetapkan oleh BPOM dan Codex Alimentarius.'
  },
  {
    id: 'pewarna',
    name: 'Pewarna',
    englishName: 'Colours',
    icon: 'palette',
    color: '#D81B60',
    bgColor: '#FCE4EC',
    summary: 'Memperbaiki atau memberi warna pada pangan agar menarik dan seragam.',
    description: 'Bahan tambahan pangan berupa pewarna alami maupun pewarna sintetis untuk mengembalikan warna yang hilang selama proses pengolahan atau memberi warna yang menarik.',
    whyUsed: 'Membantu menjaga konsistensi visual produk akibat variasi bahan baku alami dan proses pemanasan.',
    examples: ['Tartrazin (CI 19140)', 'Kuning FCF (Sunset Yellow)', 'Karamel IV', 'Kurkumin', 'Klorofil'],
    safetyNote: 'Pewarna sintetis pangan yang diizinkan BPOM telah lulus uji toksisitas dan memiliki nomor indeks warna (Colour Index/CI).'
  },
  {
    id: 'pemanis',
    name: 'Pemanis',
    englishName: 'Sweeteners',
    icon: 'candy',
    color: '#8E24AA',
    bgColor: '#F3E5F5',
    summary: 'Memberikan rasa manis pada pangan (pemanis alami maupun tanpa kalori).',
    description: 'Bahan tambahan pangan yang dapat memberikan rasa manis pada pangan olahan, meliputi pemanis alami (seperti Sorbitol, Xilitol) dan pemanis buatan berintensitas tinggi.',
    whyUsed: 'Memberikan alternatif rasa manis bagi penderita diabetes atau produk rendah/tanpa kalori tanpa memicu karies gigi.',
    examples: ['Sukralosa', 'Aspartam', 'Asesulfam-K', 'Sorbitol', 'Natrium Siklamat'],
    safetyNote: 'Pemanis buatan memiliki nilai ADI (Acceptable Daily Intake). Label wajib mencantumkan informasi batas konsumsi bagi kelompok rentan.'
  },
  {
    id: 'penguat-rasa',
    name: 'Penguat Rasa',
    englishName: 'Flavour Enhancers',
    icon: 'smile',
    color: '#F57C00',
    bgColor: '#FFF3E0',
    summary: 'Memperkuat atau memodifikasi rasa dan aroma yang telah ada.',
    description: 'Bahan tambahan pangan untuk memperkuat atau memodifikasi rasa dan aroma yang telah ada dalam bahan pangan tanpa memberikan rasa baru yang dominan.',
    whyUsed: 'Meningkatkan profil rasa umami (gurih lezat) pada makanan kemasan dan makanan olahan.',
    examples: ['Mononatrium L-Glutamat (MSG)', 'Dinatrium Inosinat (IMP)', 'Dinatrium Guanilat (GMP)'],
    safetyNote: 'Glutamat adalah asam amino alami yang juga terdapat pada tomat, keju, dan jamur. Diklasifikasikan aman (GRAS) oleh JECFA WHO/FAO.'
  },
  {
    id: 'pengatur-keasaman',
    name: 'Pengatur Keasaman',
    englishName: 'Acidity Regulators',
    icon: 'droplets',
    color: '#00897B',
    bgColor: '#E0F2F1',
    summary: 'Mengatur atau mempertahankan derajat keasaman (pH) pangan.',
    description: 'Bahan tambahan pangan untuk mengasamkan, menetralkan atau mempertahankan derajat keasaman (pH) bahan pangan olahan.',
    whyUsed: 'Memberi sensasi segar (asam), menjaga stabilitas vitamin, dan menghambat pertumbuhan bakteri perusak yang sensitif terhadap pH rendah.',
    examples: ['Asam Sitrat', 'Asam Malat', 'Natrium Bikarbonat', 'Asam Laktat'],
    safetyNote: 'Banyak pengatur keasaman merupakan asam organik alami yang secara biologis diproduksi oleh tubuh dalam siklus metabolisme (Siklus Krebs).'
  },
  {
    id: 'pengemulsi',
    name: 'Pengemulsi & Penstabil',
    englishName: 'Emulsifiers & Stabilizers',
    icon: 'layers',
    color: '#1E88E5',
    bgColor: '#E3F2FD',
    summary: 'Membentuk atau mempertahankan campuran heterogen dua fase (seperti minyak dan air).',
    description: 'Bahan tambahan pangan yang membantu pembentukan atau pemeliharaan campuran heterogen dari dua atau lebih fase yang tidak bercampur, seperti minyak dan air.',
    whyUsed: 'Menjaga tekstur lembut cokelat, es krim, roti, dan saus agar tidak terpisah atau menggumpal selama penyimpanan.',
    examples: ['Lesitin Kedelai', 'Mono dan Digliserida Asam Lemak', 'Karagenan', 'Pektin'],
    safetyNote: 'Berasal dari sumber nabati (kedelai, rumput laut, buah) atau asam lemak nabati yang aman dan dapat dicerna tubuh.'
  },
  {
    id: 'antioksidan',
    name: 'Antioksidan',
    englishName: 'Antioxidants',
    icon: 'zap',
    color: '#C0CA33',
    bgColor: '#F9FBE7',
    summary: 'Mencegah atau menghambat oksidasi lemak yang menyebabkan ketengikan.',
    description: 'Bahan tambahan pangan untuk mencegah atau menghambat proses oksidasi pada pangan berkadar lemak atau minyak tinggi.',
    whyUsed: 'Mencegah bau dan rasa tengik pada keripik, minyak goreng, dan biskuit selama masa edar.',
    examples: ['TBHQ (Tersier Butilhidrokuinon)', 'BHT (Butil Hidroksitoluen)', 'Tokoferol (Vitamin E)', 'Asam Askorbat'],
    safetyNote: 'Mencegah pembentukan senyawa radikal bebas oksidatif akibat minyak tengik, dengan batas aman yang ketat.'
  },
  {
    id: 'perisa',
    name: 'Perisa Pangan',
    englishName: 'Flavourings',
    icon: 'smile',
    color: '#6D4C41',
    bgColor: '#EFEBE9',
    summary: 'Memberikan aroma dan rasa khas seperti vanila, cokelat, atau rempah.',
    description: 'Bahan tambahan pangan berupa preparat konsentrat aroma untuk memberikan aroma dan rasa tertentu pada produk makanan.',
    whyUsed: 'Menggantikan atau memperkuat aroma alami yang berkurang selama proses pasteurisasi atau pemanggangan suhu tinggi.',
    examples: ['Perisa Alami', 'Perisa Identik Alami', 'Perisa Sintetik', 'Etil Vanilin'],
    safetyNote: 'Wajib menggunakan senyawa kimia perisa yang terdaftar dalam daftar positif (positive list) BPOM dan FEMA GRAS.'
  }
];
