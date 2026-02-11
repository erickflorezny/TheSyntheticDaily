type EventType =
  | 'page_view'
  | 'scroll_25' | 'scroll_50' | 'scroll_75' | 'scroll_100'
  | 'time_10s' | 'time_30s' | 'time_60s' | 'time_120s';

interface TrackingEvent {
  story_id: number | null;
  session_id: string;
  event_type: EventType;
  page_path: string;
  referrer: string | null;
}

const FLUSH_INTERVAL_MS = 5_000;
const FLUSH_THRESHOLD = 10;

let queue: TrackingEvent[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem('_tsd_sid');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('_tsd_sid', id);
  }
  return id;
}

export function trackEvent(eventType: EventType, storyId: number | null, pagePath: string) {
  const sessionId = getSessionId();
  if (!sessionId) return;

  queue.push({
    story_id: storyId,
    session_id: sessionId,
    event_type: eventType,
    page_path: pagePath,
    referrer: document.referrer || null,
  });

  if (queue.length >= FLUSH_THRESHOLD) {
    flush();
  }
}

export function flush() {
  if (queue.length === 0) return;

  const batch = queue.splice(0);

  // Prefer sendBeacon for reliability on page unload
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', JSON.stringify({ events: batch }));
  } else {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch }),
      keepalive: true,
    }).catch(() => {
      // Silently fail — analytics are best-effort
    });
  }
}

export function startAutoFlush() {
  if (flushTimer) return;
  flushTimer = setInterval(flush, FLUSH_INTERVAL_MS);
}

export function stopAutoFlush() {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}
