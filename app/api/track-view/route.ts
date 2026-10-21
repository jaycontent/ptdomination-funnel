import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { deriveTrafficSource } from '@/lib/trafficSource';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TABLE = 'page_views';

type Payload = {
  path?: string | null;
  session_id?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
};

// Records one landing-page view. Deliberately forgiving: this endpoint exists
// for reporting, and a failure here must never be visible to a visitor, so it
// answers 200 whatever happens and the caller ignores the response.
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const trim = (v: string | null | undefined) => (v ?? '').trim().slice(0, 300) || null;

  const row = {
    path: trim(body.path),
    traffic_source: deriveTrafficSource(body),
    session_id: trim(body.session_id),
    utm_source: trim(body.utm_source),
    utm_medium: trim(body.utm_medium),
    utm_campaign: trim(body.utm_campaign),
    utm_content: trim(body.utm_content),
    utm_term: trim(body.utm_term),
  };

  try {
    const { error } = await getSupabaseAdmin().from(TABLE).insert(row);
    if (error) console.error('[track-view] insert failed:', error.message);
  } catch (err) {
    console.error('[track-view] client error:', err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
