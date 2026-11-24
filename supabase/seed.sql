-- ============================================================================
-- MAZÉLIA — SEED DATA (KATEGORI & PRESETS)
-- ============================================================================

INSERT INTO public.event_categories (name, slug, icon, display_order) VALUES
('Wedding', 'wedding', 'heart', 1),
('Engagement', 'engagement', 'gem', 2),
('Birthday', 'birthday', 'cake', 3),
('Anniversary', 'anniversary', 'glass-cheers', 4),
('Family Gathering', 'family-gathering', 'users', 5),
('Other', 'other', 'sparkles', 6)
ON CONFLICT (slug) DO NOTHING;
