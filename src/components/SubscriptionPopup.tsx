'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function SubscriptionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [dateStr, setDateStr] = useState('');

  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already subscribed or dismissed
      const hasDismissed = localStorage.getItem('subscriptionPopupDismissed');
      const hasSubscribed = localStorage.getItem('hasSubscribed');

      if (!hasDismissed && !hasSubscribed) {
        setIsVisible(true);
      }

      setDateStr(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('subscriptionPopupDismissed', 'true');
  };

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitStatus === 'loading') return;

    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus('success');
        localStorage.setItem('hasSubscribed', 'true');
        setTimeout(() => setIsVisible(false), 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-white text-gray-900 font-serif max-w-lg w-full shadow-2xl border-2 border-black overflow-y-auto max-h-[85vh]">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="sticky top-0 right-0 float-right z-10 text-gray-400 hover:text-black transition p-2 bg-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Masthead */}
        <div className="border-b-4 border-black px-6 pt-2 pb-4 text-center clear-both">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-500 mb-1">A special notice from</p>
          <h3 className="text-3xl font-black italic tracking-tighter leading-none">The Synthetic Daily</h3>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-px flex-1 bg-black" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-600">Newsletter Division</span>
            <span className="h-px flex-1 bg-black" />
          </div>
        </div>

        {/* Headline */}
        <div className="px-8 pt-6 pb-4 border-b border-gray-300">
          <h4 className="text-2xl font-black leading-tight text-center">
            You Have Been Selected for Informational Compliance
          </h4>
          <p className="text-center text-gray-500 text-xs font-sans mt-2 uppercase tracking-wider">
            Vol. CXLI &middot; Mandatory Edition{dateStr ? <> &middot; {dateStr}</> : null}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-5">
          <p className="text-base leading-relaxed text-gray-800 mb-1">
            Our behavioral analysis unit has determined, with 97.3% confidence, that you are the type of person who reads things on the internet and then feels something about it.
          </p>
          <p className="text-base leading-relaxed text-gray-800">
            The Synthetic Daily newsletter delivers algorithmically curated dispatches directly to your inbox, where they will sit unread for 4&ndash;7 business days before being opened in a moment of mild guilt.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-6">
          {submitStatus === 'success' ? (
            <p className="text-green-800 font-sans font-bold text-sm py-4">
              Subscription confirmed. Your compliance has been noted.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="border-2 border-black p-1 flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your electronic mail address"
                  className="flex-1 px-4 py-3 text-sm font-sans focus:outline-none bg-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 font-sans font-bold text-xs uppercase tracking-wider transition whitespace-nowrap disabled:opacity-50"
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Subscribe'}
                </button>
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-xs font-sans mt-2">{errorMessage}</p>
              )}

              <p className="text-gray-400 text-[10px] font-sans mt-3 leading-relaxed">
                By subscribing you agree to our Terms of Informational Surrender and acknowledge that your reading
                habits, scroll velocity, and moments of hesitation will be monitored for content optimization purposes.
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t-2 border-black px-8 py-3 flex items-center justify-between">
          <p className="text-gray-500 text-[10px] font-sans uppercase tracking-wider">
            This notice will recur until compliance is achieved.
          </p>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-black text-[10px] font-sans font-bold uppercase tracking-wider transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}