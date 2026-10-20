# BTPGuide - Panduan Cerdas Bahan Tambahan Pangan (BTP)

> **"Kenali isi makananmu, pilih dengan lebih bijak."**

Aplikasi web modern berbasis arsitektur **Next.js ready**, **Supabase (PostgreSQL BaaS)**, dan **html5-qrcode** untuk membantu masyarakat awam dan civitas akademika mengenali serta memahami **Bahan Tambahan Pangan (BTP)** pada produk makanan dan minuman kemasan melalui pemindaian barcode (EAN-13) atau pemindaian foto label komposisi (OCR) sesuai aturan resmi **BPOM RI No. 11 Tahun 2019** dan **Codex Alimentarius CXS 192-1995**.

---

## 🏛️ Arsitektur Sistem & Database (Supabase PostgreSQL)

Sistem dirancang dengan arsitektur modular yang memisahkan layer data, layanan API relasional, dan komponen UI.

### Entity-Relationship (ER) Overview
Sistem mengelola tiga entitas utama dengan relasi *Many-to-Many* antara **Produk** dan **BTP**:

1. **Produk (`products`)**:
   - `id` (UUID / PK): Identitas unik produk.
   - `barcode` (VARCHAR, Unique): Nomor barcode standar EAN-13.
   - `name` (VARCHAR): Nama produk kemasan.
   - `manufacturer` / `brand` (VARCHAR): Nama produsen / merek.
   - `category` (VARCHAR): Kategori pangan (minuman, mi instan, snack, dll).
   - `image_url` (TEXT): Foto produk.
   - `ingredients_raw` (TEXT): Teks mentah daftar komposisi.

2. **BTP (`btp`)**:
   - `id` (VARCHAR / PK): Kode unik / slug BTP.
   - `ins_code` (VARCHAR): Kode INS (*International Numbering System*) / E-number (misal: *INS 621*, *INS 330*, *INS 211*).
   - `chemical_name` (VARCHAR): Nama kimia resmi bahan.
   - `name` (VARCHAR): Nama umum bahan tambahan.
   - `technical_function` (VARCHAR): Golongan fungsi teknologi pangan (Pengawet, Penguat Rasa, Pewarna, dll).
   - `health_notes` / ADI (TEXT): Catatan evaluasi keamanan, ADI (*Acceptable Daily Intake*), dan batas BPOM.
   - `why_used` (TEXT): Alasan industri makanan menggunakannya.
   - `common_foods` (TEXT[]): Contoh makanan lain yang lazim menggunakannya.
   - `reference_source` (VARCHAR): Sumber hukum regulasi (*BPOM No. 11/2019 / JECFA*).

3. **Riwayat Pindai (`scan_logs`)**:
   - `id` (VARCHAR / PK): ID log pemindaian.
   - `session_id` (VARCHAR): Token sesi anonim atau ID pengguna.
   - `product_id` (FK NULL): ID produk terdeteksi (jika ada).
   - `scanned_barcode` (VARCHAR): Nomor barcode yang dipindai.
   - `product_name` (VARCHAR): Nama produk atau label pindaian.
   - `scan_method` (VARCHAR): Metode scan (`barcode` atau `composition`).
   - `additives_detected_count` (INT): Jumlah BTP yang teridentifikasi.
   - `scanned_at` (TIMESTAMPTZ): Waktu pemindaian.
   - **Analisis Tren**: Agregasi otomatis untuk menghitung produk terpopuler, rasio barcode vs foto label, dan total pemindaian.

4. **Tabel Junction Many-to-Many (`product_btp`)**:
   - `product_id` (FK -> `products.id`)
   - `btp_id` (FK -> `btp.id`)
   - `status` (VARCHAR): `terdeteksi` | `perlu-verifikasi`

---

## 🛠️ Technical Stack Selection (PRD Alignment)

