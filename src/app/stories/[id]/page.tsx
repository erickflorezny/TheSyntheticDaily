// app/stories/[id]/page.tsx
// Individual story page — The Onion-style article layout

import Link from 'next/link';
import stories from '../../../../lib/stories.json';
import sidebarStories from '../../../../lib/sidebar-stories.json';
import { Zap, Share2, Facebook, Twitter, Link2, Bookmark } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <Header />

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
            <a href={`/${story.tag.toLowerCase()}`} className="text-green-800 text-sm font-sans font-bold uppercase tracking-wider hover:underline">
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
                  href={`/tags/${tag.toLowerCase().replace(/ /g, '-')}`}
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

      <Footer />
    </div>
  );
}
