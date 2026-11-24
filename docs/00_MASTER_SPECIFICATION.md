# MAZÉLIA — MASTER PRODUCT & TECHNICAL SPECIFICATION (SINGLE SOURCE OF TRUTH)

**Nama Produk:** MAZÉLIA  
**Tagline:** *Events • Moments • Memories*  
**Versi Spesifikasi:** 1.0 — Final Release Candidate  
**Status:** Menunggu Persetujuan Tertulis Product Owner (Pre-Development Sign-off)  
**Tanggal:** November 2026  

---

## 1. Ringkasan Eksekutif & Struktur Dokumentasi

Dokumen ini merupakan **Single Source of Truth (SSOT)** resmi yang mengonsolidasikan seluruh analisis, arsitektur, skema data, aturan keamanan, desain antarmuka, dan rencana implementasi platform MAZÉLIA.

Seluruh dokumentasi teknis dan fungsional terperinci telah dipisahkan ke dalam modul-modul markdown khusus di dalam folder `docs/`:

| No | File Spesifikasi | Deskripsi dan Cakupan Utama | Tautan Langsung |
| :---: | :--- | :--- | :--- |
| **01** | `01_PRD_AND_MVP_SCOPE.md` | Visi produk, segmentasi persona, batasan tegas scope MVP (*In vs Out*), dan evaluasi 3 keputusan strategis Product Owner. | [Buka Dokumen PRD](file:///d:/prast/MAZ%C3%89LIA/docs/01_PRD_AND_MVP_SCOPE.md) |
| **02** | `02_FUNCTIONAL_AND_PAGE_SPEC.md` | Alur 10-tahap pengguna (*user journey*), sitemap lengkap, dan spesifikasi 7 fitur inti MVP (Input, Aturan Bisnis, Validasi, State). | [Buka Spesifikasi Fitur](file:///d:/prast/MAZ%C3%89LIA/docs/02_FUNCTIONAL_AND_PAGE_SPEC.md) |
| **03** | `03_DATABASE_SCHEMA_AND_ERD.md` | Skrip DDL PostgreSQL siap pakai, primary key UUID, integritas moneter BIGINT (Rupiah murni), trigger otomatis, dan kamus data. | [Buka Skema Database](file:///d:/prast/MAZ%C3%89LIA/docs/03_DATABASE_SCHEMA_AND_ERD.md) |
| **04** | `04_SECURITY_AND_RLS_SPEC.md` | Skrip kebijakan Row Level Security (RLS) PostgreSQL untuk seluruh tabel, otentikasi Supabase SSR, proteksi spam, dan kepatuhan UU PDP. | [Buka Spesifikasi Keamanan](file:///d:/prast/MAZ%C3%89LIA/docs/04_SECURITY_AND_RLS_SPEC.md) |
| **05** | `05_UIUX_DESIGN_SYSTEM.md` | Design tokens Tailwind CSS, palet warna Champagne Gold & Ivory, uji aksesibilitas WCAG AA, tipografi, dan Mobile Bottom Navigation. | [Buka Design System](file:///d:/prast/MAZ%C3%89LIA/docs/05_UIUX_DESIGN_SYSTEM.md) |
| **06** | `06_TECHNICAL_ARCHITECTURE.md` | Arsitektur Modular Monolith, Server Components vs Actions, integrasi `@supabase/ssr` tanpa Prisma, struktur folder Clean Architecture. | [Buka Arsitektur Teknis](file:///d:/prast/MAZ%C3%89LIA/docs/06_TECHNICAL_ARCHITECTURE.md) |
| **07** | `07_DEVELOPMENT_ROADMAP.md` | Jadwal rekayasa tervalidasi (MVP 6–8 minggu), rincian Fase 0 hingga Fase 5, acceptance criteria per sprint, dan peta jalan Fase 2/3. | [Buka Roadmap Pengembangan](file:///d:/prast/MAZ%C3%89LIA/docs/07_DEVELOPMENT_ROADMAP.md) |

---

## 2. Tiga Keputusan Strategis Product Owner

Sebelum perintah pengembangan teknis (*coding*) dimulai, mohon konfirmasi dan persetujuan Product Owner terhadap rekomendasi konsorsium berikut:

### Decision A — Initial Market Focus
- **Pertanyaan:** Apakah MAZÉLIA diluncurkan dengan fokus Wedding & Engagement saja, semua acara personal sekaligus, atau pendekatan hibrida?
- **Rekomendasi Konsorsium:** **Pendekatan Hibrida (Opsi 3)**. Kampanye pemasaran, landing page, dan showcase mengutamakan Wedding & Engagement (karena *willingness-to-pay* tertinggi dan persepsi kemewahan paling kuat), namun arsitektur data dan sistem tetap dirancang dinamis untuk mendukung seluruh jenis acara keluarga/personal di Indonesia tanpa perlu perombakan kode.

### Decision B — MVP Beta Pricing
- **Pertanyaan:** Apakah fitur Planner gratis selama masa beta, freemium sejak hari pertama, atau berbayar setelah masa beta?
- **Rekomendasi Konsorsium:** **Planner Gratis Selama Masa Beta Awal (Opsi 1)**. Menghilangkan friksi pendaftaran untuk mempercepat adopsi pengguna, mendapatkan pengujian beban sistem, dan mengumpulkan testimoni nyata. Model komersial **One-Time Event Pass (Rp99.000 – Rp149.000)** diaktifkan pada Fase 2 bersamaan dengan rilis Undangan Digital & Midtrans.

### Decision C — Format URL Digital Invitation (Fase 2)
- **Pertanyaan:** Apakah format URL undangan publik menggunakan `mazelia.com/i/[slug]`, `invite.mazelia.com/[slug]`, atau subdomain personal?
- **Rekomendasi Konsorsium:** **Jalur Terpadu `mazelia.com/i/[slug]` (Opsi 1)**. Pendekatan paling stabil, tanpa kerumitan konfigurasi DNS/Wildcard SSL, dan memusatkan otoritas SEO pada domain utama.

---

## 3. Hasil Audit Quality Control (Pre-Development Gate)

Konsorsium telah memvalidasi seluruh dokumen spesifikasi terhadap 8 kriteria kontrol kualitas:
- [x] **Zero Missing User Flow:** Seluruh 7 fitur MVP memiliki user journey, alur interaksi, dan spesifikasi state yang lengkap.
- [x] **Clear Page Purpose:** Setiap rute sitemap memiliki tujuan bisnis, komponen penyusun, dan navigasi yang terdefinisi.
- [x] **Zero Unprotected Private Data:** Seluruh tabel data privat telah dilengkapi skrip Row Level Security (RLS) PostgreSQL bertingkat.
- [x] **Multi-Event Context Safe:** Seluruh rute dashboard internal menggunakan parameter kontekstual `/dashboard/events/[id]/...` sehingga tidak ada risiko tabrakan data antar acara.
- [x] **Financial Integrity:** Seluruh nominal moneter disimpan dalam tipe data `BIGINT` dalam satuan Rupiah bulat (zero floating-point).
- [x] **No Conflicts Across Specs:** Skema database, validasi Zod, form input, dan sitemap selaras 100%.
- [x] **Future-Proof Expansion:** Skema database telah menyediakan hook relasional untuk modul Digital Invitation dan Vendor Marketplace di fase berikutnya tanpa perombakan skema dasar.
- [x] **Realistic Timeline:** Estimasi MVP dihitung ulang secara ketat menjadi 6–8 minggu dengan mengeluarkan modul marketplace dan gateway pembayaran ke fase berikutnya.

---

## 4. Status Stop Condition

> **PROTOKOL KERJA DIPATUHI SEPENUHNYA:**  
> Sesuai instruksi mutlak dari Product Owner:  
> - **TIDAK ADA PERINTAH `create-next-app` YANG DIJALANKAN.**  
> - **TIDAK ADA DEPENDENCY / PACKAGE YANG DIINSTAL.**  
> - **TIDAK ADA DATABASE ATAU TABEL YANG DIBUAT DI SUPABASE.**  
> - **TIDAK ADA KODE APLIKASI ATAU KOMPONEN UI YANG DITULIS.**  
> - **TIDAK ADA KONFIGURASI PROYEK YANG DIUBAH.**  
>  
> Tim saat ini berhenti dan menunggu persetujuan eksplisit serta arahan Product Owner terhadap 3 keputusan strategis di atas sebelum melangkah ke Fase 0 (Requirement Finalization & Environment Setup).
