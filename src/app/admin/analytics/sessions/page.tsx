'use client';

/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface SessionSummary {
  session_id: string;
  ip: string | null;
  first_seen: string;
  last_seen: string;
  event_count: number;
  page_views: number;
  pages_visited: number;
  entry_page: string;
  exit_page: string;
}

interface SessionEvent {
  event_type: string;
  page_path: string;
  referrer: string | null;
  story_id: number | null;
  created_at: string;
}

interface SessionDetail {
  session_id: string;
  ip: string | null;
  events: SessionEvent[];
}

const EVENT_LABELS: Record<string, string> = {
  page_view: 'Page View',
  scroll_25: 'Scrolled 25%',
  scroll_50: 'Scrolled 50%',
  scroll_75: 'Scrolled 75%',
  scroll_100: 'Scrolled 100%',
  time_10s: 'On page 10s',
  time_30s: 'On page 30s',
  time_60s: 'On page 1m',
  time_120s: 'On page 2m',
};

const EVENT_COLORS: Record<string, string> = {
  page_view: 'bg-green-700',
  scroll_25: 'bg-blue-400',
  scroll_50: 'bg-blue-500',
  scroll_75: 'bg-blue-600',
  scroll_100: 'bg-blue-700',
  time_10s: 'bg-purple-400',
  time_30s: 'bg-purple-500',
  time_60s: 'bg-purple-600',
  time_120s: 'bg-purple-700',
};

