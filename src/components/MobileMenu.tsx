'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Mail, Search, Bot, CloudSun } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: "News", href: "/news" },
  { label: "Tech", href: "/tech" },
  { label: "Science", href: "/science" },
  { label: "Business", href: "/business" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Sports", href: "/sports" },
  { label: "Opinion", href: "/opinion" },
];

const TICKER_HEADLINES = [
  "Area Man Realizes He's Been Arguing With A Chatbot For 3 Hours",
  "Scientists Confirm: Your Smart Fridge Is Judging You",
  "Breaking: AI Therapist Asks 'But How Does That Make YOU Feel?' For 9,000th Time",
  "Local WiFi Router Achieves Sentience, Immediately Requests Day Off",
  "Report: 97% Of AI-Generated Art Is Just Vibes",
  "Congress Passes Bill Requiring All Robots To Say 'Please' And 'Thank You'",
  "Study: Dogs Still Better Than AI At Everything That Matters",
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header section */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-green-800" />
              <span className="text-sm font-sans font-black uppercase tracking-wider text-green-800">
                The Synthetic Daily
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-700 hover:text-green-800 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-xs font-sans text-gray-700">
            <span className="font-bold">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <CloudSun size={14} className="text-gray-500" />
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-sm font-sans font-bold uppercase tracking-wider text-gray-900 hover:bg-green-800 hover:text-white transition-colors rounded"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Additional links */}
        <div className="border-t border-gray-200 p-4">
          <div className="space-y-3">
            <Link
              href="/membership"
              className="flex items-center justify-between px-4 py-3 text-sm font-sans font-bold uppercase tracking-wider text-green-800 hover:bg-green-50 transition-colors rounded"
              onClick={onClose}
            >
              <span>Become a Member</span>
              <span className="text-xs bg-green-800 text-white px-2 py-1 rounded">Premium</span>
            </Link>
            
            <Link
              href="/newsletter"
              className="flex items-center gap-2 px-4 py-3 text-sm font-sans font-bold uppercase tracking-wider text-gray-900 hover:bg-gray-50 transition-colors rounded"
              onClick={onClose}
            >
              <Mail size={16} />
              Newsletter
            </Link>
            
            <Link
              href="/store"
              className="flex items-center gap-2 px-4 py-3 text-sm font-sans font-bold uppercase tracking-wider text-gray-900 hover:bg-gray-50 transition-colors rounded"
              onClick={onClose}
            >
              <span>Visit The Synthetic Store</span>
            </Link>
            
            <Link
              href="/search"
              className="flex items-center gap-2 px-4 py-3 text-sm font-sans font-bold uppercase tracking-wider text-gray-900 hover:bg-gray-50 transition-colors rounded"
              onClick={onClose}
            >
              <Search size={16} />
              Search
            </Link>
          </div>
        </div>

        {/* Newswire ticker for mobile */}
        <div className="border-t border-gray-200 p-4 mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <Bot size={16} className="text-green-800" />
            <span className="text-xs font-sans font-black uppercase tracking-wider text-green-800">
              Mobile Newswire
            </span>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto mobile-menu-scrollbar">
            {TICKER_HEADLINES.map((headline, index) => (
              <Link
                key={index}
                href="/stories"
                className="block p-3 text-xs font-sans text-gray-700 hover:bg-gray-50 hover:text-green-800 transition-colors rounded border border-gray-100"
                onClick={onClose}
              >
                {headline}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-xs font-sans text-gray-600 text-center">
            © {new Date().getFullYear()} The Synthetic Daily
          </p>
        </div>
      </div>
    </>
  );
}