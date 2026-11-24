# MAZÉLIA — FINAL DATABASE SCHEMA, DATA DICTIONARY & ERD

**Dokumen Versi:** 1.0 — Production-Ready DDL  
**Status:** Approved for Implementation  
**Penulis:** Senior Database Engineer & Software Architect  
**Engine:** PostgreSQL 15+ (Hosted via Supabase)  
**Tanggal:** November 2026  

---

## 1. Prinsip & Standar Integritas Data

1. **Primary Key Standard:** Menggunakan **UUID v4** (`gen_random_uuid()`) untuk seluruh entitas transaksional utama guna mencegah kebocoran informasi volume transaksi (*enumeration attack*) dan mempermudah sinkronisasi terdistribusi. Entitas referensi statis (kategori) menggunakan `SERIAL`.
2. **Integritas Moneter (Zero Floating-Point):** Seluruh nominal uang (anggaran, biaya riil, pembayaran DP) disimpan dalam format **`BIGINT`** dalam satuan Rupiah penuh (contoh: `Rp 50.000.000` disimpan sebagai `50000000`). Penggunaan tipe `FLOAT` atau `DECIMAL` tanpa presisi mutlak dilarang keras untuk mencegah kesalahan pembulatan sen.
3. **Multi-Event Data Isolation:** Seluruh tabel operasional (`event_sessions`, `event_checklists`, `event_budgets`, `guest_groups`, `guests`) terikat ketat ke `event_id` dengan referensi *Foreign Key* bertingkat dan aturan *ON DELETE CASCADE*.
4. **Zona Waktu Standar:** Semua kolom waktu disimpan dalam tipe data `TIMESTAMPTZ` (UTC). Aplikasi bertanggung jawab mengonversi tampilan ke waktu lokal Indonesia (WIB/WITA/WIT) berdasarkan preferensi kota acara.
5. **Auditing & Tracking:** Setiap tabel dilengkapi kolom `created_at` dan `updated_at` dengan trigger otomatis pembaruan timestamp.

---

## 2. Textual Entity-Relationship Diagram (ERD)

```
auth.users (Supabase Identity)
    │ 1:1
    ▼
public.profiles
    │
    ├── 1:N ──> public.events <── N:1 ── public.event_categories
    │             │
    │             ├── 1:N ──> public.event_sessions (Akad, Pemberkatan, Resepsi)
    │             ├── 1:N ──> public.event_checklists (Tugas & Timeline)
    │             ├── 1:N ──> public.event_budgets (Pos Biaya & Pelunasan)
    │             ├── 1:N ──> public.guest_groups (Segmentasi Tamu)
    │             └── 1:N ──> public.guests (Daftar Undangan & RSVP)
    │
    └── [Fase 2 - Future Proof Hooks]
                  ├── 1:1 ──> public.invitations (Halaman Undangan Digital)
                  └── 1:N ──> public.vendor_bookmarks (Koleksi Vendor Pilihan)
```

---

## 3. Skrip DDL Produksi (PostgreSQL Schema)

