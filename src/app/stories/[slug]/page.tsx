// app/stories/[slug]/page.tsx
// Individual story page with slug-based URLs

import Link from 'next/link';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialShare from '@/components/SocialShare';
import { storiesService, sidebarStoriesService } from '@/lib/services/stories';

const EXPLORE_TAGS = [
  "Artificial Intelligence", "Machine Learning", "Silicon Valley", "Venture Capital",
  "Automation", "ChatGPT", "Big Tech", "Surveillance", "Algorithms", "Data Privacy",
  "Robotics", "Crypto", "Metaverse", "Smart Devices", "Neural Networks",
];

export const dynamic = 'force-dynamic';

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await storiesService.getStoryBySlug(slug);
  
  if (!story) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
        <Header />
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
          <p className="text-gray-600 mb-6">The story you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link 
            href="/stories" 
            className="inline-block bg-green-800 text-white px-6 py-3 rounded font-sans font-bold hover:bg-green-900 transition"
          >
            Browse All Stories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedStories = await storiesService.getRelatedStories(story.id, 12);
  const trendingStories = relatedStories.slice(0, 4);
  const recentStories = relatedStories.slice(4, 8);
  const inOtherNews = relatedStories.slice(0, 6);
  const sidebarStories = (await sidebarStoriesService.getAllSidebarStories()).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Share Icons — Left Column */}
        <SocialShare 
          title={story.title}
          url={`/stories/${story.slug}`}
          description={story.excerpt}
          showDesktop={true}
          showMobile={false}
        />

        {/* Article Content — Center Column */}
        <article className="col-span-12 lg:col-span-7" data-story-id={story.id}>
          {/* Tag & Headline */}
          <span className="bg-red-600 text-white px-3 py-1 text-xs font-sans font-bold uppercase tracking-wider">
            {story.tag}
          </span>
          <h1 className="text-4xl lg:text-5xl font-black mt-4 mb-6 leading-[1.1]">
            {story.title}
          </h1>

          {/* Hero Image */}
          {story.image && (
            <div className="relative w-full aspect-[16/9] mb-8">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-xl text-gray-700 italic border-l-4 border-green-800 pl-4 mb-8">
            {story.excerpt}
          </p>

          {/* Byline & Published Date */}
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200 font-sans text-xs text-gray-500">
            {story.author && <span className="font-bold text-gray-700">By {story.author}</span>}
            <time>{story.publishedDate ? new Date(story.publishedDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }) : 'Recently'}</time>
            {/* Mobile share icons */}
            <SocialShare 
              title={story.title}
              url={`/stories/${story.slug}`}
              description={story.excerpt}
              showDesktop={false}
              showMobile={true}
            />
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
            <p className="text-sm font-sans text-gray-700">Support The Synthetic Daily by visiting our sponsors.</p>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="font-sans font-bold uppercase text-sm text-gray-500 mb-4">Explore More</h4>
            <div className="flex flex-wrap gap-2">
              {EXPLORE_TAGS.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-sans hover:bg-green-800 hover:text-white transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar — Right Column */}
        <aside className="col-span-12 lg:col-span-4 font-sans space-y-8">
          {/* Sidebar Stories */}
          <div className="bg-black text-white p-4 mb-6 rounded">
            <h4 className="flex items-center gap-2 font-bold uppercase italic"><Zap size={16}/> Sidebar Specials</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {sidebarStories.map((sidebarStory) => (
                <li key={sidebarStory.id}>
                  <Link 
                    href={`/sidebar/${sidebarStory.slug}`}
                    className="block hover:text-green-300 transition"
                  >
                    {sidebarStory.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trending Stories */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-500 mb-4">Trending Now</h4>
            <ul className="space-y-4">
              {trendingStories.map((trendingStory) => (
                <li key={trendingStory.id}>
                  <Link 
                    href={`/stories/${trendingStory.slug}`}
                    className="block group"
                  >
                    <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1">
                      {trendingStory.tag}
                    </span>
                    <h5 className="mt-2 font-bold group-hover:text-green-800 transition">
                      {trendingStory.title}
                    </h5>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Stories */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-500 mb-4">Recent Stories</h4>
            <ul className="space-y-3 text-sm">
              {recentStories.map((recentStory) => (
                <li key={recentStory.id}>
                  <Link 
                    href={`/stories/${recentStory.slug}`}
                    className="text-gray-700 hover:text-green-800 hover:underline"
                  >
                    {recentStory.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-green-50 border border-green-200 p-6 rounded">
            <h4 className="font-bold uppercase text-sm text-green-800 mb-3">Stay Informed</h4>
            <p className="text-sm text-gray-700 mb-4">
              Get the latest AI news and satire delivered to your inbox.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-green-800 text-white px-4 py-2 text-sm font-bold uppercase hover:bg-green-900 transition"
            >
              Subscribe Now
            </Link>
          </div>
        </aside>
      </main>

      {/* In Other News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h3 className="text-2xl font-black mb-8">In Other News</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inOtherNews.map((newsStory) => (
            <article key={newsStory.id} className="bg-white p-6 border border-gray-200 rounded">
              <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1">
                {newsStory.tag}
              </span>
              <h4 className="text-lg font-bold mt-3 mb-2">
                <Link 
                  href={`/stories/${newsStory.slug}`}
                  className="hover:text-green-800 hover:underline"
                >
                  {newsStory.title}
                </Link>
              </h4>
              <p className="text-gray-600 text-sm">{newsStory.excerpt}</p>
              <Link
                href={`/stories/${newsStory.slug}`}
                className="inline-block mt-4 text-green-800 hover:underline font-sans font-bold text-sm"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}