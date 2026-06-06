# DCAP Sachivalayam — Backend API

Node.js + Express + Supabase backend for the Citizen Portal.

---

## Folder Structure

```
dcap-backend/
├── src/
│   ├── config/
│   │   └── supabase.js          # Supabase client initialisation
│   ├── controllers/
│   │   ├── schemesController.js
│   │   ├── complaintsController.js
│   │   ├── appointmentsController.js
│   │   ├── notificationsController.js
│   │   └── contactsController.js
│   ├── middleware/
│   │   ├── errorHandler.js      # asyncHandler + globalErrorHandler
│   │   └── validate.js          # requireFields helper
│   ├── routes/
│   │   ├── schemes.js
│   │   ├── complaints.js
│   │   ├── appointments.js
│   │   ├── notifications.js
│   │   └── contacts.js
│   ├── utils/
│   │   └── response.js          # sendSuccess / sendError helpers
│   ├── app.js                   # Express app (middleware + routes)
│   └── server.js                # Entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your Supabase credentials
cp .env.example .env

# 3. Start in development mode
npm run dev

# 4. Start in production
npm start
```

---

## Environment Variables

| Variable                  | Description                              |
|---------------------------|------------------------------------------|
| `PORT`                    | Server port (default 5000)               |
| `NODE_ENV`                | `development` or `production`            |
| `SUPABASE_URL`            | Your Supabase project URL                |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side only)    |
| `ALLOWED_ORIGIN`          | Frontend origin for CORS                 |

---

## API Reference

### Health
| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | `/api/health`    | Server health check|

### Schemes
| Method | Endpoint                          | Description              |
|--------|-----------------------------------|--------------------------|
| GET    | `/api/schemes`                    | All schemes (paginated)  |
| GET    | `/api/schemes/search?q=text`      | Search schemes           |
| GET    | `/api/schemes/filter?category=X`  | Filter by category       |
| GET    | `/api/schemes/:id`                | Scheme detail            |

**Categories:** `General`, `Student`, `Farmer`  
**Pagination:** `?page=1&limit=20`

### Complaints
| Method | Endpoint                            | Description            |
|--------|-------------------------------------|------------------------|
| POST   | `/api/complaints`                   | Register complaint     |
| GET    | `/api/complaints/:token`            | Track by token         |
| PATCH  | `/api/complaints/:token/status`     | Update status (admin)  |

**POST body:**
```json
{
  "citizen_name": "Ravi Kumar",
  "mobile": "9876543210",
  "email": "ravi@email.com",
  "department": "Revenue",
  "subject": "Land records issue",
  "description": "Details...",
  "address": "Village, Mandal, District"
}
```

**Status values:** `Registered` → `In Progress` → `Resolved` → `Closed`

### Appointments
| Method | Endpoint                        | Description               |
|--------|---------------------------------|---------------------------|
| POST   | `/api/appointments`             | Book appointment          |
| GET    | `/api/appointments?mobile=XXXX` | View by mobile number     |
| GET    | `/api/appointments/:token`      | View by booking token     |

**POST body:**
```json
{
  "citizen_name": "Lakshmi Devi",
  "mobile": "9123456789",
  "department": "Civil Supplies",
  "purpose": "Ration card update",
  "preferred_date": "2024-07-20",
  "preferred_slot": "10:00 AM - 11:00 AM"
}
```

### Notifications
| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | `/api/notifications`        | All active notifications|
| GET    | `/api/notifications/:id`    | Single notification     |

**Optional filter:** `?type=info` or `?type=alert` or `?type=update`

### Contacts
| Method | Endpoint                    | Description               |
|--------|-----------------------------|---------------------------|
| GET    | `/api/contacts`             | All department contacts   |
| GET    | `/api/contacts?department=X`| Filter by department name |
| GET    | `/api/contacts/:id`         | Single contact            |

---

## Supabase Tables (for reference — create separately)

### schemes
```sql
id               UUID PRIMARY KEY DEFAULT gen_random_uuid()
scheme_name      TEXT NOT NULL
category         TEXT NOT NULL          -- General | Student | Farmer
eligibility      TEXT
required_documents TEXT
benefits         TEXT
department       TEXT
created_at       TIMESTAMPTZ DEFAULT now()
```

### complaints
```sql
id               UUID PRIMARY KEY
tracking_token   TEXT UNIQUE NOT NULL
citizen_name     TEXT NOT NULL
mobile           TEXT NOT NULL
email            TEXT
department       TEXT NOT NULL
subject          TEXT NOT NULL
description      TEXT NOT NULL
address          TEXT
status           TEXT DEFAULT 'Registered'
remarks          TEXT
created_at       TIMESTAMPTZ DEFAULT now()
updated_at       TIMESTAMPTZ DEFAULT now()
```

### appointments
```sql
id               UUID PRIMARY KEY
booking_token    TEXT UNIQUE NOT NULL
citizen_name     TEXT NOT NULL
mobile           TEXT NOT NULL
email            TEXT
department       TEXT NOT NULL
purpose          TEXT NOT NULL
preferred_date   DATE NOT NULL
preferred_slot   TEXT
address          TEXT
status           TEXT DEFAULT 'Pending'
created_at       TIMESTAMPTZ DEFAULT now()
updated_at       TIMESTAMPTZ DEFAULT now()
```

### notifications
```sql
id               UUID PRIMARY KEY DEFAULT gen_random_uuid()
title            TEXT NOT NULL
body             TEXT NOT NULL
type             TEXT DEFAULT 'info'    -- info | alert | update
is_active        BOOLEAN DEFAULT true
created_at       TIMESTAMPTZ DEFAULT now()
```

### contacts
```sql
id               UUID PRIMARY KEY DEFAULT gen_random_uuid()
department       TEXT NOT NULL
officer_name     TEXT
designation      TEXT
phone            TEXT
email            TEXT
address          TEXT
timings          TEXT
is_active        BOOLEAN DEFAULT true
```

---

## Importing Excel Data into Supabase

1. Open your Excel sheet → **File → Save As → CSV**
2. In Supabase Dashboard → **Table Editor → your table → Import CSV**
3. Map column headers to match the field names above
4. Click **Import**

> Column names in your Excel files should match exactly:  
> `scheme_name`, `category`, `eligibility`, `required_documents`, `benefits`, `department`
