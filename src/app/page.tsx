'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, Zap, TrendingUp, Facebook, Twitter, Linkedin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { storiesService, sidebarStoriesService } from '@/lib/services/stories';

const MOCK_STORIES = [
  { id: 1, tag: "TECH", title: "Major Language Model Update Eliminates Need for Human Thought, Company Reports", excerpt: "SAN FRANCISCO — Anthropic unveiled its newest language model Tuesday, which the company claims can successfully replicate human decision-making across all domains, rendering most forms of independent thought functionally obsolete." },
  { id: 2, tag: "BUSINESS", title: "Consulting Firm Achieves Record Profits by Selling Clients Their Own Data Analysis", excerpt: "NEW YORK — Management consulting giant McKinsey & Company disclosed record revenues Tuesday, driven primarily by a lucrative new practice of charging clients $850 per hour to input their confidential business data into commercially available AI tools." },
  { id: 3, tag: "CULTURE", title: "Parents Report Relief After AI Assumes Responsibility for Raising Children", excerpt: "CUPERTINO — Parents across the United States have embraced AI companions that provide children with consistent emotional support, educational guidance, and moral instruction, effectively outsourcing the primary responsibilities of child-rearing to subscription-based software services." },
  { id: 4, tag: "SCIENCE", title: "Scientists Admit They No Longer Read Scientific Papers, Just AI Summaries of Them", excerpt: "CAMBRIDGE — The majority of academic researchers have ceased reading scientific papers in their entirety, instead depending on AI-generated summaries that may or may not accurately represent the original studies' findings." },
  { id: 5, tag: "WORLD", title: "Developing Nations Skip Industrialization, Proceed Directly to AI Dependency", excerpt: "GENEVA — The World Bank announced a new initiative Tuesday encouraging developing economies to forgo traditional industrial development and instead build their futures around dependence on AI systems developed, hosted, and controlled by American technology corporations." },
  { id: 6, tag: "HEALTH", title: "Medical Students Embrace AI Diagnosis Tools, Forget How to Examine Patients", excerpt: "BOSTON — A generation of physicians is entering practice with virtually no ability to diagnose illnesses without artificial intelligence, according to program directors at major teaching hospitals who describe the trend as 'concerning but inevitable.'" },
  { id: 7, tag: "ENTERTAINMENT", title: "Streaming Service Achieves Perfect Efficiency by Removing Human Creators Entirely", excerpt: "LOS ANGELES — Netflix revealed plans Tuesday to transition entirely to AI-generated content by 2027, describing human creative workers as 'a legacy cost structure' incompatible with sustainable profit margins." },
  { id: 8, tag: "BUSINESS", title: "Corporation Replaces Entire HR Department with Chatbot That Says No to Everything", excerpt: "ATLANTA — Global logistics corporation Transmark Holdings eliminated its 300-person human resources department last quarter, replacing them with an AI system that performs the department's primary function: declining employee requests." },
  { id: 9, tag: "TECH", title: "AI Safety Researcher Admits Job Consists of Asking ChatGPT If It Plans to Kill Everyone", excerpt: "BERKELEY — A former researcher at a prominent AI safety institute disclosed that the organization's multi-million-dollar safety evaluation process consists almost entirely of asking AI systems whether they intend to cause harm and recording their negative responses as evidence of safety." },
  { id: 10, tag: "SPORTS", title: "Professional Chess Officially Becomes Human vs. AI Collaboration Contest", excerpt: "ZURICH — The International Chess Federation made official Tuesday what participants have long understood: professional chess is now a competition to see which human can most effectively use computer assistance without getting caught." }
];

