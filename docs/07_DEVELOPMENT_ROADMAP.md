# MAZÉLIA — REVISED DEVELOPMENT ROADMAP & ACCEPTANCE CRITERIA

**Dokumen Versi:** 1.0 — Execution Roadmap  
**Status:** Approved for Implementation  
**Penulis:** Senior Product Manager & Lead Software Architect  
**Durasi MVP:** 6 – 8 Minggu Kerja Efektif  
**Tanggal:** November 2026  

---

## 1. Audit & Koreksi Estimasi Waktu

Estimasi blueprint awal (6–10 minggu untuk seluruh modul termasuk marketplace dan pembayaran) dinilai **terlalu optimis dan berisiko tinggi (*high risk of delay*)**. Membangun marketplace dua sisi dan integrasi gateway pembayaran di fase pertama akan mengorbankan kualitas dan keandalan alat perencanaan dasar.

### Rekalkulasi & Pemisahan Tegas Fase:
- **Cakupan MVP Utama (Fase 0 s/d Fase 5):** **6 – 8 Minggu** (Fokus murni pada kesempurnaan *Core Event Planner*).
- **Post-MVP Fase 2 (Digital Invitation & Midtrans Payment):** **4 – 5 Minggu** (Setelah MVP divalidasi pengguna).
- **Post-MVP Fase 3 (Vendor Marketplace & Escrow Booking):** **6 – 8 Minggu** (Setelah likuiditas trafik terbentuk).

---

## 2. Roadmap Pengembangan MVP (Fase 0 s/d Fase 5)

```mermaid
gantt
    title MAZÉLIA MVP Development Timeline (6 - 8 Minggu)
    dateFormat  YYYY-MM-DD
    section Fase 0 & 1
    Phase 0: Final Specs & Env Setup    :done, p0, 2026-12-01, 5d
    Phase 1: Project Foundation & Design:active, p1, after p0, 7d
    section Core Feature Sprint
    Phase 2: Auth & Profile Management  :p2, after p1, 7d
    Phase 3: Event Hub & Checklist      :p3, after p2, 10d
    Phase 4: Budget & Guest Management  :p4, after p3, 12d
    section Hardening & Launch
    Phase 5: Testing, Audit & MVP Launch:p5, after p4, 7d
```

---

### Phase 0: Requirement Finalization & Technical Setup
- **Durasi:** 1 Minggu (5 Hari Kerja).
- **Tujuan:** Mengunci spesifikasi tertulis, persetujuan Product Owner atas 3 keputusan strategis, inisialisasi project Supabase Cloud (Region SG), dan repositori GitHub.
- **Pekerjaan yang Dibangun:**
  - Setup Supabase project, database PostgreSQL, dan ekstensi `pgcrypto`.
  - Eksekusi DDL skema database final dan penyiapan aturan Row Level Security (RLS).
  - Setup repositori Next.js 15 dengan TypeScript strict mode, ESLint, dan Prettier.
- **Dependencies:** Persetujuan dokumen spesifikasi final.
- **Deliverables:** Repositori GitHub bersih, database Supabase siap pakai, dan tabel auto-generated types (`database.types.ts`).
- **Acceptance Criteria:** Query uji coba dari script lokal terbukti terisolasi oleh RLS; commit perdana terverifikasi di CI/CD.
- **Risiko & Mitigasi:** *Scope Creep* $\rightarrow$ Kunci dokumen spesifikasi; tolak penambahan fitur di luar dokumen.

---

### Phase 1: Project Foundation & Design System Setup
- **Durasi:** 1.5 Minggu (7 Hari Kerja).
- **Tujuan:** Membangun fondasi antarmuka, design tokens, komponen dasar (primitives), dan layout global.
- **Pekerjaan yang Dibangun:**
  - Konfigurasi Tailwind CSS dengan palet MAZÉLIA (Champagne Gold `#B69A72`, Deep Bronze `#846B48`, Ivory `#FAF8F4`, Charcoal `#302D29`).
  - Import font Playfair Display / Cormorant Garamond dan Plus Jakarta Sans via `next/font`.
  - Pembuatan komponen UI dasar: `Button`, `Input`, `Card`, `Badge`, `Modal`, `Dropdown`.
  - Layout Shell: Public Header/Footer, Dashboard Desktop Sidebar, dan Mobile Bottom Navigation Bar.
- **Dependencies:** Phase 0 selesai.
- **Deliverables:** Storybook / Katalog komponen UI internal yang responsif.
- **Acceptance Criteria:** Seluruh komponen memiliki rasio kontras lolos WCAG AA dan bertransisi mulus di mobile & desktop.

---

### Phase 2: Authentication & User Profile Management
- **Durasi:** 1 Minggu (5 Hari Kerja).
- **Tujuan:** Mengaktifkan pendaftaran akun, login, sinkronisasi profil, dan proteksi sesi.
- **Pekerjaan yang Dibangun:**
  - Implementasi alur registrasi & login via Email/Password (Supabase SSR).
  - Integrasi Single Sign-On (SSO) Google OAuth dengan penanganan callback route.
  - Next.js Edge Middleware untuk proteksi rute privat `/dashboard/*`.
  - Halaman edit profil pengguna (Nama Lengkap, No. WhatsApp format Indonesia, upload avatar ke Supabase Storage).
