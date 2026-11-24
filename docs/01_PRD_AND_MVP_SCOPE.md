# MAZÉLIA — PRODUCT REQUIREMENTS DOCUMENT (PRD) & MVP SCOPE

**Dokumen Versi:** 1.0 — Final Specification  
**Status:** Ready for Development Review  
**Penulis:** Senior Product Manager & Senior Business Analyst  
**Tanggal:** November 2026  

---

## 1. Identitas Produk

- **Nama Produk:** MAZÉLIA
- **Tagline:** *Events • Moments • Memories*
- **Platform:** Web Application (Responsive Desktop & Mobile-First)
- **Target Pasar:** Indonesia (Individu & Keluarga)
- **Karakter Brand:** Elegant, Premium, Modern, Minimalist, Trustworthy, User-friendly.
- **Arsitektur Inti:** Modular Monolith (Next.js 15 App Router + Supabase PostgreSQL).

---

## 2. Visi Produk & Problem-Solution Fit

### Visi
Menjadi platform digital elegan nomor satu di Indonesia yang mendampingi individu dan keluarga merencanakan, mengelola, dan mengenang momen-momen paling sakral dan berharga dalam hidup mereka secara terstruktur, tenang, dan tanpa stres.

### Nilai Utama (Value Proposition)
> *"Mengubah kecemasan perencanaan acara menjadi pengalaman yang elegan, tenang, dan terorganisir dalam satu kanvas digital yang harmonis."*

### Masalah Nyata & Solusi MAZÉLIA
| Masalah Nyata Pengguna | Cara Konvensional di Indonesia | Solusi Terintegrasi MAZÉLIA |
| :--- | :--- | :--- |
| **Anggaran Bocor & Tercecer** | Spreadsheet rumit, buku catatan fisik, atau chat WhatsApp yang tertimbun. | **Budget Planner Real-time:** Kalkulasi otomatis estimasi vs aktual, pelacakan DP/lunas, dan status surplus/defisit berbasis Rupiah (IDR). |
| **Tugas Persiapan Tidak Terstruktur** | Mengingat-ingat secara manual; panik saat H-1 bulan ada vendor/dokumen KUA terlewat. | **Pre-populated Checklist & Timeline:** Tugas otomatis sesuai jenis acara dengan tenggat waktu berbasis fase (H-6 bln, H-1 bln, Hari-H). |
| **Pelacakan Tamu & RSVP Semrawut** | Rekap manual di Excel; tidak tahu pasti berapa kursi/pax katering yang harus disiapkan. | **Guest Management Terpusat:** Pengelompokan tamu (Keluarga, VIP, Rekan), kuota pax, status RSVP, dan generator teks undangan WhatsApp satu klik. |
| **Informasi Undangan Terpisah dari Perencanaan** | Membuat undangan di platform web vendor terpisah yang tidak terhubung dengan daftar tamu. | **Unified Ecosystem:** Buku tamu dan RSVP terhubung langsung dengan workspace acara pemilik hajat (Fase 2). |
| **Pencarian Vendor Tidak Transparan** | Menelusuri Instagram tanpa patokan harga awal (*starting price*), menunggu balasan admin berhari-hari. | **Curated Vendor Directory:** Portofolio kurasi berstandar visual tinggi, kisaran harga jelas, dan kontak direct WhatsApp (Fase 2/3). |

---

## 3. Product Owner Strategic Decisions

Berikut adalah analisis mendalam terhadap 3 keputusan strategis produk yang membutuhkan konfirmasi dan persetujuan dari Product Owner:

### Decision A — Initial Market Focus
*Apakah MAZÉLIA sebaiknya diluncurkan dengan fokus Wedding & Engagement saja, semua kategori acara personal sejak awal, atau pendekatan hibrida?*