| Komponen | Teknologi | Deskripsi & Rasional |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js & ES6 Vanilla Modules** | Performa tinggi, SEO-friendly, layout web desktop luas & mobile-first responsif murni tanpa bingkai emulator tablet buatan. |
| **Backend & Database** | **Supabase (PostgreSQL BaaS)** | Client abstraction modular (`src/services/supabase.js`) siap diganti ke live instance Supabase dengan 1 baris config. |
| **Barcode Library** | **html5-qrcode** | Pemindaian barcode EAN-13 langsung melalui peramban webcam tanpa dependensi native app. |
| **UI/UX Strategy** | **Figma Design System** | Pop-up modal interaktif detail BTP, 2-column desktop workstation, palet hijau elegan `#176B45`. |

### 5. Foto Komposisi & Unggah Gambar (Composition Capture)
- Dropzone upload foto label kemasan (kamera / galeri).
- **Preset Sampel Uji Cepat**: Contoh foto label nyata (*Snack Sapi Panggang*, *Minuman Kola Diet*, *Biskuit Cokelat*, *Jus Jeruk*, *Mi Kari*).
- Checklist kualitas foto: ketajaman tulisan, pencahayaan cukup, dan seluruh teks bahan terpotret.

### 6. Analisis OCR & Pencocokan Istilah BTP
- Animasi pemrosesan 4 langkah:
  1. *Membaca teks pada gambar (OCR)*
  2. *Mengenali istilah Bahan Tambahan Pangan*
  3. *Mencocokkan istilah dengan basis data BPOM No. 11/2019*
  4. *Menyiapkan ringkasan edukasi*
- **Editor Teks Langsung**: Memungkinkan koreksi manual jika hasil OCR kamera kurang sempurna.
- **Highlight Hijau Dinamis**: Menyorot istilah BTP resmi dan membedakannya dari bahan pangan biasa (*tepung, gula, garam, minyak nabati*).

### 7. Detail Produk & Hasil BTP (Halaman Terpenting)
- Foto produk, nama merek, nomor barcode, dan kategori.
- Label sumber: *"Database sampel terverifikasi"* vs *"Hasil pembacaan label foto (OCR)"*.
- **Pemberitahuan Edukatif Wajib**:
  > *"Keberadaan BTP tidak otomatis berarti produk berbahaya. Penilaian perlu mempertimbangkan jenis bahan, jumlah penggunaannya, kategori pangan, dan ketentuan yang berlaku sesuai standar BPOM RI dan Codex Alimentarius."*
- **Kartu Akordion Interaktif untuk Setiap BTP**:
  - Nama resmi & nama alias/label.
  - Kode INS (International Numbering System) / E-Number (misal: *INS 621*, *INS 330*, *INS 211*).
  - Golongan fungsi teknologi pangan.
  - Penjelasan bahasa awam yang bersahabat.
  - Alasan industri menggunakannya.
  - Evaluasi keamanan, ADI (*Acceptable Daily Intake*), dan batas BPOM.
  - Contoh makanan lain yang lazim menggunakannya.
  - Referensi regulasi resmi.
- Aksi: Simpan ke Riwayat, Salin Ringkasan, dan Scan Produk Lain.

### 8. Ensiklopedia & Kamus BTP Lengkap
- Profil mendalam tiap BTP.
- 7 Kategori utama BTP BPOM: *Pengawet, Pewarna, Pemanis, Penguat Rasa, Pengatur Keasaman, Pengemulsi & Penstabil, Antioksidan, Perisa Pangan*.
- **Mitos atau Fakta Pangan**: Kartu interaktif buka-tutup untuk meluruskan miskonsepsi seputar MSG, pemanis buatan, pewarna sintetis, dan kode E.
- **Kamus BTP**: Pencarian langsung nama bahan atau kode INS.

### 9. Riwayat Pemindaian (Scan History)
- Riwayat tersimpan di *LocalStorage*.
- Filter berdasarkan metode: *Semua*, *Barcode*, *Foto Komposisi*.
- Klik item riwayat untuk membuka kembali hasil analisis sebelumnya.
- Opsi hapus satuan atau kosongkan seluruh riwayat.

### 10. Profil & Landasan Regulasi
- Gambaran proyek akademik kampus.
- Referensi resmi:
  1. *Peraturan BPOM No. 11 Tahun 2019 tentang Bahan Tambahan Pangan*.
  2. *Peraturan BPOM No. 31 Tahun 2018 tentang Label Pangan Olahan*.
  3. *Codex Alimentarius Commission (FAO/WHO) GSFA CXS 192-1995 & JECFA*.
