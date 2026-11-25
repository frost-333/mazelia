-- ==============================================================================
-- MAZÉLIA: MIGRATION UNTUK DUKUNGAN MULTI-CLIENT & AGENCY VENDOR
-- Jalankan di SQL Editor Supabase Console:
-- https://supabase.com/dashboard/project/qrrulhuruatkxiwatosx/sql
-- ==============================================================================

-- 1. Tambah kolom pendukung manajemen klien agensi di tabel 'invitations'
ALTER TABLE IF EXISTS public.invitations
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active',
ADD COLUMN IF NOT EXISTS client_phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS client_notes TEXT,
ADD COLUMN IF NOT EXISTS gallery_urls JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS love_story JSONB DEFAULT '[]'::jsonb;

-- 2. Pastikan kolom 'theme' ada dan memiliki default
ALTER TABLE IF EXISTS public.invitations
ADD COLUMN IF NOT EXISTS theme VARCHAR(50) DEFAULT 'champagne_gold';

-- 3. Pastikan user_id memiliki indeks untuk performa query agensi
CREATE INDEX IF NOT EXISTS idx_invitations_user_id ON public.invitations(user_id);
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON public.invitations(slug);

-- 4. Notifikasi status
COMMENT ON COLUMN public.invitations.client_notes IS 'Catatan pesanan klien internal agensi MAZELIA';
COMMENT ON COLUMN public.invitations.client_phone IS 'Nomor WhatsApp klien pengantin untuk portal monitor';
