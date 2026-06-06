-- ============================================================
--  DCAP — Excel → Supabase Import Guide
--  File: 04_excel_import_guide.md
-- ============================================================

# Excel to Supabase Import Guide

## Required Excel Column Headers

Your 3 Excel files must use **exactly these column names** (case matters for CSV import):

| Excel Column Header    | Supabase Column        | Required | Notes                              |
|------------------------|------------------------|----------|------------------------------------|
| `scheme_name`          | `scheme_name`          | ✅ Yes   | Full name of scheme                |
| `category`             | `category`             | ✅ Yes   | Must be: `General`, `Student`, or `Farmer` |
| `eligibility`          | `eligibility`          | No       | Who can apply                      |
| `required_documents`   | `required_documents`   | No       | Comma-separated list               |
| `benefits`             | `benefits`             | No       | What the citizen receives          |
| `department`           | `department`           | No       | Issuing government department      |
| `apply_link`           | `apply_link`           | No       | Online application URL if any      |

> **Do NOT include** `id`, `is_active`, `created_at`, or `updated_at` columns — Supabase fills these automatically.

---

## Step-by-Step Import Process

### Step 1 — Prepare Each Excel File

1. Open `General_Schemes.xlsx` in Excel / Google Sheets
2. Make sure **Row 1 is the header row** with exactly these names:
   ```
   scheme_name | category | eligibility | required_documents | benefits | department | apply_link
   ```
3. Make sure the `category` column value is exactly `General` for all rows (no typos)
4. Repeat for `Student_Schemes.xlsx` (category = `Student`) and `Farmer_Schemes.xlsx` (category = `Farmer`)

### Step 2 — Export as CSV

**Excel:**
- File → Save As → Choose format: **CSV UTF-8 (Comma delimited) (.csv)**
- Save as: `general_schemes.csv`, `student_schemes.csv`, `farmer_schemes.csv`

**Google Sheets:**
- File → Download → **Comma Separated Values (.csv)**

### Step 3 — Import into Supabase

#### Method A: Supabase Dashboard (Recommended — No Code)

1. Go to [supabase.com](https://supabase.com) → Your Project → **Table Editor**
2. Click on the **`schemes`** table
3. Click **"Insert" → "Import data from CSV"**
4. Upload `general_schemes.csv`
5. Verify the column mapping matches (auto-detected)
6. Click **"Import"**
7. Repeat for `student_schemes.csv` and `farmer_schemes.csv`

#### Method B: Supabase SQL Editor (Direct CSV via COPY)

If your CSV is stored somewhere accessible, use:
```sql
-- Replace the path with your actual accessible file location or use the dashboard upload
COPY schemes (scheme_name, category, eligibility, required_documents, benefits, department)
FROM '/path/to/general_schemes.csv'
DELIMITER ','
CSV HEADER;
```
> Note: Supabase Dashboard CSV import is simpler and handles this automatically.

#### Method C: Python Script (if you prefer automation)

```python
import pandas as pd
from supabase import create_client

SUPABASE_URL = "https://your-project.supabase.co"
SUPABASE_KEY = "your-service-role-key"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

files = [
    "general_schemes.csv",
    "student_schemes.csv",
    "farmer_schemes.csv"
]

for file in files:
    df = pd.read_csv(file)
    # Convert NaN to None for Supabase
    records = df.where(pd.notna(df), None).to_dict(orient="records")
    result = supabase.table("schemes").insert(records).execute()
    print(f"Imported {len(records)} rows from {file}")
```

Install deps: `pip install supabase pandas openpyxl`

---

## Verifying the Import

Run this in the **Supabase SQL Editor** after importing:

```sql
-- Count by category — should match your Excel row counts
SELECT category, COUNT(*) AS total
FROM schemes
GROUP BY category
ORDER BY category;

-- Check for any rows missing scheme_name (should return 0)
SELECT COUNT(*) FROM schemes WHERE scheme_name IS NULL OR scheme_name = '';

-- Preview all imported schemes
SELECT id, scheme_name, category, department FROM schemes ORDER BY category, scheme_name;
```

---

## Common Issues & Fixes

| Problem | Fix |
|---|---|
| "Invalid input for enum" error | Make sure `category` is exactly `General`, `Student`, or `Farmer` — no extra spaces |
| "null value violates not-null constraint" | `scheme_name` and `category` are required — fill all blank cells |
| Special characters broken | Save CSV as **UTF-8** encoding, not ANSI |
| Duplicate entries on re-import | Run `TRUNCATE schemes;` in SQL Editor before re-importing to start fresh |
| `apply_link` column missing | It's optional — safe to leave the column out of your CSV entirely |
