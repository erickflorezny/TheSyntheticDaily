/**
 * Generate AI images for all stories using OpenRouter's image generation.
 *
 * Usage:
 *   npx tsx scripts/generate-images.ts
 *
 * Requires OPENROUTER_API_KEY in .env.local
 * Images are saved to public/images/ and story JSON files are updated with image paths.
 */

import dotenv from 'dotenv';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-3-pro-image-preview';

interface Story {
  id: number;
  tag: string;
  title: string;
  content: string;
  image?: string;
}

const STYLE_PROMPT = `Photojournalistic style, editorial news photo. Realistic, candid, slightly absurd. Shot with a DSLR, natural lighting, shallow depth of field. No text, no watermarks, no logos. The scene should look like a real newspaper photo that subtly reveals something darkly funny about modern technology.`;

function buildImagePrompt(story: Story): string {
  const firstLine = story.content.split('—')[0]?.trim() || '';
  const setting = firstLine.replace(/^[A-Z\s]+$/, '').trim();

  return `${STYLE_PROMPT}

Topic: ${story.title}
Setting: ${setting || 'modern office or tech environment'}
Category: ${story.tag}

Create a single compelling editorial photograph that could accompany this news headline. Focus on people and environments, not abstract concepts.`;
}

interface OpenRouterImageResponse {
  choices: Array<{
    message: {
      role: string;
      content: string | null;
      images?: Array<{
        type: string;
        image_url: {
          url: string;
        };
      }>;
    };
  }>;
}

async function generateImageForStory(story: Story, outputDir: string): Promise<string> {
  const filename = `story-${story.id}.png`;
  const filepath = join(outputDir, filename);

  if (existsSync(filepath)) {
    console.log(`  Skipping story ${story.id} — image already exists`);
    return `/images/${filename}`;
  }

  const prompt = buildImagePrompt(story);
  console.log(`  Generating image for story ${story.id}: "${story.title.substring(0, 60)}..."`);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
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

  if (!imageData) {
    throw new Error(`No image returned for story ${story.id}`);
  }

  // Extract base64 data from data URL (e.g., "data:image/png;base64,...")
  const base64Match = imageData.match(/^data:image\/\w+;base64,(.+)$/);
  if (!base64Match) {
    throw new Error(`Unexpected image format for story ${story.id}`);
  }

  const buffer = Buffer.from(base64Match[1], 'base64');
  writeFileSync(filepath, buffer);
  console.log(`  Saved: ${filepath} (${(buffer.length / 1024).toFixed(0)} KB)`);

  return `/images/${filename}`;
}

async function main() {
  if (!API_KEY) {
    console.error('Error: OPENROUTER_API_KEY not found in .env.local');
    process.exit(1);
  }

  console.log(`Using model: ${MODEL}`);

  const rootDir = join(__dirname, '..');
  const outputDir = join(rootDir, 'public', 'images');
  const storiesPath = join(rootDir, 'lib', 'stories.json');
  const sidebarPath = join(rootDir, 'lib', 'sidebar-stories.json');

  // Process main stories
  console.log('\nGenerating images for main stories...');
  const stories: Story[] = JSON.parse(readFileSync(storiesPath, 'utf-8'));

  for (const story of stories) {
    try {
      const imagePath = await generateImageForStory(story, outputDir);
      story.image = imagePath;
    } catch (err) {
      console.error(`  Failed for story ${story.id}:`, err instanceof Error ? err.message : err);
    }
  }

  writeFileSync(storiesPath, JSON.stringify(stories, null, 2));
  console.log(`Updated ${storiesPath}`);

  // Process sidebar stories
  console.log('\nGenerating images for sidebar stories...');
  const sidebarStories: Story[] = JSON.parse(readFileSync(sidebarPath, 'utf-8'));

  for (const story of sidebarStories) {
    try {
      const imagePath = await generateImageForStory(story, outputDir);
      story.image = imagePath;
    } catch (err) {
      console.error(`  Failed for story ${story.id}:`, err instanceof Error ? err.message : err);
    }
  }

  writeFileSync(sidebarPath, JSON.stringify(sidebarStories, null, 2));
  console.log(`Updated ${sidebarPath}`);

  console.log('\nDone! All images generated and story data updated.');
}

main();
