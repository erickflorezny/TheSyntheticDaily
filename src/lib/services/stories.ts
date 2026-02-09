import { supabase } from '../supabase';
import { StoryRow, Story, mapRowToStory } from '../types/database';

export type { Story };
export type SidebarStory = Story;

// Main stories service
export const storiesService = {
  getAllStories: async (): Promise<Story[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'main')
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data as StoryRow[]).map(mapRowToStory);
  },

  getStoryBySlug: async (slug: string): Promise<Story | undefined> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'main')
      .eq('slug', slug)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data ? mapRowToStory(data as StoryRow) : undefined;
  },

  getStoryById: async (id: number): Promise<Story | undefined> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'main')
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data ? mapRowToStory(data as StoryRow) : undefined;
  },

  getRelatedStories: async (currentStoryId: number, limit: number = 4): Promise<Story[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'main')
      .neq('id', currentStoryId)
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data as StoryRow[]).map(mapRowToStory);
  },

  getStoriesByTag: async (tag: string): Promise<Story[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'main')
      .ilike('tag', tag)
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data as StoryRow[]).map(mapRowToStory);
  },

  getAllTags: async (): Promise<string[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('tag')
      .eq('type', 'main');
    if (error) throw error;
    return [...new Set((data as { tag: string }[]).map(d => d.tag))];
  },
};

// Sidebar stories service
export const sidebarStoriesService = {
  getAllSidebarStories: async (): Promise<Story[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'sidebar')
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data as StoryRow[]).map(mapRowToStory);
  },

  getSidebarStoryBySlug: async (slug: string): Promise<Story | undefined> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'sidebar')
      .eq('slug', slug)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data ? mapRowToStory(data as StoryRow) : undefined;
  },

  getSidebarStoryById: async (id: number): Promise<Story | undefined> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'sidebar')
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data ? mapRowToStory(data as StoryRow) : undefined;
  },

  getRelatedSidebarStories: async (currentStoryId: number, limit: number = 4): Promise<Story[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'sidebar')
      .neq('id', currentStoryId)
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data as StoryRow[]).map(mapRowToStory);
  },
};

// Combined content service
export const contentService = {
  getAllContent: async (): Promise<Story[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data as StoryRow[]).map(mapRowToStory);
  },

  getContentBySlug: async (slug: string): Promise<Story | undefined> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data ? mapRowToStory(data as StoryRow) : undefined;
  },

  getTrendingContent: async (limit: number = 6): Promise<Story[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data as StoryRow[]).map(mapRowToStory);
  },

  searchStories: async (query: string): Promise<Story[]> => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,tag.ilike.%${query}%`)
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data as StoryRow[]).map(mapRowToStory);
  },
};
