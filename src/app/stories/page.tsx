// app/stories/page.tsx
// Stories listing page

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import { Newspaper, Zap, TrendingUp } from 'lucide-react';
import { storiesService, sidebarStoriesService } from '@/lib/services/stories';

export const dynamic = 'force-dynamic';

export default async function StoriesPage() {
  const stories = await storiesService.getAllStories();
  const sidebarStories = (await sidebarStoriesService.getAllSidebarStories()).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      {/* Header */}
      <Header />

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-8 p-4 sm:p-6 lg:p-8">
        {/* Stories List */}
        <section className="col-span-12 lg:col-span-8 border-r border-gray-200 pr-8">
          <h1 className="text-4xl font-black mb-8 border-b-2 border-black pb-4">All Stories</h1>
          <div className="grid gap-6">
            {stories.map((story) => (
              <article
                key={story.id}
                className="bg-white rounded shadow p-6 hover:shadow-lg transition flex gap-6"
              >
                {story.image && (
                  <div className="relative w-48 min-h-[120px] flex-shrink-0 hidden md:block">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover rounded"
                      sizes="192px"
                    />
                  </div>
                )}
                <div>
                  <span className="bg-red-600 text-white px-2 py-1 text-xs font-sans font-bold uppercase">{story.tag}</span>
                  <h2 className="text-2xl font-bold mt-3 mb-2">
                    <Link href={`/stories/${story.slug}`} className="hover:underline">
                      {story.title}
                    </Link>
                  </h2>
                  <p className="text-gray-700">{story.excerpt}</p>

                  {/* Story card social sharing */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="inline-block text-green-800 hover:underline font-sans font-bold mr-auto"
                    >
                      Read full story &rarr;
                    </Link>
                    <ShareButtons
                      slug={story.slug}
                      title={story.title}
                      basePath="/stories"
                      size={12}
                      buttonClassName="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-all duration-200 text-gray-600"
                    />
                  </div>
                </div>
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
              {sidebarStories.map((sidebarStory) => (
                <li key={sidebarStory.id} className="border-b border-gray-800 pb-3 hover:text-green-400 last:border-b-0">
                  <Link href={`/sidebar/${sidebarStory.slug}`} className="italic block">
                    &ldquo;{sidebarStory.title}&rdquo;
                  </Link>
                  <span className="text-xs text-gray-400 block mt-1 mb-2">
                    {sidebarStory.tag} | {sidebarStory.excerpt?.substring(0, 50)}...
                  </span>
                  <ShareButtons slug={sidebarStory.slug} title={sidebarStory.title} basePath="/sidebar" />
                </li>
              ))}
            </ul>
          </div>
          {/* Satirical Weather Widget */}
          <div className="bg-blue-100 border border-blue-300 p-4 rounded shadow">
            <h4 className="flex items-center gap-2 font-bold uppercase text-blue-800"><TrendingUp size={16}/> Weather (Probably)</h4>
            <div className="mt-2 text-blue-900">
              <p className="font-bold">Today: 100% chance of clouds. Or not. Weather app unsure.</p>
              <p className="text-xs mt-1">Sponsored by: The Weather App That Just Guesses&trade;</p>
            </div>
          </div>
          {/* Fake Stock Ticker */}
          <div className="bg-green-100 border border-green-300 p-4 rounded shadow">
            <h4 className="flex items-center gap-2 font-bold uppercase text-green-800"><Newspaper size={16}/> Market Madness</h4>
            <ul className="mt-2 text-green-900 text-sm font-mono">
              <li>AI-ETF &#9650; 420.69 (+42%)</li>
              <li>MEMECOIN &#9660; 0.0001 (-99%)</li>
              <li>HUMAN-LABOR &#9199;&#65039; (Suspended)</li>
              <li>ROBOT-ETF &#9650; 9000 (+900%)</li>
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
