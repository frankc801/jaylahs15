# Jaylah XV Digital Invitation

Mobile-first quinceañera invitation site with RSVP submission, Supabase-backed admin dashboard, and check-in page.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example:

```bash
cp .env.example .env
```

3. Add your Supabase project URL and publishable key to `.env`.

4. Run the SQL in `supabase/schema.sql` inside the Supabase SQL editor.

5. Create admin users in Supabase Auth. The `/admin` and `/check-in` pages use Supabase Auth email/password and do not store admin credentials in frontend code.

6. Start the site:

```bash
npm run dev
```

## Pages

- `/` public invitation and RSVP form
- `/admin` private RSVP dashboard
- `/check-in` private event check-in page

## Deploy to Vercel

Use these production settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Primary domain: `jaylahs15.com`
- Redirect `www.jaylahs15.com` to `jaylahs15.com`

Add these environment variables in Vercel before deploying production:

```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

The included `vercel.json` rewrites all routes to `index.html` so direct visits to
`/admin` and `/check-in` work on the live domain.

## Cloudflare DNS

After adding `jaylahs15.com` and `www.jaylahs15.com` in Vercel, create the DNS
records Vercel displays in Cloudflare.

- Use Vercel's apex/root `A` record for `jaylahs15.com`.
- Use Vercel's `CNAME` record for `www`.
- Set both records to DNS only.

## Supabase Checklist

- Run `supabase/schema.sql` in the Supabase SQL Editor.
- Create one Supabase Auth admin user for `/admin` and `/check-in`.
- Use only the anon/public/publishable client key in Vercel.
- Never place the service role key in frontend or Vercel public variables.
