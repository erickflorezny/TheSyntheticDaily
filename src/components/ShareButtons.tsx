'use client';

import { Facebook, Twitter, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
  slug: string;
  title: string;
  basePath: string;
  size?: number;
  className?: string;
  buttonClassName?: string;
}

export default function ShareButtons({ slug, title, basePath, size = 10, className = '', buttonClassName = '' }: ShareButtonsProps) {
  const getUrl = () => `${window.location.origin}${basePath}/${slug}`;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`, 'facebookShare', 'width=600,height=400');
        }}
        className={buttonClassName || 'w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#1877F2] hover:text-white transition-all duration-200 text-gray-400'}
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook size={size} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}&via=TheSyntheticDaily`, 'twitterShare', 'width=600,height=400');
        }}
        className={buttonClassName || 'w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 text-gray-400'}
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Twitter size={size} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`, 'linkedinShare', 'width=600,height=400');
        }}
        className={buttonClassName || 'w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#0A66C2] hover:text-white transition-all duration-200 text-gray-400'}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin size={size} />
      </button>
    </div>
  );
}
