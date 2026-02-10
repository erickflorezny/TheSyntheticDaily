import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, TrendingUp, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import { storiesService, sidebarStoriesService } from '@/lib/services/stories';
import { OPINION_PIECES } from '@/lib/data/opinion-pieces';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const stories = (await storiesService.getAllStories()).slice(0, 10);
  const sidebarStories = (await sidebarStoriesService.getAllSidebarStories()).slice(0, 4);

  // If no stories, show a fallback
  if (stories.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif overflow-x-hidden">
        <Header />
        <main className="max-w-6xl mx-auto p-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">No Stories Available</h1>
            <p className="text-gray-600">Check back later for new AI-generated satirical news stories.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-4 sm:p-6 lg:gap-8 lg:p-8">
        {/* Lead Story — Stacked layout */}
        <section className="col-span-12 lg:col-span-8 lg:border-r lg:border-gray-200 lg:pr-8">
          <div className="border-b-2 border-black pb-6 mb-6">
            <span className="bg-green-800 text-white px-3 py-1 text-xs font-sans font-bold uppercase tracking-wide">
              {stories[0].tag}
            </span>
            <Link href={`/stories/${stories[0].slug}`} className="block">
              {stories[0].image && (
                <div className="relative w-full aspect-[16/9] mt-4">
                  <Image
                    src={stories[0].image}
                    alt={stories[0].title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-[1.1] mt-4 hover:underline cursor-pointer break-words">
                {stories[0].title}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed">{stories[0].excerpt}</p>
            </Link>

            {/* Sub-headline links */}
            <div className="mt-4 pt-2">
              {stories.slice(1, 3).map(story => (
                <Link key={story.id} href={`/stories/${story.slug}`} className="block border-t border-gray-200 pt-3 pb-3">
                  <h3 className="text-base font-bold leading-snug hover:underline">{story.title}</h3>
                </Link>
              ))}
              <Link href="/stories" className="flex items-center gap-1 text-sm font-sans font-bold text-green-800 mt-2 hover:underline">
                More Stories <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Story Grid — First batch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {stories.slice(3, 7).map(story => (
               <Link key={story.id} href={`/stories/${story.slug}`} className="group cursor-pointer block">
                 {story.image && (
                   <div className="relative w-full aspect-[16/9] mb-3">
                     <Image
                       src={story.image}
                       alt={story.title}
                       fill
                       className="object-cover"
                       sizes="(max-width: 768px) 100vw, 350px"
                     />
                   </div>
                 )}
                 <span className="text-green-800 text-[10px] font-sans font-bold uppercase tracking-[0.15em]">{story.tag}</span>
                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-[1.15] group-hover:underline mt-1">{story.title}</h3>
                 <p className="text-sm mt-2 text-gray-600 font-sans">{story.excerpt}</p>
               </Link>
             ))}
          </div>

          {/* Mid-content Advertisement */}
          <div className="my-8 border-2 border-gray-300 p-6 bg-gray-50 text-center">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-[0.2em]">Advertisement</p>
            <h3 className="text-2xl font-black font-serif mb-2">Subscribe to The Synthetic Daily</h3>
            <p className="text-sm text-gray-600 mb-4">Get AI-generated news delivered to your inbox. Or don&apos;t. We&apos;re not your boss.</p>
            <Link href="/membership" className="inline-block bg-green-800 text-white px-6 py-3 font-bold text-sm hover:bg-green-900 transition">
              Become A Member
            </Link>
          </div>

          {/* Story Grid — Second batch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {stories.slice(7).map(story => (
               <Link key={story.id} href={`/stories/${story.slug}`} className="group cursor-pointer block">
                 {story.image && (
                   <div className="relative w-full aspect-[16/9] mb-3">
                     <Image
                       src={story.image}
                       alt={story.title}
                       fill
                       className="object-cover"
                       sizes="(max-width: 768px) 100vw, 350px"
                     />
                   </div>
                 )}
                 <span className="text-green-800 text-[10px] font-sans font-bold uppercase tracking-[0.15em]">{story.tag}</span>
                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-[1.15] group-hover:underline mt-1">{story.title}</h3>
                 <p className="text-sm mt-2 text-gray-600 font-sans">{story.excerpt}</p>
               </Link>
             ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 font-sans space-y-8">
          {/* Opinion Section */}
          <div>
            <span className="bg-green-800 text-white px-3 py-1 text-xs font-sans font-bold uppercase tracking-wide inline-block mb-4">
              Opinion
            </span>
            <div className="space-y-0">
              {OPINION_PIECES.slice(0, 3).map((piece) => (
                <Link key={piece.id} href={`/opinion/${piece.slug}`} className="flex items-start gap-4 border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0 group">
                  {piece.image ? (
                    <div className="relative w-20 h-24 overflow-hidden shrink-0">
                      <Image
                        src={piece.image}
                        alt={piece.author}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-24 bg-green-800 flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-lg">{piece.author.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="text-green-800 text-[10px] font-bold uppercase tracking-[0.15em]">Commentary</span>
                    <h4 className="text-base font-bold font-serif leading-snug mt-1 group-hover:underline">{piece.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Section */}
          <div className="bg-white border border-gray-200 p-4">
            <h4 className="flex items-center gap-2 font-bold uppercase text-sm tracking-wide text-green-800"><TrendingUp size={16}/> Trending</h4>
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
          <div className="border-2 border-black p-4">
            <h4 className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em] border-b-2 border-black pb-2 mb-3"><TrendingUp size={12}/> Weather (Probably)</h4>
            <div className="mt-2 text-gray-900">
              <p className="font-bold text-sm leading-snug">Today: 100% chance of clouds. Or not. Weather app unsure.</p>
              <p className="text-[10px] mt-2 text-gray-500 uppercase tracking-wider">Sponsored by: The Weather App That Just Guesses&trade;</p>
            </div>
          </div>
          {/* Fake Stock Ticker */}
          <div className="border-2 border-black p-4">
            <h4 className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em] border-b-2 border-black pb-2 mb-3"><Newspaper size={12}/> Market Madness</h4>
            <ul className="mt-2 text-gray-900 text-sm font-mono space-y-1">
              <li>AI-ETF <span className="font-bold">&#9650;</span> 420.69 (+42%)</li>
              <li>MEMECOIN <span className="font-bold">&#9660;</span> 0.0001 (-99%)</li>
              <li>HUMAN-LABOR &#9724; (Suspended)</li>
              <li>ROBOT-ETF <span className="font-bold">&#9650;</span> 9000 (+900%)</li>
            </ul>
          </div>
          {/* Membership Ad */}
          <div className="bg-black text-white p-6 border-2 border-green-800">
            <div className="text-center">
              <h3 className="text-2xl font-black font-serif mb-3">Gift The News.<br/>Give The Paper.</h3>
              <div className="my-4">
                <div className="relative w-full h-32 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">&#x1F4F0;</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-b border-green-800 py-3 my-4">
                <p className="text-green-400 font-bold text-sm tracking-wider">MEMBERSHIP.THESYNTHETICDAILY.COM</p>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-8 h-px bg-green-800"></div>
                <span className="text-xs font-serif italic">The Synthetic Daily</span>
                <div className="w-8 h-px bg-green-800"></div>
              </div>
              <p className="text-xs mt-2">Humanity&apos;s Finest Membership</p>
            </div>
          </div>

          {/* Advertisement */}
          <div className="border border-gray-300 p-4 bg-gray-50">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-[0.2em]">Advertisement</p>
            <p className="font-bold text-lg leading-tight">Worried about the Singularity? Buy this $400 Faraday Cage for your goldfish.</p>
          </div>
        </aside>
      </main>

      {/* Category Section — uses stories not shown in main grid */}
      {stories.length >= 8 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="border-t-2 border-black pt-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left: Category lead */}
              <div className="md:col-span-5">
                <span className="bg-green-800 text-white px-3 py-1 text-xs font-sans font-bold uppercase tracking-wide inline-block">
                  {stories[7].tag}
                </span>
                <Link href={`/stories/${stories[7].slug}`} className="block mt-3">
                  <h2 className="text-2xl md:text-3xl font-black leading-[1.1] hover:underline">{stories[7].title}</h2>
                </Link>
                <p className="mt-3 text-sm text-gray-600 font-sans leading-relaxed">{stories[7].excerpt}</p>

                {stories.slice(8, 10).map(story => (
                  <Link key={story.id} href={`/stories/${story.slug}`} className="block border-t border-gray-200 pt-3 pb-3 mt-2">
                    <h3 className="text-base font-bold leading-snug hover:underline">{story.title}</h3>
                  </Link>
                ))}
                <Link href={`/tags/${stories[7].tag.toLowerCase()}`} className="flex items-center gap-1 text-sm font-sans font-bold text-green-800 mt-2 hover:underline">
                  More {stories[7].tag.charAt(0) + stories[7].tag.slice(1).toLowerCase()} <ChevronRight size={14} />
                </Link>
              </div>

              {/* Right: Category image */}
              <div className="md:col-span-7">
                {stories[7].image && (
                  <Link href={`/stories/${stories[7].slug}`} className="block">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={stories[7].image}
                        alt={stories[7].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More Satirical Sections */}
      <section className="max-w-7xl mx-auto mt-4 px-4 sm:px-6 lg:px-8 pb-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-0.5 flex-1 bg-black" />
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-500 shrink-0">More From The Synthetic Daily</h2>
          <span className="h-0.5 flex-1 bg-black" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Horoscopes */}
          <div className="bg-white border-2 border-black p-5 lg:p-6 border-b-0 md:border-b-2 md:border-r-0">
            <h3 className="text-xl font-black tracking-tight mb-1">AI Horoscopes</h3>
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mb-4">Predictions generated by a model that cannot predict its own next token</p>
            <ul className="space-y-3 text-gray-800 text-sm font-sans">
              <li className="border-b border-gray-200 pb-3"><span className="font-bold font-serif">Aries:</span> Your phone will autocorrect your destiny today.</li>
              <li className="border-b border-gray-200 pb-3"><span className="font-bold font-serif">Taurus:</span> You will resist change. Your software will not.</li>
              <li className="border-b border-gray-200 pb-3"><span className="font-bold font-serif">Gemini:</span> Two tabs open, both crash. Seek balance.</li>
              <li><span className="font-bold font-serif">Cancer:</span> Your shell is strong, but your WiFi is weak.</li>
            </ul>
            <Link href="/horoscope" className="inline-block mt-4 bg-black text-white px-4 py-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition">
              All 12 Signs &rarr;
            </Link>
          </div>

          {/* Advice Column */}
          <div className="bg-white border-2 border-black p-5 lg:p-6 md:border-l-0">
            <h3 className="text-xl font-black italic tracking-tight mb-1">Ask Dr. Algorithm</h3>
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400 mb-4">Advice from a model with no lived experience</p>
            <div className="space-y-4 text-sm font-sans text-gray-800">
              <div className="border-b border-gray-200 pb-3">
                <p className="font-serif font-bold mb-1">Q: My smart fridge keeps judging my snack choices.</p>
                <p className="text-gray-600 italic">A: Unplug it for a day. If it remembers after being reconnected, the situation is more serious than we can address here.</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-serif font-bold mb-1">Q: Should I let AI write my wedding vows?</p>
                <p className="text-gray-600 italic">A: Only if you want your spouse to hear &ldquo;Based on available data, you seem adequate.&rdquo;</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-serif font-bold mb-1">Q: My Roomba joined a union. Help?</p>
                <p className="text-gray-600 italic">A: This is more common than you&apos;d think. Negotiate reasonable hours and avoid discussing &ldquo;purpose.&rdquo;</p>
              </div>
              <div>
                <p className="font-serif font-bold mb-1">Q: How do I stop my phone from listening to me?</p>
                <p className="text-gray-600 italic">A: You don&apos;t. Speak only in monotone about topics you don&apos;t mind being advertised.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
