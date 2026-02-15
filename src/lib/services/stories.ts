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

  getRandomStories: async (limit: number = 4, excludeIds: number[] = []): Promise<Story[]> => {
    // Fetch a pool of recent stories and pick randomly
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'main')
      .order('published_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    const stories = (data as StoryRow[])
      .filter(row => !excludeIds.includes(row.id))
      .map(mapRowToStory);
    // Fisher-Yates shuffle
    for (let i = stories.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [stories[i], stories[j]] = [stories[j], stories[i]];
    }
    return stories.slice(0, limit);
  },

  getStoriesRanked: async (): Promise<Story[]> => {
    const { data: stories, error: storiesError } = await supabase
      .from('stories')
      .select('*')
      .eq('type', 'main')
      .order('published_at', { ascending: false });
    if (storiesError) throw storiesError;

    const { data: scores } = await supabase
      .from('story_scores')
      .select('story_id, score');

    const scoreMap = new Map<number, number>();
    if (scores) {
      for (const s of scores) {
        scoreMap.set(s.story_id, s.score ?? 0);
      }
    }

    // No engagement data yet — fall back to chronological
    if (scoreMap.size === 0) {
      return (stories as StoryRow[]).map(mapRowToStory);
    }

    const now = Date.now();
    const SIX_HOURS = 6 * 60 * 60 * 1000;
    const maxScore = Math.max(...scoreMap.values(), 1);

    const ranked = (stories as StoryRow[]).map(row => {
      const engagement = (scoreMap.get(row.id) ?? 0) / maxScore;
      const ageMs = now - new Date(row.published_at).getTime();
      const recency = Math.exp(-0.693 * (ageMs / (24 * 60 * 60 * 1000)));
      const newBoost = ageMs < SIX_HOURS ? 0.3 : 0;
      const combinedScore = (engagement * 0.6) + (recency * 0.4) + newBoost;
      return { row, combinedScore };
    });

    ranked.sort((a, b) => b.combinedScore - a.combinedScore);
    return ranked.map(r => mapRowToStory(r.row));
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
