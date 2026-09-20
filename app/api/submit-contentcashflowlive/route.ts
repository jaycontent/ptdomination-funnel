import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Registrations from /contentcashflowlive share the contenttocash_registrations
// table — same columns, and page_path ("/contentcashflowlive") tells them apart.
// Give this event its own table if the two ever need to diverge.
const TABLE = 'contenttocash_registrations';

type Payload = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  webinar_datetime?: string | null;
  webinar_display?: string | null;
  webinar_month_and_date?: string | null;
  page_path?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }

  const row = {
    first_name: (body.first_name ?? '').trim() || null,
    last_name: (body.last_name ?? '').trim() || null,
    email,
    phone: (body.phone ?? '').trim() || null,
    webinar_datetime: body.webinar_datetime ?? null,
    webinar_display: body.webinar_display ?? null,
    webinar_month_and_date: body.webinar_month_and_date ?? null,
    page_path: body.page_path ?? null,
    utm_source: body.utm_source ?? null,
    utm_medium: body.utm_medium ?? null,
    utm_campaign: body.utm_campaign ?? null,
    utm_content: body.utm_content ?? null,
    utm_term: body.utm_term ?? null,
  };

  // 1) Store in Supabase (best-effort — a DB hiccup must not block the opt-in).
  try {
    const { error } = await getSupabaseAdmin().from(TABLE).insert(row);
    if (error) console.error('[submit-contentcashflowlive] Supabase insert failed:', error.message);
  } catch (err) {
    console.error('[submit-contentcashflowlive] Supabase client error:', err);
  }

  // 2) Fire the Zapier webhook. Falls back to the Content-to-Cash hook so
  // registrations still reach the CRM before a dedicated Zap is set up.
  const webhookPayload = {
    ...row,
    event: 'content-cash-flow-live',
    submitted_at: new Date().toISOString(),
  };
  const zapUrl = process.env.CONTENTCASHFLOWLIVE_WEBHOOK_URL || process.env.CONTENTTOCASH_WEBHOOK_URL;
  if (!zapUrl) {
    console.error('[submit-contentcashflowlive] No webhook URL set — registration was NOT forwarded.');
  } else {
    try {
      const res = await fetch(zapUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
      });
      if (!res.ok) console.error('[submit-contentcashflowlive] Webhook responded', res.status);
    } catch (err) {
      console.error('[submit-contentcashflowlive] Webhook failed:', err);
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
