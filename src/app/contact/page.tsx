'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SUBJECT_OPTIONS = [
  'Story Tip / Lead',
  'Correction Request',
  'Advertising Inquiry',
  'Licensing & Syndication',
  'General Feedback',
  'Cease & Desist (We Get It)',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <span className="bg-green-800 text-white px-3 py-1 text-xs font-sans font-bold uppercase tracking-wide">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] mt-4">
            Reach The Newsroom
          </h1>
          <p className="mt-4 text-lg text-gray-600 font-sans leading-relaxed">
            Have a story tip? Spotted an AI doing something it shouldn&apos;t? Want to inform us that satire is &ldquo;not helpful&rdquo;?
            We read every submission. A human reads it first. Then an AI summarizes what the human thought. Then the human is let go.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 font-sans text-sm">
          <div className="border-l-2 border-green-800 pl-4">
            <p className="font-bold uppercase text-xs tracking-wide text-gray-500 mb-1">Editorial</p>
            <p className="text-gray-800">tips@thesyntheticdaily.com</p>
          </div>
          <div className="border-l-2 border-green-800 pl-4">
            <p className="font-bold uppercase text-xs tracking-wide text-gray-500 mb-1">Advertising</p>
            <p className="text-gray-800">ads@thesyntheticdaily.com</p>
          </div>
          <div className="border-l-2 border-green-800 pl-4">
            <p className="font-bold uppercase text-xs tracking-wide text-gray-500 mb-1">Legal</p>
            <p className="text-gray-800">legal@thesyntheticdaily.com</p>
          </div>
        </div>

        {/* Success State */}
        {status === 'success' ? (
          <div className="border-2 border-black bg-white p-8 text-center">
            <div className="text-green-800 mb-4">
              <Send size={40} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-black mb-2">Submission Received</h2>
            <p className="text-gray-600 font-sans mb-6">
              Your message has been logged, categorized, and assigned a priority score by an algorithm that does not care about you personally. Someone will follow up if the model deems it &ldquo;actionable.&rdquo;
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="bg-green-800 text-white px-6 py-3 font-sans font-bold text-sm hover:bg-green-900 transition"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="border-2 border-black bg-white">
            <div className="bg-black text-white px-6 py-4">
              <h2 className="font-bold font-sans uppercase text-sm tracking-wide">Submit a Message</h2>
            </div>

            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-sans font-bold uppercase tracking-wide text-gray-500 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full legal name (or alias, we don't judge)"
                  className="w-full border-2 border-gray-200 px-4 py-3 font-sans text-sm focus:border-black focus:outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-sans font-bold uppercase tracking-wide text-gray-500 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full border-2 border-gray-200 px-4 py-3 font-sans text-sm focus:border-black focus:outline-none transition"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-sans font-bold uppercase tracking-wide text-gray-500 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full border-2 border-gray-200 px-4 py-3 font-sans text-sm focus:border-black focus:outline-none transition bg-white"
                >
                  <option value="">Select a reason for contact</option>
                  {SUBJECT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-sans font-bold uppercase tracking-wide text-gray-500 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  maxLength={5000}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's on your mind. Be specific. The AI that pre-screens these has a short context window."
                  className="w-full border-2 border-gray-200 px-4 py-3 font-sans text-sm focus:border-black focus:outline-none transition resize-y"
                />
                <p className="text-xs text-gray-400 font-sans mt-1 text-right">{form.message.length}/5,000</p>
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm font-sans">
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-green-800 text-white py-3 font-sans font-bold text-sm uppercase tracking-wide hover:bg-green-900 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send size={14} />
                    Submit
                  </>
                )}
              </button>
            </div>

            <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
              <p className="text-[10px] text-gray-400 font-sans">
                By submitting this form you acknowledge that your message will be stored, processed, and potentially used to train a model that writes better apology emails than you do.
                See our <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
              </p>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
