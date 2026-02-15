import { NextResponse } from 'next/server';
import { openrouter } from '../../../../lib/anthropic';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils/slug';
import { generateAndUploadImage } from '@/lib/services/images';
import { EDITORIAL_PROMPT } from '@/lib/editorial-prompt';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const ALL_TAGS = ['TECH', 'BUSINESS', 'CULTURE', 'SCIENCE', 'WORLD', 'HEALTH', 'ENTERTAINMENT', 'SPORTS', 'LIFESTYLE', 'CAREER', 'LEGAL', 'RELATIONSHIPS', 'EDUCATION', 'WELLNESS'];

function isAuthorized(request: Request): boolean {
  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get('key');
  if (queryKey && queryKey === process.env.CRON_SECRET) return true;
  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) return true;
  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!openrouter) {
      return NextResponse.json(
        { error: 'OpenRouter API client not configured. Missing OPENROUTER_API_KEY.' },
        { status: 500 }
      );
    }

    // Generate stories via Claude Sonnet
    const generatedStories = await generateStories(8, ALL_TAGS);

    // Fetch existing slugs for uniqueness
    const { data: existingSlugs } = await supabase
      .from('stories')
      .select('slug');
    const slugSet = new Set((existingSlugs || []).map(s => s.slug));

    // Insert all stories into Supabase
    const allRaw = generatedStories.map(s => ({ ...s, type: 'main' as const }));

    const inserted: Array<{ id: number; title: string; slug: string; type: string }> = [];

    for (const story of allRaw) {
      let slug = generateSlug(story.title);
      let counter = 1;
      while (slugSet.has(slug)) {
        slug = `${generateSlug(story.title)}-${counter}`;
        counter++;
      }
      slugSet.add(slug);

      const { data, error } = await supabase
        .from('stories')
        .insert({
          type: story.type,
          tag: story.tag,
          title: story.title,
          content: story.content,
          slug,
          excerpt: story.content.substring(0, 150) + '...',
          published_at: new Date().toISOString(),
        })
        .select('id, title, slug, type')
        .single();

      if (error) {
        console.error('Insert error:', error);
        continue;
      }
      inserted.push(data);
    }

    // Generate images in parallel for all inserted stories
    const imageResults = await Promise.allSettled(
      inserted.map(async (row) => {
        const story = allRaw.find(s => s.title === row.title);
        if (!story) return null;

        const imageUrl = await generateAndUploadImage(row.id, row.title, story.tag);
        if (imageUrl) {
          await supabase
            .from('stories')
            .update({ image_url: imageUrl })
            .eq('id', row.id);
        }
        return { id: row.id, imageUrl };
      })
    );

    const withImages = imageResults.filter(
      r => r.status === 'fulfilled' && r.value?.imageUrl
    ).length;

    return NextResponse.json({
      success: true,
      generated: inserted.length,
      images: withImages,
      stories: inserted,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Generation failed', details: message }, { status: 500 });
  }
}

async function generateStories(
  count: number,
  tags: string[]
): Promise<Array<{ tag: string; title: string; content: string }>> {
  const completion = await openrouter!.chat.completions.create({
    model: 'anthropic/claude-sonnet-4',
    max_tokens: 8192,
    messages: [
      { role: 'system', content: EDITORIAL_PROMPT },
      {
        role: 'user',
        content: `Generate ${count} satirical news stories about AI's integration into everyday life. Each story should have a different topic area.

Return ONLY valid JSON — no markdown, no code fences. Use this exact format:
[
  {
    "tag": "TECH",
    "title": "Headline here",
    "content": "Full article text here. Use \\n\\n between paragraphs. Include fictional quotes, statistics, and institutional sources. Each story should be 4-8 paragraphs."
  }
]

Use these tags: ${tags.join(', ')}. Each story must use a different tag.`
      }
    ],
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) throw new Error('No text in response');

  return JSON.parse(text);
}
