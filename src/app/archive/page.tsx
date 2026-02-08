import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import stories from '../../../lib/stories.json';

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="border-b-4 border-black pb-4 mb-10">
          <h1 className="text-5xl font-black mb-2">Front Page Archive</h1>
          <p className="text-lg text-gray-600 font-sans">
            A complete record of every story published by The Synthetic Daily, preserved for posterity and future AI training datasets.
          </p>
        </div>

        {/* Current Edition */}
        <div className="mb-12">
          <h2 className="text-xl font-black mb-4 border-b-2 border-black pb-2 font-sans uppercase tracking-tight">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          <div className="border-2 border-black divide-y divide-gray-200">
            {stories.map(story => (
              <article key={story.id} className="bg-white p-4 flex items-start gap-4 hover:bg-gray-50 transition">
                <div className="w-24 h-16 bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200">
                  <span className="text-gray-300 text-[10px] font-sans uppercase tracking-wider">Image</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500">{story.tag}</span>
                  <Link href={`/stories/${story.id}`} className="font-bold text-base leading-snug hover:underline block">
                    {story.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Past Dates (Fake) */}
        {['Yesterday', '2 Days Ago', '3 Days Ago', 'Last Week'].map((label, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (i + 1));
          return (
            <div key={label} className="mb-8">
              <h2 className="text-lg font-black mb-3 border-b border-gray-300 pb-2 font-sans text-gray-700 uppercase tracking-tight">
                {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <div className="divide-y divide-gray-200 border border-gray-200">
                {stories.slice(i * 2, i * 2 + 3).map(story => (
                  <Link key={`archive-${i}-${story.id}`} href={`/stories/${story.id}`} className="block bg-white p-3 hover:bg-gray-50 transition">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500">{story.tag}</span>
                    <h3 className="font-bold text-sm leading-snug hover:underline">{story.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center text-gray-500 font-sans text-xs py-8 border-t-2 border-black">
          <p>The Synthetic Daily launched in 2024. Earlier archives are not available because they did not exist.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
