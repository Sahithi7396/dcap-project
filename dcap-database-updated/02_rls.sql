-- ============================================================
--  DCAP — Row Level Security (RLS) Policies
--  File: 02_rls.sql
--  Run AFTER 01_schema.sql
-- ============================================================

-- ── Enable RLS on all tables ─────────────────────────────────
ALTER TABLE schemes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints    ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts      ENABLE ROW LEVEL SECURITY;


-- ── SCHEMES : public read (anon key), no public write ────────
CREATE POLICY "schemes_public_read"
    ON schemes FOR SELECT
    USING (is_active = true);

-- Service role (backend) can do everything
CREATE POLICY "schemes_service_all"
    ON schemes FOR ALL
    USING (auth.role() = 'service_role');


-- ── COMPLAINTS : anyone can INSERT; only service role reads/updates ──
CREATE POLICY "complaints_public_insert"
    ON complaints FOR INSERT
    WITH CHECK (true);

-- Citizens can read only their own complaint (by tracking_token)
-- This is enforced at API level; service role bypasses RLS anyway
CREATE POLICY "complaints_service_all"
    ON complaints FOR ALL
    USING (auth.role() = 'service_role');


-- ── APPOINTMENTS : anyone can INSERT ────────────────────────
CREATE POLICY "appointments_public_insert"
    ON appointments FOR INSERT
    WITH CHECK (true);

CREATE POLICY "appointments_service_all"
    ON appointments FOR ALL
    USING (auth.role() = 'service_role');


-- ── NOTIFICATIONS : public read of active items ──────────────
CREATE POLICY "notifications_public_read"
    ON notifications FOR SELECT
    USING (is_active = true);

CREATE POLICY "notifications_service_all"
    ON notifications FOR ALL
    USING (auth.role() = 'service_role');


-- ── CONTACTS : public read of active items ───────────────────
CREATE POLICY "contacts_public_read"
    ON contacts FOR SELECT
    USING (is_active = true);

CREATE POLICY "contacts_service_all"
    ON contacts FOR ALL
    USING (auth.role() = 'service_role');


-- ── NOTE ─────────────────────────────────────────────────────
-- Your backend uses SUPABASE_SERVICE_ROLE_KEY which bypasses
-- RLS entirely. These policies only matter for direct browser/
-- anon-key access (e.g. future public SDK calls from frontend).
