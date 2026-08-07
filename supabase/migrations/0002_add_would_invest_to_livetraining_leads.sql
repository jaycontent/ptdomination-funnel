-- Adds the qualifying question answer captured on the /livetraining form:
-- "If it meant adding $1–2K per week to your online fitness business, would you
--  invest money into your content systems?" ("Yes, I would" / "No, just
--  exploring possibilities").

alter table public.livetraining_leads
  add column if not exists would_invest text;
