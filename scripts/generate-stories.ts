/**
 * Generate satirical AI news stories and insert them into Supabase.
 *
 * Usage:
 *   npx tsx scripts/generate-stories.ts                     # 5 main + 3 sidebar + images
 *   npx tsx scripts/generate-stories.ts --main 3            # 3 main stories + images
 *   npx tsx scripts/generate-stories.ts --sidebar 2         # 2 sidebar stories + images
 *   npx tsx scripts/generate-stories.ts --main 5 --no-images  # stories only, skip images
 *
 * Requires .env.local: OPENROUTER_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import dotenv from 'dotenv';
import { join } from 'path';
import OpenAI from 'openai';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const EDITORIAL_PROMPT = `You are a senior editor at a prestigious satirical newspaper. Your style is clinical, detached, and ultra-dry. You never use puns or 'wacky' scenarios. Instead, find the mundane horror in AI integration. Mock the tech-optimists, the venture capitalists, and the lazy users. Write in the 'Voice of God'—authoritative and slightly elitist. Never explain the joke.`;

const MAIN_TAGS = ['TECH', 'BUSINESS', 'CULTURE', 'SCIENCE', 'WORLD', 'HEALTH', 'ENTERTAINMENT', 'SPORTS'];
const SIDEBAR_TAGS = ['LIFESTYLE', 'CAREER', 'LEGAL', 'RELATIONSHIPS', 'EDUCATION', 'WELLNESS'];

const IMAGE_STYLE = `Photojournalistic style, editorial news photo. Realistic, candid, slightly absurd. Shot with a DSLR, natural lighting, shallow depth of field. No text, no watermarks, no logos. The scene should look like a real newspaper photo that subtly reveals something darkly funny about modern technology.`;

const IMAGE_MODEL = 'google/gemini-3-pro-image-preview';

interface OpenRouterImageResponse {
  choices: Array<{
    message: {
      content: string | null;
      images?: Array<{
        type: string;
        image_url: { url: string };
      }>;
    };
  }>;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

function getApiKey(): string {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('Error: OPENROUTER_API_KEY not found in .env.local');
    process.exit(1);
  }
  return apiKey;
}

function getClient() {
  return new OpenAI({ apiKey: getApiKey(), baseURL: 'https://openrouter.ai/api/v1' });
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }
  return createClient(url, key);
}

async function generateStories(
  client: OpenAI,
  count: number,
  tags: string[]
): Promise<Array<{ tag: string; title: string; content: string }>> {
  console.log(`  Requesting ${count} stories from Claude Sonnet...`);

  const completion = await client.chat.completions.create({
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
  if (!text) throw new Error('No text in Claude response');

  return JSON.parse(text);
}

async function generateAndUploadImage(
  apiKey: string,
  supabase: SupabaseClient,
  storyId: number,
  title: string,
  tag: string
): Promise<string | null> {
  try {
    const prompt = `${IMAGE_STYLE}\n\nHeadline: ${title}\nCategory: ${tag}\n\nCreate a single compelling editorial photograph that could accompany this news headline. Focus on people and environments, not abstract concepts.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        messages: [{ role: 'user', content: prompt }],
        modalities: ['image', 'text'],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API error ${response.status}: ${text.substring(0, 200)}`);
    }

    const data = (await response.json()) as OpenRouterImageResponse;
    const message = data.choices?.[0]?.message;
    const imageData = message?.images?.[0]?.image_url?.url;

    if (!imageData) return null;

    const base64Match = imageData.match(/^data:image\/\w+;base64,(.+)$/);
    if (!base64Match) throw new Error(`Unexpected image format for story ${storyId}`);

    const imageBuffer = Buffer.from(base64Match[1], 'base64');

    const filename = `story-${storyId}-${Date.now()}.png`;
    const { error: uploadError } = await supabase.storage
      .from('stories-images')
      .upload(filename, imageBuffer, { contentType: 'image/png', upsert: false });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('stories-images')
      .getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error(`  Image generation failed for story ${storyId}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  let mainCount = 5;
  let sidebarCount = 3;
  let noImages = false;
  let mainOnly = false;
  let sidebarOnly = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--main') {
      mainCount = parseInt(args[++i], 10) || 5;
      mainOnly = !args.includes('--sidebar');
    } else if (args[i] === '--sidebar') {
      sidebarCount = parseInt(args[++i], 10) || 3;
      sidebarOnly = !args.includes('--main');
    } else if (args[i] === '--no-images') {
      noImages = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: npx tsx scripts/generate-stories.ts [options]

Options:
  --main <n>      Generate n main stories (default: 5)
  --sidebar <n>   Generate n sidebar stories (default: 3)
  --no-images     Skip DALL-E image generation
  --help          Show this help message

Examples:
  npx tsx scripts/generate-stories.ts                       # 5 main + 3 sidebar + images
  npx tsx scripts/generate-stories.ts --main 2              # 2 main stories only + images
  npx tsx scripts/generate-stories.ts --sidebar 1           # 1 sidebar story only + images
  npx tsx scripts/generate-stories.ts --main 3 --no-images  # 3 main, skip images
`);
      process.exit(0);
    }
  }

  return {
    mainCount: sidebarOnly ? 0 : mainCount,
    sidebarCount: mainOnly ? 0 : sidebarCount,
    withImages: !noImages,
  };
}

async function main() {
  const { mainCount, sidebarCount, withImages } = parseArgs();
  const apiKey = getApiKey();
  const client = getClient();
  const supabase = getSupabase();

  console.log(`\nThe Synthetic Daily — Story Generator`);
  console.log(`=====================================`);
  console.log(`Main stories: ${mainCount}, Sidebar stories: ${sidebarCount}, Images: ${withImages ? 'yes' : 'no'}\n`);

  // Fetch existing slugs
  const { data: existingSlugs } = await supabase.from('stories').select('slug');
  const slugSet = new Set((existingSlugs || []).map((s: { slug: string }) => s.slug));

  const inserted: Array<{ id: number; title: string; tag: string; type: string }> = [];

  // Generate main stories
  if (mainCount > 0) {
    console.log(`Generating ${mainCount} main stories...`);
    const stories = await generateStories(client, mainCount, MAIN_TAGS);
    console.log(`  Got ${stories.length} stories from Claude\n`);

    for (const story of stories) {
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
          type: 'main',
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
        console.error(`  Failed to insert "${story.title}":`, error.message);
        continue;
      }
      console.log(`  [${story.tag}] ${story.title}`);
      inserted.push({ ...data, tag: story.tag });
    }
  }

  // Generate sidebar stories
  if (sidebarCount > 0) {
    console.log(`\nGenerating ${sidebarCount} sidebar stories...`);
    const stories = await generateStories(client, sidebarCount, SIDEBAR_TAGS);
    console.log(`  Got ${stories.length} stories from Claude\n`);

    for (const story of stories) {
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
          type: 'sidebar',
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
        console.error(`  Failed to insert "${story.title}":`, error.message);
        continue;
      }
      console.log(`  [${story.tag}] ${story.title}`);
      inserted.push({ ...data, tag: story.tag });
    }
  }

  // Generate images if requested
  if (withImages && inserted.length > 0) {
    console.log(`\nGenerating images for ${inserted.length} stories...`);
    let imageCount = 0;

    for (const row of inserted) {
      console.log(`  Generating image for: "${row.title.substring(0, 60)}..."`);
      const imageUrl = await generateAndUploadImage(apiKey, supabase, row.id, row.title, row.tag);
      if (imageUrl) {
        await supabase.from('stories').update({ image_url: imageUrl }).eq('id', row.id);
        console.log(`    Uploaded: ${imageUrl.substring(imageUrl.lastIndexOf('/') + 1)}`);
        imageCount++;
      } else {
        console.log(`    Skipped (no image returned)`);
      }
    }
    console.log(`\n  ${imageCount}/${inserted.length} images generated`);
  }

  console.log(`\nDone! Inserted ${inserted.length} stories into Supabase.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
