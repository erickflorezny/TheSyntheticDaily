import { NextResponse } from 'next/server';
import { contentService } from '@/lib/services/stories';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = await contentService.searchStories(query);
  return NextResponse.json({ results });
}
