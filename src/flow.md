flowchart TD
    %% Definisi Node & Alur 1: Onboarding & Beranda
    Start(["Mulai: Buka Aplikasi"]) --> Onboarding["Onboarding Screen"]
    Onboarding -->|"Klik Mulai Sekarang"| Home["Home Dashboard"]
    
    %% Navigasi Utama dari Home
    Home --> MenuChoice{"Pilih Metode Pemeriksaan"}
    MenuChoice -->|"Scan Barcode"| ScannerScreen["Halaman Barcode Scanner"]
    MenuChoice -->|"Foto Komposisi Langsung"| CaptureScreen["Halaman Upload / Foto Komposisi"]
    MenuChoice -->|"Pencarian Manual"| SearchInput["Ketik Nama atau Barcode Produk"]
    MenuChoice -->|"Akses Menu Bawah"| BottomNav["Menu Riwayat / Edukasi / Profil"]

    %% Alur 2: Barcode Scanner
    ScannerScreen --> ScannerAction[/"Arahkan Kamera / Pilih Barcode Demo"/]
    ScannerAction --> QueryDB["Cari Nomor Barcode pada Database Sampel"]
    SearchInput --> QueryDB

    QueryDB --> CheckBarcode{"Barcode Ditemukan?"}

    %% Skenario Barcode Ditemukan
    CheckBarcode -->|"Ya"| FetchProduct["Ambil Data Produk & Relasi BTP"]
    FetchProduct --> SaveHistory1["Simpan ke Riwayat Scan"]
    SaveHistory1 --> ProductDetail["Halaman Detail Produk & Hasil BTP"]

    %% Skenario Barcode Tidak Ditemukan
    CheckBarcode -->|"Tidak"| NotFound["Halaman Produk Belum Terdaftar"]
    NotFound --> NotFoundChoice{"Pilihan Pengguna"}
    NotFoundChoice -->|"Coba Input Manual"| ScannerScreen
    NotFoundChoice -->|"Foto Komposisi"| CaptureScreen

    %% Alur 3: OCR / Pemindaian Komposisi
    CaptureScreen --> UploadAction[/"Ambil Foto Kamera / Upload Galeri"/]
    UploadAction --> PreviewImage["Tampilkan Preview & Checklist Foto"]
    PreviewImage -->|"Klik Analisis Komposisi"| OCRProcess["Proses OCR: Ekstraksi Teks Komposisi"]

    OCRProcess --> ParseText["Normalisasi & Parsing Kata / Frasa"]
    ParseText --> MatchBTP["Cocokkan Istilah dengan Kamus Basis Data BTP"]

    MatchBTP --> VerifyText{"Ada Istilah Tidak Jelas / Belum Dikenali?"}
    VerifyText -->|"Ya"| EditPrompt["Tandai Perlu Diperiksa & Izinkan Edit Manual"]
    EditPrompt --> MatchBTP
    VerifyText -->|"Tidak"| OCRResultView["Tampilkan Hasil Deteksi & Highlight Teks"]

    OCRResultView --> SaveHistory2["Simpan Hasil OCR ke Riwayat"]
    SaveHistory2 --> ProductDetail

    %% Alur 4: Detail Hasil & Edukasi BTP
    ProductDetail --> DetailInteraction{"Interaksi Pengguna"}
    DetailInteraction -->|"Klik Card BTP Tertentu"| BTPEducation["Halaman Edukasi Detail BTP"]
    DetailInteraction -->|"Klik Scan Produk Lain"| ScannerScreen
    DetailInteraction -->|"Selesai / Kembali ke Beranda"| Home

    BTPEducation -->|"Tutup Edukasi"| ProductDetail

    %% Alur 5: Menu Lainnya
    BottomNav --> EndState(["Selesai / Eksplorasi Selesai"])

    %% Class Styling
    classDef startEnd fill:#176B45,stroke:#17231C,stroke-width:2px,color:#FFFFFF;
    classDef process fill:#FFFFFF,stroke:#176B45,stroke-width:1.5px,color:#17231C;
    classDef decision fill:#E6F4EA,stroke:#176B45,stroke-width:2px,color:#17231C;
    classDef warning fill:#FFF3E0,stroke:#F5A623,stroke-width:1.5px,color:#17231C;

    class Start,EndState startEnd;
    class Onboarding,Home,ScannerScreen,CaptureScreen,SearchInput,BottomNav,ScannerAction,QueryDB,FetchProduct,SaveHistory1,ProductDetail,UploadAction,PreviewImage,OCRProcess,ParseText,MatchBTP,OCRResultView,SaveHistory2,BTPEducation process;
    class MenuChoice,CheckBarcode,NotFoundChoice,VerifyText,DetailInteraction decision;
    class NotFound,EditPrompt warning;