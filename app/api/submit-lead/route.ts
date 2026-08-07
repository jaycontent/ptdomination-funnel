import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Run on the Node.js runtime so the service-role key is available server-side.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LEADS_TABLE = 'livetraining_leads';

type LeadPayload = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  would_invest?: string | null;
  sms_consent?: boolean;
  webinar_datetime?: string | null;
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
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }

  // Whitelist the columns we persist so unexpected keys can't be injected.
  const lead = {
    first_name: (body.first_name ?? '').trim() || null,
    last_name: (body.last_name ?? '').trim() || null,
    email,
    phone: (body.phone ?? '').trim() || null,
    would_invest: (body.would_invest ?? '').trim() || null,
    sms_consent: body.sms_consent ?? false,
    webinar_datetime: body.webinar_datetime ?? null,
    page_path: body.page_path ?? null,
    utm_source: body.utm_source ?? null,
    utm_medium: body.utm_medium ?? null,
    utm_campaign: body.utm_campaign ?? null,
    utm_content: body.utm_content ?? null,
    utm_term: body.utm_term ?? null,
  };

  // 1) Persist the lead in Supabase.
  try {
    const sb = getSupabaseAdmin();
    let { error: dbError } = await sb.from(LEADS_TABLE).insert(lead);
    // If the would_invest column hasn't been added to the table yet, save the
    // rest so the opt-in never breaks (the answer still goes to Zapier below).
    if (dbError && /would_invest/i.test(dbError.message)) {
      const { would_invest, ...rest } = lead;
      ({ error: dbError } = await sb.from(LEADS_TABLE).insert(rest));
    }
    if (dbError) {
      console.error('[submit-lead] Supabase insert failed:', dbError.message);
      return NextResponse.json({ error: 'Could not save your details. Please try again.' }, { status: 500 });
    }
  } catch (err) {
    console.error('[submit-lead] Supabase client error:', err);
    return NextResponse.json({ error: 'Server is not configured. Please try again later.' }, { status: 500 });
  }

  // 2) Fire the Zapier webhook (best-effort — a Zapier hiccup must not block the opt-in).
  const zapUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (zapUrl) {
    try {
      await fetch(zapUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, submitted_at: new Date().toISOString() }),
      });
    } catch (err) {
      console.error('[submit-lead] Zapier webhook failed:', err);
      // Intentionally not failing the request — the lead is already saved.
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