- Switcher mode tampilan desktop/tablet vs ponsel.

---

## 🎨 Design System

- **Primary**: Hijau Tua `#176B45`
- **Secondary**: Hijau Muda `#E6F4EA`
- **Background**: `#F8FAF8`
- **Surface**: `#FFFFFF`
- **Text Utama**: `#17231C`
- **Text Sekunder**: `#66736A`
- **Warning**: `#F5A623`
- **Danger**: `#D9534F`
- **Border**: `#E2E9E3`
- **Tipografi**: Plus Jakarta Sans & Inter
- **Radius**: Card 16px, Tombol 12px, Tag Pill 9999px.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi dibangun menggunakan **HTML5, CSS Vanilla murni, ES6 Modules modern, Lucide Icons, dan Vite**.

### 1. Prasyarat
- Node.js (v18 ke atas) & npm

### 2. Instalasi & Menjalankan Dev Server
```bash
# Buka direktori proyek
cd "d:\Kuliah\Semester 5\Tekno\Project\BTPGuide"

# Jalankan server pengembangan
npm run dev
```

Buka peramban pada: `http://localhost:5173/`

### 3. Build Produksi
```bash
npm run build
```
Hasil build siap di-*deploy* berada di folder `dist/`.

---

## 📂 Struktur Proyek

```
BTPGuide/
├── index.html                   # HTML Entry Point
├── package.json                 # Konfigurasi dependensi (Vite, Lucide, Html5Qrcode)
├── vite.config.js               # Konfigurasi Vite
├── src/
│   ├── main.js                  # App router & router controller
│   ├── styles/
│   │   ├── variables.css        # Token warna & design system
│   │   ├── base.css             # Tipografi & reset
│   │   ├── components.css       # Tombol, card, modal, toast, form
│   │   ├── layout.css           # Shell mobile-first & responsive desktop
│   │   └── screens.css          # Styling halaman spesifik
│   ├── data/
│   │   ├── products.js          # 30+ sampel produk Indonesia & barcode EAN-13
│   │   ├── additives.js         # Kamus 25+ BTP resmi BPOM & detail ilmiah
│   │   ├── categories.js        # 7 golongan teknologi pangan BPOM
│   │   ├── myths.js             # Edukasi Mitos vs Fakta
│   │   └── demoScans.js         # Preset label komposisi untuk uji OCR
│   ├── services/
│   │   ├── scanner.js           # Wrapper Barcode Scanner (Html5Qrcode)
│   │   ├── ocrMatcher.js        # Algoritma pencocok BTP & pemisah bahan
│   │   └── storage.js           # LocalStorage helper riwayat & preferensi
│   ├── components/
│   │   ├── navbar.js            # Top Header & Mobile Bottom Nav
│   │   ├── icons.js             # SVG Icon helper Lucide
│   │   ├── modal.js             # Modal barcode manual & dialog konfirmasi
│   │   └── toast.js             # Notifikasi toast mengambang
│   └── screens/
│       ├── onboarding.js        # Layar A: Onboarding
│       ├── home.js              # Layar B: Beranda & Search
│       ├── scanner.js           # Layar C: Barcode Scanner
│       ├── notFound.js          # Layar D: Produk Belum Terdaftar
│       ├── composition.js       # Layar E: Upload Foto Komposisi
│       ├── ocrAnalysis.js       # Layar F: Analisis OCR & AI
│       ├── productDetail.js     # Layar G: Hasil Analisis & Detail BTP
│       ├── additiveDetail.js    # Layar H: Profil Mendalam 1 BTP
│       ├── history.js           # Layar I: Riwayat Pemindaian
│       ├── education.js         # Layar J: Pusat Belajar & Kamus BTP
│       └── profile.js           # Layar K: Profil & Info Regulasi
```

---

## 🎓 Tim & Lisensi

Dibuat sebagai prototype akademis / proyek kampus semester 5 mata kuliah Teknologi Pangan / Informatika untuk tujuan peningkatan literasi keamanan pangan masyarakat Indonesia.
