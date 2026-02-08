import storiesData from '../stories.json';
import sidebarStoriesData from '../sidebar-stories.json';
import { generateUniqueSlug, createSlugWithId } from '../utils/slug';

// Define story interface
export interface Story {
  id: number;
  tag: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  publishedDate?: string;
}

// Define sidebar story interface
export interface SidebarStory {
  id: number;
  tag: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  publishedDate?: string;
}

// Generate slugs for all stories
const allStoryTitles = storiesData.map(story => story.title);
const storiesWithSlugs: Story[] = storiesData.map((story, index) => ({
  ...story,
  slug: createSlugWithId(story.title, story.id),
  excerpt: story.content.substring(0, 150) + '...',
  publishedDate: new Date(Date.now() - index * 86400000).toISOString().split('T')[0] // Stagger dates
}));

// Generate slugs for all sidebar stories
const allSidebarStoryTitles = sidebarStoriesData.map(story => story.title);
const sidebarStoriesWithSlugs: SidebarStory[] = sidebarStoriesData.map((story, index) => ({
  ...story,
  slug: createSlugWithId(story.title, story.id),
  excerpt: story.content.substring(0, 150) + '...',
  publishedDate: new Date(Date.now() - index * 86400000).toISOString().split('T')[0] // Stagger dates
}));

// Story service functions
export const storiesService = {
  // Get all stories
  getAllStories: (): Story[] => {
    return storiesWithSlugs;
  },

  // Get story by slug
  getStoryBySlug: (slug: string): Story | undefined => {
    return storiesWithSlugs.find(story => story.slug === slug);
  },

  // Get story by ID (for backward compatibility)
  getStoryById: (id: number): Story | undefined => {
    return storiesWithSlugs.find(story => story.id === id);
  },

  // Get related stories (excluding current story)
  getRelatedStories: (currentStoryId: number, limit: number = 4): Story[] => {
    return storiesWithSlugs
      .filter(story => story.id !== currentStoryId)
      .slice(0, limit);
  },

  // Get stories by tag
  getStoriesByTag: (tag: string): Story[] => {
    return storiesWithSlugs.filter(story => 
      story.tag.toLowerCase() === tag.toLowerCase()
    );
  },

  // Get all unique tags
  getAllTags: (): string[] => {
    const tags = storiesWithSlugs.map(story => story.tag);
    return [...new Set(tags)];
  }
};

// Sidebar stories service functions
export const sidebarStoriesService = {
  // Get all sidebar stories
  getAllSidebarStories: (): SidebarStory[] => {
    return sidebarStoriesWithSlugs;
  },

  // Get sidebar story by slug
  getSidebarStoryBySlug: (slug: string): SidebarStory | undefined => {
    return sidebarStoriesWithSlugs.find(story => story.slug === slug);
  },

  // Get sidebar story by ID (for backward compatibility)
  getSidebarStoryById: (id: number): SidebarStory | undefined => {
    return sidebarStoriesWithSlugs.find(story => story.id === id);
  },

  // Get related sidebar stories (excluding current story)
  getRelatedSidebarStories: (currentStoryId: number, limit: number = 4): SidebarStory[] => {
    return sidebarStoriesWithSlugs
      .filter(story => story.id !== currentStoryId)
      .slice(0, limit);
  }
};

// Combined service for all content
export const contentService = {
  // Get all content (stories + sidebar stories)
  getAllContent: (): (Story | SidebarStory)[] => {
    return [...storiesWithSlugs, ...sidebarStoriesWithSlugs];
  },

  // Get content by slug (searches both stories and sidebar stories)
  getContentBySlug: (slug: string): Story | SidebarStory | undefined => {
    return storiesWithSlugs.find(story => story.slug === slug) || 
           sidebarStoriesWithSlugs.find(story => story.slug === slug);
  },

  // Get trending content (mixed stories and sidebar stories)
  getTrendingContent: (limit: number = 6): (Story | SidebarStory)[] => {
    const allContent = [...storiesWithSlugs, ...sidebarStoriesWithSlugs];
    // Simple "trending" algorithm - just return newest content
    return allContent
      .sort((a, b) => {
        const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
        const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
  }
};