| Pilihan | Kelebihan | Kekurangan | Dampak Teknis & Database | Rekomendasi Konsorsium |
| :--- | :--- | :--- | :--- | :--- |
| **Opsi 1: Wedding & Engagement Saja** | Positioning sangat tajam; mudah membangun reputasi mewah; audiens pernikahan memiliki *willingness-to-pay* tertinggi. | Kehilangan momentum untuk pengguna yang ingin merencanakan ulang tahun, wisuda, atau gathering keluarga. | Database terikat kaku pada atribut pernikahan (misal: kolom khusus nama pengantin pria/wanita); perlu refactor jika membuka event lain. | *Alternatif Kuat* jika anggaran pemasaran sangat terbatas. |
| **Opsi 2: Semua Kategori Acara Sekaligus** | Pasar sangat luas; mencakup ulang tahun, anniversary, graduation, aqiqah, dan gathering. | Pesan pemasaran menjadi bias/generik; sulit bersaing dengan vendor spesialis pernikahan; beban kurasi template terlalu banyak di awal. | Skema database harus sangat generik dan dinamis sejak hari pertama; template checklist harus disiapkan untuk 6+ kategori. | *Tidak Disarankan* untuk tahap awal karena melemahkan persepsi luxury. |
| **Opsi 3: Wedding & Engagement sebagai Fokus Pemasaran, Sistem Multi-Event Agnostik** | **Terbaik dari kedua dunia:** Kampanye brand dan landing page memprioritaskan nuansa pernikahan/lamaran (pasar paling menguntungkan), namun arsitektur data dan aplikasi tetap mendukung acara personal lainnya secara mulus. | Membutuhkan perancangan tabel kategori dan relasi yang fleksibel sejak awal. | Tabel `event_categories` bersifat relasional dinamis; tabel `events` dan `event_sessions` dirancang generik sehingga mendukung sesi akad/resepsi maupun sesi tiup lilin/makan malam. | **REKOMENDASI UTAMA (SANGAT DISARANKAN)** |

---

### Decision B — MVP Beta Pricing
*Bagaimana strategi monetisasi selama masa peluncuran MVP Beta?*

| Pilihan | Kelebihan | Kekurangan | Dampak Teknis | Rekomendasi Konsorsium |
| :--- | :--- | :--- | :--- | :--- |
| **Opsi 1: Semua Fitur Planner Gratis Selama Beta** | Friksi pendaftaran 0%; adopsi sangat cepat; mempermudah pengumpulan umpan balik pengguna dan testimoni autentik. | Tidak ada pemasukan langsung; ada risiko pengguna menganggap platform akan gratis selamanya. | Tidak perlu integrasi payment gateway pada MVP; proses development 2–3 minggu lebih cepat. | **REKOMENDASI UTAMA (SANGAT DISARANKAN)** |
| **Opsi 2: Freemium Sejak Hari Pertama** | Menguji kesediaan membayar (*willingness-to-pay*) sejak dini. | Konversi sangat rendah jika basis pengguna belum terbangun dan kepercayaan brand belum terbentuk. | Memerlukan implementasi paywall, kuota limit, dan billing engine sejak awal. | *Tidak Disarankan* untuk MVP perdana. |
| **Opsi 3: Event Pass Berbayar Pasca-Beta (Rp99.000–Rp149.000 per Event)** | Menggantikan langganan bulanan yang rentan *churn*; model sekali bayar sangat disukai konsumen acara personal di Indonesia. | Perlu edukasi transisi dari masa beta gratis ke berbayar. | Disiapkan untuk Fase 2 bersamaan dengan rilis Digital Invitation dan integrasi Midtrans. | **ROADMAP PASCA-BETA TERBAIK** |

---

### Decision C — Format URL Digital Invitation (Fase 2)
*Bagaimana format URL publik untuk halaman undangan digital?*

