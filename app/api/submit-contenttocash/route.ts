import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  would_invest?: string | null;
  sms_consent?: boolean;
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

  const registration = {
    first_name: (body.first_name ?? '').trim() || null,
    last_name: (body.last_name ?? '').trim() || null,
    email,
    phone: (body.phone ?? '').trim() || null,
    would_invest: (body.would_invest ?? '').trim() || null,
    sms_consent: body.sms_consent ?? false,
    event: 'content-to-cash-masterclass',
    page_path: body.page_path ?? null,
    utm_source: body.utm_source ?? null,
    utm_medium: body.utm_medium ?? null,
    utm_campaign: body.utm_campaign ?? null,
    utm_content: body.utm_content ?? null,
    utm_term: body.utm_term ?? null,
    submitted_at: new Date().toISOString(),
  };

  // Fire the dedicated Content-to-Cash Zapier webhook.
  const zapUrl = process.env.CONTENTTOCASH_WEBHOOK_URL;
  if (!zapUrl) {
    console.error('[submit-contenttocash] CONTENTTOCASH_WEBHOOK_URL is not set — registration was NOT forwarded.');
  } else {
    try {
      const res = await fetch(zapUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registration),
      });
      if (!res.ok) console.error('[submit-contenttocash] Webhook responded', res.status);
    } catch (err) {
      console.error('[submit-contenttocash] Webhook failed:', err);
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
