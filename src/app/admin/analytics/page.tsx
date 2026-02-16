'use client';

/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface AnalyticsData {
  summary: {
    totalEvents: number;
    totalPageViews: number;
    uniqueSessions: number;
    storiesTracked: number;
    uniqueLocations: number;
  };
  eventTypeCounts: Record<string, number>;
  eventsPerDay: Record<string, number>;
  pageViewsPerDay: Record<string, number>;
  topPages: { path: string; views: number }[];
  rankedStories: {
    story_id: number;
    title: string;
    slug: string;
    type: string;
    score: number;
    view_count: number;
    unique_views: number;
    avg_scroll: number;
    avg_time_bucket: number;
    updated_at: string;
  }[];
  locations: {
    city: string;
    region: string;
    country: string;
    views: number;
    ips: number;
  }[];
}

function Bar({ value, max, color = 'bg-green-700' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="w-full bg-gray-200 h-5 relative">
      <div className={`${color} h-full transition-all duration-300`} style={{ width: `${pct}%` }} />
      <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-gray-800">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-2 border-black p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{label}</p>
      <p className="text-3xl font-black mt-1 font-mono">{typeof value === 'number' ? value.toLocaleString() : value}</p>
    </div>
  );
}

const TIME_BUCKET_LABELS: Record<string, string> = {
  time_10s: '10s',
  time_30s: '30s',
  time_60s: '1m',
  time_120s: '2m',
};

