# PT Domination Funnels — Handoff Document

Everything you need to run, update, and operate the PT Domination marketing funnels.

- **Live site:** https://goptdomination.com
- **Repo:** https://github.com/jaycontent/ptdomination-funnel (public)
- **Hosting:** Vercel — auto-deploys on every push to `main`
- **Stack:** Next.js 13 (App Router) · React 18 · TypeScript · Tailwind CSS · shadcn/ui
- **Local project path:** `~/Downloads/project 4`

---

## 1. The golden workflow (how to make changes)

```bash
# from the project folder
git add -A
git commit -m "describe the change"
git push origin main
```

Pushing to `main` triggers Vercel to build and deploy automatically. Within ~1–2 minutes
the change is live on `goptdomination.com`. Nothing else to do — no manual deploy step.

- Push access is via an SSH key already on the project owner's Mac (no token needed).
- **Env-var changes are different** — see §7. They require a redeploy to take effect.

Run locally while developing:

```bash
npm install      # first time only
npm run dev      # http://localhost:3000
npm run build    # production build (catches type errors)
```

---

## 2. Pages & funnels

### Live Training funnel (recurring webinar — Mon/Thu 4:30 PM PST)
| Route | What it is | Pixel event |
| --- | --- | --- |
| `/` | Short video landing that links to `/livetraining` | — |
| `/livetraining` | Opt-in form: name, email, phone, SMS consent, + a required qualifier ("If it meant adding $1–2K/week… would you invest?"). | `PageView` |
| `/livetraining/confirmation` | Thank-you page for **"Yes"** leads — video, emailed-join-link card, DM-BOOKED CTA, what-to-expect, testimonial, bonuses. | `CompleteRegistration` |
| `/livetraining/confirmation-b` | **Identical** thank-you page for **"No, just exploring"** leads, with the pixel removed (no conversion reported to Meta). | none |

The qualifier answer decides the destination: **Yes → `/confirmation`**, **No → `/confirmation-b`**.
Both confirmation pages share one component (`components/ConfirmationContent.tsx`) so they always
stay in sync — only the main page adds the pixel event.

### Cash Flow Content funnel (application / waitlist)
| Route | What it is | Pixel event |
| --- | --- | --- |
| `/cashflowcontent` | VSL + eligibility copy + **Typeform** application (`01KZ4TNDS7P0TBVW1Y4MJ8X1G1`) + "Real Analytics" image grid + long-form story. | `PageView` |
| `/cashflowcontent-organic` | Same page for **organic traffic**, using the organic Typeform (`01KZ76X4Q55CP4QBPXZHMH1SPQ`). | `PageView` |
| `/cashflowcontent/received` | "Application received" page — welcome video + 2-step to-do (text CASH FLOW / DM CASH FLOW) + Brian's letter. | `SubmitApplication` |
| `/cashflowcontent/received-organic` | Same, for the organic funnel. | `SubmitApplication` |

> **Typeform redirect:** In each Typeform's settings, set "Redirect on completion" so applicants
> land on the matching received page: main → `/cashflowcontent/received`,
> organic → `/cashflowcontent/received-organic`. That's also what fires the `SubmitApplication` pixel.

### Replay pages (book-a-call)
| Route | What it is |
| --- | --- |
| `/aireplay` | AI masterclass replay (Wistia video) + Calendly "book a strategy call" popup. |
| `/dmsalestraining` | DM sales training replay + Calendly "book a call" popup. |

### Content-to-Cash Masterclass funnel (recurring webinar — broad, all business owners)
| Route | What it is | Pixel event |
| --- | --- | --- |
| `/contenttocash` | Masterclass opt-in: headline, video, countdown, form (name/email/phone + an **unchecked** "would you invest…" checkbox). Posts to `/api/submit-contenttocash` → `CONTENTTOCASH_WEBHOOK_URL`. | `PageView` |
| `/contenttocash/confirmation` | Thank-you for registrants who **checked** the invest box — video, DM-BOOKED, add-to-calendar, show-up-live bonuses. | `CompleteRegistration` |
| `/contenttocash/confirmation-b` | Identical page for registrants who **left the box unchecked**, with the pixel removed. | none |