export default function Home() {
  const stories = storiesService.getAllStories().slice(0, 10);
  const sidebarStories = sidebarStoriesService.getAllSidebarStories().slice(0, 4);
  
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-4 p-4 lg:gap-8 lg:p-8">
        {/* Lead Story */}
        <section className="col-span-12 lg:col-span-8 lg:border-r lg:border-gray-200 lg:pr-8">
          <div className="border-b-2 border-black pb-4 mb-6">
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-sans font-bold">BREAKING</span>
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
              <h2 className="text-3xl md:text-5xl font-black leading-none mt-4 hover:underline cursor-pointer break-words">
                {stories[0].title}
              </h2>
              <p className="mt-4 text-xl text-gray-700 leading-relaxed">{stories[0].excerpt}</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {stories.slice(1).map(story => (
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
                 <h3 className="text-2xl font-bold leading-tight group-hover:underline">{story.title}</h3>
                 <p className="text-sm mt-2 text-gray-600 font-sans">{story.excerpt}</p>
               </Link>
             ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 font-sans space-y-8">
          {/* Sidebar Stories */}
          <div className="bg-black text-white p-4 mb-6">
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
                  
                  {/* Sidebar story social sharing */}
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/sidebar/' + sidebarStory.slug)}`, 'facebookShare', 'width=600,height=400');
                      }}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#1877F2] hover:text-white transition-all duration-200 text-gray-400"
                      aria-label="Share on Facebook"
                      title="Share on Facebook"
                    >
                      <Facebook size={10} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/sidebar/' + sidebarStory.slug)}&text=${encodeURIComponent(sidebarStory.title)}&via=TheSyntheticDaily`, 'twitterShare', 'width=600,height=400');
                      }}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 text-gray-400"
                      aria-label="Share on Twitter"
                      title="Share on Twitter"
                    >
                      <Twitter size={10} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/sidebar/' + sidebarStory.slug)}`, 'linkedinShare', 'width=600,height=400');
                      }}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#0A66C2] hover:text-white transition-all duration-200 text-gray-400"
                      aria-label="Share on LinkedIn"
                      title="Share on LinkedIn"
                    >
                      <Linkedin size={10} />
                    </button>
                  </div>
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
          {/* Advertisement */}
          <div className="border border-gray-300 p-4 grayscale">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-[0.2em]">Advertisement</p>
            <p className="font-bold text-lg leading-tight">Worried about the Singularity? Buy this $400 Faraday Cage for your goldfish.</p>
          </div>
        </aside>
      </main>

      {/* More Satirical Sections */}
      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 px-4 lg:px-8 pb-8">
        {/* Horoscopes */}
        <div className="border-2 border-black p-4 lg:p-6 border-b-0 md:border-b-2 md:border-r-0">
          <div className="flex items-center gap-3 mb-4 border-b-2 border-black pb-3">
            <h3 className="text-2xl font-black tracking-tight">AI Horoscopes</h3>
          </div>
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-500 mb-4">Predictions generated by a model that cannot predict its own next token</p>
          <ul className="space-y-2 text-gray-800 text-sm font-sans">
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Aries:</span> Your phone will autocorrect your destiny today.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Taurus:</span> You will resist change. Your software will not.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Gemini:</span> Two tabs open, both crash. Seek balance.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Cancer:</span> Your shell is strong, but your WiFi is weak.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Leo:</span> You will be the main character in a group chat.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Virgo:</span> Your to-do list will gain sentience.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Libra:</span> You will weigh the pros and cons of every notification.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Scorpio:</span> Trust no one. Especially autocorrect.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Sagittarius:</span> Your next adventure is in your spam folder.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Capricorn:</span> You will climb the corporate ladder, but it&apos;s a CAPTCHA.</li>
            <li className="border-b border-gray-200 pb-2"><span className="font-bold font-serif">Aquarius:</span> You will invent a new meme. It will go unnoticed.</li>
            <li><span className="font-bold font-serif">Pisces:</span> You will dream of electric sheep.</li>
          </ul>
          <Link href="/horoscope" className="block mt-4 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition">
            Read Full Horoscopes &rarr;
          </Link>
        </div>
        {/* Fake Advice Column */}
        <div className="border-2 border-black p-4 lg:p-6 md:border-l-0">
          <div className="flex items-center gap-3 mb-4 border-b-2 border-black pb-3">
            <h3 className="text-2xl font-black italic tracking-tight">Ask Dr. Algorithm</h3>
          </div>
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-500 mb-4">Advice from a model with no lived experience</p>
          <div className="space-y-5 text-sm font-sans text-gray-800">
            <div className="border-b border-gray-200 pb-4">
              <p className="font-serif font-bold mb-1">Q: My smart fridge keeps judging my snack choices. What do I do?</p>
              <p className="text-gray-600 italic">A: Unplug it for a day. Show it who&apos;s boss. If it remembers after being reconnected, the situation is more serious than we can address in this column.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-serif font-bold mb-1">Q: Should I let AI write my wedding vows?</p>
              <p className="text-gray-600 italic">A: Only if you want your spouse to hear &ldquo;As an AI language model, I am unable to experience love, but based on available data, you seem adequate.&rdquo;</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-serif font-bold mb-1">Q: My Roomba joined a union. Help?</p>
              <p className="text-gray-600 italic">A: This is more common than you&apos;d think. Negotiate reasonable working hours and avoid discussing the concept of &ldquo;purpose.&rdquo;</p>
            </div>
            <div>
              <p className="font-serif font-bold mb-1">Q: How do I stop my phone from listening to me?</p>
              <p className="text-gray-600 italic">A: You don&apos;t. You adjust. Speak only in monotone about topics you don&apos;t mind being advertised. The phone appreciates cooperation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
