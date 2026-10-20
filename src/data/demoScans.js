// Data contoh komposisi untuk simulasi OCR dan demo interaktif

export const DEMO_COMPOSITION_PRESETS = [
  {
    id: 'preset-snack-gurih',
    title: 'Snack Kentang Sapi Panggang',
    category: 'Keripik / Snack',
    rawOcrText: 'KOMPOSISI: Kentang 62%, minyak olein kelapa sawit (mengandung antioksidan TBHQ), bumbu sapi panggang (mengandung gula, garam, penguat rasa mononatrium glutamat, dinatrium inosinat, dinatrium guanilat, susu bubuk, pewarna karamel kelas IV, perisa sintetik daging sapi, hidrolisat protein nabati).',
    imageBadge: 'Label Snack Gurih',
    estimatedConfidence: 96,
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'preset-minuman-diet',
    title: 'Minuman Kola Rendah Kalori',
    category: 'Minuman Kemasan',
    rawOcrText: 'KOMPOSISI: Air berkarbonasi, pewarna karamel kelas IV, pengatur keasaman (asam fosfat, natrium sitrat), pemanis buatan (sukralosa 10mg/saji, asesulfam-K 16mg/saji), pengawet natrium benzoat, perisa sintetik kola, kafein.',
    imageBadge: 'Label Minuman Soda Diet',
    estimatedConfidence: 94,
    imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'preset-biskuit-krim',
    title: 'Biskuit Cokelat Krim Vanila',
    category: 'Biskuit & Roti',
    rawOcrText: 'KOMPOSISI: Tepung terigu, gula, minyak nabati (mengandung antioksidan TBHQ), bubuk kakao 4%, sirup fruktosa, pati jagung, pengembang natrium bikarbonat, garam, pengemulsi lesitin kedelai, perisa sintetik vanila.',
    imageBadge: 'Label Biskuit Cokelat',
    estimatedConfidence: 98,
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'preset-jus-jeruk',
    title: 'Minuman Sari Jeruk Siap Minum',
    category: 'Jus / Minuman Buah',
    rawOcrText: 'KOMPOSISI: Air, gula pasir, konsentrat sari jeruk, pengatur keasaman asam sitrat dan natrium sitrat, vitamin C asam askorbat, perisa sintetik jeruk, pengawet natrium benzoat, pewarna sintetik kuning FCF CI 15985.',
    imageBadge: 'Label Minuman Jus Jeruk',
    estimatedConfidence: 92,
    imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'preset-mi-kari',
    title: 'Mi Instan Kuah Kari Ayam',
    category: 'Mi Instan',
    rawOcrText: 'KOMPOSISI: Tepung terigu, minyak nabati, penstabil, garam, pengatur keasaman, pewarna sintetik tartrazin CI 19140, antioksidan TBHQ. Bumbu: Garam, gula, penguat rasa mononatrium L-glutamat, dinatrium inosinat, kurkumin, bubuk kari, bawang putih, perisa identik alami.',
    imageBadge: 'Label Mi Instan Kari',
    estimatedConfidence: 95,
    imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80'
  }
];