- **Dependencies:** Phase 1 selesai.
- **Deliverables:** Halaman `/login`, `/register`, dan sinkronisasi otomatis trigger `on_auth_user_created` ke tabel `profiles`.
- **Acceptance Criteria:** Pengguna dapat mendaftar dengan akun Google, sesi tersimpan di cookie `httpOnly`, dan pengguna anonim ter-redirect saat membuka `/dashboard`.

---

### Phase 3: Event Management Hub & Checklist Engine
- **Durasi:** 1.5 Minggu (8–10 Hari Kerja).
- **Tujuan:** Menghadirkan jantung workspace acara dan pelacak tugas otomatis.
- **Pekerjaan yang Dibangun:**
  - Halaman `/dashboard/events` (daftar seluruh event milik pengguna).
  - Event Wizard Modal: Buat acara (Kategori, Judul, Tanggal, Kota, Target Budget).
  - Form multi-sesi jadwal acara (Akad Nikah & Resepsi) pada tabel `event_sessions`.
  - Modul Checklist: Pre-populated checklist otomatis per kategori, filter fase waktu, toggle centang selesai (Optimistic UI), dan tambah tugas mandiri.
- **Dependencies:** Phase 2 selesai.
- **Deliverables:** Rute `/dashboard/events` dan `/dashboard/events/[id]/checklist` fungsional penuh.
- **Acceptance Criteria:** Membuat event otomatis menginjeksi 15–20 tugas standar; mencentang tugas selesai memperbarui database seketika tanpa reload.

---

### Phase 4: Budget Planner & Guest Management
- **Durasi:** 2 Minggu (10–12 Hari Kerja).
- **Tujuan:** Membangun kalkulator finansial presisi Rupiah dan pembukuan daftar tamu.
- **Pekerjaan yang Dibangun:**
  - **Budget Planner:** Kartu ringkasan total anggaran vs realisasi vs sisa dana (Rupiah), tabel pengeluaran per kategori, modal tambah/edit pos biaya, input angka terformat otomatis.
  - **Guest Management:** Tabel daftar tamu, filter kelompok (Keluarga, VIP, Sahabat), alokasi pax/kursi, quick RSVP switcher.
  - **One-Click WhatsApp Generator:** Tombol pada setiap baris tamu yang langsung membuka WhatsApp dengan draf pesan undangan personal.
  - **Overview Dashboard:** Widget countdown hari-H besar, meter penyerapan budget, dan progres checklist terpadu.
- **Dependencies:** Phase 3 selesai.
- **Deliverables:** Rute `/dashboard/events/[id]/budget`, `/guests`, dan `/overview` beroperasi 100%.
- **Acceptance Criteria:** Penjumlahan anggaran matematis 100% akurat tanpa pembulatan desimal; tombol WhatsApp membuka tautan valid.

---

### Phase 5: Hardening, Usability Audit & Public MVP Beta Launch
- **Durasi:** 1 Minggu (5 Hari Kerja).
- **Tujuan:** Memastikan performa, keamanan data baris, uji responsif di smartphone fisik, dan rilis publik.
- **Pekerjaan yang Dibangun:**
  - Audit keamanan RLS (Uji penetrasi simulasi: Pengguna A mencoba memanggil Server Action dengan `event_id` milik Pengguna B -> Wajib gagal).
  - Audit performa Google Lighthouse (Target skor: Performance $\ge 90$, Accessibility $\ge 95$ di mobile).
  - Deployment production ke Vercel dengan custom domain (contoh: `mazelia.com`) dan konfigurasi DNS Cloudflare.
  - Pemasangan Sentry untuk monitoring error real-time.
- **Dependencies:** Phase 4 selesai.
- **Deliverables:** Aplikasi web live di domain resmi; dokumentasi rilis MVP.
- **Acceptance Criteria:** Seluruh alur kerja dari landing page hingga kelola tamu berjalan tanpa hambatan (*zero critical bugs*).

---

## 3. Peta Jalan Pasca-MVP (Fase 2 & Fase 3)

### Post-MVP Phase 2: Digital Invitation & Monetization (Estimasi: 4–5 Minggu)
- **Tujuan Utama:** Menghadirkan produk berbayar pertama (*early cashflow*).
- **Fitur yang Dibangun:**
  1. Halaman publik undangan interaktif (`/i/[slug]`) dengan 2 tema editorial mewah.
  2. Embed audio latar belakang, peta Google Maps, buku ucapan tamu publik (*guestbook*), dan slot amplop digital / transfer bank.
  3. Proteksi anti-spam form buku ucapan menggunakan Cloudflare Turnstile & Upstash Rate Limiting.
  4. Integrasi Payment Gateway Midtrans (Snap API: QRIS, BCA/Mandiri/BRI Virtual Account, GoPay).
  5. Paket komersial *MAZÉLIA Event Pass* (Beli sekali, aktif selamanya per acara).

### Post-MVP Phase 3: Vendor Marketplace & Ecosystem (Estimasi: 6–8 Minggu)
- **Tujuan Utama:** Menghubungkan pengguna dengan penyedia jasa acara terpercaya di Indonesia.
- **Fitur yang Dibangun:**
  1. Direktori pencarian vendor per kota dan per kategori layanan dengan portofolio foto kurasi.
  2. Halaman profil vendor dengan kisaran harga awal (*starting price*) transparan dan tombol WhatsApp inquiry.
  3. Portal mandiri vendor (*Vendor Dashboard*) untuk kelola foto portofolio dan profil bisnis.
  4. Sistem penempatan berbayar vendor (*Featured Vendor Listing*).
