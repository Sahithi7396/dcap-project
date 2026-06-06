-- ============================================================
--  DCAP — Environment Config & Backend Connection Guide
--  File: 05_connection_guide.md
-- ============================================================

# Connecting Your Backend to Supabase

## 1. Get Your Supabase Credentials

1. Log in to [supabase.com](https://supabase.com)
2. Open your project → **Settings → API**
3. Copy these 3 values:

| Setting | Where to find it | Used as |
|---|---|---|
| Project URL | "Project URL" field | `SUPABASE_URL` |
| `anon` / `public` key | Under "Project API keys" | `SUPABASE_ANON_KEY` |
| `service_role` key | Under "Project API keys" (reveal it) | `SUPABASE_SERVICE_ROLE_KEY` |

> ⚠️ **Never expose `service_role` key in the frontend.** It bypasses RLS. Only your Node.js backend uses it.

---

## 2. Create Your .env File

Inside your `dcap-backend/` folder, create a file called `.env`:

```env
# ── Server ──────────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── Supabase ─────────────────────────────────────────────────
# From: Supabase Dashboard → Settings → API

SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ── CORS ─────────────────────────────────────────────────────
# Set to the URL where your HTML frontend is served from
ALLOWED_ORIGIN=http://localhost:3000
```

---

## 3. Verify the Backend Picks Up Your Credentials

Your existing `src/config/supabase.js` already reads these env vars:

```js
// src/config/supabase.js  ← already in your backend, no change needed
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY   // ← service role for server-side
);
module.exports = supabase;
```

Start the server:
```bash
cd dcap-backend
npm run dev
```

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
# Expected: { "success": true, "message": "DCAP API is running" }
```

---

## 4. Test Each API Against Live Supabase Data

Run these curl commands after importing your Excel data:

```bash
# ── Schemes ──────────────────────────────────────────────────
# Get all schemes (paginated)
curl "http://localhost:5000/api/schemes"

# Get all Farmer schemes
curl "http://localhost:5000/api/schemes/filter?category=Farmer"

# Get all Student schemes
curl "http://localhost:5000/api/schemes/filter?category=Student"

# Search schemes
curl "http://localhost:5000/api/schemes/search?q=pension"

# ── Complaints ───────────────────────────────────────────────
# Register a complaint
curl -X POST "http://localhost:5000/api/complaints" \
  -H "Content-Type: application/json" \
  -d '{
    "citizen_name": "Ravi Kumar",
    "mobile": "9876543210",
    "department": "Revenue Department",
    "subject": "Certificate Delay",
    "description": "Income certificate not issued for 2 weeks"
  }'

# Track a complaint (use token from response above)
curl "http://localhost:5000/api/complaints/CMP-TEST0001"

# ── Appointments ─────────────────────────────────────────────
# Book an appointment
curl -X POST "http://localhost:5000/api/appointments" \
  -H "Content-Type: application/json" \
  -d '{
    "citizen_name": "Lakshmi Devi",
    "mobile": "9123456789",
    "department": "Civil Supplies Department",
    "purpose": "Ration card update",
    "preferred_date": "2024-08-15",
    "preferred_slot": "10:00 AM - 11:00 AM"
  }'

# ── Notifications ─────────────────────────────────────────────
curl "http://localhost:5000/api/notifications"
curl "http://localhost:5000/api/notifications?type=alert"

# ── Contacts ─────────────────────────────────────────────────
curl "http://localhost:5000/api/contacts"
curl "http://localhost:5000/api/contacts?department=Revenue"
```

---

## 5. Connecting Your HTML Frontend

Since your frontend is plain HTML/JS (no build step), add this to your JavaScript:

```js
// In your HTML frontend's JS — set the base URL to your running backend
const API_BASE = 'http://localhost:5000/api';   // development
// const API_BASE = 'https://your-deployed-api.com/api';  // production

// Example: fetch all General schemes
async function loadSchemes(category = 'General') {
  const res  = await fetch(`${API_BASE}/schemes/filter?category=${category}`);
  const json = await res.json();
  if (json.success) {
    // json.data.schemes → array of scheme objects
    renderSchemeCards(json.data.schemes);
  }
}

// Example: submit a complaint form
async function submitComplaint(formData) {
  const res = await fetch(`${API_BASE}/complaints`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(formData),
  });
  const json = await res.json();
  if (json.success) {
    alert(`Complaint registered! Your token: ${json.data.tracking_token}`);
  }
}
```

---

## 6. Production Deployment Checklist

| Step | Action |
|---|---|
| Deploy backend | Render / Railway / Vercel (serverless) / VPS |
| Set env vars | Add all `.env` values to your hosting platform's environment settings |
| Update CORS | Set `ALLOWED_ORIGIN` to your actual frontend domain |
| Update frontend `API_BASE` | Point to your production backend URL |
| Enable Supabase connection pooling | Supabase Dashboard → Settings → Database → Connection Pooling → Enable |
| Rotate `service_role` key | Never commit `.env` to Git; add `.env` to `.gitignore` ✅ (already done) |
