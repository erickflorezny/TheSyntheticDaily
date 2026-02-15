/**
 * Generate satirical AI news stories and insert them into Supabase.
 *
 * Usage:
 *   npx tsx scripts/generate-stories.ts                       # 8 stories + images
 *   npx tsx scripts/generate-stories.ts --count 5             # 5 stories + images
 *   npx tsx scripts/generate-stories.ts --count 3 --no-images # 3 stories, skip images
 *   npx tsx scripts/generate-stories.ts --tags SPORTS,TECH    # 2 stories with those tags
 *
 * Requires .env.local: OPENROUTER_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import dotenv from 'dotenv';
import { join } from 'path';
import OpenAI from 'openai';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

dotenv.config({ path: join(__dirname, '..', '.env.local') });

import { EDITORIAL_PROMPT } from '../src/lib/editorial-prompt';

const ALL_TAGS = ['TECH', 'BUSINESS', 'CULTURE', 'SCIENCE', 'WORLD', 'HEALTH', 'ENTERTAINMENT', 'SPORTS', 'LIFESTYLE', 'CAREER', 'LEGAL', 'RELATIONSHIPS', 'EDUCATION', 'WELLNESS'];

const IMAGE_STYLE = `Editorial news photograph. Wire service quality — AP, Reuters, Getty. Natural lighting. Realistic colors — not oversaturated but not desaturated or washed out either. Normal everyday color palette as seen by the human eye. No post-apocalyptic or dystopian mood. No text, watermarks, logos, or overlays. No stylized lighting or bokeh.`;

const IMAGE_MODEL = 'google/gemini-3-pro-image-preview';

const SUBJECT_APPROACHES = [
  'A candid photo of one or two people in a normal everyday setting — coffee shop, grocery store, bus stop, park bench, kitchen table. Natural body language, not posed.',
  'A close-up of a specific object that tells a story — a product on a shelf, a phone screen, a handwritten sign, a receipt, a name badge, food on a plate.',
  'An outdoor scene with life in it — a busy sidewalk, a playground, a farmers market, a suburban neighborhood, a strip mall parking lot with cars.',
  'An overhead or flat-lay composition — a desk with a laptop and coffee, a kitchen counter mid-cooking, a workbench with tools, a dining table set for dinner.',
  'An interior space that feels lived-in — a classroom with backpacks on chairs, a break room with a microwave, a living room with a TV on, a doctor\'s waiting room with magazines.',
  'A piece of technology or infrastructure in a normal context — a smart speaker on a counter, a self-checkout kiosk, a Ring doorbell on a house, a thermostat on a wall.',
  'A nature or outdoor scene — a park trail, a suburban backyard, a beach boardwalk, a community garden, a dog park, a lake with kayaks.',
  'A retail, service, or commercial environment — a pharmacy counter, a gym interior, a hotel lobby, a car dealership, a hair salon, a restaurant kitchen.',
  'A workplace scene — a cubicle farm, a hospital hallway, a warehouse with shelves, a teacher\'s desk, a fire station, a newsroom.',
  'A transportation moment — a subway platform, an airport gate area, a parking garage stairwell, a bike lane, a gas station, a drive-through window.',
];

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
): Promise<Array<{ tag: string; title: string; content: string; author: string }>> {
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
    "author": "Silas Vane",
    "title": "Headline here",
    "content": "Full article text here. Use \\n\\n between paragraphs. Include fictional quotes, statistics, and institutional sources. Each story should be 4-8 paragraphs. Write in the voice of the assigned author."
  }
]

Assign each story to one of the 5 staff writers based on their beat. Use their full name. Write each story in that writer's distinct voice as described in the Editorial Staff section.

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
    const approach = SUBJECT_APPROACHES[Math.floor(Math.random() * SUBJECT_APPROACHES.length)];
    const prompt = `${IMAGE_STYLE}\n\nSubject approach for this image: ${approach}\n\nHeadline: ${title}\nCategory: ${tag}\n\nCreate a single editorial photograph for this headline using the subject approach above. Make it look like a real photo from a real newspaper — normal, everyday life. NOT dark or dystopian. NOT abandoned or empty. The world in this photo is normal and functioning. Find a visual angle related to the headline that feels authentic and specific.`;

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
  let count = 8;
  let noImages = false;
  let tags: string[] | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--count' || args[i] === '--main') {
      count = parseInt(args[++i], 10) || 8;
    } else if (args[i] === '--tags') {
      tags = args[++i].split(',').map(t => t.trim().toUpperCase());
    } else if (args[i] === '--no-images') {
      noImages = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: npx tsx scripts/generate-stories.ts [options]

Options:
  --count <n>     Generate n stories (default: 8)
  --tags <list>   Comma-separated tags to use (e.g. SPORTS,ENTERTAINMENT)
  --no-images     Skip image generation
  --help          Show this help message

Examples:
  npx tsx scripts/generate-stories.ts                                  # 8 stories + images
  npx tsx scripts/generate-stories.ts --count 3                        # 3 stories + images
  npx tsx scripts/generate-stories.ts --tags SPORTS,ENTERTAINMENT      # 2 stories with those tags
  npx tsx scripts/generate-stories.ts --count 5 --no-images            # 5 stories, skip images
`);
      process.exit(0);
    }
  }

  if (tags) {
    count = tags.length;
  }

  return { count, withImages: !noImages, tags };
}

async function main() {
  const { count, withImages, tags: customTags } = parseArgs();
  const apiKey = getApiKey();
  const client = getClient();
  const supabase = getSupabase();

  console.log(`\nThe Synthetic Daily — Story Generator`);
  console.log(`=====================================`);
  console.log(`Stories: ${count}, Images: ${withImages ? 'yes' : 'no'}\n`);

  // Fetch existing slugs
  const { data: existingSlugs } = await supabase.from('stories').select('slug');
  const slugSet = new Set((existingSlugs || []).map((s: { slug: string }) => s.slug));

  const inserted: Array<{ id: number; title: string; tag: string; type: string }> = [];

  // Generate stories
  console.log(`Generating ${count} stories...`);
  const stories = await generateStories(client, count, customTags || ALL_TAGS);
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
        author: story.author || null,
        published_at: new Date().toISOString(),
      })
      .select('id, title, slug, type')
      .single();

    if (error) {
      console.error(`  Failed to insert "${story.title}":`, error.message);
      continue;
    }
    console.log(`  [${story.tag}] ${story.title} — by ${story.author}`);
    inserted.push({ ...data, tag: story.tag });
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
