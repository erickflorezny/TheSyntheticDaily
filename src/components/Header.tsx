'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CloudSun, ChevronLeft, ChevronRight, Mail, Search, Bot, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

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
  { label: "News", href: "/news" },
  { label: "Tech", href: "/tech" },
  { label: "Science", href: "/science" },
  { label: "Business", href: "/business" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Sports", href: "/sports" },
  { label: "Opinion", href: "/opinion" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      <header className="bg-white">
      {/* Layer 1: Masthead / Promo Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
          <div className="hidden md:block">
            <Link href="/membership" className="text-green-800 text-xs font-sans font-bold uppercase tracking-wider hover:underline">
              Become a Member. Get The Paper.
            </Link>
          </div>
          <div className="col-span-3 md:col-span-1 text-center">
            <Link href="/" className="block group">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter italic font-serif group-hover:opacity-80 transition leading-none">
                The Synthetic Daily
              </h1>
              <p className="mt-1 text-xs font-sans font-bold italic text-gray-600 tracking-wide">
                Humanity&apos;s Final Draft
              </p>
            </Link>
          </div>
          <div className="hidden md:block text-right">
            <Link href="/store" className="text-green-800 text-xs font-sans font-bold uppercase tracking-wider hover:underline">
              Visit The Synthetic Store
            </Link>
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
                <Link
                  href={link.href}
                  className="px-3 py-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-900 hover:bg-green-800 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-3 text-xs font-sans">
            <Link href="/newsletter" className="flex items-center gap-1 text-gray-700 hover:text-green-800 font-bold uppercase tracking-wider">
              <Mail size={12} /> Newsletter
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-green-800">
              <Search size={14} />
            </Link>
          </div>
          <div className="flex md:hidden items-center justify-between w-full">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-gray-900 hover:text-green-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="font-serif font-black text-lg italic tracking-tighter">
              The Synthetic Daily
            </Link>
            <Link href="/search" className="p-2 text-gray-900 hover:text-green-800 transition-colors">
              <Search size={20} />
            </Link>
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
                  <Link href="/stories" className="hover:text-green-800 hover:underline">{headline}</Link>
                  <span className="mx-3 text-gray-400">|</span>
                </span>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 shrink-0 pl-4 border-l border-gray-300">
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
    
    <MobileMenu 
      isOpen={isMobileMenuOpen} 
      onClose={closeMobileMenu} 
    />
  </>
  );
}
