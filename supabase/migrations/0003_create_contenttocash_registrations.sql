-- Registrations from the /contenttocash masterclass opt-in. Inserted server-side
-- by /api/submit-contenttocash (service-role key, bypasses RLS) in addition to
-- firing the Zapier webhook. webinar_* columns match the format used by the other
-- PT Domination webinar pages so they map to the same ActiveCampaign / GoHighLevel
-- custom fields, and webinar_month_and_date is the GHL tag (e.g. webinaraugust27).

create table if not exists public.contenttocash_registrations (
  id                     uuid primary key default gen_random_uuid(),
  created_at             timestamptz not null default now(),
  first_name             text,
  last_name              text,
  email                  text not null,
  phone                  text,
  would_invest           text,
  webinar_datetime       timestamptz,
  webinar_display        text,
  webinar_month_and_date text,
  page_path              text,
  utm_source             text,
  utm_medium             text,
  utm_campaign           text,
  utm_content            text,
  utm_term               text
);

comment on column public.contenttocash_registrations.webinar_month_and_date is
  'GHL Tag — lowercase month-and-day tag (e.g. webinaraugust27) for GoHighLevel tagging';

create index if not exists contenttocash_registrations_email_idx      on public.contenttocash_registrations (email);
create index if not exists contenttocash_registrations_created_at_idx on public.contenttocash_registrations (created_at desc);

alter table public.contenttocash_registrations enable row level security;