The invest checkbox decides the destination: **checked → `/confirmation`**, **unchecked → `/confirmation-b`**.
Same pattern as the livetraining split; both confirmations share `components/ContentToCashConfirmation.tsx`.

### Virtual Summit funnel (ONE-TIME event — Aug 20–21)
| Route | What it is | Pixel event |
| --- | --- | --- |
| `/virtualsummit` | Registration landing: headline, video, form → **new webhook** (`/api/submit-summit`). Redirects to confirmation. | none (optional) |
| `/virtualsummit/confirmation` | Thank-you: video, **GoFundMe** donate CTA, "Save the Date" + add-to-calendar (Aug 20–21), DM SUMMIT. | none (optional) |

---

## 3. Forms & where the data goes

| Form | API route | Destination |
| --- | --- | --- |
| `/livetraining` opt-in | `/api/submit-lead` | **Supabase** `livetraining_leads` table (server-side, service-role key) **+** Zapier `ZAPIER_WEBHOOK_URL` |
| `/cashflowcontent` (+organic) | *(none — native Typeform)* | Typeform (then its own integrations/redirect) |
| `/virtualsummit` registration | `/api/submit-summit` | Zapier `SUMMIT_WEBHOOK_URL` only (no database — Zapier is the system of record) |

Notes:
- `/api/submit-lead` **requires** the Supabase insert to succeed; the Zapier call is best-effort
  (a Zapier hiccup won't block the opt-in). It also gracefully drops the `would_invest` field if that
  DB column doesn't exist yet (see §8).
- `/api/submit-summit` fires the webhook best-effort and always returns success so the redirect works.
  **If `SUMMIT_WEBHOOK_URL` is unset, registrations are NOT captured** (logged as an error).
- `/api/calendar` generates an `.ics` file; it was used by the *old* livetraining confirmation design and
  is currently unused. Harmless to leave.

---

## 4. Integrations

**Supabase** (database) — project ref `uvlyjlwyowgncjstkqzp`
- Table: `livetraining_leads` (name, email, phone, sms_consent, webinar_datetime, page_path, 5 UTM fields, and — once added — `would_invest`).
- Inserts happen **server-side with the service-role (secret) key**, which bypasses RLS. The public/anon key can't read or write the leads table.
- Uses Supabase's new key format (`sb_publishable_…` / `sb_secret_…`).

**Zapier** (webhooks) — two separate Catch Hooks
- `ZAPIER_WEBHOOK_URL` → live-training opt-ins.
- `SUMMIT_WEBHOOK_URL` → virtual-summit registrations.
- Each Zap should handle downstream actions (email/SMS the join link, add to CRM/sheet, etc.).

**Typeform** — Cash Flow Content applications (main + organic), embedded via `data-tf-live`.

**Wistia** — video hosting. Media IDs by page:
`/livetraining/confirmation` `a5356enkcj` · `/cashflowcontent` `3avlzggbbw` ·
`/cashflowcontent/received` `edhhehvssc` · `/aireplay` `uvd1j1xdqz` ·
`/virtualsummit` `83nj9ijnkr` · `/virtualsummit/confirmation` `6yzfwy9zz6`.
(The aireplay video uses a non-16:9 aspect of `1.717`; that page's wrapper matches it.)

**Facebook / Meta Pixel** — ID `5380030918789430`
- The base pixel loads site-wide from `app/layout.tsx` (it only calls `init`, no auto-PageView).
- Per-page events are fired via the shared hook `lib/useFbTrack.ts` (or inline effects). See the tables in §2.

**Calendly** — booking popups on `/aireplay` and `/dmsalestraining`.

---

## 5. Hosting, domain & accounts

| Thing | Detail |
| --- | --- |
| GitHub | `jaycontent/ptdomination-funnel` (public). Remote is SSH. |
| Vercel | Project `ptdomination-funnel`, team `launch-team-alpha`. Repo connected → push-to-deploy. |
| Domain | `goptdomination.com` — registered on **Cloudflare**, DNS points to Vercel (A records `216.150.1.1` / `216.150.16.1`, `www` CNAME → `cname.vercel-dns.com`, all **DNS-only / grey-cloud**). SSL auto-issued by Vercel. `www` → apex 308 redirect. |

---

## 6. Project structure (where things live)

```
app/
  layout.tsx                 # root layout: base FB pixel, global metadata, favicon
  globals.css                # Tailwind + dark base (prevents white flash)
  page.tsx                   # "/" landing
  livetraining/…             # live-training funnel + confirmation + confirmation-b
  cashflowcontent/…          # cashflowcontent + organic + received (+organic)
  cashflowcontent-organic/…
  aireplay/  dmsalestraining/ # replay pages
  virtualsummit/…            # summit landing + confirmation
  api/
    submit-lead/route.ts     # livetraining → Supabase + Zapier
    submit-summit/route.ts   # summit → Zapier
    calendar/route.ts        # .ics generator (legacy, unused)
components/
  ConfirmationContent.tsx    # shared livetraining confirmation UI
  useFbTrack.ts → lib/       # (hook lives in lib/)
lib/
  supabase-admin.ts          # lazy server-side Supabase client (service-role)
  useFbTrack.ts              # fires a Meta pixel event on mount
  date.ts                    # next-webinar date logic (Mon/Thu 4:30 PM PST)
supabase/migrations/         # SQL for the leads table + would_invest column (docs)
public/                      # images, logo, og-image.png
```

Design system: dark background `#0a0e1a`, cyan accents (`#00d9ff` / gradient `#009fee→#00FFFF`),
Inter font. Most pages carry their own scoped `<style jsx>`.

---

## 7. Environment variables

Set in **Vercel → Project → Settings → Environment Variables** (Production/Preview/Development) and
mirrored in the local `.env` (which is gitignored — secrets are never committed). Template lives in
`.env.example`.

| Variable | Used by | Public? |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client | yes |
| `SUPABASE_SERVICE_ROLE_KEY` | server only (secret) | **no** |
| `ZAPIER_WEBHOOK_URL` | `/api/submit-lead` | **no** |
| `SUMMIT_WEBHOOK_URL` | `/api/submit-summit` | **no** |
| `CONTENTTOCASH_WEBHOOK_URL` | `/api/submit-contenttocash` | **no** |
| `NEXT_PUBLIC_SITE_URL` | metadata / OG URLs (`https://goptdomination.com`) | yes |

⚠️ **Changing an env var requires a redeploy** to take effect (the running functions read the value
at deploy time). After editing in Vercel, redeploy the latest production deployment (or push any commit).

---

## 8. Open items / TODO

- [ ] **Add the `would_invest` column to Supabase** so the livetraining qualifier answer is stored.
  Run in the Supabase SQL editor:
  ```sql
  alter table public.livetraining_leads add column if not exists would_invest text;
  ```
  Until then the opt-in still works and the answer still reaches Zapier — it just isn't saved in the DB.
- [x] **Virtual Summit GoFundMe link** — set to `https://gofund.me/7f4d1dbde` in
  `app/virtualsummit/confirmation/page.tsx`.
- [ ] **Typeform redirects** — point each Cash Flow Content Typeform's completion redirect at the
  matching `/received` (or `/received-organic`) page.
- [ ] **Confirm the Virtual Summit is Aug 20–21, 2026** — that's what the add-to-calendar buttons use.
- [ ] **Optional pixel events:** the summit pages and the `/aireplay` / `/dmsalestraining` pages load the
  base pixel but fire no events. Add `PageView` / `Lead` / a registration event if you want to optimize
  ads against them.
- [ ] **Rotate any temporary tokens** shared during setup (GitHub PAT / Vercel token) if they're still active.

---

## 9. Common "how do I…"

- **Change page copy / headline / video:** edit the page's `.tsx` file, commit, push. To swap a Wistia
  video, replace the media-id constant near the top of that page.
- **Change where a form's data goes:** update the relevant Zapier Zap (the webhook URL stays the same),
  or change the env var + redeploy.
- **Add a new landing page:** create `app/<name>/page.tsx` (and a `layout.tsx` for metadata). It's live at
  `goptdomination.com/<name>` on the next push.
- **See leads:** live-training leads are in Supabase (`livetraining_leads`) and in the Zapier Zap's
  destination; summit + cashflow data live in their respective Zapier/Typeform destinations.
