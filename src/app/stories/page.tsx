// app/stories/page.tsx
// Stories listing page

import Link from 'next/link';
import stories from '../../../lib/stories.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Newspaper, Zap, TrendingUp } from 'lucide-react';

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      {/* Header */}
      <Header />

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-8 p-8">
        {/* Stories List */}
        <section className="col-span-12 lg:col-span-8 border-r border-gray-200 pr-8">
          <h1 className="text-4xl font-black mb-8 border-b-2 border-black pb-4">All Stories</h1>
          <div className="grid gap-6">
            {stories.map((story) => (
              <article
                key={story.id}
                className="bg-white rounded shadow p-6 hover:shadow-lg transition"
              >
                <span className="bg-red-600 text-white px-2 py-1 text-xs font-sans font-bold uppercase">{story.tag}</span>
                <h2 className="text-2xl font-bold mt-3 mb-2">
                  <a href={`/stories/${story.id}`} className="hover:underline">
                    {story.title}
                  </a>
                </h2>
                <p className="text-gray-700">{story.content}</p>
                <a
                  href={`/stories/${story.id}`}
                  className="inline-block mt-4 text-blue-600 hover:underline font-sans font-bold"
                >
                  Read full story →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 font-sans space-y-8">
          {/* Sidebar Stories */}
          <div className="bg-black text-white p-4 mb-6 rounded">
            <h4 className="flex items-center gap-2 font-bold uppercase italic"><Zap size={16}/> Sidebar Specials</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="border-b border-gray-800 pb-2 hover:text-green-400">
                <a href="/sidebar/101" className="italic block">&ldquo;Woman Discovers Childhood Memories Were AI-Generated All Along&rdquo;</a>
                <span className="text-xs text-gray-400 block mt-1">LIFESTYLE | Read the full investigation</span>
              </li>
              <li className="border-b border-gray-800 pb-2 hover:text-green-400">
                <a href="/sidebar/102" className="italic block">&ldquo;Employee Handbook Now Just a Link to ChatGPT&rdquo;</a>
                <span className="text-xs text-gray-400 block mt-1">CAREER | The policy you never read, automated</span>
              </li>
              <li className="border-b border-gray-800 pb-2 hover:text-green-400">
                <a href="/sidebar/103" className="italic block">&ldquo;Man Wrongly Accused by Predictive AI Spends 14 Months Proving He Exists&rdquo;</a>
                <span className="text-xs text-gray-400 block mt-1">LEGAL | An edge case in identity verification</span>
              </li>
              <li className="pb-2 hover:text-green-400">
                <a href="/sidebar/104" className="italic block">&ldquo;Couple Communicates Exclusively Through AI Summaries&rdquo;</a>
                <span className="text-xs text-gray-400 block mt-1">RELATIONSHIPS | Optimal relational outcomes</span>
              </li>
            </ul>
          </div>
          {/* Satirical Weather Widget */}
          <div className="bg-blue-100 border border-blue-300 p-4 rounded shadow">
            <h4 className="flex items-center gap-2 font-bold uppercase text-blue-800"><TrendingUp size={16}/> Weather (Probably)</h4>
            <div className="mt-2 text-blue-900">
              <p className="font-bold">Today: 100% chance of clouds. Or not. Weather app unsure.</p>
              <p className="text-xs mt-1">Sponsored by: The Weather App That Just Guesses™</p>
            </div>
          </div>
          {/* Fake Stock Ticker */}
          <div className="bg-green-100 border border-green-300 p-4 rounded shadow">
            <h4 className="flex items-center gap-2 font-bold uppercase text-green-800"><Newspaper size={16}/> Market Madness</h4>
            <ul className="mt-2 text-green-900 text-sm font-mono">
              <li>AI-ETF ▲ 420.69 (+42%)</li>
              <li>MEMECOIN ▼ 0.0001 (-99%)</li>
              <li>HUMAN-LABOR ⏸️ (Suspended)</li>
              <li>ROBOT-ETF ▲ 9000 (+900%)</li>
            </ul>
          </div>
          {/* Advertisement */}
          <div className="border border-gray-300 p-4 grayscale rounded">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 underline decoration-gray-400">Advertisement</p>
            <p className="font-bold text-lg leading-tight">Worried about the Singularity? Buy this $400 Faraday Cage for your goldfish.</p>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
