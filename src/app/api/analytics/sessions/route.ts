import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sessionId = searchParams.get('session');

  try {
    // Single session detail
    if (sessionId) {
      const { data: events, error } = await supabase
        .from('engagement_events')
        .select('event_type, page_path, referrer, created_at, ip, story_id')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (!events || events.length === 0) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 });
      }

      return NextResponse.json({
        session_id: sessionId,
        ip: events[0].ip || null,
        events: events.map(e => ({
          event_type: e.event_type,
          page_path: e.page_path,
          referrer: e.referrer,
          story_id: e.story_id,
          created_at: e.created_at,
        })),
      });
    }

    // List recent sessions — fetch raw events and aggregate in JS
    // (Supabase JS client doesn't support GROUP BY)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: events, error } = await supabase
      .from('engagement_events')
      .select('session_id, event_type, page_path, created_at, ip')
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: true })
      .limit(10000);

    if (error) throw error;

    // Group by session_id
    const sessionMap = new Map<string, {
      session_id: string;
      ip: string | null;
      first_seen: string;
      last_seen: string;
      event_count: number;
      page_views: number;
      pages: string[];
      entry_page: string;
      exit_page: string;
    }>();

    for (const event of events || []) {
      const existing = sessionMap.get(event.session_id);
      if (!existing) {
        sessionMap.set(event.session_id, {
          session_id: event.session_id,
          ip: event.ip || null,
          first_seen: event.created_at,
          last_seen: event.created_at,
          event_count: 1,
          page_views: event.event_type === 'page_view' ? 1 : 0,
          pages: [event.page_path],
          entry_page: event.page_path,
          exit_page: event.page_path,
        });
      } else {
        existing.event_count++;
        existing.last_seen = event.created_at;
        if (event.event_type === 'page_view') {
          existing.page_views++;
          existing.exit_page = event.page_path;
          if (!existing.pages.includes(event.page_path)) {
            existing.pages.push(event.page_path);
          }
        }
        if (!existing.ip && event.ip) existing.ip = event.ip;
      }
    }

    // Sort by most recent activity, take top 100
    const sessions = Array.from(sessionMap.values())
      .sort((a, b) => new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime())
      .slice(0, 100)
      .map(s => ({
        session_id: s.session_id,
        ip: s.ip,
        first_seen: s.first_seen,
        last_seen: s.last_seen,
        event_count: s.event_count,
        page_views: s.page_views,
        pages_visited: s.pages.length,
        entry_page: s.entry_page,
        exit_page: s.exit_page,
      }));

    return NextResponse.json({ sessions });
  } catch (err) {
    console.error('Sessions API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
