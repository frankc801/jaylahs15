# Jaylah XV Digital Invitation

A mobile-first, luxury digital **quinceañera invitation** and **RSVP tracker**
for **Jaylah María Badillo** — _Mis XV Años_, August 1.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and
**Supabase**. Design palette: emerald green & gold, with crown details, gold
foil accents, soft gradients, elegant serif headings, and subtle animations.

---

## Features

### Public invitation (`/`)
- Hero with name, _Mis XV Años_, date, RSVP deadline, venue, and **RSVP Now** /
  **View Location** buttons
- Bilingual (English + Spanish) invitation message
- Ceremony, Reception, Dress Code, Gifts & Blessings sections
- Photo gallery placeholder for save-the-date photos
- RSVP form with validation + success / error messages
- Bilingual footer

### Admin dashboard (`/admin`) — password protected
- Total submissions, attending guests, not attending, checked-in counts
- Search by guest name or phone number
- View latest RSVPs, edit status, add internal notes, mark checked in
- **Export to CSV**

### Check-in page (`/check-in`) — password protected
- Search guest by name or phone
- Show RSVP details, guest count, guest names, checked-in status
- Mark as checked in + record optional gift / blessing received

---

## Getting started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run the contents of [`supabase/schema.sql`](supabase/schema.sql).
   This creates the `rsvps` table, indexes, an `updated_at` trigger, and Row
   Level Security (anon may only **insert**; reads/edits happen server-side with
   the service role key).

### 3. Configure environment variables
Copy the example file and fill in the values:
```bash
cp .env.local.example .env.local
```

| Variable | Where to find it | Exposed to browser? |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API | **No — server only** |
| `ADMIN_PASSWORD` | You choose it | **No — server only** |
| `SESSION_SECRET` | Any long random string | **No — server only** |

> Admin credentials live only in server-side environment variables and are
> never bundled into the frontend. The admin session is an `httpOnly`,
> HMAC-signed cookie.

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Add all five environment variables in **Project Settings → Environment
   Variables**.
4. Deploy. The `/admin` and `/check-in` routes are protected by `ADMIN_PASSWORD`.

---

## Editing event details

All event details (names, date, venue, messages, deadlines, phone) live in a
single config object: [`src/config/event.ts`](src/config/event.ts). Update once
and it propagates everywhere.

Pending items already wired to the config:
- **Church details** — placeholder copy in `event.ceremony` (EN/ES).
- **Chambelanes** — `event.chambelanes` is an empty array, ready for names.

---

## Project structure

```
src/
├── config/event.ts            # single source of truth for event details
├── lib/
│   ├── auth.ts                # admin session (HMAC cookie)
│   ├── types.ts               # Rsvp types
│   ├── rsvp-queries.ts        # server-side stats + search
│   └── supabase/
│       ├── public.ts          # anon client (insert only)
│       └── admin.ts           # service-role client (server only)
├── app/
│   ├── page.tsx               # public invitation
│   ├── actions/rsvp.ts        # public RSVP submission
│   ├── admin/                 # dashboard, auth, data actions, CSV export
│   └── check-in/              # check-in page
└── components/
    ├── invitation/            # public sections
    ├── admin/                 # dashboard + check-in UI
    └── ui/                    # Crown, Reveal, Section primitives
```
