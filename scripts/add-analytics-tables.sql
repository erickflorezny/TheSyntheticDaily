-- Run this in the Supabase SQL Editor to create analytics tables and functions

-- 1. Engagement events table — raw event log
CREATE TABLE IF NOT EXISTS engagement_events (
  id BIGSERIAL PRIMARY KEY,
  story_id INT REFERENCES stories(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'page_view',
    'scroll_25', 'scroll_50', 'scroll_75', 'scroll_100',
    'time_10s', 'time_30s', 'time_60s', 'time_120s'
  )),
  page_path TEXT NOT NULL,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_engagement_story_created
  ON engagement_events (story_id, created_at);
CREATE INDEX IF NOT EXISTS idx_engagement_created
  ON engagement_events (created_at);

-- Enable RLS (service role bypasses)
ALTER TABLE engagement_events ENABLE ROW LEVEL SECURITY;

-- 2. Story scores table — precomputed engagement rankings
CREATE TABLE IF NOT EXISTS story_scores (
  story_id INT PRIMARY KEY REFERENCES stories(id) ON DELETE CASCADE,
  score DOUBLE PRECISION DEFAULT 0,
  view_count INT DEFAULT 0,
  unique_views INT DEFAULT 0,
  avg_scroll DOUBLE PRECISION DEFAULT 0,
  avg_time_bucket DOUBLE PRECISION DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE story_scores ENABLE ROW LEVEL SECURITY;

-- 3. compute_story_scores() — aggregates events from last 7 days with time decay
CREATE OR REPLACE FUNCTION compute_story_scores()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Upsert scores for all stories that have events in the last 7 days
  INSERT INTO story_scores (story_id, score, view_count, unique_views, avg_scroll, avg_time_bucket, updated_at)
  SELECT
    e.story_id,
    -- Weighted score with exponential decay (48-hour half-life)
    SUM(
      CASE e.event_type
        WHEN 'page_view'  THEN 1.0
        WHEN 'scroll_25'  THEN 0.5
        WHEN 'scroll_50'  THEN 1.0
        WHEN 'scroll_75'  THEN 1.5
        WHEN 'scroll_100' THEN 2.0
        WHEN 'time_10s'   THEN 0.5
        WHEN 'time_30s'   THEN 1.0
        WHEN 'time_60s'   THEN 2.0
        WHEN 'time_120s'  THEN 5.0
        ELSE 0
      END
      * EXP(-0.693 * EXTRACT(EPOCH FROM (NOW() - e.created_at)) / (48 * 3600))
    ) AS score,
    COUNT(*) FILTER (WHERE e.event_type = 'page_view') AS view_count,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_type = 'page_view') AS unique_views,
    -- Average max scroll per session (0-100 scale)
    COALESCE(AVG(
      CASE e.event_type
        WHEN 'scroll_100' THEN 100
        WHEN 'scroll_75'  THEN 75
        WHEN 'scroll_50'  THEN 50
        WHEN 'scroll_25'  THEN 25
        ELSE NULL
      END
    ), 0) AS avg_scroll,
    -- Average max time bucket per session (0-4 scale)
    COALESCE(AVG(
      CASE e.event_type
        WHEN 'time_120s' THEN 4
        WHEN 'time_60s'  THEN 3
        WHEN 'time_30s'  THEN 2
        WHEN 'time_10s'  THEN 1
        ELSE NULL
      END
    ), 0) AS avg_time_bucket,
    NOW()
  FROM engagement_events e
  WHERE e.story_id IS NOT NULL
    AND e.created_at > NOW() - INTERVAL '7 days'
  GROUP BY e.story_id
  ON CONFLICT (story_id) DO UPDATE SET
    score = EXCLUDED.score,
    view_count = EXCLUDED.view_count,
    unique_views = EXCLUDED.unique_views,
    avg_scroll = EXCLUDED.avg_scroll,
    avg_time_bucket = EXCLUDED.avg_time_bucket,
    updated_at = NOW();

  -- Zero out scores for stories with no recent events
  UPDATE story_scores
  SET score = 0, view_count = 0, unique_views = 0, avg_scroll = 0, avg_time_bucket = 0, updated_at = NOW()
  WHERE story_id NOT IN (
    SELECT DISTINCT story_id FROM engagement_events
    WHERE story_id IS NOT NULL AND created_at > NOW() - INTERVAL '7 days'
  );
END;
$$;

-- 4. cleanup_old_events() — purge events older than 30 days
CREATE OR REPLACE FUNCTION cleanup_old_events()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM engagement_events WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$;
