// app/opinion/[slug]/page.tsx
// Individual opinion piece page with slug-based URLs

import Link from 'next/link';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialShare from '@/components/SocialShare';
import { storiesService, sidebarStoriesService } from '@/lib/services/stories';
import { OPINION_PIECES, getOpinionPieceBySlug } from '@/lib/data/opinion-pieces';

const EXPLORE_TAGS = [
  "Artificial Intelligence", "Machine Learning", "Silicon Valley", "Venture Capital",
  "Automation", "ChatGPT", "Big Tech", "Surveillance", "Algorithms", "Data Privacy",
  "Robotics", "Crypto", "Metaverse", "Smart Devices", "Neural Networks",
];

export async function generateStaticParams() {
  return OPINION_PIECES.map((piece) => ({
    slug: piece.slug,
  }));
}

export default async function OpinionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const piece = getOpinionPieceBySlug(slug);
  
  if (!piece) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
        <Header />
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4">Opinion Piece Not Found</h1>
          <p className="text-gray-600 mb-6">The opinion piece you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link 
            href="/opinion" 
            className="inline-block bg-green-800 text-white px-6 py-3 rounded font-sans font-bold hover:bg-green-900 transition"
          >
            Browse All Opinion Pieces
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allStories = storiesService.getAllStories();
  const relatedStories = allStories.slice(0, 12);
  const trendingStories = relatedStories.slice(0, 4);
  const recentStories = relatedStories.slice(4, 8);
  const inOtherNews = relatedStories.slice(0, 6);
  const sidebarStories = sidebarStoriesService.getAllSidebarStories().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-8 px-4 py-8">
        {/* Share Icons — Left Column */}
        <SocialShare 
          title={piece.title}
          url={`/opinion/${piece.slug}`}
          description={piece.excerpt}
          showDesktop={true}
          showMobile={false}
        />

        {/* Article Content — Center Column */}
        <article className="col-span-12 lg:col-span-7">
          {/* Tag & Headline */}
          <div className="mb-8">
            <span className="text-green-800 text-xs font-sans font-bold uppercase">Opinion</span>
            <h1 className="text-4xl md:text-5xl font-black mt-2 mb-4 leading-tight">{piece.title}</h1>
            <div className="flex items-center gap-4 text-sm font-sans text-gray-600">
              <span>By {piece.author}</span>
              <span>•</span>
              <span>Published just now</span>
            </div>
          </div>

          {/* Hero Image */}
          {piece.image && (
            <div className="relative w-full aspect-[16/9] mb-8">
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg max-w-none font-serif text-gray-800 leading-relaxed">
            {piece.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
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
              {sidebarStories.map((sidebarStory) => (
                <li key={sidebarStory.id}>
                  <Link 
                    href={`/sidebar/${sidebarStory.slug}`}
                    className="block group"
                  >
                    <span className="bg-gray-800 text-gray-300 text-xs font-bold px-2 py-1">
                      {sidebarStory.tag}
                    </span>
                    <h5 className="mt-2 font-bold group-hover:text-green-400 transition italic">
                      {sidebarStory.title}
                    </h5>
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
                    className="block group"
                  >
                    <h5 className="font-bold group-hover:text-green-800 transition">
                      {recentStory.title}
                    </h5>
                    <span className="text-gray-500 text-xs block mt-1">{recentStory.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership CTA */}
          <div className="bg-green-50 border border-green-200 p-6 rounded">
            <h4 className="font-bold uppercase text-sm text-green-800 mb-3">Exclusive Content</h4>
            <p className="text-sm text-gray-700 mb-4">
              Get access to premium opinion pieces and exclusive content.
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

      {/* In Other News Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-200">
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