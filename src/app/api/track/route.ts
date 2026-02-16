import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const VALID_EVENT_TYPES = new Set([
  'page_view',
  'scroll_25', 'scroll_50', 'scroll_75', 'scroll_100',
  'time_10s', 'time_30s', 'time_60s', 'time_120s',
]);

const MAX_BATCH_SIZE = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

// In-memory rate limiter (resets on cold start — fine for analytics)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Silently discard traffic from excluded IPs (e.g. your own)
    const excludedIps = (process.env.ANALYTICS_EXCLUDE_IPS ?? '').split(',').map(s => s.trim()).filter(Boolean);
    if (excludedIps.includes(ip)) {
      return NextResponse.json({ ok: true });
    }

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
    }

    const body = await request.json();
    const { events } = body;

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: 'Events array required' }, { status: 400 });
    }

    if (events.length > MAX_BATCH_SIZE) {
      return NextResponse.json({ error: `Max ${MAX_BATCH_SIZE} events per batch` }, { status: 400 });
    }

    // Validate and sanitize each event
    const rows = [];
    for (const event of events) {
      const { story_id, session_id, event_type, page_path, referrer } = event;

      if (!VALID_EVENT_TYPES.has(event_type)) continue;
      if (!session_id || typeof session_id !== 'string' || session_id.length > 64) continue;
      if (!page_path || typeof page_path !== 'string' || page_path.length > 500) continue;

      rows.push({
        story_id: typeof story_id === 'number' ? story_id : null,
        session_id,
        event_type,
        page_path,
        referrer: typeof referrer === 'string' ? referrer.slice(0, 500) : null,
        ip,
      });
    }

    if (rows.length === 0) {
      return NextResponse.json({ ok: true });
    }

    // Try inserting with ip column; if it doesn't exist, retry without
    let { error } = await supabase.from('engagement_events').insert(rows);

    if (error && error.message?.includes('ip')) {
      const rowsNoIp = rows.map(({ ip: _ip, ...rest }) => rest);
      const retry = await supabase.from('engagement_events').insert(rowsNoIp);
      error = retry.error;
    }

    if (error) {
      console.error('Track insert error:', error.message);
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
