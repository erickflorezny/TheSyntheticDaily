-- Run this in the Supabase SQL Editor to add IP tracking to engagement events

ALTER TABLE engagement_events ADD COLUMN IF NOT EXISTS ip TEXT;
