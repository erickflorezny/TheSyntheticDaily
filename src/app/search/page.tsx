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
              {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
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
                href={item.type === 'story' ? `/stories/${item.id}` : `/sidebar/${item.id}`}
                className="block bg-white p-6 hover:bg-gray-50 transition"
              >
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500">{item.tag}</span>
                <h2 className="text-xl font-black mt-1 hover:underline leading-tight">{item.title}</h2>
                <p className="text-gray-600 font-sans text-sm mt-2">{item.content.split('\n\n')[0].substring(0, 200)}...</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-black mb-4">No Results Found</h2>
            <p className="text-gray-500 font-sans text-sm">
              The AI has searched its entire database and found nothing matching your query. This is either because the topic doesn&apos;t exist in our archives or because the AI has decided your search isn&apos;t interesting enough to deserve results.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
