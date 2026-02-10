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
      {/* Top Bar with Links — hidden on mobile */}
      <div className="hidden md:block border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/membership" className="text-xs font-sans font-bold hover:underline text-gray-700">
            Become A Member. Get The Paper.
          </Link>
          <Link href="/store" className="text-xs font-sans font-bold hover:underline text-gray-700">
            Free Your Wallet. Shop The Onion Store.
          </Link>
        </div>
      </div>

      {/* Logo / Masthead — hidden on mobile since nav bar shows the name */}
      <div className="hidden md:block border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <Link href="/" className="inline-block group">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight font-serif group-hover:opacity-80 transition">
                The Synthetic Daily
              </h1>
              <p className="text-xs font-serif italic text-gray-500 mt-2 tracking-wide">
                Humanity&apos;s Finest News Source
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Date and Meta Info Bar — hidden on mobile */}
      <div className="hidden md:block border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3 text-sm font-sans text-gray-700">
            <span className="font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <CloudSun size={16} className="text-gray-500" />
            <span className="text-gray-500">72°</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/newsletter" className="flex items-center gap-1 text-sm font-sans font-bold text-gray-700 hover:text-green-800">
              <Mail size={14} /> Newsletter
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-green-800">
              <Search size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-b border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-3">
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-sans font-bold text-gray-700 hover:text-green-800 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
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

      {/* Newswire Ticker */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10 overflow-hidden">
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
