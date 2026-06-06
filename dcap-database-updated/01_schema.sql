-- ============================================================
--  DCAP Sachivalayam Citizen Portal — Supabase Schema
--  File: 01_schema.sql
--  Run this first in Supabase SQL Editor
-- ============================================================


-- ── 0. Extensions ────────────────────────────────────────────
-- pgcrypto gives us gen_random_uuid() (already enabled in Supabase)
-- no extra setup needed


-- ============================================================
--  TABLE 1 : schemes
--  Supports all 3 Excel sheets: General | Student | Farmer
-- ============================================================
CREATE TABLE IF NOT EXISTS schemes (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_name         TEXT         NOT NULL,
    category            TEXT         NOT NULL
                            CHECK (category IN ('General', 'Student', 'Farmer')),
    eligibility         TEXT,
    required_documents  TEXT,          -- comma-separated or free text
    benefits            TEXT,
    department          TEXT,
    apply_link          TEXT,          -- optional online application URL
    is_active           BOOLEAN      NOT NULL DEFAULT true,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Indexes for the 3 query patterns used by the backend
CREATE INDEX IF NOT EXISTS idx_schemes_category    ON schemes (category);
CREATE INDEX IF NOT EXISTS idx_schemes_department  ON schemes (department);
CREATE INDEX IF NOT EXISTS idx_schemes_name        ON schemes USING gin (to_tsvector('english', scheme_name));


-- ============================================================
--  TABLE 2 : complaints
-- ============================================================
CREATE TABLE IF NOT EXISTS complaints (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_token   TEXT         UNIQUE NOT NULL,
    citizen_name     TEXT         NOT NULL,
    mobile           TEXT         NOT NULL,
    email            TEXT,
    department       TEXT         NOT NULL,
    subject          TEXT         NOT NULL,
    description      TEXT         NOT NULL,
    address          TEXT,
    status           TEXT         NOT NULL DEFAULT 'Registered'
                         CHECK (status IN ('Registered', 'In Progress', 'Resolved', 'Closed')),
    remarks          TEXT,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_complaints_token   ON complaints (tracking_token);
CREATE INDEX IF NOT EXISTS idx_complaints_mobile  ON complaints (mobile);
CREATE INDEX IF NOT EXISTS idx_complaints_status  ON complaints (status);


-- ============================================================
--  TABLE 3 : appointments
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_token    TEXT         UNIQUE NOT NULL,
    citizen_name     TEXT         NOT NULL,
    mobile           TEXT         NOT NULL,
    email            TEXT,
    department       TEXT         NOT NULL,
    purpose          TEXT         NOT NULL,
    preferred_date   DATE         NOT NULL,
    preferred_slot   TEXT,
    address          TEXT,
    status           TEXT         NOT NULL DEFAULT 'Pending'
                         CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_token   ON appointments (booking_token);
CREATE INDEX IF NOT EXISTS idx_appointments_mobile  ON appointments (mobile);
CREATE INDEX IF NOT EXISTS idx_appointments_date    ON appointments (preferred_date);


-- ============================================================
--  TABLE 4 : notifications
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    title       TEXT         NOT NULL,
    body        TEXT         NOT NULL,
    type        TEXT         NOT NULL DEFAULT 'info'
                    CHECK (type IN ('info', 'alert', 'update')),
    is_active   BOOLEAN      NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_type      ON notifications (type);
CREATE INDEX IF NOT EXISTS idx_notifications_active    ON notifications (is_active);
CREATE INDEX IF NOT EXISTS idx_notifications_created   ON notifications (created_at DESC);


-- ============================================================
--  TABLE 5 : contacts
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    department   TEXT         NOT NULL,
    officer_name TEXT,
    designation  TEXT,
    phone        TEXT,
    email        TEXT,
    address      TEXT,
    timings      TEXT,          -- e.g. "Mon-Sat 10:00 AM – 5:00 PM"
    is_active    BOOLEAN      NOT NULL DEFAULT true,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contacts_department ON contacts (department);
CREATE INDEX IF NOT EXISTS idx_contacts_active     ON contacts (is_active);


-- ============================================================
--  Auto-update updated_at via trigger (schemes, complaints,
--  appointments — the 3 tables that have the column)
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_schemes_updated_at
    BEFORE UPDATE ON schemes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_complaints_updated_at
    BEFORE UPDATE ON complaints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
