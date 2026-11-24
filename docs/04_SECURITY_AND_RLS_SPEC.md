# MAZÉLIA — SECURITY ARCHITECTURE, RLS POLICIES & PRIVACY SPECIFICATION

**Dokumen Versi:** 1.0 — Security Implementation  
**Status:** Approved for Implementation  
**Penulis:** Application Security Engineer & Software Architect  
**Engine:** Supabase PostgreSQL Row Level Security (RLS)  
**Tanggal:** November 2026  

---

## 1. Prinsip Keamanan & Kepatuhan Privasi

1. **Defense-in-Depth:** Keamanan data privat tidak hanya bergantung pada logika kode Next.js, melainkan diamankan langsung di lapisan paling bawah (PostgreSQL Row Level Security Engine).
2. **Zero-Trust Client Access:** Kunci `SUPABASE_SERVICE_ROLE_KEY` **dilarang keras** diekspos ke browser atau diimpor di komponen client. Seluruh operasi client berjalan menggunakan `NEXT_PUBLIC_SUPABASE_ANON_KEY` yang tunduk pada aturan RLS.
3. **Kepatuhan UU No. 27/2022 tentang Perlindungan Data Pribadi (UU PDP):**
   - *Data Minimization:* Sistem hanya mengumpulkan data yang mutlak diperlukan untuk koordinasi acara.
   - *Data Isolation:* Pengguna A tidak memiliki celah teknis apa pun untuk membaca, melihat, atau mengubah data acara, rincian anggaran, atau daftar tamu milik Pengguna B.
   - *Right to Erasure:* Penghapusan akun atau acara menghapus seluruh data terkait secara permanen (*hard delete cascade*).

---

## 2. Role & Permission Matrix

| Resource & Operasi | Guest / Publik | Authenticated User | Admin Internal |
| :--- | :---: | :---: | :---: |
| **Landing Page & Simulasi Budget** | Read Only | Read Only | Full Access |
| **Profil Pribadi (`profiles`)** | None | Read / Update (Milik Sendiri) | Full Access (Semua Profil) |
| **Kategori Acara (`event_categories`)** | Read Only | Read Only | Full CRUD |
| **Acara Saya (`events`)** | None | Full CRUD (Milik Sendiri) | Read / Audit Only |
| **Jadwal Sesi (`event_sessions`)** | None | Full CRUD (Acara Sendiri) | Read / Audit Only |
| **Checklist Tugas (`event_checklists`)** | None | Full CRUD (Acara Sendiri) | Read / Audit Only |
| **Rincian Anggaran (`event_budgets`)** | None | Full CRUD (Acara Sendiri) | Read / Audit Only |
| **Daftar Tamu (`guests`)** | None | Full CRUD (Acara Sendiri) | Read / Audit Only |
| **Undangan Publik (Fase 2 - `invitations`)** | Read Only (Published) | Full CRUD (Acara Sendiri) | Moderasi / Suspend |
| **Buku Ucapan (Fase 2 - `guest_wishes`)** | Insert Only (With Captcha) | Read / Moderasi (Acara Sendiri) | Full Moderasi |

---

## 3. Skrip PostgreSQL Row Level Security (RLS) Mandatori

Eksekusi seluruh script kebijakan berikut di Supabase SQL Editor:

```sql
-- ============================================================================
-- ENABLING ROW LEVEL SECURITY PADA SELURUH TABEL PRIVAT
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 1. KEBIJAKAN: profiles
-- ----------------------------------------------------------------------------
-- Pengguna hanya dapat membaca dan memperbarui profil mereka sendiri
CREATE POLICY "Users can read their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Admin dapat melihat seluruh profil
CREATE POLICY "Admins have full access to profiles"
    ON public.profiles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- ----------------------------------------------------------------------------
-- 2. KEBIJAKAN: event_categories
-- ----------------------------------------------------------------------------
-- Siapa pun (termasuk publik) dapat membaca daftar kategori yang aktif
CREATE POLICY "Public read active categories"
    ON public.event_categories FOR SELECT
    USING (is_active = TRUE);

-- Hanya admin yang dapat menambah/mengubah kategori
CREATE POLICY "Admin manage categories"
    ON public.event_categories FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- ----------------------------------------------------------------------------
-- 3. KEBIJAKAN: events (Root Workspace Isolation)
-- ----------------------------------------------------------------------------
-- Pengguna hanya memiliki hak penuh atas event yang mereka buat
CREATE POLICY "Users have full access to their own events"
    ON public.events FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 4. KEBIJAKAN BERTINGKAT: event_sessions
-- ----------------------------------------------------------------------------
CREATE POLICY "Users manage sessions of their own events"
    ON public.event_sessions FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = event_sessions.event_id AND events.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = event_sessions.event_id AND events.user_id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- 5. KEBIJAKAN BERTINGKAT: event_checklists
-- ----------------------------------------------------------------------------
CREATE POLICY "Users manage checklists of their own events"
    ON public.event_checklists FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = event_checklists.event_id AND events.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = event_checklists.event_id AND events.user_id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- 6. KEBIJAKAN BERTINGKAT: event_budgets
-- ----------------------------------------------------------------------------
CREATE POLICY "Users manage budgets of their own events"
    ON public.event_budgets FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = event_budgets.event_id AND events.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = event_budgets.event_id AND events.user_id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- 7. KEBIJAKAN BERTINGKAT: guest_groups
-- ----------------------------------------------------------------------------
CREATE POLICY "Users manage guest groups of their own events"
    ON public.guest_groups FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = guest_groups.event_id AND events.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = guest_groups.event_id AND events.user_id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- 8. KEBIJAKAN BERTINGKAT: guests
-- ----------------------------------------------------------------------------
CREATE POLICY "Users manage guests of their own events"
    ON public.guests FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = guests.event_id AND events.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.events
            WHERE events.id = guests.event_id AND events.user_id = auth.uid()
        )
    );
```

---

## 4. Keamanan Media & Supabase Storage

Konfigurasi Bucket di Supabase Storage:

1. **Bucket `avatars`:**
   - Visibility: **Public Read**.
   - Batas Ukuran Maksimal: **2 MB**.
   - Allowed MIME Types: `image/jpeg`, `image/png`, `image/webp`.
   - Security Policy: Pengguna hanya boleh mengunggah dan menimpa file di path `avatars/{auth.uid()}/*`.

```sql
-- Kebijakan Storage Avatar
CREATE POLICY "Avatar upload policy"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Avatar update policy"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
```

---

## 5. Proteksi Endpoint & Pencegahan Serangan

1. **Cross-Site Scripting (XSS) & Input Sanitization:**
   - Semua input Server Actions wajib divalidasi oleh skema **Zod** sebelum dieksekusi.
   - String nama dan catatan dibersihkan dari tag HTML dan karakter script berbahaya.
2. **Server-Side Authorization di Next.js Middleware:**
   - File `middleware.ts` memverifikasi sesi aktif via Supabase SSR.
   - Akses rute `/dashboard/*` tanpa cookie sesi langsung dialihkan (*redirected*) ke `/login`.
   - Akses rute `/admin/*` tanpa klaim `role === 'admin'` langsung dialihkan ke `/dashboard` tanpa membocorkan keberadaan modul admin.
3. **Anti-Spam & Rate Limiting (Kesiapan Fase 2):**
   - Halaman publik form ucapan / RSVP tamu akan diproteksi dengan **Cloudflare Turnstile** tak terlihat (*invisible captcha*).
   - Rate limiter via **Upstash Redis** membatasi maksimal 5 request per 10 menit per IP address untuk mencegah serangan penolakan layanan (*DoS*) pada kuota database Supabase.
