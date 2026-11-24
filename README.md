# MAZÉLIA — Events • Moments • Memories

Platform perencanaan dan manajemen acara digital elegan berbasis web untuk individu dan keluarga di Indonesia.

---

## 1. Identitas & Karakter Brand

- **Nama Brand:** MAZÉLIA
- **Tagline:** *Events • Moments • Memories*
- **Platform:** Responsive Web Application (Mobile-First & Desktop)
- **Bahasa Utama:** Bahasa Indonesia
- **Mata Uang:** Rupiah (IDR) — Presisi Integer `BIGINT`
- **Timezone:** Asia/Jakarta (WIB)
- **Karakter Visual:** Elegant, Premium, Warm, Minimalist, Modern, Trustworthy

---

## 2. Fitur MVP yang Telah Selesai Dibangun

### A. Public Website
- **Landing Page (`/`):** Hero section editorial, simulasi anggaran interaktif (*mini-calculator*), 4 pilar fitur utama, FAQ, dan footer lengkap.
- **Tentang MAZÉLIA (`/tentang`):** Visi, filosofi kehangatan, kejelasan, dan privasi penuh.
- **Fitur Platform (`/fitur`):** Eksplorasi mendalam modul Event Hub, Checklist, Budget Planner, Guest Management, dan WhatsApp generator.
- **Paket & Harga (`/pricing`):** Tier Akses Beta Terbuka (Gratis) dan pratinjau *MAZÉLIA Event Pass*.
- **Kontak Dukungan (`/kontak`):** Saluran email, WhatsApp resmi, dan form pesan interaktif dengan feedback sukses.

### B. Autentikasi & Keamanan (Supabase Auth SSR)
- **Masuk (`/login`):** Validasi form, pesan error kontekstual, redirect aman ke dashboard.
- **Daftar (`/register`):** Pendaftaran nama lengkap, email, validasi password kuat, sinkronisasi profil otomatis.
- **Pemulihan Sandi (`/forgot-password`):** Permintaan reset password via email.
- **Proteksi Rute (Middleware):** Proteksi otomatis rute `/dashboard/*` di level Edge Network.
- **Pengaturan Profil (`/dashboard/settings`):** Edit nama lengkap dan nomor WhatsApp.

### C. Event Management Hub
- **Daftar Acara (`/dashboard/events`):** Menampilkan seluruh acara pengguna dengan countdown hari-H, kartu ringkasan, dan status.
- **Buat Acara Baru (`/dashboard/events/new`):** Wizard pembuatan acara lengkap dengan kategori (*Wedding, Engagement, Birthday, Anniversary, Family Gathering, Other*), tanggal, jam, kota, target budget, dan perkiraan tamu.
- **Otomatisasi Pre-populated Checklist:** Pembuatan event otomatis menginjeksi 15–20 tugas standar sesuai kategori.
- **Ringkasan Acara (`/dashboard/events/[id]/overview`):** Widget countdown hari-H besar, 4 kartu ringkasan (tugas, budget terpakai, sisa budget, tamu & pax), jadwal multi-sesi (Akad & Resepsi) dengan modal tambah sesi, dan daftar tugas terdekat.
- **Pengaturan Acara (`/dashboard/events/[id]/settings`):** Edit data acara dan *Danger Zone* hapus acara permanen dengan konfirmasi pengetikan nama acara (*cascade delete*).

### D. Event Checklist & Timeline
- **Checklist (`/dashboard/events/[id]/checklist`):** 
  - Status filter: *Semua*, *Belum Selesai*, *Selesai*.
  - Filter kategori dinamis.
  - Centang selesai instan menggunakan **React 19 Optimistic UI**.
  - Modal tambah tugas mandiri dengan prioritas (Tinggi, Sedang, Rendah) dan tanggal tenggat.
  - Hapus tugas.

### E. Budget Planner (Kalkulator Finansial Rupiah)
- **Budget (`/dashboard/events/[id]/budget`):**
  - Kalkulasi presisi: Target Anggaran, Total Biaya Riil, Dana Terbayar (DP), dan Sisa Anggaran (Surplus/Defisit).
  - Progress bar penyerapan anggaran dengan indikator visual.
  - Ubah target total anggaran seketika.
  - Tabel rincian pengeluaran per kategori.
  - Modal tambah pos biaya dengan penghitungan otomatis status pembayaran (*Belum Bayar, DP Terbayar, Lunas*).
  - Hapus pos pengeluaran.

### F. Guest Management & WhatsApp Invitation Generator
- **Manajemen Tamu (`/dashboard/events/[id]/guests`):**
  - Kartu metrik: Total Undangan, Total Pax, Terkonfirmasi Hadir, Menunggu Respons, Berhalangan.
  - Pencarian instan berdasarkan nama tamu atau nomor telepon.
  - Filter kelompok tamu (Keluarga, VIP, Teman, Rekan Kerja).
  - Tambah kelompok tamu kustom.
  - Modal tambah tamu dengan penetapan alokasi kursi/pax (1 s/d 20 pax).
  - Quick RSVP switcher langsung dari baris tabel.
  - **Generator Pesan WhatsApp Satu Klik:** Dialog draf pesan undangan sopan khas Indonesia yang otomatis menyebut nama tamu, tombol salin teks ke clipboard, dan tombol langsung membuka WhatsApp Web/Mobile.

---

