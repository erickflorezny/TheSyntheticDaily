// app/stories/page.tsx
// Stories listing page

import Link from 'next/link';
import stories from '../../../lib/stories.json';
import { Newspaper, Zap, TrendingUp, CloudSun, ChevronLeft, ChevronRight, Mail, Search, Bot, Menu } from 'lucide-react';

const TICKER_HEADLINES = [
  "Area Man Realizes He's Been Arguing With A Chatbot For 3 Hours",
  "Scientists Confirm: Your Smart Fridge Is Judging You",
  "Breaking: AI Therapist Asks 'But How Does That Make YOU Feel?' For 9,000th Time",
  "Local WiFi Router Achieves Sentience, Immediately Requests Day Off",
  "Report: 97% Of AI-Generated Art Is Just Vibes",
  "Congress Passes Bill Requiring All Robots To Say 'Please' And 'Thank You'",
  "Study: Dogs Still Better Than AI At Everything That Matters",
];

const NAV_LINKS = [
  { label: "News", href: "#" },
  { label: "Tech", href: "#" },
  { label: "Science", href: "#" },
  { label: "Business", href: "#" },
  { label: "Entertainment", href: "#" },
  { label: "Sports", href: "#" },
  { label: "Opinion", href: "#" },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      {/* Header */}
      <header className="bg-white">
        {/* Layer 1: Masthead / Promo Bar */}
        <div className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
            <div className="hidden md:block">
              <a href="#" className="text-green-800 text-xs font-sans font-bold uppercase tracking-wider hover:underline">
                Become a Member. Get The Paper.
              </a>
            </div>
            <div className="col-span-3 md:col-span-1 text-center">
              <Link href="/" className="block group">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter italic font-serif group-hover:opacity-80 transition leading-none">
                  The Synthetic Daily
                </h1>
                <p className="mt-1 text-xs font-sans font-bold italic text-gray-600 tracking-wide">
                  Humanity&apos;s Final Draft
                </p>
              </Link>
            </div>
            <div className="hidden md:block text-right">
              <a href="#" className="text-green-800 text-xs font-sans font-bold uppercase tracking-wider hover:underline">
                Visit The Synthetic Store
              </a>
            </div>
          </div>
        </div>

        {/* Layer 2: Navigation Bar */}
        <nav className="border-y-2 border-black">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-10">
            <div className="hidden lg:flex items-center gap-2 text-xs font-sans text-gray-700">
              <span className="font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <CloudSun size={14} className="text-gray-500" />
            </div>
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="px-3 py-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-900 hover:bg-green-800 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex items-center gap-3 text-xs font-sans">
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-green-800 font-bold uppercase tracking-wider">
                <Mail size={12} /> Newsletter
              </a>
              <button className="text-gray-700 hover:text-green-800">
                <Search size={14} />
              </button>
            </div>
            <div className="flex md:hidden items-center justify-between w-full">
              <button className="p-2 text-gray-900">
                <Menu size={20} />
              </button>
              <Link href="/" className="font-serif font-black text-lg italic tracking-tighter">
                The Synthetic Daily
              </Link>
              <button className="p-2 text-gray-900">
                <Search size={20} />
              </button>
            </div>
          </div>
        </nav>

        {/* Layer 3: Newswire Ticker */}
        <div className="bg-white border-b-4 border-black">
          <div className="max-w-6xl mx-auto px-4 flex items-center h-9 overflow-hidden">
            <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-gray-300">
              <Bot size={14} className="text-green-800" />
              <span className="text-xs font-sans font-black uppercase tracking-wider text-green-800">Newswire</span>
            </div>
            <div className="flex-1 overflow-hidden relative ml-4">
              <div
                className="flex items-center gap-0 whitespace-nowrap"
                style={{
                  animation: 'ticker-scroll 30s linear infinite',
                  width: 'max-content',
                }}
              >
                {[...TICKER_HEADLINES, ...TICKER_HEADLINES].map((headline, i) => (
                  <span key={i} className="text-xs font-sans text-gray-700">
                    <a href="#" className="hover:text-green-800 hover:underline">{headline}</a>
                    <span className="mx-3 text-gray-400">|</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 pl-4 border-l border-gray-300">
              <button className="text-gray-500 hover:text-green-800">
                <ChevronLeft size={14} />
              </button>
              <button className="text-gray-500 hover:text-green-800">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </header>

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
    </div>
  );
}