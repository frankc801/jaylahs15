-- ============================================================================
-- Jaylah XV Digital Invitation — Supabase schema
-- Run this in the Supabase SQL editor (Project → SQL → New query).
-- ============================================================================

-- Enable UUID generation (available by default on Supabase).
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- rsvps table
-- ----------------------------------------------------------------------------
create table if not exists public.rsvps (
  id                  uuid primary key default gen_random_uuid(),
  full_name           text not null,
  phone               text not null,
  attending           boolean not null default true,
  guest_count         integer not null default 1,
  guest_names         text,
  message_for_jaylah  text,
  status              text not null default 'pending',     -- pending | confirmed | declined | waitlist
  checked_in          boolean not null default false,
  gift_received       boolean not null default false,
  gift_notes          text,
  internal_notes      text,
  submitted_at        timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Helpful indexes for admin search.
create index if not exists rsvps_full_name_idx on public.rsvps (lower(full_name));
create index if not exists rsvps_phone_idx on public.rsvps (phone);
create index if not exists rsvps_submitted_at_idx on public.rsvps (submitted_at desc);

-- ----------------------------------------------------------------------------
-- Keep updated_at fresh on every update.
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists rsvps_set_updated_at on public.rsvps;
create trigger rsvps_set_updated_at
  before update on public.rsvps
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------
-- The public site uses the ANON key only to INSERT new RSVPs.
-- The admin dashboard / check-in page use the SERVICE ROLE key (which bypasses
-- RLS entirely), so guests can never read other people's submissions.
alter table public.rsvps enable row level security;

-- Allow anonymous guests to submit (INSERT) an RSVP.
drop policy if exists "Public can submit RSVP" on public.rsvps;
create policy "Public can submit RSVP"
  on public.rsvps
  for insert
  to anon
  with check (true);

-- NOTE: intentionally no SELECT/UPDATE/DELETE policy for anon.
-- Reading and editing is performed server-side with the service role key.
