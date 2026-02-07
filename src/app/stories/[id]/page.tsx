// app/stories/[id]/page.tsx
// Individual story page — The Onion-style article layout

import Link from 'next/link';
import stories from '../../../../lib/stories.json';
import sidebarStories from '../../../../lib/sidebar-stories.json';
import {
  Newspaper, Zap, TrendingUp, CloudSun, ChevronLeft, ChevronRight,
  Mail, Search, Bot, Menu, Share2, Facebook, Twitter, Link2, Bookmark
} from 'lucide-react';

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

const EXPLORE_TAGS = [
  "Artificial Intelligence", "Machine Learning", "Silicon Valley", "Venture Capital",
  "Automation", "ChatGPT", "Big Tech", "Surveillance", "Algorithms", "Data Privacy",
  "Robotics", "Crypto", "Metaverse", "Smart Devices", "Neural Networks",
];

export async function generateStaticParams() {
  return stories.map((story) => ({
    id: story.id.toString(),
  }));
}

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = stories.find((s) => s.id === parseInt(id));
  if (!story) {
    return <div className="p-8">Story not found.</div>;
  }

  const relatedStories = stories.filter(s => s.id !== story.id);
  const trendingStories = relatedStories.slice(0, 4);
  const recentStories = relatedStories.slice(4, 8);
  const inOtherNews = relatedStories.slice(0, 6);

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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-8 px-4 py-8">
        {/* Share Icons — Left Column */}
        <div className="hidden lg:flex col-span-1 flex-col items-center gap-3 pt-16 sticky top-8 self-start">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-green-800 hover:text-white transition text-gray-600" aria-label="Share">
            <Share2 size={16} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition text-gray-600" aria-label="Facebook">
            <Facebook size={16} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-sky-500 hover:text-white transition text-gray-600" aria-label="Twitter">
            <Twitter size={16} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-800 hover:text-white transition text-gray-600" aria-label="Copy link">
            <Link2 size={16} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-yellow-600 hover:text-white transition text-gray-600" aria-label="Bookmark">
            <Bookmark size={16} />
          </button>
        </div>

        {/* Article Content — Center Column */}
        <article className="col-span-12 lg:col-span-7">
          {/* Category Tag */}
          <div className="mb-4">
            <a href="#" className="text-green-800 text-sm font-sans font-bold uppercase tracking-wider hover:underline">
              {story.tag}
            </a>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
            {story.title}
          </h1>

          {/* Hero Image Placeholder */}
          <div className="w-full aspect-video bg-gray-300 mb-2 flex items-center justify-center">
            <span className="text-gray-500 font-sans text-sm">Image: The Synthetic Daily</span>
          </div>
          <p className="text-xs font-sans text-gray-500 mb-6 italic">
            Photo illustration by The Synthetic Daily&apos;s award-winning AI photography department
          </p>

          {/* Published Date */}
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200 font-sans text-xs text-gray-500">
            <time>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            {/* Mobile share icons */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600" aria-label="Share">
                <Share2 size={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600" aria-label="Facebook">
                <Facebook size={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600" aria-label="Twitter">
                <Twitter size={14} />
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div className="text-gray-800 text-lg leading-relaxed space-y-6">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Mid-Article Ad */}
          <div className="my-12 border border-gray-300 p-6 text-center bg-white">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 font-sans">Advertisement</p>
            <p className="font-bold text-xl leading-tight font-sans">
              Is Your Smart Home Plotting Against You? Take Our 30-Second Quiz.
            </p>
            <p className="text-sm text-gray-500 mt-2 font-sans">Sponsored by: Faraday Cage Emporium</p>
          </div>

          {/* Newsletter Subscribe Section */}
          <div className="bg-green-800 text-white p-8 rounded my-12">
            <h3 className="text-2xl font-black mb-2">Get More Synthetic Daily</h3>
            <p className="text-green-200 text-sm font-sans mb-6">
              Subscribe to our newsletter for the latest AI-generated satire delivered to your inbox. Written by machines, for humans who&apos;ve stopped reading.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="flex-1 px-4 py-3 bg-transparent border border-green-600 text-white text-sm font-sans placeholder-green-400 focus:outline-none focus:border-white rounded"
              />
              <button className="bg-white text-green-800 px-6 py-3 text-sm font-sans font-bold hover:bg-green-100 transition rounded">
                Subscribe
              </button>
            </div>
          </div>

          {/* Explore Tags */}
          <div className="my-12">
            <h3 className="text-xl font-bold mb-4 font-sans border-b-2 border-black pb-2">Explore Tags</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {EXPLORE_TAGS.map(tag => (
                <a
                  key={tag}
                  href="#"
                  className="px-3 py-1 border border-gray-300 text-sm font-sans text-gray-700 hover:bg-green-800 hover:text-white hover:border-green-800 transition rounded-full"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>

          {/* Related Coverage */}
          <div className="my-12">
            <h3 className="text-xl font-bold mb-4 font-sans border-b-2 border-black pb-2">Related Coverage</h3>
            <ul className="space-y-4">
              {relatedStories.slice(0, 4).map(related => (
                <li key={related.id} className="border-b border-gray-200 pb-4">
                  <a href={`/stories/${related.id}`} className="group">
                    <span className="text-green-800 text-xs font-sans font-bold uppercase">{related.tag}</span>
                    <h4 className="text-lg font-bold mt-1 group-hover:underline">{related.title}</h4>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="col-span-12 lg:col-span-4 font-sans space-y-8">
          {/* Ad / Promo */}
          <div className="border border-gray-300 p-6 bg-white text-center">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 underline decoration-gray-400">Advertisement</p>
            <p className="font-bold text-lg leading-tight">Worried about the Singularity? Buy this $400 Faraday Cage for your goldfish.</p>
            <p className="text-xs text-gray-400 mt-2">Sponsored by: Survivalists Who Don&apos;t Understand Technology™</p>
          </div>

          {/* Trending */}
          <div>
            <h4 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4">Trending</h4>
            <ul className="space-y-4">
              {trendingStories.map((ts, i) => (
                <li key={ts.id} className="flex gap-3 group">
                  <span className="text-3xl font-black text-gray-300 leading-none">{i + 1}</span>
                  <div className="flex-1 border-b border-gray-200 pb-3">
                    <a href={`/stories/${ts.id}`} className="block">
                      <span className="text-green-800 text-[10px] font-bold uppercase">{ts.tag}</span>
                      <h5 className="text-sm font-bold leading-snug mt-1 group-hover:underline">{ts.title}</h5>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent News */}
          <div>
            <h4 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4">Recent News</h4>
            <ul className="space-y-3">
              {recentStories.map(rs => (
                <li key={rs.id} className="border-b border-gray-200 pb-3">
                  <a href={`/stories/${rs.id}`} className="group block">
                    <span className="text-green-800 text-[10px] font-bold uppercase">{rs.tag}</span>
                    <h5 className="text-sm font-bold leading-snug mt-1 group-hover:underline">{rs.title}</h5>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership Promo */}
          <div className="bg-green-800 text-white p-6 rounded">
            <h4 className="font-bold text-lg mb-2">Become a Member</h4>
            <p className="text-green-200 text-sm mb-4">
              Support independent satirical journalism. Get exclusive AI-generated content and a smug sense of superiority.
            </p>
            <a href="#" className="block text-center bg-white text-green-800 font-bold py-3 rounded hover:bg-green-100 transition text-sm">
              Join Today
            </a>
          </div>

          {/* Sidebar Specials */}
          <div className="bg-black text-white p-4 rounded">
            <h4 className="flex items-center gap-2 font-bold uppercase italic"><Zap size={16}/> Sidebar Specials</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {sidebarStories.slice(0, 3).map(ss => (
                <li key={ss.id} className="border-b border-gray-800 pb-2 hover:text-green-400">
                  <a href={`/sidebar/${ss.id}`} className="italic block">{ss.title}</a>
                  <span className="text-xs text-gray-400 block mt-1">{ss.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      {/* In Other News */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold font-sans uppercase border-b-2 border-black pb-2 mb-6">In Other News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inOtherNews.map(item => (
            <a key={item.id} href={`/stories/${item.id}`} className="group bg-white rounded shadow hover:shadow-lg transition">
              {/* Thumbnail placeholder */}
              <div className="w-full aspect-[16/10] bg-gray-300 flex items-center justify-center rounded-t">
                <span className="text-gray-500 font-sans text-xs">Image</span>
              </div>
              <div className="p-4">
                <span className="text-green-800 text-[10px] font-sans font-bold uppercase">{item.tag}</span>
                <h3 className="text-base font-bold mt-1 leading-snug group-hover:underline">{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white mt-8 font-sans">
        {/* Logo */}
        <div className="text-center py-8 border-b border-gray-800">
          <h2 className="text-5xl font-black tracking-tighter italic font-serif">The Synthetic Daily</h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 px-8 py-12">
          {/* Left — Horoscope + Subscribe */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Your Horoscope &mdash; Today&apos;s Birthday</h4>
              <div className="flex gap-4 items-start">
                <span className="text-3xl">&#9813;</span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-bold text-white">Aquarius (January 20 to February 18):</span> Your Wi-Fi
                  will disconnect at the worst possible moment today, so maybe just talk to someone in person
                  for once.
                </p>
              </div>
              <a href="#" className="block mt-4 text-xs font-bold uppercase tracking-widest text-center hover:text-green-400 transition">
                Read Your Horoscope
              </a>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Subscribe For All The Latest Headlines</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="flex-1 px-4 py-3 bg-transparent border border-gray-600 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white"
                />
                <button className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 text-sm font-bold transition">
                  Submit
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-3">
                By subscribing to our newsletter you have read, understood and agree to the terms of our{' '}
                <a href="#" className="underline hover:text-white">Privacy Policy</a> and{' '}
                <a href="#" className="underline hover:text-white">Terms of Use</a>
              </p>
            </div>
          </div>

          {/* Right — Sections + Explore */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-12 lg:justify-items-end">
            <div>
              <h4 className="text-xl font-bold mb-4">Sections</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">The Latest</a></li>
                <li><a href="#" className="hover:text-white transition">Tech</a></li>
                <li><a href="#" className="hover:text-white transition">Science</a></li>
                <li><a href="#" className="hover:text-white transition">Business</a></li>
                <li><a href="#" className="hover:text-white transition">Entertainment</a></li>
                <li><a href="#" className="hover:text-white transition">Sports</a></li>
                <li><a href="#" className="hover:text-white transition">Opinion</a></li>
                <li><a href="#" className="hover:text-white transition">Video</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Search</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Become a Member</a></li>
                <li><a href="#" className="hover:text-white transition">The Synthetic Store</a></li>
                <li><a href="#" className="hover:text-white transition">Front Page Archive</a></li>
                <li><a href="#" className="hover:text-white transition">Jobs</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
