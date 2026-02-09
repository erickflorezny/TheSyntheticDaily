import dotenv from 'dotenv';
import { join as pathJoin } from 'path';
dotenv.config({ path: pathJoin(__dirname, '..', '.env.local') });
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

interface RawStory {
  id: number;
  tag: string;
  title: string;
  content: string;
  image?: string;
}

async function seed() {
  const storiesPath = join(__dirname, '..', 'lib', 'stories.json');
  const sidebarPath = join(__dirname, '..', 'lib', 'sidebar-stories.json');

  const stories: RawStory[] = JSON.parse(readFileSync(storiesPath, 'utf-8'));
  const sidebarStories: RawStory[] = JSON.parse(readFileSync(sidebarPath, 'utf-8'));

  const slugs = new Set<string>();

  console.log(`Seeding ${stories.length} main stories...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    let slug = generateSlug(story.title);
    let counter = 1;
    while (slugs.has(slug)) {
      slug = `${generateSlug(story.title)}-${counter++}`;
    }
    slugs.add(slug);

    const { error } = await supabase.from('stories').insert({
      type: 'main',
      tag: story.tag,
      title: story.title,
      content: story.content,
      slug,
      excerpt: story.content.substring(0, 150) + '...',
      image_url: story.image || null,
      published_at: new Date(Date.now() - i * 86400000).toISOString(),
    });

    if (error) {
      console.error(`  Failed: ${story.title.substring(0, 50)}... - ${error.message}`);
    } else {
      console.log(`  Inserted: ${story.title.substring(0, 60)}...`);
    }
  }

  console.log(`\nSeeding ${sidebarStories.length} sidebar stories...`);
  for (let i = 0; i < sidebarStories.length; i++) {
    const story = sidebarStories[i];
    let slug = generateSlug(story.title);
    let counter = 1;
    while (slugs.has(slug)) {
      slug = `${generateSlug(story.title)}-${counter++}`;
    }
    slugs.add(slug);

    const { error } = await supabase.from('stories').insert({
      type: 'sidebar',
      tag: story.tag,
      title: story.title,
      content: story.content,
      slug,
      excerpt: story.content.substring(0, 150) + '...',
      image_url: story.image || null,
      published_at: new Date(Date.now() - i * 86400000).toISOString(),
    });

    if (error) {
      console.error(`  Failed: ${story.title.substring(0, 50)}... - ${error.message}`);
    } else {
      console.log(`  Inserted: ${story.title.substring(0, 60)}...`);
    }
  }

  console.log('\nSeeding complete!');
}

seed().catch(console.error);