| Pilihan | Kelebihan | Kekurangan | Dampak Teknis | Rekomendasi Konsorsium |
| :--- | :--- | :--- | :--- | :--- |
| **Opsi 1: `mazelia.com/i/[slug]`** | **Paling sederhana, andal, dan zero-cost DNS overhead.** Otomatis mewarisi SSL certificate root domain; SEO domain authority terpusat pada satu domain utama. | Link terasa sedikit lebih panjang dibanding subdomain khusus. | Standar Next.js dynamic route `app/i/[slug]/page.tsx`. Zero configuration pada Nginx/Vercel routing. | **REKOMENDASI UTAMA (SANGAT DISARANKAN)** |
| **Opsi 2: `invite.mazelia.com/[slug]`** | Memisahkan brand aplikasi web utama dengan halaman publik undangan. | Perlu konfigurasi CNAME subdomain terpisah. | Memerlukan setup reverse proxy atau multi-zone routing Next.js. | *Alternatif Menengah*. |
| **Opsi 3: Subdomain Personal (`[slug].mazelia.com`)** | Terkesan sangat personal dan eksklusif bagi pasangan/penyelenggara. | Sangat rumit; memerlukan Wildcard SSL Certificate, otomatisasi konfigurasi DNS dinamis, dan potensi benturan nama subdomain sistem. | Kompleksitas infrastruktur sangat tinggi; rentan error SSL pada jaringan seluler Indonesia. | *Tidak Disarankan* untuk fase awal. |

---

## 4. Final MVP Scope Boundaries (In-Scope vs Out-of-Scope)

Prinsip utama: **Membangun alat perencanaan terbaik yang benar-benar memecahkan masalah pengguna sebelum memperluas platform ke modul komersial lainnya.**

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FINAL MVP SCOPE DEFINITION                      │
├────────────────────────────────────────────────────────────────────────┤
│  [IN-SCOPE — WAJIB TERSEDIA DI MVP]                                    │
│  1. Public Landing Page editorial, responsif, dan konversi tinggi.     │
│  2. Autentikasi Pengguna: Email/Password & Google OAuth (Supabase).   │
│  3. Manajemen Profil Pengguna (Nama, No. WhatsApp, Avatar).            │
│  4. Event Management Hub (Multi-event context, detail, countdown).     │
│  5. Pre-populated Checklist & Timeline (Tugas otomatis per kategori).  │
│  6. Budget Planner Presisi Rupiah (Estimasi vs Aktual, status DP).     │
│  7. Guest Management Dasar (Daftar tamu, grup, pax, RSVP manual).      │
│  8. One-Click WhatsApp Invitation Message Generator.                   │
│  9. User Dashboard Overview (Kartu ringkasan metrik acara terpadu).    │
│  10. Row Level Security (RLS) PostgreSQL untuk isolasi data privat.   │
├────────────────────────────────────────────────────────────────────────┤
│  [OUT-OF-SCOPE — DITUNDA SECARA TEGAS KE FASE 2 & FASE 3]              │
│  ✗ Digital Invitation Theme Renderer & Publikasi Link (Fase 2).        │
│  ✗ Integrasi Midtrans Payment Gateway & Invoicing Otomatis (Fase 2).   │
│  ✗ Direktori Vendor Terkurasi & Tombol Tanya Vendor (Fase 2).          │
│  ✗ Portal Vendor Mandiri & Vendor Dashboard (Fase 3).                  │
│  ✗ Sistem Escrow Booking & Pembayaran Vendor via Web (Fase 3).         │
│  ✗ Realtime Chat Internal & QR Code Check-in Meja Resepsi (Fase 3).    │
│  ✗ Native Mobile App Android/iOS (Dioptimalkan via Web PWA).           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Pertanyaan Persetujuan untuk Product Owner

Mohon konfirmasi Anda terhadap 3 rekomendasi di atas:
1. **Konfirmasi Decision A:** Apakah menyetujui pendekatan Opsi 3 (Pemasaran fokus pada Wedding & Engagement, namun fondasi sistem dan database agnostik multi-event)?
2. **Konfirmasi Decision B:** Apakah menyetujui pendekatan Opsi 1 untuk MVP (Semua fitur Planner gratis penuh selama masa beta awal, lalu beralih ke Event Pass di Fase 2)?
3. **Konfirmasi Decision C:** Apakah menyetujui pendekatan Opsi 1 untuk format URL undangan digital (menggunakan jalur `mazelia.com/i/[slug]`)?