const SCROLL_LABELS: Record<string, string> = {
  scroll_25: '25%',
  scroll_50: '50%',
  scroll_75: '75%',
  scroll_100: '100%',
};

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  // Initialize key from URL parameter if available
  const [key, setKey] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('key') || '';
    }
    return '';
  });

  const fetchData = useCallback(async (secret: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics?key=${encodeURIComponent(secret)}`);
      if (res.status === 401) {
        setError('Invalid key.');
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError('Failed to load analytics.');
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
    } catch {
      setError('Network error.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (key) {
      fetchData(key);
    }
    // Don't set loading to false here - it's already false by default
    // and fetchData will set it to true when called
  }, [fetchData, key]);

  // Login gate
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center font-sans">
        <div className="border-2 border-black bg-white p-8 max-w-sm w-full">
          <h1 className="text-xl font-black font-serif mb-1">Analytics Dashboard</h1>
          <p className="text-xs text-gray-500 mb-6">The Synthetic Daily</p>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); fetchData(key); }}>
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
              {loading ? 'Loading...' : 'View Analytics'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center font-sans">
        <p className="text-gray-500 text-sm">Loading analytics...</p>
      </div>
    );
  }

  if (!data) return null;

  const { summary, eventTypeCounts, pageViewsPerDay, topPages, rankedStories, locations } = data;

  // Sort days for chart
  const sortedDays = Object.keys(pageViewsPerDay).sort();
  const maxDayViews = Math.max(...Object.values(pageViewsPerDay), 1);

  // Scroll & time breakdowns
  const scrollEvents = Object.entries(eventTypeCounts)
    .filter(([k]) => k.startsWith('scroll_'))
    .sort(([a], [b]) => a.localeCompare(b));
  const maxScroll = Math.max(...scrollEvents.map(([, v]) => v), 1);

  const timeEvents = Object.entries(eventTypeCounts)
    .filter(([k]) => k.startsWith('time_'))
    .sort(([a], [b]) => a.localeCompare(b));
  const maxTime = Math.max(...timeEvents.map(([, v]) => v), 1);

  const maxPageViews = Math.max(...topPages.map(p => p.views), 1);
  const maxStoryScore = Math.max(...rankedStories.map(s => s.score), 1);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black font-serif tracking-tight">Analytics</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-0.5">The Synthetic Daily</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchData(key)}
              className="text-xs font-bold uppercase tracking-wider bg-green-800 px-4 py-2 hover:bg-green-700 transition"
            >
              Refresh
            </button>
            <Link
              href={`/admin/analytics/sessions?key=${encodeURIComponent(key)}`}
              className="text-xs font-bold uppercase tracking-wider border border-white/30 px-4 py-2 hover:bg-white/10 transition"
            >
              User Sessions
            </Link>
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition">
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary Cards */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Last 7 Days</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="Page Views" value={summary.totalPageViews} />
            <StatCard label="Unique Sessions" value={summary.uniqueSessions} />
            <StatCard label="Total Events" value={summary.totalEvents} />
            <StatCard label="Stories Tracked" value={summary.storiesTracked} />
            <StatCard label="Locations" value={summary.uniqueLocations ?? 0} />
          </div>
        </section>

        {/* Page Views Per Day */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Page Views Per Day</h2>
          <div className="bg-white border-2 border-black p-4">
            {sortedDays.length === 0 ? (
              <p className="text-sm text-gray-500">No data yet.</p>
            ) : (
              <div className="space-y-2">
                {sortedDays.map(day => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-600 w-20 shrink-0">{day.slice(5)}</span>
                    <div className="flex-1">
                      <Bar value={pageViewsPerDay[day]} max={maxDayViews} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scroll Depth */}
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Scroll Depth</h2>
            <div className="bg-white border-2 border-black p-4 space-y-2">
              {scrollEvents.length === 0 ? (
                <p className="text-sm text-gray-500">No data yet.</p>
              ) : (
                scrollEvents.map(([type, count]) => (
                  <div key={type} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-600 w-10 shrink-0">{SCROLL_LABELS[type] ?? type}</span>
                    <div className="flex-1">
                      <Bar value={count} max={maxScroll} color="bg-blue-700" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Time on Page */}
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Time on Page</h2>
            <div className="bg-white border-2 border-black p-4 space-y-2">
              {timeEvents.length === 0 ? (
                <p className="text-sm text-gray-500">No data yet.</p>
              ) : (
                timeEvents.map(([type, count]) => (
                  <div key={type} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-600 w-10 shrink-0">{TIME_BUCKET_LABELS[type] ?? type}</span>
                    <div className="flex-1">
                      <Bar value={count} max={maxTime} color="bg-purple-700" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Top Pages */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Top Pages</h2>
          <div className="bg-white border-2 border-black p-4">
            {topPages.length === 0 ? (
              <p className="text-sm text-gray-500">No data yet.</p>
            ) : (
              <div className="space-y-2">
                {topPages.map(({ path, views }) => (
                  <div key={path} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-600 w-48 shrink-0 truncate" title={path}>{path}</span>
                    <div className="flex-1">
                      <Bar value={views} max={maxPageViews} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Visitor Locations */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Visitor Locations</h2>
          <div className="bg-white border-2 border-black overflow-x-auto">
            {!locations || locations.length === 0 ? (
              <p className="text-sm text-gray-500 p-4">No location data yet. IPs are resolved when viewing analytics.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">#</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">City</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Region</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Country</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Page Views</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Unique IPs</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 hidden md:table-cell">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((loc, i) => {
                    const maxLocViews = Math.max(...locations.map(l => l.views), 1);
                    return (
                      <tr key={`${loc.city}-${loc.country}-${i}`} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono font-bold text-gray-400">{i + 1}</td>
                        <td className="px-4 py-3 font-bold">{loc.city}</td>
                        <td className="px-4 py-3 text-gray-600">{loc.region}</td>
                        <td className="px-4 py-3 text-gray-600">{loc.country}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold">{loc.views}</td>
                        <td className="px-4 py-3 text-right font-mono">{loc.ips}</td>
                        <td className="px-4 py-3 hidden md:table-cell w-40">
                          <Bar value={loc.views} max={maxLocViews} color="bg-amber-600" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Story Rankings */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Story Rankings by Engagement</h2>
          <div className="bg-white border-2 border-black overflow-x-auto">
            {rankedStories.length === 0 ? (
              <p className="text-sm text-gray-500 p-4">No engagement data yet. Scores are computed every 4 hours.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">#</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Story</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Score</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Views</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Unique</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Avg Scroll</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 text-right">Avg Time</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 hidden md:table-cell">Score Bar</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedStories.map((story, i) => (
                    <tr key={story.story_id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono font-bold text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/${story.type === 'sidebar' ? 'sidebar' : 'stories'}/${story.slug}`}
                          className="font-bold hover:text-green-800 hover:underline"
                        >
                          {story.title.length > 60 ? story.title.slice(0, 60) + '...' : story.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold">{story.score.toFixed(1)}</td>
                      <td className="px-4 py-3 text-right font-mono">{story.view_count}</td>
                      <td className="px-4 py-3 text-right font-mono">{story.unique_views}</td>
                      <td className="px-4 py-3 text-right font-mono">{story.avg_scroll.toFixed(0)}%</td>
                      <td className="px-4 py-3 text-right font-mono">
                        {story.avg_time_bucket >= 4 ? '2m+' :
                         story.avg_time_bucket >= 3 ? '1m+' :
                         story.avg_time_bucket >= 2 ? '30s+' :
                         story.avg_time_bucket >= 1 ? '10s+' : '<10s'}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell w-40">
                        <Bar value={story.score} max={maxStoryScore} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Footer note */}
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] text-center pt-4 pb-8">
          Scores recompute every 4 hours &middot; Events retained 30 days &middot; 7-day rolling window
        </p>
      </main>
    </div>
  );
}
