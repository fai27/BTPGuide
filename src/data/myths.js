// Edukasi "Mitos atau Fakta" seputar Bahan Tambahan Pangan (BTP)
// Berdasarkan sains keamanan pangan, WHO, Codex Alimentarius, dan BPOM RI

export const BTP_MYTHS = [
  {
    id: 'myth-1',
    statement: 'Semua bahan tambahan pangan (BTP) kimia bersifat berbahaya dan beracun bagi tubuh.',
    isFact: false,
    verdict: 'MITOS',
    explanation: 'Tidak benar. BTP yang disetujui BPOM telah melalui serangkaian pengujian toksikologis ketat bertahun-tahun. Prinsip dasar toksikologi "Dosis yang menentukan racun" berlaku. Dalam takaran batas maksimum yang diizinkan (Acceptable Daily Intake/ADI), BTP aman dikonsumsi dan banyak yang berasal dari asam organik alami (seperti asam sitrat dari jeruk atau lesitin dari kedelai).',
    recommendation: 'Kenali jenis dan fungsinya secara objektif, serta konsumsi makanan dengan gizi seimbang.'
  },
  {
    id: 'myth-2',
    statement: 'MSG (Monosodium Glutamat) dapat merusak sel otak dan membuat seseorang menjadi bodoh.',
    isFact: false,
    verdict: 'MITOS',
    explanation: 'Mitos yang sangat populer namun tidak didukung bukti ilmiah. Glutamat adalah asam amino yang secara alami melimpah dalam ASI (air susu ibu), keju, jamur, dan tomat. Tubuh manusia memetabolisme glutamat dari MSG persis sama seperti glutamat dari bahan alami. JECFA (WHO/FAO) dan US FDA menetapkan MSG dalam kategori GRAS (Generally Recognized as Safe) dengan toleransi tinggi.',
    recommendation: 'MSG aman digunakan sebagai penambah selera makan, namun tetap perhatikan asupan natrium total harian Anda.'
  },
  {
    id: 'myth-3',
    statement: 'Makanan kemasan tanpa pengawet selalu lebih higienis dan aman dibanding yang berpewawet.',
    isFact: false,
    verdict: 'MITOS',
    explanation: 'Belum tentu. Pengawet pangan digunakan secara sengaja untuk mencegah tumbuhnya bakteri patogen berbahaya seperti *Clostridium botulinum* yang menghasilkan racun mematikan, atau kapang penghasil aflatoksin karsinogenik. Pada produk yang tidak disterilisasi mutlak (seperti saus atau selai pasca buka kemasan), pengawet melindungi konsumen dari keracunan makanan akut.',
    recommendation: 'Pengawet resmi BPOM menjamin keamanan mikrobiologis produk selama masa simpan.'
  },
  {
    id: 'myth-4',
    statement: 'Pewarna alami selalu 100% lebih unggul dari pewarna sintetis yang disetujui BPOM.',
    isFact: false,
    verdict: 'MITOS',
    explanation: 'Pewarna sintetis pangan yang legal (seperti Tartrazin CI 19140 atau Sunset Yellow) memiliki keunggulan berupa kemurnian kimia yang terstandar tinggi, tahan pemanasan suhu pabrik, dan tidak memicu reaksi alergi dari protein asing alami. Beberapa ekstrak pewarna alami yang tidak dimurnikan justru dapat mengandung residu protein pemicu alergi atau cepat terdegradasi menjadi senyawa berbau.',
    recommendation: 'Keduanya aman selama menggunakan jenis dan kadar yang sesuai standar regulasi BPOM.'
  },
  {
    id: 'myth-5',
    statement: 'Pemanis buatan seperti Sukralosa dan Aspartam tidak memicu kenaikan lonjakan gula darah.',
    isFact: true,
    verdict: 'FAKTA',
    explanation: 'Fakta ilmiah. Pemanis buatan berintensitas tinggi tidak dipecah menjadi glukosa oleh tubuh manusia, sehingga tidak memicu kenaikan indeks glikemik maupun pelepasan insulin. Oleh karena itu, pemanis buatan sering digunakan sebagai alternatif pemanis yang aman bagi penderita diabetes melitus dan manajemen berat badan.',
    recommendation: 'Pemanis buatan dapat menjadi alat bantu diet rendah kalori dalam batas ADI yang ditentukan.'
  },
  {
    id: 'myth-6',
    statement: 'Kode "E" atau "INS" pada label komposisi menunjukkan bahwa bahan tersebut haram atau mencurigakan.',
    isFact: false,
    verdict: 'MITOS',
    explanation: 'Kode "E" (Europe) atau INS (International Numbering System) hanyalah sistem penomoran ilmiah universal yang diciptakan oleh Codex Alimentarius WHO/FAO agar nama bahan kimia pangan dapat dikenali di seluruh dunia tanpa kendala bahasa. Contoh: E300 adalah Vitamin C murni, E330 adalah Asam Sitrat buah jeruk, dan E100 adalah Kurkumin kunyit. Status kehalalan ditentukan oleh sumber bahan baku dan audit LPPOM MUI / BPJPH.',
    recommendation: 'Kode E adalah standar transparansi internasional, bukan tanda bahan berbahaya.'
  }
];
