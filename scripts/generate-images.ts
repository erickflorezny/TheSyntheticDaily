/**
 * Generate DALL-E 3 images for stories that don't have one yet.
 *
 * Usage:
 *   npx tsx scripts/generate-images.ts              # All stories missing images
 *   npx tsx scripts/generate-images.ts --limit 5    # Only first 5 missing
 *   npx tsx scripts/generate-images.ts --id 42      # Specific story by ID
 *   npx tsx scripts/generate-images.ts --type main  # Only main stories
 *
 * Requires .env.local: OPENROUTER_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import dotenv from 'dotenv';
import { join } from 'path';
import OpenAI from 'openai';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const IMAGE_STYLE = `Photojournalistic style, editorial news photo. Realistic, candid, slightly absurd. Shot with a DSLR, natural lighting, shallow depth of field. No text, no watermarks, no logos. The scene should look like a real newspaper photo that subtly reveals something darkly funny about modern technology.`;

function getClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('Error: OPENROUTER_API_KEY not found in .env.local');
    process.exit(1);
  }
  return new OpenAI({ apiKey, baseURL: 'https://openrouter.ai/api/v1' });
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

async function generateAndUploadImage(
  client: OpenAI,
  supabase: SupabaseClient,
  storyId: number,
  title: string,
  tag: string
): Promise<string | null> {
  const prompt = `${IMAGE_STYLE}\n\nHeadline: ${title}\nCategory: ${tag}\n\nCreate a single compelling editorial photograph that could accompany this news headline. Focus on people and environments, not abstract concepts.`;

  const response = await client.images.generate({
    model: 'openai/dall-e-3',
    prompt,
    n: 1,
    size: '1792x1024',
    quality: 'standard',
  });

  const imageUrl = response.data?.[0]?.url;
  if (!imageUrl) return null;

  const imageResponse = await fetch(imageUrl);
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  const filename = `story-${storyId}-${Date.now()}.png`;
  const { error: uploadError } = await supabase.storage
    .from('story-images')
    .upload(filename, imageBuffer, { contentType: 'image/png', upsert: false });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('story-images')
    .getPublicUrl(filename);

  return publicUrl;
}

function parseArgs() {
  const args = process.argv.slice(2);
  let limit = 0; // 0 = no limit
  let storyId: number | null = null;
  let type: string | null = null;
  let force = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit') {
      limit = parseInt(args[++i], 10) || 10;
    } else if (args[i] === '--id') {
      storyId = parseInt(args[++i], 10);
    } else if (args[i] === '--type') {
      type = args[++i];
    } else if (args[i] === '--force') {
      force = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: npx tsx scripts/generate-images.ts [options]

Options:
  --limit <n>       Process at most n stories (default: all)
  --id <id>         Generate image for a specific story ID
  --type <type>     Filter by story type: main or sidebar
  --force           Re-generate images even if one already exists
  --help            Show this help message

Examples:
  npx tsx scripts/generate-images.ts                    # All stories missing images
  npx tsx scripts/generate-images.ts --limit 5          # First 5 missing images
  npx tsx scripts/generate-images.ts --id 42            # Specific story
  npx tsx scripts/generate-images.ts --type main        # Only main stories
  npx tsx scripts/generate-images.ts --id 42 --force    # Re-generate for story 42
`);
      process.exit(0);
    }
  }

  return { limit, storyId, type, force };
}

async function main() {
  const { limit, storyId, type, force } = parseArgs();
  const client = getClient();
  const supabase = getSupabase();

  console.log(`\nThe Synthetic Daily — Image Generator`);
  console.log(`=====================================\n`);

  // Build query
  let query = supabase.from('stories').select('id, title, tag, type, image_url');

  if (storyId) {
    query = query.eq('id', storyId);
  } else {
    if (!force) {
      query = query.is('image_url', null);
    }
    if (type) {
      query = query.eq('type', type);
    }
    query = query.order('published_at', { ascending: false });
    if (limit > 0) {
      query = query.limit(limit);
    }
  }

  const { data: stories, error } = await query;

  if (error) {
    console.error('Failed to fetch stories:', error.message);
    process.exit(1);
  }

  if (!stories || stories.length === 0) {
    console.log('No stories found that need images. Use --force to re-generate existing images.');
    return;
  }

  console.log(`Found ${stories.length} stories to process\n`);

  let success = 0;
  let failed = 0;

  for (const story of stories) {
    const label = `[${story.id}] [${story.tag}] ${story.title.substring(0, 60)}`;
    console.log(`Processing: ${label}...`);

    try {
      const imageUrl = await generateAndUploadImage(client, supabase, story.id, story.title, story.tag);
      if (imageUrl) {
        await supabase.from('stories').update({ image_url: imageUrl }).eq('id', story.id);
        console.log(`  Uploaded: ${imageUrl.substring(imageUrl.lastIndexOf('/') + 1)}`);
        success++;
      } else {
        console.log(`  Skipped (no image returned)`);
        failed++;
      }
    } catch (err) {
      console.error(`  Failed:`, err instanceof Error ? err.message : err);
      failed++;
    }
  }

  console.log(`\nDone! ${success} images generated, ${failed} failed.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
