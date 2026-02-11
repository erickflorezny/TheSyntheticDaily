import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Story scores with titles
    const { data: storyScores } = await supabase
      .from('story_scores')
      .select('story_id, score, view_count, unique_views, avg_scroll, avg_time_bucket, updated_at');

    const { data: stories } = await supabase
      .from('stories')
      .select('id, title, slug, type, published_at');

    // Event counts by type (last 7 days)
    const { data: eventCounts } = await supabase
      .from('engagement_events')
      .select('event_type')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    // Events per day (last 7 days)
    const { data: recentEvents } = await supabase
      .from('engagement_events')
      .select('created_at, event_type, page_path, story_id, ip')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });

    // Total unique sessions (last 7 days)
    const { data: sessionData } = await supabase
      .from('engagement_events')
      .select('session_id')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    const uniqueSessions = new Set(sessionData?.map(e => e.session_id) ?? []).size;

    // Aggregate event counts
    const eventTypeCounts: Record<string, number> = {};
    for (const e of eventCounts ?? []) {
      eventTypeCounts[e.event_type] = (eventTypeCounts[e.event_type] ?? 0) + 1;
    }

    // Aggregate events per day
    const eventsPerDay: Record<string, number> = {};
    for (const e of recentEvents ?? []) {
      const day = new Date(e.created_at).toISOString().split('T')[0];
      eventsPerDay[day] = (eventsPerDay[day] ?? 0) + 1;
    }

    // Page views per day
    const pageViewsPerDay: Record<string, number> = {};
    for (const e of recentEvents ?? []) {
      if (e.event_type === 'page_view') {
        const day = new Date(e.created_at).toISOString().split('T')[0];
        pageViewsPerDay[day] = (pageViewsPerDay[day] ?? 0) + 1;
      }
    }

    // Top pages by views
    const pageViewCounts: Record<string, number> = {};
    for (const e of recentEvents ?? []) {
      if (e.event_type === 'page_view') {
        pageViewCounts[e.page_path] = (pageViewCounts[e.page_path] ?? 0) + 1;
      }
    }

    // Build story lookup
    const storyMap = new Map<number, { title: string; slug: string; type: string; published_at: string }>();
    for (const s of stories ?? []) {
      storyMap.set(s.id, { title: s.title, slug: s.slug, type: s.type, published_at: s.published_at });
    }

    // Merge scores with story info
    const rankedStories = (storyScores ?? [])
      .map(ss => ({
        ...ss,
        title: storyMap.get(ss.story_id)?.title ?? 'Unknown',
        slug: storyMap.get(ss.story_id)?.slug ?? '',
        type: storyMap.get(ss.story_id)?.type ?? '',
        published_at: storyMap.get(ss.story_id)?.published_at ?? '',
      }))
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    // Top pages sorted
    const topPages = Object.entries(pageViewCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([path, views]) => ({ path, views }));

    // IP-based location data
    const ipCounts: Record<string, number> = {};
    for (const e of recentEvents ?? []) {
      if (e.ip && e.event_type === 'page_view') {
        ipCounts[e.ip] = (ipCounts[e.ip] ?? 0) + 1;
      }
    }

    // Resolve unique IPs to locations via ip-api.com batch endpoint (max 100 per request)
    const uniqueIps = Object.keys(ipCounts).filter(ip => ip !== 'unknown').slice(0, 100);
    let locations: { city: string; region: string; country: string; ip: string; views: number }[] = [];

    if (uniqueIps.length > 0) {
      try {
        const geoRes = await fetch('http://ip-api.com/batch?fields=query,city,regionName,country,status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uniqueIps.map(ip => ({ query: ip }))),
        });

        if (geoRes.ok) {
          const geoData = await geoRes.json() as Array<{
            query: string;
            city?: string;
            regionName?: string;
            country?: string;
            status: string;
          }>;

          locations = geoData
            .filter(g => g.status === 'success')
            .map(g => ({
              ip: g.query,
              city: g.city ?? 'Unknown',
              region: g.regionName ?? '',
              country: g.country ?? 'Unknown',
              views: ipCounts[g.query] ?? 0,
            }))
            .sort((a, b) => b.views - a.views);
        }
      } catch (geoErr) {
        console.error('Geo lookup failed:', geoErr);
      }
    }

    // Aggregate by location (city + country)
    const locationAgg: Record<string, { city: string; region: string; country: string; views: number; ips: number }> = {};
    for (const loc of locations) {
      const key = `${loc.city}, ${loc.country}`;
      if (!locationAgg[key]) {
        locationAgg[key] = { city: loc.city, region: loc.region, country: loc.country, views: 0, ips: 0 };
      }
      locationAgg[key].views += loc.views;
      locationAgg[key].ips += 1;
    }

    const locationBreakdown = Object.values(locationAgg).sort((a, b) => b.views - a.views);

    return NextResponse.json({
      summary: {
        totalEvents: recentEvents?.length ?? 0,
        totalPageViews: eventTypeCounts['page_view'] ?? 0,
        uniqueSessions,
        storiesTracked: storyScores?.length ?? 0,
        uniqueLocations: locationBreakdown.length,
      },
      eventTypeCounts,
      eventsPerDay,
      pageViewsPerDay,
      topPages,
      rankedStories,
      locations: locationBreakdown,
    });
  } catch (err) {
    console.error('Analytics API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
