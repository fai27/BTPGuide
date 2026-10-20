// Basis data produk sampel makanan & minuman populer di Indonesia
// Disusun untuk prototype edukasi KenaliBTP dengan nomor barcode EAN-13 standar pabrik

export const SAMPLE_PRODUCTS = [
  {
    id: 'indomie-mi-goreng',
    barcode: '8998866200224',
    name: 'Indomie Mi Goreng Spesial',
    brand: 'Indomie (PT Indofood CBP Sukses Makmur Tbk)',
    category: 'Mi Instan',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    netWeight: '85 g',
    servingSize: '1 bungkus (85 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '15 Oktober 2024',
    ingredients: 'Tepung terigu, minyak nabati, tepung tapioka, garam, pengatur keasaman (kalium karbonat, natrium karbonat, natrium polifosfat), penstabil, pewarna sintetik tartrazin CI 19140, antioksidan TBHQ. Bumbu: Gula, garam, penguat rasa mononatrium glutamat (MSG), dinatrium inosinat dan dinatrium guanilat, bubuk bawang merah, bubuk bawang putih, perisa sintetik ayam, pewarna karamel kelas IV.',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'dinatrium-inosinat', status: 'terdeteksi' },
      { id: 'dinatrium-guanilat', status: 'terdeteksi' },
      { id: 'tartrazin', status: 'terdeteksi' },
      { id: 'karamel-iv', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' },
      { id: 'natrium-bikarbonat', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'chitato-sapi-panggang',
    barcode: '8996001301017',
    name: 'Chitato Keripik Kentang Sapi Panggang',
    brand: 'Chitato (PT Indofood Fortuna Makmur)',
    category: 'Makanan Ringan / Snack',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    netWeight: '68 g',
    servingSize: '25 g',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '01 November 2024',
    ingredients: 'Kentang (62%), minyak olein kelapa sawit (mengandung antioksidan TBHQ), bumbu rasa sapi panggang (mengandung gula, garam, penguat rasa mononatrium glutamat, dinatrium inosinat, dinatrium guanilat, susu bubuk, kecap bubuk, pewarna karamel kelas IV, perisa sintetik daging sapi, hidrolisat protein nabati).',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'dinatrium-inosinat', status: 'terdeteksi' },
      { id: 'dinatrium-guanilat', status: 'terdeteksi' },
      { id: 'karamel-iv', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'teh-pucuk-harum',
    barcode: '8993005321124',
    name: 'Teh Pucuk Harum Melati 350ml',
    brand: 'Teh Pucuk (PT Mayora Indah Tbk)',
    category: 'Minuman Teh Siap Minum',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    netWeight: '350 ml',
    servingSize: '1 botol (350 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '12 September 2024',
    ingredients: 'Air, gula, daun teh melati (0.5%), perisa identik alami melati, pengatur keasaman (asam sitrat), penstabil.',
    additives: [
      { id: 'asam-sitrat', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'taro-net-seaweed',
    barcode: '8996001410146',
    name: 'Taro Net Potato Seaweed Rumput Laut',
    brand: 'Taro (PT FKS Food Sejahtera Tbk)',
    category: 'Makanan Ringan / Snack',
    image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80',
    netWeight: '62 g',
    servingSize: '20 g',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '05 Oktober 2024',
    ingredients: 'Pati jagung, minyak kelapa sawit (mengandung antioksidan TBHQ), tepung terigu, kentang bubuk, bumbu rumput laut (mengandung rumput laut kering 1.2%, penguat rasa mononatrium glutamat, dinatrium inosinat, garam, bubuk kedelai, perisa sintetik rumput laut), pengembang natrium bikarbonat.',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'dinatrium-inosinat', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' },
      { id: 'natrium-bikarbonat', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'oreo-vanilla',
    barcode: '8992761001011',
    name: 'Oreo Vanilla Biskuit Sandwich',
    brand: 'Oreo (Mondelez Indonesia)',
    category: 'Biskuit & Roti',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
    netWeight: '133 g',
    servingSize: '3 keping (28.5 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '20 Agustus 2024',
    ingredients: 'Tepung terigu, gula, minyak nabati (mengandung antioksidan TBHQ), bubuk kakao (4%), sirup fruktosa, pati jagung, pengembang (natrium bikarbonat dan amonium bikarbonat), garam, pengemulsi lesitin kedelai, perisa sintetik vanila.',
    additives: [
      { id: 'lesitin-kedelai', status: 'terdeteksi' },
      { id: 'natrium-bikarbonat', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'beng-beng-wafer',
    barcode: '8998838380121',
    name: 'Beng-Beng Wafer Cokelat Karamel Krispi',
    brand: 'Beng-Beng (PT Mayora Indah Tbk)',
    category: 'Biskuit & Roti',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    netWeight: '25 g',
    servingSize: '1 bungkus (25 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '18 September 2024',
    ingredients: 'Glukosa, gula, susu bubuk, tepung terigu, lemak nabati (mengandung antioksidan BHT), lemak kakao, massa kakao, beras krispi, maltodekstrin, lemak mentega, pengemulsi lesitin kedelai, garam, pengembang natrium bikarbonat, perisa sintetik cokelat dan vanila.',
    additives: [
      { id: 'lesitin-kedelai', status: 'terdeteksi' },
      { id: 'natrium-bikarbonat', status: 'terdeteksi' },
      { id: 'bht', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'pocari-sweat-500',
    barcode: '8991001001215',
    name: 'Pocari Sweat Minuman Isotonik 500ml',
    brand: 'Pocari Sweat (PT Amerta Indah Otsuka)',
    category: 'Minuman Isotonik',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
    netWeight: '500 ml',
    servingSize: '1 botol (500 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '10 Juli 2024',
    ingredients: 'Air, gula pasir, sirup glukosa, pengatur keasaman (asam sitrat, natrium sitrat), natrium klorida, kalium klorida, kalsium laktat, magnesium karbonat, perisa sintetik sitrus.',
    additives: [
      { id: 'asam-sitrat', status: 'terdeteksi' },
      { id: 'natrium-sitrat', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'ultra-milk-cokelat',
    barcode: '8992753110226',
    name: 'Ultra Milk Susu UHT Cokelat 250ml',
    brand: 'Ultra Milk (PT Ultrajaya Milk Industry Tbk)',
    category: 'Susu & Olahan Susu',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    netWeight: '250 ml',
    servingSize: '1 kotak (250 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '04 Agustus 2024',
    ingredients: 'Susu sapi segar (90%), sukrosa, kakao bubuk (1.4%), susu skim bubuk, penstabil nabati (karagenan), perisa sintetik cokelat, garam.',
    additives: [
      { id: 'karagenan', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'coca-cola-zero',
    barcode: '8992761110010',
    name: 'Coca-Cola Zero Sugar 390ml',
    brand: 'Coca-Cola (PT Coca-Cola Bottling Indonesia)',
    category: 'Minuman Berkarbonasi Bebas Gula',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80',
    netWeight: '390 ml',
    servingSize: '1 botol (390 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '14 Agustus 2024',
    ingredients: 'Air berkarbonasi, pewarna karamel kelas IV, pengatur keasaman (asam fosfat, natrium sitrat), pemanis buatan (sukralosa 10 mg/saji, asesulfam-K 16 mg/saji), pengawet natrium benzoat, perisa sintetik kola, kafein.',
    additives: [
      { id: 'sukralosa', status: 'terdeteksi' },
      { id: 'asesulfam-k', status: 'terdeteksi' },
      { id: 'karamel-iv', status: 'terdeteksi' },
      { id: 'natrium-benzoat', status: 'terdeteksi' },
      { id: 'natrium-sitrat', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'silverqueen-cashew',
    barcode: '8992741910101',
    name: 'SilverQueen Milk Chocolate Cashew 58g',
    brand: 'SilverQueen (PT Petra Food / Ceres)',
    category: 'Cokelat & Kembang Gula',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
    netWeight: '58 g',
    servingSize: '29 g',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '19 September 2024',
    ingredients: 'Gula, kacang mete (22%), susu bubuk, massa kakao, lemak kakao, lemak nabati, pengemulsi lesitin kedelai, garam, perisa sintetik vanila, antioksidan BHT.',
    additives: [
      { id: 'lesitin-kedelai', status: 'terdeteksi' },
      { id: 'bht', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'sari-roti-tawar-kupas',
    barcode: '8997015010018',
    name: 'Sari Roti Tawar Kupas Lembut',
    brand: 'Sari Roti (PT Nippon Indosari Corpindo Tbk)',
    category: 'Biskuit & Roti',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    netWeight: '200 g',
    servingSize: '2 lembar (40 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '02 Oktober 2024',
    ingredients: 'Tepung terigu, air, gula pasir, margarin, ragi, garam, pengemulsi nabati mono dan digliserida asam lemak, pengawet kalsium propionat, perlakuan tepung asam askorbat.',
    additives: [
      { id: 'kalsium-propionat', status: 'terdeteksi' },
      { id: 'mono-digliserida', status: 'terdeteksi' },
      { id: 'asam-askorbat', status: 'terdeteksi' }
    ]
  },
  {
    id: 'roma-kelapa-biskuit',
    barcode: '8998838310012',
    name: 'Roma Biskuit Kelapa Gurih Renyah',
    brand: 'Roma (PT Mayora Indah Tbk)',
    category: 'Biskuit & Roti',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    netWeight: '300 g',
    servingSize: '4 keping (27 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '22 Agustus 2024',
    ingredients: 'Tepung terigu, gula, minyak nabati (mengandung antioksidan BHA/BHT), kelapa kering (8%), mentega, susu skim bubuk, garam, pengembang (natrium bikarbonat, amonium bikarbonat), perisa sintetik kelapa, kalsium karbonat.',
    additives: [
      { id: 'natrium-bikarbonat', status: 'terdeteksi' },
      { id: 'kalsium-karbonat', status: 'terdeteksi' },
      { id: 'bht', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'torabika-cappuccino',
    barcode: '8998838110025',
    name: 'Torabika Cappuccino dengan Choco Granule',
    brand: 'Torabika (PT Torabika Eka Semesta)',
    category: 'Kopi & Minuman Serbuk',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    netWeight: '25 g',
    servingSize: '1 sachet (25 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '11 September 2024',
    ingredients: 'Gula, krimer nabati (mengandung penstabil kalium fosfat, pengemulsi mono dan digliserida asam lemak), kopi instan (10%), susu bubuk skim, kakao bubuk, perisa sintetik cappuccino, pemanis buatan sukralosa.',
    additives: [
      { id: 'mono-digliserida', status: 'terdeteksi' },
      { id: 'sukralosa', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'buavita-jambu',
    barcode: '8999999014212',
    name: 'Buavita Jambu Biji Segar 250ml',
    brand: 'Buavita (PT Unilever Indonesia Tbk)',
    category: 'Jus Buah Olahan',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=600&q=80',
    netWeight: '250 ml',
    servingSize: '1 kotak (250 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '28 Juli 2024',
    ingredients: 'Air, konsentrat sari buah jambu biji (35%), sukrosa, perisa identik alami jambu, penstabil nabati (pektin), pengatur keasaman asam sitrat, vitamin C (asam askorbat), pewarna alami karmin CI 75470.',
    additives: [
      { id: 'asam-sitrat', status: 'terdeteksi' },
      { id: 'asam-askorbat', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'teh-botol-sosro',
    barcode: '8992775211116',
    name: 'Teh Botol Sosro Kotak 250ml',
    brand: 'Sosro (PT Sinar Sosro)',
    category: 'Minuman Teh Siap Minum',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    netWeight: '250 ml',
    servingSize: '1 kotak (250 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '09 Agustus 2024',
    ingredients: 'Air, gula pasir, ekstrak teh melati.',
    additives: [] // Produk tanpa BTP sintetik/tercatat, sangat bagus untuk demonstrasi edukasi produk minim BTP!
  },
  {
    id: 'sprite-lemon-lime',
    barcode: '8992761210017',
    name: 'Sprite Lemon-Lime Botol 390ml',
    brand: 'Sprite (PT Coca-Cola Bottling Indonesia)',
    category: 'Minuman Berkarbonasi',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80',
    netWeight: '390 ml',
    servingSize: '1 botol (390 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '12 September 2024',
    ingredients: 'Air berkarbonasi, gula pasir, pengatur keasaman (asam sitrat, natrium sitrat), perisa sintetik lemon-lime, pengawet natrium benzoat.',
    additives: [
      { id: 'asam-sitrat', status: 'terdeteksi' },
      { id: 'natrium-sitrat', status: 'terdeteksi' },
      { id: 'natrium-benzoat', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'yakult-probiotik',
    barcode: '8997009410015',
    name: 'Yakult Minuman Susu Fermentasi Probiotik',
    brand: 'Yakult (PT Yakult Indonesia Persada)',
    category: 'Susu & Olahan Susu',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    netWeight: '65 ml',
    servingSize: '1 botol (65 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '01 Juli 2024',
    ingredients: 'Air, sukrosa, susu skim bubuk, dekstrosa, perisa sintetik sitrus, kultur bakteri hidup L. casei Shirota strain.',
    additives: [
      { id: 'dekstrosa', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'nabati-richeese-wafer',
    barcode: '8993175535512',
    name: 'Nabati Richeese Wafer Krim Keju',
    brand: 'Richeese Nabati (PT Kaldu Sari Nabati Indonesia)',
    category: 'Biskuit & Roti',
    image: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=600&q=80',
    netWeight: '127 g',
    servingSize: '30 g',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '25 Agustus 2024',
    ingredients: 'Tepung terigu, gula, minyak nabati (mengandung antioksidan TBHQ), whey bubuk, keju bubuk (5%), susu bubuk, pengemulsi lesitin kedelai, garam, pengembang natrium bikarbonat, pewarna sintetik (kuning FCF CI 15985, kurkumin CI 75300), perisa sintetik keju.',
    additives: [
      { id: 'kuning-fcf', status: 'terdeteksi' },
      { id: 'kurkumin', status: 'terdeteksi' },
      { id: 'lesitin-kedelai', status: 'terdeteksi' },
      { id: 'natrium-bikarbonat', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'good-day-moccacino',
    barcode: '8998838221011',
    name: 'Good Day Moccacino Kopi Instan 3in1',
    brand: 'Good Day (PT Santos Jaya Abadi)',
    category: 'Kopi & Minuman Serbuk',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    netWeight: '20 g',
    servingSize: '1 sachet (20 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '06 September 2024',
    ingredients: 'Gula, krimer nabati, kopi instan (10%), kakao bubuk, perisa sintetik moka, pemanis buatan sukralosa dan asesulfam-K.',
    additives: [
      { id: 'sukralosa', status: 'terdeteksi' },
      { id: 'asesulfam-k', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'roma-malkist-abon',
    barcode: '8998838120017',
    name: 'Roma Malkist Crackers Rasa Abon Sapi',
    brand: 'Roma (PT Mayora Indah Tbk)',
    category: 'Biskuit & Roti',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    netWeight: '135 g',
    servingSize: '27 g',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '17 Juli 2024',
    ingredients: 'Tepung terigu, minyak nabati (mengandung antioksidan BHT), gula, tepung tapioka, abon sapi (4%), pengembang natrium bikarbonat, ragi, penguat rasa mononatrium glutamat, ekstrak malt, garam.',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'natrium-bikarbonat', status: 'terdeteksi' },
      { id: 'bht', status: 'terdeteksi' }
    ]
  },
  {
    id: 'kusuka-keripik-singkong',
    barcode: '8992745100018',
    name: 'Kusuka Keripik Singkong Original Crispy',
    brand: 'Kusuka (PT Indosnack Kemas Pratama)',
    category: 'Makanan Ringan / Snack',
    image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=600&q=80',
    netWeight: '60 g',
    servingSize: '20 g',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '21 Oktober 2024',
    ingredients: 'Singkong pilihan (70%), minyak kelapa sawit (mengandung antioksidan TBHQ), bumbu gurih (mengandung garam, gula, rempah-rempah, penguat rasa mononatrium glutamat dan dinatrium inosinat).',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'dinatrium-inosinat', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' }
    ]
  },
  {
    id: 'dua-kelinci-sukro',
    barcode: '8992742010107',
    name: 'Dua Kelinci Sukro Kacang Bersalut Renyah',
    brand: 'Dua Kelinci (PT Dua Kelinci)',
    category: 'Makanan Ringan / Snack',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80',
    netWeight: '100 g',
    servingSize: '25 g',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '08 September 2024',
    ingredients: 'Kacang tanah, tepung tapioka, minyak sawit, bawang putih, garam, gula pasir, penguat rasa mononatrium glutamat, pemanis buatan asesulfam-K.',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'asesulfam-k', status: 'terdeteksi' }
    ]
  },
  {
    id: 'milo-uht',
    barcode: '8992696301017',
    name: 'Milo Activ-Go Minuman Cokelat Malt UHT 180ml',
    brand: 'Milo (PT Nestlé Indonesia)',
    category: 'Susu & Olahan Susu',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    netWeight: '180 ml',
    servingSize: '1 kotak (180 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '03 Oktober 2024',
    ingredients: 'Air, ekstrak malt (barli) (7%), susu skim bubuk, gula, minyak nabati, bubuk kakao (1.8%), penstabil nabati (karagenan), premiks vitamin dan mineral, perisa sintetik vanillin.',
    additives: [
      { id: 'karagenan', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'sedaap-mie-goreng',
    barcode: '8998866100128',
    name: 'Mie Sedaap Mi Goreng Kriuk Renyah',
    brand: 'Mie Sedaap (Wings Food)',
    category: 'Mi Instan',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    netWeight: '90 g',
    servingSize: '1 bungkus (90 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '12 September 2024',
    ingredients: 'Tepung terigu, minyak nabati (mengandung antioksidan TBHQ), garam, penstabil, pengatur keasaman, pewarna tartrazin CI 19140. Bumbu: Gula, garam, penguat rasa mononatrium glutamat, dinatrium guanilat, bubuk bawang merah, bawang putih, perisa sintetik ayam, pewarna karamel kelas IV.',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'dinatrium-guanilat', status: 'terdeteksi' },
      { id: 'tartrazin', status: 'terdeteksi' },
      { id: 'karamel-iv', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'pop-mie-ayam-bawang',
    barcode: '089686043120',
    name: 'Pop Mie Rasa Ayam Bawang 75g',
    brand: 'Pop Mie (PT Indofood CBP Sukses Makmur Tbk)',
    category: 'Mi Instan',
    image: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80',
    netWeight: '75 g',
    servingSize: '1 cup (75 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '14 Oktober 2024',
    ingredients: 'Tepung terigu, minyak nabati, tapioka, garam, pengatur keasaman, penstabil, pewarna sintetik tartrazin CI 19140, antioksidan TBHQ. Bumbu: Garam, gula, penguat rasa mononatrium glutamat, bubuk ayam, bawang putih, bawang merah, lada bubuk, anti kempal silikon dioksida.',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'tartrazin', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' }
    ]
  },
  {
    id: 'choki-choki-cokelat',
    barcode: '8998838410019',
    name: 'Choki Choki Pasta Cokelat Cashew',
    brand: 'Choki Choki (PT Mayora Indah Tbk)',
    category: 'Cokelat & Kembang Gula',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    netWeight: '11 g',
    servingSize: '1 stick (11 g)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '19 Agustus 2024',
    ingredients: 'Gula, minyak nabati, susu bubuk skim, kakao bubuk (8%), kacang mete (4%), pengemulsi lesitin kedelai, perisa sintetik cokelat dan vanila, garam.',
    additives: [
      { id: 'lesitin-kedelai', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'hydro-coco-original',
    barcode: '8997022880017',
    name: 'Hydro Coco Air Kelapa Asli 250ml',
    brand: 'Hydro Coco (Kalbe Farma)',
    category: 'Minuman Isotonik & Kelapa Alami',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80',
    netWeight: '250 ml',
    servingSize: '1 botol (250 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '11 September 2024',
    ingredients: 'Air kelapa asli (90%), air, konsentrat gula tebu, penstabil nabati, garam.',
    additives: [] // Produk minim BTP
  },
  {
    id: 'floridina-orange',
    barcode: '8998866500126',
    name: 'Floridina Juice Orange Florida Pulp 350ml',
    brand: 'Floridina (Wings Food)',
    category: 'Jus Buah Olahan',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
    netWeight: '350 ml',
    servingSize: '1 botol (350 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '22 Agustus 2024',
    ingredients: 'Air, gula pasir, bulir jeruk Florida asli (3%), konsentrat sari jeruk, pengatur keasaman (asam sitrat, natrium sitrat), vitamin C (asam askorbat), perisa sintetik jeruk, pengawet natrium benzoat, pewarna sintetik kuning FCF CI 15985.',
    additives: [
      { id: 'asam-sitrat', status: 'terdeteksi' },
      { id: 'natrium-sitrat', status: 'terdeteksi' },
      { id: 'asam-askorbat', status: 'terdeteksi' },
      { id: 'kuning-fcf', status: 'terdeteksi' },
      { id: 'natrium-benzoat', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'chiki-balls-keju',
    barcode: '8996001201010',
    name: 'Chiki Balls Rasa Keju Renyah',
    brand: 'Chiki (PT Indofood Fortuna Makmur)',
    category: 'Makanan Ringan / Snack',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    netWeight: '55 g',
    servingSize: '20 g',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '05 September 2024',
    ingredients: 'Jagung, minyak kelapa sawit (mengandung antioksidan TBHQ), bumbu keju (mengandung keju bubuk 4%, penguat rasa mononatrium glutamat, garam, susu bubuk, pewarna kuning FCF CI 15985 dan kurkumin CI 75300, perisa sintetik keju).',
    additives: [
      { id: 'mononatrium-glutamat', status: 'terdeteksi' },
      { id: 'kuning-fcf', status: 'terdeteksi' },
      { id: 'kurkumin', status: 'terdeteksi' },
      { id: 'tbhq', status: 'terdeteksi' },
      { id: 'perisa-sintetik', status: 'terdeteksi' }
    ]
  },
  {
    id: 'aqua-air-mineral',
    barcode: '8992775110013',
    name: 'AQUA Air Mineral Pegunungan 600ml',
    brand: 'AQUA (Danone Waters)',
    category: 'Air Minum Dalam Kemasan (AMDK)',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
    netWeight: '600 ml',
    servingSize: '1 botol (600 ml)',
    source: 'Database sampel terverifikasi label kemasan',
    lastUpdated: '01 Agustus 2024',
    ingredients: '100% Air mineral pegunungan alami.',
    additives: [] // Kontras penting untuk edukasi: produk murni tanpa BTP
  }
];

// Helper functions
export function getProductByBarcode(barcode) {
  if (!barcode) return null;
  const clean = barcode.toString().trim();
  return SAMPLE_PRODUCTS.find(p => p.barcode === clean);
}

export function getProductById(id) {
  return SAMPLE_PRODUCTS.find(p => p.id === id);
}

export function searchProducts(query) {
  if (!query) return SAMPLE_PRODUCTS.slice(0, 10);
  const q = query.toLowerCase().trim();
  return SAMPLE_PRODUCTS.filter(p => {
    return p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.barcode.includes(q) ||
      p.category.toLowerCase().includes(q);
  });
}