## 3. Fitur Out-of-Scope (Fase Lanjutan)

Sesuai persetujuan spesifikasi, fitur-fitur berikut tidak dimasukkan ke dalam MVP dan disiapkan untuk fase berikutnya:
- Website undangan digital publik dengan tema interaktif visual (Fase 2).
- Integrasi Midtrans Payment Gateway untuk pembayaran otomatis (Fase 2).
- Direktori vendor dan marketplace dua sisi (Fase 3).
- QR code check-in meja tamu dan realtime chat (Fase 3).

---

## 4. Struktur Direktori Proyek

```
d:/prast/MAZÉLIA/
├── docs/                          # Dokumentasi Single Source of Truth
├── public/                        # Aset statis & logo
├── src/
│   ├── app/                       # Next.js 15 App Router
│   │   ├── (auth)/                # Route Group: login, register, forgot-password
│   │   ├── dashboard/             # Area terproteksi
│   │   │   ├── events/
│   │   │   │   ├── page.tsx       # Daftar seluruh acara pengguna
│   │   │   │   ├── new/page.tsx   # Wizard buat acara baru
│   │   │   │   └── [id]/          # Workspace kontekstual per acara
│   │   │   │       ├── overview/
│   │   │   │       ├── checklist/
│   │   │   │       ├── budget/
│   │   │   │       ├── guests/
│   │   │   │       └── settings/
│   │   │   └── settings/page.tsx  # Pengaturan profil pengguna
│   │   ├── fitur/page.tsx         # Halaman fitur publik
│   │   ├── kontak/page.tsx        # Halaman kontak publik
│   │   ├── pricing/page.tsx       # Halaman harga & paket
│   │   ├── tentang/page.tsx       # Halaman tentang MAZÉLIA
│   │   ├── layout.tsx             # Root layout dengan font Google
│   │   └── page.tsx               # Landing page utama
│   ├── components/
│   │   ├── ui/                    # Button, Input, Card, Badge, Modal
│   │   ├── layout/                # Navbar, Footer, DashboardSidebar, MobileBottomNav
│   │   └── modules/               # Komponen domain (events, checklist, budget, guests)
│   ├── actions/                   # Type-safe Server Actions (CUD operations)
│   ├── lib/
│   │   ├── supabase/              # Client, server, and middleware Supabase SSR
│   │   ├── validations/           # Skema validasi Zod
│   │   ├── constants/             # Pustaka preset checklist per kategori
│   │   └── utils/                 # Format Rupiah & tanggal Indonesia
│   ├── types/                     # TypeScript definitions & Supabase database types
│   └── middleware.ts              # Edge Session & Route Protection Middleware
├── supabase/
│   ├── migrations/                # Skrip DDL PostgreSQL + Row Level Security (RLS)
│   └── seed.sql                   # Data awal kategori acara
├── .env.example                   # Panduan konfigurasi variabel lingkungan
├── package.json
├── tailwind.config.ts             # Design tokens MAZÉLIA
└── tsconfig.json                  # TypeScript strict mode
```

---

## 5. Panduan Instalasi & Menjalankan Aplikasi

### Prasyarat
- Node.js versi 20.x atau lebih tinggi.
- Package manager: `pnpm` atau `npm`.

### Langkah Menjalankan:
1. **Clone atau buka repositori:**
   ```bash
   cd d:/prast/MAZÉLIA
   ```

2. **Instal dependensi:**
   ```bash
   pnpm install
   ```

3. **Konfigurasi Environment Variables:**
   Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dengan kredensial Supabase Anda.

4. **Jalankan Development Server:**
   ```bash
   pnpm run dev
   ```
   Buka browser di [http://localhost:3000](http://localhost:3000).

5. **Build Produksi:**
   ```bash
   pnpm run build
   pnpm start
   ```

---

## 6. Panduan Menghubungkan Supabase Database

1. Buka [https://supabase.com](https://supabase.com) dan buat proyek baru (disarankan Region: **Singapore (ap-southeast-1)**).
2. Di Dashboard Supabase, buka menu **SQL Editor**.
3. Buka file `supabase/migrations/20261124_init_mazelia.sql` di proyek ini, salin seluruh kodenya, lalu tempel dan klik **Run** di Supabase SQL Editor.
4. Buka file `supabase/seed.sql`, salin kodenya, lalu jalankan di SQL Editor untuk mengisi kategori awal.
5. Buka menu **Project Settings -> API** di Supabase:
   - Salin **Project URL** ke `NEXT_PUBLIC_SUPABASE_URL` di `.env.local`.
   - Salin **anon public API key** ke `NEXT_PUBLIC_SUPABASE_ANON_KEY` di `.env.local`.
6. Restart server development Anda (`pnpm run dev`).

---

## 7. Hasil Pengujian Teknis (QA Review)

- **Type Checking (`tsc --noEmit`):** Lolos 100% tanpa error TypeScript (Strict Mode).
- **Production Build (`next build`):** Lolos 100% (15 route statis dan dinamis berhasil dikompilasi).
- **Integritas Moneter:** Seluruh operasi anggaran menggunakan integer Rupiah murni dengan format `Intl.NumberFormat('id-ID')`.
- **Isolasi Data (Multi-Event):** Seluruh data checklist, budget, sesi, dan tamu terikat ke `event_id` dengan kebijakan *Row Level Security* aktif.
