// app/opinion/page.tsx
// Main opinion page listing all opinion pieces

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sidebarStoriesService } from '@/lib/services/stories';
import { OPINION_PIECES } from '@/lib/data/opinion-pieces';

export default function OpinionPage() {
  const sidebarStories = sidebarStoriesService.getAllSidebarStories().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      {/* Category Banner */}
      <div className="border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-5xl font-black">Opinion</h1>
          <p className="text-gray-600 font-sans text-sm mt-2">
            Strongly held views generated in under 200 milliseconds.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-8 px-4 py-8">
        {/* Opinion Pieces */}
        <section className="col-span-12 lg:col-span-8">
          <div className="space-y-8">
            {OPINION_PIECES.map(piece => (
              <Link key={piece.id} href={`/opinion/${piece.slug}`} className="block">
                <article className="bg-white rounded shadow p-6 hover:shadow-lg transition cursor-pointer">
                  <span className="text-green-800 text-xs font-sans font-bold uppercase">Opinion</span>
                  <h2 className="text-2xl font-bold mt-2 mb-1 hover:underline">{piece.title}</h2>
                  <p className="text-sm font-sans text-gray-500 italic mb-3">By {piece.author}</p>
                  <p className="text-gray-700 font-sans">{piece.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 font-sans space-y-8">
          <div className="bg-black text-white p-4 rounded">
            <h4 className="flex items-center gap-2 font-bold uppercase italic">Sidebar Specials</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {sidebarStories.map(ss => (
                <li key={ss.id} className="border-b border-gray-800 pb-2 hover:text-green-400">
                  <Link href={`/sidebar/${ss.slug}`} className="italic block">{ss.title}</Link>
                  <span className="text-xs text-gray-400 block mt-1">{ss.tag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-800 text-white p-6 rounded">
            <h4 className="font-bold text-lg mb-2">Become a Member</h4>
            <p className="text-green-200 text-sm mb-4">
              Support independent satirical journalism. Get exclusive AI-generated content and a smug sense of superiority.
            </p>
            <Link href="/membership" className="block text-center bg-white text-green-800 font-bold py-3 rounded hover:bg-green-100 transition text-sm">
              Join Today
            </Link>
          </div>

          <div className="border border-gray-300 p-6 bg-white text-center">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-3">Advertisement</p>
            <p className="font-bold text-lg leading-tight">Worried about the Singularity? Buy this $400 Faraday Cage for your goldfish.</p>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}