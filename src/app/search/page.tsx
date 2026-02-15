'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SearchResult {
  id: number;
  type: 'main' | 'sidebar';
  tag: string;
  title: string;
  content: string;
  slug: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="border-b-4 border-black pb-4 mb-8">
          <h1 className="text-5xl font-black">Search</h1>
        </div>

        <div className="mb-8">
          <div className="border-2 border-black p-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories..."
              className="w-full px-4 py-3 text-lg font-sans focus:outline-none bg-transparent"
              autoFocus
            />
          </div>
          {query.length >= 2 && (
            <p className="text-gray-500 font-sans text-xs uppercase tracking-wider mt-2">
              {loading ? 'Searching...' : `${results.length} ${results.length === 1 ? 'result' : 'results'} for \u201c${query}\u201d`}
            </p>
          )}
        </div>

        {query.length < 2 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 font-sans text-lg">Type at least 2 characters to search.</p>
            <p className="text-gray-400 font-sans text-xs mt-2">Our AI search engine is eager to help, though &ldquo;eager&rdquo; may be too strong a word for a function that matches strings.</p>
          </div>
        ) : results.length > 0 ? (
          <div className="border-2 border-black divide-y divide-gray-200">
            {results.map(item => (
              <Link
                key={`${item.type}-${item.id}`}
                href={`/stories/${item.slug}`}
                className="block bg-white p-6 hover:bg-gray-50 transition"
              >
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500">{item.tag}</span>
                <h2 className="text-xl font-black mt-1 hover:underline leading-[1.15]">{item.title}</h2>
                <p className="text-gray-600 font-sans text-sm mt-2">{item.content.split('\n\n')[0].substring(0, 200)}...</p>
              </Link>
            ))}
          </div>
        ) : !loading && query.length >= 2 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-black mb-4">No Results Found</h2>
            <p className="text-gray-500 font-sans text-sm">
              The AI has searched its entire database and found nothing matching your query. This is either because the topic doesn&apos;t exist in our archives or because the AI has decided your search isn&apos;t interesting enough to deserve results.
            </p>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
