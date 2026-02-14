import type { MetadataRoute } from 'next';
import { storiesService, sidebarStoriesService } from '@/lib/services/stories';
import { OPINION_PIECES } from '@/lib/data/opinion-pieces';

const BASE_URL = 'https://thesyntheticdaily.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await storiesService.getAllStories();
  const sidebarStories = await sidebarStoriesService.getAllSidebarStories();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/stories`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/opinion`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/newsletter`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${BASE_URL}/stories/${story.slug}`,
    lastModified: story.publishedDate ? new Date(story.publishedDate) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const sidebarPages: MetadataRoute.Sitemap = sidebarStories.map((story) => ({
    url: `${BASE_URL}/sidebar/${story.slug}`,
    lastModified: story.publishedDate ? new Date(story.publishedDate) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const opinionPages: MetadataRoute.Sitemap = OPINION_PIECES.map((piece) => ({
    url: `${BASE_URL}/opinion/${piece.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...storyPages, ...sidebarPages, ...opinionPages];
}
