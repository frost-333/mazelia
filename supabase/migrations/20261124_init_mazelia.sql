-- ============================================================================
-- MAZÉLIA — CORE DATABASE SCHEMA & RLS POLICIES (POSTGRESQL 15+)
-- Events • Moments • Memories
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. TABEL: PROFILES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(25),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 2. TABEL: EVENT_CATEGORIES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.event_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50) DEFAULT 'calendar' NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 3. TABEL: EVENTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) DEFAULT 'Wedding' NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    city VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    estimated_budget BIGINT DEFAULT 0 NOT NULL CHECK (estimated_budget >= 0),
    estimated_guest_count INT DEFAULT 0 NOT NULL CHECK (estimated_guest_count >= 0),
    status VARCHAR(20) DEFAULT 'planning' NOT NULL CHECK (status IN ('planning', 'active', 'completed', 'archived')),
    cover_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_user_id ON public.events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events(event_date);

-- ----------------------------------------------------------------------------
-- 4. TABEL: EVENT_SESSIONS (Akad Nikah, Resepsi, dll.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.event_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    session_date DATE,
    start_time TIME NOT NULL,
    end_time TIME,
    location VARCHAR(200) NOT NULL,
    address TEXT,
    maps_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_event_sessions_event_id ON public.event_sessions(event_id);

-- ----------------------------------------------------------------------------
-- 5. TABEL: EVENT_CHECKLISTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.event_checklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Umum' NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(20) DEFAULT 'medium' NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_checklists_event_id ON public.event_checklists(event_id);
CREATE INDEX IF NOT EXISTS idx_checklists_is_completed ON public.event_checklists(event_id, is_completed);

-- ----------------------------------------------------------------------------
-- 6. TABEL: EVENT_BUDGETS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.event_budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    item_name VARCHAR(200) NOT NULL,
    estimated_cost BIGINT DEFAULT 0 NOT NULL CHECK (estimated_cost >= 0),
    actual_cost BIGINT DEFAULT 0 NOT NULL CHECK (actual_cost >= 0),
    down_payment BIGINT DEFAULT 0 NOT NULL CHECK (down_payment >= 0),
    payment_status VARCHAR(20) DEFAULT 'unpaid' NOT NULL CHECK (payment_status IN ('unpaid', 'partially_paid', 'paid')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_budgets_event_id ON public.event_budgets(event_id);

-- ----------------------------------------------------------------------------
-- 7. TABEL: GUEST_GROUPS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.guest_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_group_name_per_event UNIQUE (event_id, name)
);

CREATE INDEX IF NOT EXISTS idx_guest_groups_event_id ON public.guest_groups(event_id);

-- ----------------------------------------------------------------------------
-- 8. TABEL: GUESTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.guest_groups(id) ON DELETE SET NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(25),
    address TEXT,
    pax INT DEFAULT 1 NOT NULL CHECK (pax >= 1 AND pax <= 20),
    rsvp_status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (rsvp_status IN ('pending', 'attending', 'not_attending')),
    attendance_status VARCHAR(20) DEFAULT 'unconfirmed' NOT NULL CHECK (attendance_status IN ('unconfirmed', 'present', 'absent')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_guests_event_id ON public.guests(event_id);
CREATE INDEX IF NOT EXISTS idx_guests_group_id ON public.guests(group_id);
CREATE INDEX IF NOT EXISTS idx_guests_rsvp_status ON public.guests(event_id, rsvp_status);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- 2. Event Categories (Public Read)
CREATE POLICY "Public read event categories" ON public.event_categories FOR SELECT USING (true);
CREATE POLICY "Admin manage event categories" ON public.event_categories FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- 3. Events
CREATE POLICY "Users manage own events" ON public.events FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. Event Sessions
CREATE POLICY "Users manage sessions of own events" ON public.event_sessions FOR ALL USING (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = event_sessions.event_id AND events.user_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = event_sessions.event_id AND events.user_id = auth.uid())
);

-- 5. Event Checklists
CREATE POLICY "Users manage checklists of own events" ON public.event_checklists FOR ALL USING (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = event_checklists.event_id AND events.user_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = event_checklists.event_id AND events.user_id = auth.uid())
);

-- 6. Event Budgets
CREATE POLICY "Users manage budgets of own events" ON public.event_budgets FOR ALL USING (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = event_budgets.event_id AND events.user_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = event_budgets.event_id AND events.user_id = auth.uid())
);

-- 7. Guest Groups
CREATE POLICY "Users manage guest groups of own events" ON public.guest_groups FOR ALL USING (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = guest_groups.event_id AND events.user_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = guest_groups.event_id AND events.user_id = auth.uid())
);

-- 8. Guests
CREATE POLICY "Users manage guests of own events" ON public.guests FOR ALL USING (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = guests.event_id AND events.user_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = guests.event_id AND events.user_id = auth.uid())
);

-- ----------------------------------------------------------------------------
-- TRIGGERS
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_events_modtime BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_checklists_modtime BEFORE UPDATE ON public.event_checklists FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_budgets_modtime BEFORE UPDATE ON public.event_budgets FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_guests_modtime BEFORE UPDATE ON public.guests FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto Profile on Auth User Create
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Sahabat Mazelia'),
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url',
        'user'
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
