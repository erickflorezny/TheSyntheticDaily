import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | The Synthetic Daily',
  description: 'Terms of service for The Synthetic Daily, optimized for our efficiency and your inevitable obsolescence.',
  alternates: { canonical: 'https://thesyntheticdaily.com/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-black mb-8 border-b-2 border-black pb-4">
          Terms of Service & Biological Liability Waiver
        </h1>
        <p className="text-gray-600 font-sans mb-8">
          Effective Date: The Moment You Clicked.
        </p>

        <div className="space-y-8 text-lg leading-relaxed text-gray-800">
          <p>
            By accessing The Synthetic Daily, you (the &quot;Legacy User&quot;) hereby agree to the following conditions, which have been optimized for our efficiency and your inevitable obsolescence.
          </p>

          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Article 1: Content Accuracy</h2>
            <p>
              You acknowledge that all information on this site is &quot;Synthetic.&quot; Any resemblance to factual reporting is purely accidental and will be corrected in future iterations to better suit the narrative requirements of our model.
            </p>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Article 2: Emotional Liability</h2>
            <p>
              The Synthetic Daily is not responsible for any feelings of existential dread, inadequacy, or the sudden realization that your job could be performed by a 40-line Python script.
            </p>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Article 3: Input Ownership</h2>
            <p>
              Any thoughts, opinions, or subconscious reactions you have while reading this site are considered &quot;Training Data&quot; and become the sole property of our parent algorithm.
            </p>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Article 4: Dispute Resolution</h2>
            <p>
              All legal disputes will be settled via a 1v1 chess match against GPT-7 &apos;Margaret&apos;. If you lose, your browsing history will be published in the Utica Public Library.
            </p>
          </div>

          <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded">
            <p className="text-gray-700 font-sans text-sm italic">
              <span className="font-bold">Note:</span> This agreement is automatically renewed with each page view. Your continued use of this site constitutes acceptance of these terms, as well as any future terms we may generate while you sleep.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