function formatDuration(first: string, last: string): string {
  const ms = new Date(last).getTime() - new Date(first).getTime();
  if (ms < 1000) return '<1s';
  const secs = Math.floor(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  if (mins < 60) return `${mins}m ${remainSecs}s`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ${mins % 60}m`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit',
  });
}

function formatTimeShort(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', second: '2-digit',
  });
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [detail, setDetail] = useState<SessionDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [key, setKey] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('key') || '';
    }
    return '';
  });

  const fetchSessions = useCallback(async (secret: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/sessions?key=${encodeURIComponent(secret)}`);
      if (res.status === 401) {
        setError('Invalid key.');
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError('Failed to load sessions.');
        setLoading(false);
        return;
      }
      const json = await res.json();
      setSessions(json.sessions || []);
      setAuthenticated(true);
    } catch {
      setError('Network error.');
    }
    setLoading(false);
  }, []);

  const fetchDetail = useCallback(async (sessionId: string) => {
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/analytics/sessions?key=${encodeURIComponent(key)}&session=${encodeURIComponent(sessionId)}`);
      if (!res.ok) {
        setError('Failed to load session detail.');
        setDetailLoading(false);
        return;
      }
      const json = await res.json();
      setDetail(json);
    } catch {
      setError('Network error.');
    }
    setDetailLoading(false);
  }, [key]);

  useEffect(() => {
    if (key) fetchSessions(key);
  }, [fetchSessions, key]);

  // Login gate (same pattern as main analytics page)
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center font-sans">
        <div className="border-2 border-black bg-white p-8 max-w-sm w-full">
          <h1 className="text-xl font-black font-serif mb-1">User Sessions</h1>
          <p className="text-xs text-gray-500 mb-6">The Synthetic Daily</p>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); fetchSessions(key); }}>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-2">
              Admin Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full border-2 border-black px-3 py-2 text-sm font-mono mb-4 focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Enter CRON_SECRET"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 text-sm font-bold uppercase tracking-wider hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'View Sessions'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Session detail view
  if (detail) {
    // Group events by page_path to show journey
    const pages: { path: string; events: SessionEvent[] }[] = [];
    for (const event of detail.events) {
      if (event.event_type === 'page_view' || pages.length === 0) {
        pages.push({ path: event.page_path, events: [event] });
      } else {
        pages[pages.length - 1].events.push(event);
      }
    }

    const firstEvent = detail.events[0];
    const lastEvent = detail.events[detail.events.length - 1];

    return (
      <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-sans">
        <header className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black font-serif tracking-tight">Session Detail</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-0.5">The Synthetic Daily</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDetail(null)}
                className="text-xs font-bold uppercase tracking-wider bg-green-800 px-4 py-2 hover:bg-green-700 transition"
              >
                Back to Sessions
              </button>
              <Link href={`/admin/analytics?key=${encodeURIComponent(key)}`} className="text-xs text-gray-400 hover:text-white transition">
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Session info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border-2 border-black p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Session</p>
              <p className="text-sm font-mono mt-1 break-all">{detail.session_id.slice(0, 8)}...</p>
            </div>
            <div className="border-2 border-black p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">IP</p>
              <p className="text-sm font-mono mt-1">{detail.ip || 'N/A'}</p>
            </div>
            <div className="border-2 border-black p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Duration</p>
              <p className="text-xl font-black mt-1 font-mono">
                {firstEvent && lastEvent ? formatDuration(firstEvent.created_at, lastEvent.created_at) : '—'}
              </p>
            </div>
            <div className="border-2 border-black p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Total Events</p>
              <p className="text-xl font-black mt-1 font-mono">{detail.events.length}</p>
            </div>
          </div>

          {/* Referrer */}
          {firstEvent?.referrer && (
            <div className="bg-white border-2 border-black p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">Referrer</p>
              <p className="text-sm font-mono text-gray-700 break-all">{firstEvent.referrer}</p>
            </div>
          )}

          {/* Journey timeline */}
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">User Journey</h2>
            <div className="space-y-0">
              {pages.map((page, pageIdx) => {
                const isLast = pageIdx === pages.length - 1;
                const pageView = page.events.find(e => e.event_type === 'page_view');
                const subEvents = page.events.filter(e => e.event_type !== 'page_view');

                // Determine max scroll and time for this page
                const scrollEvents = subEvents.filter(e => e.event_type.startsWith('scroll_'));
                const maxScroll = scrollEvents.length > 0
                  ? Math.max(...scrollEvents.map(e => parseInt(e.event_type.split('_')[1])))
                  : 0;
                const timeEvents = subEvents.filter(e => e.event_type.startsWith('time_'));
                const maxTime = timeEvents.length > 0
                  ? timeEvents[timeEvents.length - 1].event_type
                  : null;

                return (
                  <div key={pageIdx} className="relative">
                    {/* Connector line */}
                    {pageIdx > 0 && (
                      <div className="absolute left-5 -top-3 w-0.5 h-3 bg-gray-300" />
                    )}

                    <div className={`bg-white border-2 ${isLast ? 'border-red-400' : 'border-black'} p-4`}>
                      {/* Page header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${isLast ? 'bg-red-500' : 'bg-green-700'}`}>
                            {pageIdx + 1}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{page.path}</p>
                            {pageView && (
                              <p className="text-[10px] text-gray-500 font-mono">{formatTimeShort(pageView.created_at)}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {maxScroll > 0 && (
                            <span className="text-xs font-mono px-2 py-1 bg-blue-100 text-blue-800 font-bold">
                              {maxScroll}% scroll
                            </span>
                          )}
                          {maxTime && (
                            <span className="text-xs font-mono px-2 py-1 bg-purple-100 text-purple-800 font-bold">
                              {EVENT_LABELS[maxTime] || maxTime}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sub-events */}
                      {subEvents.length > 0 && (
                        <div className="mt-3 ml-[52px] flex flex-wrap gap-1.5">
                          {subEvents.map((event, eventIdx) => (
                            <span
                              key={eventIdx}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-white ${EVENT_COLORS[event.event_type] || 'bg-gray-500'}`}
                            >
                              {EVENT_LABELS[event.event_type] || event.event_type}
                              <span className="opacity-70 font-normal">{formatTimeShort(event.created_at)}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Drop-off indicator */}
                      {isLast && (
                        <div className="mt-3 ml-[52px]">
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-500">
                            Drop-off point
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Connector to next */}
                    {!isLast && (
                      <div className="flex justify-start ml-5">
                        <div className="w-0.5 h-6 bg-gray-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Raw events table */}
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">All Events</h2>
            <div className="bg-white border-2 border-black overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">#</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Time</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Event</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Page</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.events.map((event, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-gray-400">{i + 1}</td>
                      <td className="px-4 py-2 font-mono text-xs">{formatTime(event.created_at)}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold text-white ${EVENT_COLORS[event.event_type] || 'bg-gray-500'}`}>
                          {EVENT_LABELS[event.event_type] || event.event_type}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-mono text-xs truncate max-w-xs">{event.page_path}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center font-sans">
        <p className="text-gray-500 text-sm">Loading sessions...</p>
      </div>
    );
  }

  // Sessions list view
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-sans">
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black font-serif tracking-tight">User Sessions</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-0.5">The Synthetic Daily</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchSessions(key)}
              className="text-xs font-bold uppercase tracking-wider bg-green-800 px-4 py-2 hover:bg-green-700 transition"
            >
              Refresh
            </button>
            <Link href={`/admin/analytics?key=${encodeURIComponent(key)}`} className="text-xs text-gray-400 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition">
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">
            Recent Sessions ({sessions.length})
          </h2>
          <div className="bg-white border-2 border-black overflow-x-auto">
            {sessions.length === 0 ? (
              <p className="text-sm text-gray-500 p-4">No sessions found in the last 7 days.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Session</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">IP</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Entry</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Exit</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Pages</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Events</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Duration</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr
                      key={session.session_id}
                      onClick={() => fetchDetail(session.session_id)}
                      className="border-b border-gray-200 hover:bg-green-50 cursor-pointer transition"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-bold text-green-800">
                        {session.session_id.slice(0, 8)}...
                        {detailLoading && <span className="ml-1 text-gray-400">...</span>}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{session.ip || '—'}</td>
                      <td className="px-4 py-3 font-mono text-xs truncate max-w-[150px]" title={session.entry_page}>
                        {session.entry_page}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs truncate max-w-[150px]" title={session.exit_page}>
                        {session.exit_page !== session.entry_page ? session.exit_page : '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold">{session.pages_visited}</td>
                      <td className="px-4 py-3 text-right font-mono">{session.event_count}</td>
                      <td className="px-4 py-3 text-right font-mono text-xs">
                        {formatDuration(session.first_seen, session.last_seen)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">
                        {formatTime(session.first_seen)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] text-center pt-4 pb-8">
          Showing last 7 days &middot; Up to 100 sessions &middot; Click a row to view journey
        </p>
      </main>
    </div>
  );
}
