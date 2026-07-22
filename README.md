# PT Domination — Funnel Pages

Next.js 13 (App Router) marketing funnel with a Supabase-backed lead capture and a
Zapier webhook. Built with Tailwind CSS + shadcn/ui.

## Pages

| Route | Purpose |
| --- | --- |
| `/livetraining` | Live-training opt-in page. The form captures the lead and redirects to the confirmation page. |
| `/livetraining/confirmation` | Thank-you page (Zoom link + add-to-calendar buttons). |
| `/aireplay` | AI training replay / VSL page. CTA opens a Calendly booking popup. |
| `/dmsalestraining` | DM sales training replay page. CTA opens a Calendly booking popup. |

The root `/` page is a short video landing that links to `/livetraining`.

## Lead capture flow

1. The `/livetraining` form POSTs to **`/api/submit-lead`** (a server-side Next.js route).
2. The route inserts the lead into the Supabase `livetraining_leads` table using the
   **service-role key** (server-only), then
3. fires a **Zapier catch-hook** with the same payload (best-effort — a Zapier
   failure never blocks the opt-in).

There is no Supabase Edge Function to deploy — everything runs inside the Next.js app.

## Setup

1. **Install deps**

   ```bash
   npm install
   ```

2. **Create a Supabase project** at https://supabase.com, then run the migration in
   the Supabase SQL Editor (or via the CLI):

   ```
   supabase/migrations/0001_create_livetraining_leads.sql
   ```

3. **Create the Zapier webhook**: add a *Webhooks by Zapier → Catch Hook* trigger to a
   Zap and copy its URL.

4. **Configure env vars**: copy `.env.example` to `.env` and fill in:

   | Variable | Where it's used |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | client + server |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client |
   | `SUPABASE_SERVICE_ROLE_KEY` | server only (never exposed) |
   | `ZAPIER_WEBHOOK_URL` | server only |
   | `NEXT_PUBLIC_SITE_URL` | metadata (optional) |

5. **Run**

   ```bash
   npm run dev      # http://localhost:3000
   npm run build    # production build
   ```

## Deploying (Vercel)

Next.js is natively supported by Vercel — no config file needed.

1. Push this repo to GitHub, then **Import Project** at [vercel.com/new](https://vercel.com/new)
   and select the repo. Vercel auto-detects Next.js.
2. Add the same five environment variables in **Vercel → Project → Settings →
   Environment Variables** (for Production, Preview, and Development as needed):

   | Variable | Exposed to browser? |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | yes |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes |
   | `SUPABASE_SERVICE_ROLE_KEY` | **no — server only** |
   | `ZAPIER_WEBHOOK_URL` | **no — server only** |
   | `NEXT_PUBLIC_SITE_URL` | yes |

3. Deploy. The `/api/submit-lead` route runs automatically as a Vercel serverless function.

`SUPABASE_SERVICE_ROLE_KEY` and `ZAPIER_WEBHOOK_URL` are **not** prefixed with
`NEXT_PUBLIC_`, so they stay server-side and are never shipped to the browser.
