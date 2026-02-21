/**
 * Regenerate images for existing stories using the diverse subject approach prompts.
 *
 * Usage:
 *   npx tsx scripts/regen-images.ts              # Regen images for today's stories
 *   npx tsx scripts/regen-images.ts --all         # Regen images for ALL stories
 *   npx tsx scripts/regen-images.ts --ids 1,2,3   # Regen for specific story IDs
 *   npx tsx scripts/regen-images.ts --missing      # Regen only stories without images
 */

import dotenv from 'dotenv';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const IMAGE_STYLE = `Editorial news photograph. Wire service quality — AP, Reuters, Getty. Natural lighting. Realistic colors — not oversaturated but not desaturated or washed out either. Normal everyday color palette as seen by the human eye. No post-apocalyptic or dystopian mood. No text, watermarks, logos, or overlays. No stylized lighting or bokeh.`;

const IMAGE_MODEL = 'google/gemini-3-pro-image-preview';

const SUBJECT_APPROACHES = [
  'A candid photo of one or two people in a normal everyday setting — coffee shop, grocery store, bus stop, park bench, kitchen table. Natural body language, not posed.',
  'A close-up of a non-electronic object that tells a story — a handwritten sign, a receipt, a name badge, food on a plate, a crumpled memo, a parking ticket, a grocery bag.',
  'An outdoor scene with life in it — a busy sidewalk, a playground, a farmers market, a suburban neighborhood, a strip mall parking lot with cars.',
  'An overhead or flat-lay composition — a kitchen counter mid-cooking, a workbench with tools, a dining table set for dinner, a desk with papers and coffee.',
  'An interior space that feels lived-in — a classroom with backpacks on chairs, a break room with a microwave, a living room with a couch, a doctor\'s waiting room with magazines.',
  'A person interacting with their environment — someone walking a dog, a parent at a school pickup line, a worker on a lunch break, someone reading a newspaper on a bench.',
  'A nature or outdoor scene — a park trail, a suburban backyard, a beach boardwalk, a community garden, a dog park, a lake.',
  'A retail, service, or commercial environment — a pharmacy counter, a gym interior, a hotel lobby, a car dealership, a hair salon, a restaurant kitchen.',
  'A workplace scene — a cubicle farm, a hospital hallway, a warehouse with shelves, a teacher\'s desk, a fire station, a newsroom.',
  'A transportation moment — a subway platform, an airport gate area, a bike lane, a gas station, a drive-through window, a school bus.',
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

function getEnv() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!apiKey || !url || !key) {
    console.error('Missing env vars. Need OPENROUTER_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  return { apiKey, supabase: createClient(url, key) };
}

async function generateImage(apiKey: string, title: string, tag: string): Promise<Buffer | null> {
  const approach = SUBJECT_APPROACHES[Math.floor(Math.random() * SUBJECT_APPROACHES.length)];
  const prompt = `${IMAGE_STYLE}\n\nSubject approach for this image: ${approach}\n\nHeadline: ${title}\nCategory: ${tag}\n\nCreate a single editorial photograph for this headline using the subject approach above. Make it look like a real photo from a real newspaper — normal, everyday life. NOT dark or dystopian. NOT abandoned or empty. The world in this photo is normal and functioning. IMPORTANT: Do NOT show phones, laptops, tablets, smartwatches, screens, or electronic devices as the main subject. Focus on people, places, objects, and environments instead.`;

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
  const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!imageData) return null;

  const base64Match = imageData.match(/^data:image\/\w+;base64,(.+)$/);
  if (!base64Match) throw new Error('Unexpected image format');

  return Buffer.from(base64Match[1], 'base64');
}

async function main() {
  const args = process.argv.slice(2);
  const { apiKey, supabase } = getEnv();

  // Determine which stories to regenerate
  let query = supabase.from('stories').select('id, title, tag, image_url, published_at');

  if (args.includes('--ids')) {
    const idsArg = args[args.indexOf('--ids') + 1];
    const ids = idsArg.split(',').map(Number);
    query = query.in('id', ids);
  } else if (args.includes('--missing')) {
    query = query.or('image_url.is.null,image_url.eq.');
  } else if (args.includes('--all')) {
    // all stories
  } else {
    // Default: today's stories
    const today = new Date().toISOString().split('T')[0];
    query = query.gte('published_at', today);
  }

  const { data: stories, error } = await query.order('id', { ascending: true });
  if (error) { console.error('Fetch error:', error); process.exit(1); }
  if (!stories?.length) { console.log('No stories found matching criteria.'); return; }

  console.log(`\nRegenerating images for ${stories.length} stories:\n`);
  stories.forEach(s => console.log(`  [${s.id}] ${s.title}`));
  console.log('');

  let success = 0;
  for (const story of stories) {
    process.stdout.write(`  [${story.id}] Generating image... `);
    try {
      const imageBuffer = await generateImage(apiKey, story.title, story.tag);
      if (!imageBuffer) { console.log('SKIP (no image returned)'); continue; }

      const filename = `story-${story.id}-${Date.now()}.png`;
      const { error: uploadError } = await supabase.storage
        .from('stories-images')
        .upload(filename, imageBuffer, { contentType: 'image/png', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('stories-images')
        .getPublicUrl(filename);

      await supabase.from('stories').update({ image_url: publicUrl }).eq('id', story.id);

      console.log('OK');
      success++;
    } catch (err) {
      console.log(`FAIL: ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(`\nDone: ${success}/${stories.length} images regenerated.\n`);
}

main();
