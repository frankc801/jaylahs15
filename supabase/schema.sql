create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  attending boolean not null,
  guest_count integer not null default 0 check (guest_count >= 0),
  guest_names text,
  message_for_jaylah text,
  status text not null default 'submitted',
  checked_in boolean not null default false,
  gift_received boolean not null default false,
  gift_notes text,
  internal_notes text,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists rsvps_full_name_idx on public.rsvps using gin (to_tsvector('simple', full_name));
create index if not exists rsvps_phone_idx on public.rsvps (phone);
create index if not exists rsvps_submitted_at_idx on public.rsvps (submitted_at desc);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_rsvps_updated_at on public.rsvps;
create trigger set_rsvps_updated_at
before update on public.rsvps
for each row execute function public.set_updated_at();

alter table public.rsvps enable row level security;

drop policy if exists "Public can submit RSVPs" on public.rsvps;
create policy "Public can submit RSVPs"
on public.rsvps
for insert
to anon
with check (
  full_name is not null
  and phone is not null
  and attending is not null
  and status = 'submitted'
  and checked_in = false
  and gift_received = false
  and gift_notes is null
  and internal_notes is null
);

drop policy if exists "Authenticated admins can read RSVPs" on public.rsvps;
create policy "Authenticated admins can read RSVPs"
on public.rsvps
for select
to authenticated
using (true);

drop policy if exists "Authenticated admins can update RSVPs" on public.rsvps;
create policy "Authenticated admins can update RSVPs"
on public.rsvps
for update
to authenticated
using (true)
with check (true);
