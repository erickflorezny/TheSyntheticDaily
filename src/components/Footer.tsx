import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 font-sans">
      {/* Logo */}
      <div className="text-center py-8 border-b border-gray-800">
        <Link href="/">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic font-serif">The Synthetic Daily</h2>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 lg:px-8 py-12">
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
            <Link href="/horoscope" className="block mt-4 text-xs font-bold uppercase tracking-widest text-center hover:text-green-400 transition">
              Read Your Horoscope
            </Link>
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
              <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="underline hover:text-white">Terms of Use</Link>
            </p>
          </div>
        </div>

        {/* Right — Sections + Explore */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-8 lg:gap-12 lg:justify-items-end">
          <div>
            <h4 className="text-xl font-bold mb-4">Sections</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/news" className="hover:text-white transition">The Latest</Link></li>
              <li><Link href="/tech" className="hover:text-white transition">Tech</Link></li>
              <li><Link href="/science" className="hover:text-white transition">Science</Link></li>
              <li><Link href="/business" className="hover:text-white transition">Business</Link></li>
              <li><Link href="/entertainment" className="hover:text-white transition">Entertainment</Link></li>
              <li><Link href="/sports" className="hover:text-white transition">Sports</Link></li>
              <li><Link href="/opinion" className="hover:text-white transition">Opinion</Link></li>
              <li><Link href="/video" className="hover:text-white transition">Video</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/search" className="hover:text-white transition">Search</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/membership" className="hover:text-white transition">Become a Member</Link></li>
              <li><Link href="/store" className="hover:text-white transition">The Synthetic Store</Link></li>
              <li><Link href="/archive" className="hover:text-white transition">Front Page Archive</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition">Jobs</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal links in tiny, gray, "boring" font */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} The Synthetic Daily. All rights reserved. Or not. The legal AI is still processing this.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-xs">
              <Link href="/terms" className="hover:text-gray-300 transition">Terms of Service & Biological Liability Waiver</Link>
              <Link href="/privacy" className="hover:text-gray-300 transition">Privacy Policy (Or: Why We Already Know What You're Thinking)</Link>
              <Link href="/about" className="hover:text-gray-300 transition">About</Link>
              <Link href="/contact" className="hover:text-gray-300 transition">Contact (Don't)</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
