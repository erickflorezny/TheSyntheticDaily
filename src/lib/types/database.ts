export interface StoryRow {
  id: number;
  type: 'main' | 'sidebar';
  tag: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: string;
  created_at: string;
}

export interface Story {
  id: number;
  type: 'main' | 'sidebar';
  tag: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  publishedDate?: string;
  image?: string;
}

export function mapRowToStory(row: StoryRow): Story {
  return {
    id: row.id,
    type: row.type,
    tag: row.tag,
    title: row.title,
    content: row.content,
    slug: row.slug,
    excerpt: row.excerpt ?? undefined,
    publishedDate: row.published_at
      ? new Date(row.published_at).toISOString().split('T')[0]
      : undefined,
    image: row.image_url ?? undefined,
  };
}
