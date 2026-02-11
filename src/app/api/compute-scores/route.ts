import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Recompute engagement scores
    const { error: scoreError } = await supabase.rpc('compute_story_scores');
    if (scoreError) {
      console.error('compute_story_scores error:', scoreError.message);
      return NextResponse.json({ error: 'Score computation failed' }, { status: 500 });
    }

    // Cleanup old events
    const { error: cleanupError } = await supabase.rpc('cleanup_old_events');
    if (cleanupError) {
      console.error('cleanup_old_events error:', cleanupError.message);
      // Non-fatal — scores were already computed
    }

    return NextResponse.json({ ok: true, computed_at: new Date().toISOString() });
  } catch (err) {
    console.error('compute-scores error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
