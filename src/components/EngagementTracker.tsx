'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, flush, startAutoFlush, stopAutoFlush } from '@/lib/tracking';

export default function EngagementTracker() {
  const pathname = usePathname();
  const storyIdRef = useRef<number | null>(null);
  const scrollMilestonesRef = useRef(new Set<number>());
  const timeMilestonesRef = useRef(new Set<number>());

  useEffect(() => {
    // Read story ID from the article element's data attribute
    const article = document.querySelector('[data-story-id]');
    const id = article?.getAttribute('data-story-id');
    storyIdRef.current = id ? parseInt(id, 10) : null;

    // Reset milestones for new page
    scrollMilestonesRef.current.clear();
    timeMilestonesRef.current.clear();

    // Track page view
    trackEvent('page_view', storyIdRef.current, pathname);

    // Start auto-flush
    startAutoFlush();

    // --- Scroll depth tracking ---
    const scrollThresholds = [25, 50, 75, 100] as const;
    const eventMap: Record<number, 'scroll_25' | 'scroll_50' | 'scroll_75' | 'scroll_100'> = {
      25: 'scroll_25',
      50: 'scroll_50',
      75: 'scroll_75',
      100: 'scroll_100',
    };

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));

      for (const threshold of scrollThresholds) {
        if (pct >= threshold && !scrollMilestonesRef.current.has(threshold)) {
          scrollMilestonesRef.current.add(threshold);
          trackEvent(eventMap[threshold], storyIdRef.current, pathname);
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Time on page tracking ---
    const timeBuckets = [
      { seconds: 10, event: 'time_10s' as const },
      { seconds: 30, event: 'time_30s' as const },
      { seconds: 60, event: 'time_60s' as const },
      { seconds: 120, event: 'time_120s' as const },
    ];
    const timeTimers: ReturnType<typeof setTimeout>[] = [];

    for (const bucket of timeBuckets) {
      const timer = setTimeout(() => {
        if (!timeMilestonesRef.current.has(bucket.seconds)) {
          timeMilestonesRef.current.add(bucket.seconds);
          trackEvent(bucket.event, storyIdRef.current, pathname);
        }
      }, bucket.seconds * 1000);
      timeTimers.push(timer);
    }

    // --- Flush on unload ---
    function handleUnload() {
      flush();
    }

    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flush();
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleUnload);
      timeTimers.forEach(clearTimeout);
      stopAutoFlush();
      flush();
    };
  }, [pathname]);

  return null;
}
