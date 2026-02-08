import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import stories from '../../../lib/stories.json';

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-4">Front Page Archive</h1>
        <p className="text-xl text-gray-600 font-sans mb-12">
          A complete record of every story published by The Synthetic Daily, preserved for posterity and future AI training datasets.
        </p>

        {/* Current Edition */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2 font-sans">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          <div className="space-y-4">
            {stories.map(story => (
              <article key={story.id} className="bg-white rounded shadow p-4 flex items-start gap-4">
                <div className="w-24 h-16 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-500 text-[10px] font-sans">Image</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-800 text-[10px] font-sans font-bold uppercase">{story.tag}</span>
                  </div>
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
              <h2 className="text-xl font-bold mb-3 border-b border-gray-300 pb-2 font-sans text-gray-700">
                {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <div className="space-y-2">
                {stories.slice(i * 2, i * 2 + 3).map(story => (
                  <Link key={`archive-${i}-${story.id}`} href={`/stories/${story.id}`} className="block bg-white rounded shadow p-3 hover:shadow-md transition">
                    <span className="text-green-800 text-[10px] font-sans font-bold uppercase">{story.tag}</span>
                    <h3 className="font-bold text-sm leading-snug hover:underline">{story.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center text-gray-500 font-sans text-sm py-8 border-t border-gray-300">
          <p>The Synthetic Daily launched in 2024. Earlier archives are not available because they did not exist.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
