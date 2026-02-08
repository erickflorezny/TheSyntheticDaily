'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Bot } from 'lucide-react';

export default function SubscriptionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already subscribed or dismissed
      const hasDismissed = localStorage.getItem('subscriptionPopupDismissed');
      const hasSubscribed = localStorage.getItem('hasSubscribed');
      
      if (!hasDismissed && !hasSubscribed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('subscriptionPopupDismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim()) {
      // In a real app, you would send this to your email service
      console.log('Subscribed email:', email);
      localStorage.setItem('hasSubscribed', 'true');
      setIsVisible(false);
      
      // Show success message (you could add a toast here)
      alert('Subscription recorded. Your compliance has been noted.');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-[#f9f9f9] text-gray-900 font-serif max-w-md w-full rounded-lg shadow-2xl border border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="bg-green-800 text-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black">Algorithmic Prediction</h3>
                <p className="text-green-200 text-sm font-sans">Synthetic Intelligence Division</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-green-300 hover:text-white transition p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Prediction Meter */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-sans font-bold text-sm text-gray-700">Enjoyment Probability</span>
              <span className="font-sans font-black text-2xl text-green-800">84%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div 
                className="bg-green-800 h-3 rounded-full transition-all duration-1000"
                style={{ width: '84%' }}
              />
            </div>
            <p className="text-gray-600 text-xs font-sans mt-2">
              Based on 12,847 data points including scroll velocity and hesitation patterns.
            </p>
          </div>

          {/* Message */}
          <div className="mb-6">
            <p className="text-lg leading-relaxed">
              Our algorithm predicts you are <span className="font-bold text-green-800">84% likely</span> to enjoy our newsletter. 
              Sign up now to avoid being replaced by a reader who is more compliant.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded text-sm font-sans focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded font-sans font-bold text-sm transition whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>

            <p className="text-gray-500 text-xs font-sans">
              By subscribing, you agree to our{' '}
              <a href="/terms" className="text-green-800 hover:underline font-bold">
                Terms of Service & Biological Liability Waiver
              </a>
              {' '}and acknowledge that your reading habits will be analyzed for optimization purposes.
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 border-t border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-xs font-sans">
              <span className="font-bold">Note:</span> This popup will reappear every 24 hours until compliance is achieved.
            </p>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-xs font-sans font-bold transition"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}