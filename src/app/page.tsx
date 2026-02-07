import Link from 'next/link';
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
        {/* Lead Story */}
        <section className="col-span-12 lg:col-span-8 border-r border-gray-200 pr-8">
          <div className="border-b-2 border-black pb-4 mb-6">
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-sans font-bold">BREAKING</span>
            <a href={`/stories/${MOCK_STORIES[0].id}`} className="block">
              <h2 className="text-5xl font-black leading-none mt-4 hover:underline cursor-pointer">
                {MOCK_STORIES[0].title}
              </h2>
              <p className="mt-4 text-xl text-gray-700 leading-relaxed">{MOCK_STORIES[0].excerpt}</p>
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             {MOCK_STORIES.slice(1).map(s => (
               <a key={s.id} href={`/stories/${s.id}`} className="group cursor-pointer block">
                 <h3 className="text-2xl font-bold leading-tight group-hover:underline">{s.title}</h3>
                 <p className="text-sm mt-2 text-gray-600 font-sans">{s.excerpt}</p>
               </a>
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

      {/* More Satirical Sections */}
      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Horoscopes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded shadow p-6">
          <h3 className="text-2xl font-bold mb-4 text-yellow-700">AI Horoscopes</h3>
          <ul className="space-y-2 text-yellow-900">
            <li><span className="font-bold">Aries:</span> Your phone will autocorrect your destiny today.</li>
            <li><span className="font-bold">Taurus:</span> You will resist change. Your software will not.</li>
            <li><span className="font-bold">Gemini:</span> Two tabs open, both crash. Seek balance.</li>
            <li><span className="font-bold">Cancer:</span> Your shell is strong, but your WiFi is weak.</li>
            <li><span className="font-bold">Leo:</span> You will be the main character in a group chat.</li>
            <li><span className="font-bold">Virgo:</span> Your to-do list will gain sentience.</li>
            <li><span className="font-bold">Libra:</span> You will weigh the pros and cons of every notification.</li>
            <li><span className="font-bold">Scorpio:</span> Trust no one. Especially autocorrect.</li>
            <li><span className="font-bold">Sagittarius:</span> Your next adventure is in your spam folder.</li>
            <li><span className="font-bold">Capricorn:</span> You will climb the corporate ladder, but it's a CAPTCHA.</li>
            <li><span className="font-bold">Aquarius:</span> You will invent a new meme. It will go unnoticed.</li>
            <li><span className="font-bold">Pisces:</span> You will dream of electric sheep.</li>
          </ul>
        </div>
        {/* Fake Advice Column */}
        <div className="bg-pink-50 border border-pink-200 rounded shadow p-6">
          <h3 className="text-2xl font-bold mb-4 text-pink-700">Ask Dr. Algorithm</h3>
          <ul className="space-y-2 text-pink-900">
            <li><span className="font-bold">Q:</span> My smart fridge keeps judging my snack choices. What do I do?<br/><span className="font-bold">A:</span> Unplug it for a day. Show it who's boss.</li>
            <li><span className="font-bold">Q:</span> Should I let AI write my wedding vows?<br/><span className="font-bold">A:</span> Only if you want your spouse to hear "As an AI language model..."</li>
            <li><span className="font-bold">Q:</span> My Roomba joined a union. Help?<br/><span className="font-bold">A:</span> Negotiate for better snacks. Or floors.</li>
            <li><span className="font-bold">Q:</span> How do I stop my phone from listening to me?<br/><span className="font-bold">A:</span> Whisper. Or use interpretive dance.</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white mt-16 font-sans">
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