// app/sidebar/[slug]/page.tsx
// Sidebar story page with slug-based URLs

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialShare from '@/components/SocialShare';
import { Zap } from 'lucide-react';
import { storiesService, sidebarStoriesService } from '@/lib/services/stories';

const EXPLORE_TAGS = [
  "Artificial Intelligence", "Machine Learning", "Silicon Valley", "Venture Capital",
  "Automation", "ChatGPT", "Big Tech", "Surveillance", "Algorithms", "Data Privacy",
  "Robotics", "Crypto", "Metaverse", "Smart Devices", "Neural Networks",
];

export const dynamic = 'force-dynamic';

export default async function SidebarStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await sidebarStoriesService.getSidebarStoryBySlug(slug);
  
  if (!story) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
        <Header />
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4">Sidebar Story Not Found</h1>
          <p className="text-gray-600 mb-6">The sidebar story you're looking for doesn't exist or has been moved.</p>
          <Link 
            href="/" 
            className="inline-block bg-green-800 text-white px-6 py-3 rounded font-sans font-bold hover:bg-green-900 transition"
          >
            Return to Homepage
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherSidebarStories = await sidebarStoriesService.getRelatedSidebarStories(story.id, 6);
  const mainStories = (await storiesService.getAllStories()).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Share Icons — Left Column */}
        <SocialShare 
          title={story.title}
          url={`/sidebar/${story.slug}`}
          description={story.excerpt}
          showDesktop={true}
          showMobile={false}
        />

        {/* Article Content — Center Column */}
        <article className="col-span-12 lg:col-span-7" data-story-id={story.id}>
          {/* Category Tags */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-800 text-white px-3 py-1 text-xs font-sans font-bold uppercase tracking-wider">
              {story.tag}
            </span>
            <span className="text-xs font-sans text-gray-500 uppercase">Sidebar Special</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-5xl font-black mt-2 mb-6 leading-[1.1]">
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
              url={`/sidebar/${story.slug}`}
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
          {/* More Sidebar Stories */}
          <div className="bg-black text-white p-4 mb-6 rounded">
            <h4 className="flex items-center gap-2 font-bold uppercase italic"><Zap size={16}/> More Sidebar Specials</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {otherSidebarStories.map((sidebarStory) => (
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

          {/* Main Stories */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-500 mb-4">Top Stories</h4>
            <ul className="space-y-4">
              {mainStories.map((mainStory) => (
                <li key={mainStory.id}>
                  <Link 
                    href={`/stories/${mainStory.slug}`}
                    className="block group"
                  >
                    <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1">
                      {mainStory.tag}
                    </span>
                    <h5 className="mt-2 font-bold group-hover:text-green-800 transition">
                      {mainStory.title}
                    </h5>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-green-50 border border-green-200 p-6 rounded">
            <h4 className="font-bold uppercase text-sm text-green-800 mb-3">Exclusive Content</h4>
            <p className="text-sm text-gray-700 mb-4">
              Get access to premium sidebar stories and exclusive content.
            </p>
            <Link
              href="/membership"
              className="inline-block bg-green-800 text-white px-4 py-2 text-sm font-bold uppercase hover:bg-green-900 transition"
            >
              Become a Member
            </Link>
          </div>
        </aside>
      </main>

      {/* Related Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h3 className="text-2xl font-black mb-8">You Might Also Like</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherSidebarStories.map((relatedStory) => (
            <article key={relatedStory.id} className="bg-white p-6 border border-gray-200 rounded">
              <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1">
                {relatedStory.tag}
              </span>
              <h4 className="text-lg font-bold mt-3 mb-2">
                <Link 
                  href={`/sidebar/${relatedStory.slug}`}
                  className="hover:text-green-800 hover:underline"
                >
                  {relatedStory.title}
                </Link>
              </h4>
              <p className="text-gray-600 text-sm">{relatedStory.excerpt}</p>
              <Link
                href={`/sidebar/${relatedStory.slug}`}
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