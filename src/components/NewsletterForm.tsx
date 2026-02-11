'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
  onSuccess?: () => void;
  className?: string;
}

export default function NewsletterForm({ variant = 'light', onSuccess, className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Subscription confirmed. Your compliance has been noted.');
        setEmail('');
        onSuccess?.();
      } else if (res.status === 409) {
        setStatus('error');
        setMessage('Already subscribed. Your enthusiasm has been logged.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div className={className}>
        <p className={`text-sm font-sans font-bold ${isDark ? 'text-green-400' : 'text-green-800'}`}>
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className={`border-2 ${isDark ? 'border-white' : 'border-black'} p-1 flex`}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your electronic mail address"
            required
            className={`flex-1 px-3 py-2 bg-transparent text-sm font-sans focus:outline-none min-w-0 ${
              isDark
                ? 'text-white placeholder-gray-500'
                : 'text-gray-900 placeholder-gray-400'
            }`}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`px-5 py-2 text-[10px] font-bold uppercase tracking-wider transition shrink-0 disabled:opacity-50 ${
              isDark
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {status === 'loading' ? 'Sending...' : 'Subscribe'}
          </button>
        </div>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-xs font-sans mt-2">{message}</p>
      )}
    </div>
  );
}
