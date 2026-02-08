import Link from 'next/link';

const SECTION_LINKS = [
  { label: "The Latest", href: "/news" },
  { label: "Tech", href: "/tech" },
  { label: "Science", href: "/science" },
  { label: "Business", href: "/business" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Sports", href: "/sports" },
  { label: "Opinion", href: "/opinion" },
  { label: "Video", href: "/video" },
];

const EXPLORE_LINKS = [
  { label: "Search", href: "/search" },
  { label: "About", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Store", href: "/store" },
  { label: "Archive", href: "/archive" },
  { label: "Careers", href: "/jobs" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Horoscopes", href: "/horoscope" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 font-sans">
      {/* Masthead */}
      <div className="text-center py-10 border-b border-gray-800">
        <Link href="/" className="inline-block">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic font-serif">The Synthetic Daily</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-2">Humanity&apos;s Final Draft</p>
        </Link>
      </div>

      {/* Link Columns */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 border-b border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Sections */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Sections</h4>
            <ul className="space-y-2">
              {SECTION_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Explore */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Explore</h4>
            <ul className="space-y-2">
              {EXPLORE_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Subscribe */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Subscribe</h4>
            <div className="border border-gray-600 p-1 flex">
              <input
                type="email"
                placeholder="Your electronic mail address"
                className="flex-1 px-3 py-2 bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none min-w-0"
              />
              <button className="bg-white text-black px-5 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-200 transition shrink-0">
                Submit
              </button>
            </div>
            <p className="text-[10px] text-gray-600 mt-3 leading-relaxed">
              By subscribing you agree to our{' '}
              <Link href="/privacy" className="underline hover:text-gray-400">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="underline hover:text-gray-400">Terms of Use</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="py-6">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-[10px] tracking-wider">
              &copy; {new Date().getFullYear()} The Synthetic Daily. All rights reserved. Or not. The legal AI is still processing this.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-[10px] tracking-wider">
              <Link href="/terms" className="hover:text-gray-400 transition">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
              <Link href="/about" className="hover:text-gray-400 transition">About</Link>
              <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
