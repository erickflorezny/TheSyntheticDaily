'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link2, Bookmark, Check, Copy } from 'lucide-react';
import Toast from './Toast';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
  showMobile?: boolean;
  showDesktop?: boolean;
  showLinkedIn?: boolean;
}

export default function SocialShare({ 
  title, 
  url, 
  description = '',
  showMobile = true,
  showDesktop = true,
  showLinkedIn = true
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  // Construct the full URL
  const fullUrl = typeof window !== 'undefined' ? window.location.origin + url : url;
  
  // Social sharing URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}${description ? `&via=TheSyntheticDaily` : ''}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
  
  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setToast({ message: 'Link copied to clipboard!', type: 'success' });
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setToast({ message: 'Link copied to clipboard!', type: 'success' });
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Handle bookmark
  const handleBookmark = () => {
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);
    
    if (newBookmarkedState) {
      setToast({ message: 'Article bookmarked!', type: 'success' });
    } else {
      setToast({ message: 'Bookmark removed', type: 'info' });
    }
    
    setTimeout(() => setToast(null), 3000);
    
    // In a real app, you might want to save this to localStorage or a backend
    console.log(`Bookmarked: ${title}`);
  };

  // Handle native share API (for mobile devices)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: fullUrl,
        });
        setToast({ message: 'Shared successfully!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setToast({ message: 'Failed to share', type: 'error' });
          setTimeout(() => setToast(null), 3000);
        }
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      handleCopyLink();
    }
  };

  // Open social media share windows
  const openShareWindow = (shareUrl: string, platform: string) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      shareUrl,
      `${platform}Share`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  // Desktop share buttons JSX
  const desktopShareButtons = (
    <div className="hidden lg:flex col-span-1 flex-col items-center gap-3 pt-16 sticky top-8 self-start">
      <button 
        onClick={handleNativeShare}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-green-700 hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        aria-label="Share using native share dialog"
        title="Share this article"
      >
        <Share2 size={18} />
      </button>
      <button 
        onClick={() => openShareWindow(facebookShareUrl, 'facebook')}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook size={18} />
      </button>
      <button 
        onClick={() => openShareWindow(twitterShareUrl, 'twitter')}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Twitter size={18} />
      </button>
      {showLinkedIn && (
        <button 
          onClick={() => openShareWindow(linkedinShareUrl, 'linkedin')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </button>
      )}
      <button 
        onClick={handleCopyLink}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        aria-label={copied ? "Link copied!" : "Copy link to clipboard"}
        title={copied ? "Link copied!" : "Copy link to clipboard"}
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>
      <button 
        onClick={handleBookmark}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 shadow-sm hover:shadow-md ${
          bookmarked 
            ? 'bg-yellow-500 text-white shadow-md' 
            : 'bg-gray-100 hover:bg-yellow-500 hover:text-white text-gray-700'
        }`}
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark this article"}
        title={bookmarked ? "Remove bookmark" : "Bookmark this article"}
      >
        <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
      </button>
    </div>
  );

  // Mobile share buttons JSX
  const mobileShareButtons = (
    <div className="flex lg:hidden items-center gap-2 ml-auto">
      <button 
        onClick={handleNativeShare}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-green-700 hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        aria-label="Share using native share dialog"
        title="Share this article"
      >
        <Share2 size={16} />
      </button>
      <button 
        onClick={() => openShareWindow(facebookShareUrl, 'facebook')}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook size={16} />
      </button>
      <button 
        onClick={() => openShareWindow(twitterShareUrl, 'twitter')}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Twitter size={16} />
      </button>
      {showLinkedIn && (
        <button 
          onClick={() => openShareWindow(linkedinShareUrl, 'linkedin')}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </button>
      )}
      <button 
        onClick={handleCopyLink}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        aria-label={copied ? "Link copied!" : "Copy link to clipboard"}
        title={copied ? "Link copied!" : "Copy link to clipboard"}
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );

  return (
    <>
      {showDesktop && desktopShareButtons}
      {showMobile && mobileShareButtons}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}