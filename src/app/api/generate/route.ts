import { NextResponse } from 'next/server';
import { openrouter } from '../../../../lib/anthropic';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

const EDITORIAL_PROMPT = `You are a senior editor at a prestigious satirical newspaper. Your style is clinical, detached, and ultra-dry. You never use puns or 'wacky' scenarios. Instead, find the mundane horror in AI integration. Mock the tech-optimists, the venture capitalists, and the lazy users. Write in the 'Voice of God'—authoritative and slightly elitist. Never explain the joke.`;

const STORY_TAGS = ["TECH", "BUSINESS", "CULTURE", "SCIENCE", "WORLD", "HEALTH", "ENTERTAINMENT", "SPORTS"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const count = Math.min(parseInt(searchParams.get('count') || '3'), 5);

  try {
    if (!openrouter) {
      return NextResponse.json(
        { error: 'OpenRouter API client not configured. Missing OPENROUTER_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const completion = await openrouter.chat.completions.create({
      model: 'anthropic/claude-sonnet-4',
      max_tokens: 4096,
      messages: [
        {
          role: 'system',
          content: EDITORIAL_PROMPT,
        },
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

Use these tags: ${STORY_TAGS.join(', ')}. Each story must use a different tag.`
        }
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: 'No text in response' }, { status: 500 });
    }

    const newStories = JSON.parse(text);

    // Read existing stories
    const storiesPath = join(process.cwd(), 'lib', 'stories.json');
    const existing = JSON.parse(readFileSync(storiesPath, 'utf-8'));

    // Assign IDs continuing from the highest existing ID
    const maxId = existing.reduce((max: number, s: { id: number }) => Math.max(max, s.id), 0);
    const storiesWithIds = newStories.map((story: { tag: string; title: string; content: string }, i: number) => ({
      id: maxId + i + 1,
      ...story,
    }));

    // Prepend new stories and keep the latest 20
    const updated = [...storiesWithIds, ...existing].slice(0, 20);
    writeFileSync(storiesPath, JSON.stringify(updated, null, 2));

    return NextResponse.json({
      success: true,
      generated: storiesWithIds.length,
      total: updated.length,
      stories: storiesWithIds,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Generation failed', details: message }, { status: 500 });
  }
}
