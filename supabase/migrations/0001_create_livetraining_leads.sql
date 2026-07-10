-- Leads captured from the /livetraining opt-in form.
-- Inserts happen server-side via the /api/submit-lead route using the
-- service-role key, which bypasses RLS. RLS is enabled with NO public
-- policies, so the anon/public key can neither read nor write this table.

create table if not exists public.livetraining_leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  first_name       text,
  last_name        text,
  email            text not null,
  phone            text,
  sms_consent      boolean not null default false,
  webinar_datetime timestamptz,
  page_path        text,
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,
  utm_content      text,
  utm_term         text
);

create index if not exists livetraining_leads_email_idx      on public.livetraining_leads (email);
create index if not exists livetraining_leads_created_at_idx on public.livetraining_leads (created_at desc);

alter table public.livetraining_leads enable row level security;
-- No policies are created on purpose: only the service-role key (used by the
-- API route) can insert/select. Add an authenticated SELECT policy later if you
-- want to read leads from an admin UI.
