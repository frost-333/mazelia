#!/usr/bin/env bash
# ==============================================================================
# MAZÉLIA — AGENCY & MULTI-CLIENT DIGITAL INVITATION PLATFORM ROADMAP
# ==============================================================================
# Deskripsi : Transformasi MAZÉLIA menjadi platform SaaS/Vendor untuk mengelola
#             banyak klien undangan digital secara mandiri dan terstruktur.
# Arsitektur: Next.js 15 (App Router) + Supabase (PostgreSQL + RLS)
# ==============================================================================

# ------------------------------------------------------------------------------
# FASE 1: STRUKTUR DATA & SKEMA MULTI-TENANT (DATABASE)
# ------------------------------------------------------------------------------
# [x] TASK 1.1: Pastikan tabel `invitations` mendukung 1 admin memiliki banyak undangan (1-to-Many).
#               - Foreign Key: `user_id` merujuk ke akun admin/agency pembuat.
#               - Index unik pada kolom `slug` agar URL antar klien tidak bentrok.
# [x] TASK 1.2: Tambahkan kolom status undangan & catatan klien.
# [x] TASK 1.3: Pastikan tabel `invitation_wishes` terisolasi berdasarkan `invitation_id`
#               sehingga buku tamu klien A tidak bercampur dengan klien B.

# ------------------------------------------------------------------------------
# FASE 2: DASHBOARD UTAMA AGENSI (/admin) — "CLIENT MANAGEMENT HUB"
# ------------------------------------------------------------------------------
# [x] TASK 2.1: Rombak halaman `/admin` dari tampilan 1 acara menjadi "Katalog Semua Klien".
# [x] TASK 2.2: Tampilkan kartu ringkasan global agensi di bagian atas:
#               - Total Klien Aktif
#               - Total Tamu Terkonfirmasi Hadir (Semua Acara)
#               - Total Ucapan Doa Masuk
# [x] TASK 2.3: Tampilkan Grid/Daftar Kartu Klien:
#               - Nama Klien (Contoh: "Fadhil & Mazaya", "Dimas & Anisa")
#               - Tanggal Acara & Venue
#               - Tautan Publik Klien (Contoh: `localhost:3000/fadhil-mazaya`)
#               - Status badge (Live Online)
#               - Tombol Cepat: [Buku Tamu] [Edit Acara] [Buka Web] [Hapus]

# ------------------------------------------------------------------------------
# FASE 3: ALUR PEMBUATAN UNDANGAN KLIEN BARU (/admin/new)
# ------------------------------------------------------------------------------
# [x] TASK 3.1: Buat halaman formulir onboarding klien baru `/admin/new`.
# [x] TASK 3.2: Formulir pembuatan cepat (Quick Setup):
#               - Nama Lengkap & Panggilan Kedua Mempelai
#               - Pilihan Custom Slug URL (dengan auto-generate dari nama panggilan)
#               - Tanggal & Lokasi Acara
#               - Pilihan Preset Tema Desain (Champagne Gold, Emerald, Minimalist)
# [x] TASK 3.3: Server Action `createInvitationAction` untuk menyimpan ke Supabase
#               dan langsung me-redirect ke dashboard klien tersebut.

# ------------------------------------------------------------------------------
# FASE 4: WORKSPACE KHUSUS PER KLIEN (/admin/invitations/[id])
# ------------------------------------------------------------------------------
# [x] TASK 4.1: Buat dynamic route `/admin/invitations/[id]` untuk mengelola 1 klien terpilih.
# [x] TASK 4.2: Tampilkan metrik khusus acara klien tersebut (Jumlah Hadir, Ragu, Tidak Hadir, Pax).
# [x] TASK 4.3: Sematkan Generator Link WhatsApp khusus klien tersebut (`/[slug]?to=Nama+Tamu`).
# [x] TASK 4.4: Tampilkan Buku Tamu & RSVP terisolasi dengan fitur Search, Filter, dan Ekspor CSV/Excel
#               khusus untuk diserahkan ke klien/katering/WO klien tersebut.
# [x] TASK 4.5: Fitur moderasi (Hapus ucapan spam khusus acara klien tersebut).

# ------------------------------------------------------------------------------
# FASE 5: FORMULIR EDIT DATA SPESIFIK KLIEN (/admin/invitations/[id]/edit)
# ------------------------------------------------------------------------------
# [x] TASK 5.1: Buat halaman edit dinamis berbasis ID `/admin/invitations/[id]/edit`.
# [x] TASK 5.2: Kelola detail lengkap:
#               - Informasi Mempelai & Orang Tua
#               - Sesi 1 (Akad / Pemberkatan) & Sesi 2 (Resepsi)
#               - Kutipan / Ayat Suci
#               - Rekening Bank & Alamat Kirim Kado
#               - Foto Sampul & Lagu Latar Belakang (Audio MP3)
# [x] TASK 5.3: Server Action `updateInvitationAction` berbasis ID klien spesifik.

# ------------------------------------------------------------------------------
# FASE 6: ROUTING PUBLIK MULTI-KLIEN & SEO (DYNAMIC SLUG)
# ------------------------------------------------------------------------------
# [x] TASK 6.1: Route `/[slug]` dapat memuat undangan klien manapun secara dinamis dari database.
# [x] TASK 6.2: OpenGraph & Social Share Preview otomatis memuat nama kedua mempelai sesuai slug klien.
# [x] TASK 6.3: Tampilkan halaman `404 / Undangan Tidak Ditemukan` yang elegan jika slug tidak terdaftar.

# ------------------------------------------------------------------------------
# FASE 7 (ROADMAP LANJUTAN): AKSES KHUSUS PENGANTIN (CLIENT PORTAL READ-ONLY)
# ------------------------------------------------------------------------------
# [ ] TASK 7.1: Tautan akses khusus "Client View Portal" dengan kode akses / PIN rahasia.
# [ ] TASK 7.2: Klien (pengantin) dapat melihat rekap buku tamu & kirim WhatsApp ke tamu mereka sendiri.
# ==============================================================================
echo "Roadmap Multi-Client MAZÉLIA berhasil diimplementasikan!"
