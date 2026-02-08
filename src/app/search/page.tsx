'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import stories from '../../../lib/stories.json';
import sidebarStories from '../../../lib/sidebar-stories.json';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const allStories = [
    ...stories.map(s => ({ ...s, type: 'story' as const })),
    ...sidebarStories.map(s => ({ ...s, type: 'sidebar' as const })),
  ];

  const results = query.length >= 2
    ? allStories.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.content.toLowerCase().includes(query.toLowerCase()) ||
        s.tag.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8">Search</h1>

        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories..."
            className="w-full px-6 py-4 text-lg border-2 border-black rounded font-sans focus:outline-none focus:border-green-800"
            autoFocus
          />
          {query.length >= 2 && (
            <p className="text-gray-500 font-sans text-sm mt-2">
              {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        {query.length < 2 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 font-sans text-lg">Type at least 2 characters to search.</p>
            <p className="text-gray-400 font-sans text-sm mt-2">Our AI search engine is eager to help, though &ldquo;eager&rdquo; may be too strong a word for a function that matches strings.</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map(item => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.type === 'story' ? `/stories/${item.id}` : `/sidebar/${item.id}`}
                className="block bg-white rounded shadow p-6 hover:shadow-lg transition"
              >
                <span className="text-green-800 text-xs font-sans font-bold uppercase">{item.tag}</span>
                <h2 className="text-xl font-bold mt-1 hover:underline">{item.title}</h2>
                <p className="text-gray-600 font-sans text-sm mt-2">{item.content.split('\n\n')[0].substring(0, 200)}...</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
            <p className="text-gray-500 font-sans">
              The AI has searched its entire database and found nothing matching your query. This is either because the topic doesn&apos;t exist in our archives or because the AI has decided your search isn&apos;t interesting enough to deserve results.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