```sql
-- ============================================================================
-- MAZÉLIA DATABASE SCHEMA DEFINITION (POSTGRESQL 15+)
-- ============================================================================

-- Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. TABEL: profiles (Sinkronisasi Otomatis dari auth.users)
-- ----------------------------------------------------------------------------
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(25),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'vendor', 'admin')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_profiles_role ON public.profiles(role);

-- ----------------------------------------------------------------------------
-- 2. TABEL: event_categories (Pustaka Kategori Acara)
-- ----------------------------------------------------------------------------
CREATE TABLE public.event_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon_name VARCHAR(50) DEFAULT 'calendar' NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Awal Kategori Acara
INSERT INTO public.event_categories (name, slug, icon_name, display_order) VALUES
('Pernikahan (Wedding)', 'wedding', 'heart', 1),
('Lamaran & Pertunangan (Engagement)', 'engagement', 'gem', 2),
('Ulang Tahun (Birthday)', 'birthday', 'cake', 3),
('Anniversary', 'anniversary', 'glass-cheers', 4),
('Syukuran & Wisuda (Graduation)', 'graduation', 'graduation-cap', 5),
('Pertemuan Keluarga (Family Gathering)', 'family-gathering', 'users', 6),
('Acara Personal Lainnya', 'other', 'sparkles', 7);

-- ----------------------------------------------------------------------------
-- 3. TABEL: events (Induk Workspace Acara)
-- ----------------------------------------------------------------------------
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES public.event_categories(id),
    title VARCHAR(200) NOT NULL,
    event_date DATE NOT NULL,
    city VARCHAR(100) NOT NULL,
    target_budget BIGINT DEFAULT 0 NOT NULL CHECK (target_budget >= 0),
    status VARCHAR(20) DEFAULT 'planning' NOT NULL CHECK (status IN ('planning', 'active', 'completed', 'archived')),
    cover_image_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_events_user_id ON public.events(user_id);
CREATE INDEX idx_events_event_date ON public.events(event_date);
CREATE INDEX idx_events_status ON public.events(status);

-- ----------------------------------------------------------------------------
-- 4. TABEL: event_sessions (Jadwal Multi-Sesi: Akad Nikah, Resepsi, dll.)
-- ----------------------------------------------------------------------------
CREATE TABLE public.event_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    title VARCHAR(120) NOT NULL, -- Contoh: "Akad Nikah", "Pemberkatan", "Resepsi Malam"
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    venue_name VARCHAR(200) NOT NULL,
    venue_address TEXT NOT NULL,
    maps_url TEXT,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_event_sessions_event_id ON public.event_sessions(event_id);

-- ----------------------------------------------------------------------------
-- 5. TABEL: event_checklists (Tugas Persiapan & Timeline)
-- ----------------------------------------------------------------------------
CREATE TABLE public.event_checklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Umum' NOT NULL,
    phase VARCHAR(50) DEFAULT 'phase_1' NOT NULL CHECK (phase IN ('phase_1', 'phase_2', 'phase_3', 'phase_4')),
    due_date DATE,
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_checklists_event_id ON public.event_checklists(event_id);
CREATE INDEX idx_checklists_is_completed ON public.event_checklists(event_id, is_completed);

-- ----------------------------------------------------------------------------
-- 6. TABEL: event_budgets (Pencatatan Anggaran & Pengeluaran Riil)
-- ----------------------------------------------------------------------------
CREATE TABLE public.event_budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    category_name VARCHAR(100) NOT NULL, -- Contoh: Katering, Dekorasi, Venue
    item_name VARCHAR(200) NOT NULL,
    estimated_cost BIGINT DEFAULT 0 NOT NULL CHECK (estimated_cost >= 0),
    actual_cost BIGINT DEFAULT 0 NOT NULL CHECK (actual_cost >= 0),
    paid_amount BIGINT DEFAULT 0 NOT NULL CHECK (paid_amount >= 0),
    payment_status VARCHAR(20) DEFAULT 'unpaid' NOT NULL CHECK (payment_status IN ('unpaid', 'partially_paid', 'paid')),
    vendor_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_budgets_event_id ON public.event_budgets(event_id);
CREATE INDEX idx_budgets_category ON public.event_budgets(event_id, category_name);

-- ----------------------------------------------------------------------------
-- 7. TABEL: guest_groups (Pengelompokan Segmen Tamu)
-- ----------------------------------------------------------------------------
CREATE TABLE public.guest_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- Contoh: Keluarga Inti, VIP, Sahabat, Rekan Kerja
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_group_name_per_event UNIQUE (event_id, name)
);

CREATE INDEX idx_guest_groups_event_id ON public.guest_groups(event_id);

-- ----------------------------------------------------------------------------
-- 8. TABEL: guests (Daftar Tamu Undangan & Status RSVP)
-- ----------------------------------------------------------------------------
CREATE TABLE public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.guest_groups(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(25),
    slug VARCHAR(120) NOT NULL, -- Token unik untuk link undangan personal
    allocated_pax SMALLINT DEFAULT 1 NOT NULL CHECK (allocated_pax >= 1 AND allocated_pax <= 20),
    actual_pax SMALLINT DEFAULT 0 NOT NULL CHECK (actual_pax >= 0),
    rsvp_status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (rsvp_status IN ('pending', 'attending', 'declined', 'tentative')),
    rsvp_notes TEXT,
    invitation_sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_guest_slug_per_event UNIQUE (event_id, slug)
);

CREATE INDEX idx_guests_event_id ON public.guests(event_id);
CREATE INDEX idx_guests_group_id ON public.guests(group_id);
CREATE INDEX idx_guests_rsvp_status ON public.guests(event_id, rsvp_status);
CREATE INDEX idx_guests_slug ON public.guests(slug);

-- ----------------------------------------------------------------------------
-- TRIGGER: Otomatis Update Kolom updated_at
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_events_modtime BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_checklists_modtime BEFORE UPDATE ON public.event_checklists FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_budgets_modtime BEFORE UPDATE ON public.event_budgets FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_guests_modtime BEFORE UPDATE ON public.guests FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- TRIGGER: Otomatis Membuat Record Profile Saat User Baru Mendaftar di Supabase
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Sahabat Mazelia'),
        NEW.raw_user_meta_data->>'avatar_url',
        'user'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 4. Kamus Data Lengkap (Data Dictionary)

| Nama Tabel | Kolom | Tipe Data | Nullable | Default | Deskripsi Bisnis |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **profiles** | `id` | UUID | NO | PK | Relasi 1:1 ke auth.users Supabase |
| | `full_name` | VARCHAR(150) | NO | - | Nama lengkap pengguna |
| | `phone_number` | VARCHAR(25) | YES | NULL | Nomor kontak WhatsApp format E.164 |
| | `avatar_url` | TEXT | YES | NULL | URL file foto avatar di Supabase Storage |
| | `role` | VARCHAR(20) | NO | 'user' | Role sistem: 'user', 'vendor', 'admin' |
| **events** | `id` | UUID | NO | gen_random_uuid() | ID unik acara |
| | `user_id` | UUID | NO | FK profiles.id | Pemilik acara (Owner) |
| | `category_id` | INT | NO | FK categories.id | Kategori acara |
| | `title` | VARCHAR(200) | NO | - | Nama acara (Contoh: Wedding Dimas & Siti) |
| | `event_date` | DATE | NO | - | Tanggal utama hari-H acara |
| | `city` | VARCHAR(100) | NO | - | Kota penyelenggaraan |
| | `target_budget` | BIGINT | NO | 0 | Total anggaran target dalam Rupiah |
| | `status` | VARCHAR(20) | NO | 'planning' | Status: 'planning', 'active', 'completed', 'archived' |
| **event_sessions** | `id` | UUID | NO | gen_random_uuid() | ID unik sesi acara |
| | `event_id` | UUID | NO | FK events.id | Relasi ke induk event |
| | `title` | VARCHAR(120) | NO | - | Nama sesi: 'Akad Nikah', 'Resepsi', dll. |
| | `start_time` | TIMESTAMPTZ | NO | - | Waktu mulai sesi acara |
| | `end_time` | TIMESTAMPTZ | YES | NULL | Waktu berakhir sesi acara |
| | `venue_name` | VARCHAR(200) | NO | - | Nama gedung / lokasi |
| | `venue_address` | TEXT | NO | - | Alamat fisik lengkap |
| | `maps_url` | TEXT | YES | NULL | Tautan Google Maps |
| **event_checklists** | `id` | UUID | NO | gen_random_uuid() | ID unik tugas |
| | `event_id` | UUID | NO | FK events.id | Relasi ke induk event |
| | `title` | VARCHAR(255) | NO | - | Rincian tugas yang harus dikerjakan |
| | `phase` | VARCHAR(50) | NO | 'phase_1' | Fase waktu (H-6 bln, H-1 bln, Hari-H) |
| | `is_completed` | BOOLEAN | NO | FALSE | Status centang penyelesaian tugas |
| **event_budgets** | `id` | UUID | NO | gen_random_uuid() | ID unik pos biaya |
| | `event_id` | UUID | NO | FK events.id | Relasi ke induk event |
| | `category_name` | VARCHAR(100) | NO | - | Kategori pos biaya (Katering, Busana, dll.) |
| | `estimated_cost`| BIGINT | NO | 0 | Estimasi biaya awal (IDR) |
| | `actual_cost` | BIGINT | NO | 0 | Biaya riil kesepakatan vendor (IDR) |
| | `paid_amount` | BIGINT | NO | 0 | Akumulasi dana DP yang telah dibayar (IDR) |
| | `payment_status`| VARCHAR(20) | NO | 'unpaid' | 'unpaid', 'partially_paid', 'paid' |
| **guests** | `id` | UUID | NO | gen_random_uuid() | ID unik tamu undangan |
| | `event_id` | UUID | NO | FK events.id | Relasi ke induk event |
| | `group_id` | UUID | YES | FK groups.id | Relasi ke kelompok tamu |
| | `name` | VARCHAR(150) | NO | - | Nama tamu / keluarga yang diundang |
| | `phone_number` | VARCHAR(25) | YES | NULL | Nomor WhatsApp tamu |
| | `slug` | VARCHAR(120) | NO | - | Kode unik URL personalisasi tamu |
| | `allocated_pax` | SMALLINT | NO | 1 | Jumlah kursi/pax yang dialokasikan (1–20) |
| | `rsvp_status` | VARCHAR(20) | NO | 'pending' | 'pending', 'attending', 'declined', 'tentative' |
