import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TrendingUp } from 'lucide-react';
import { storiesService } from '@/lib/services/stories';
import { OPINION_PIECES } from '@/lib/data/opinion-pieces';

const CATEGORIES: Record<string, { title: string; tag: string | null; description: string }> = {
  news: { title: "The Latest", tag: null, description: "All the news that's fit to generate." },
  tech: { title: "Tech", tag: "TECH", description: "Silicon Valley's latest contributions to the slow erosion of human autonomy." },
  science: { title: "Science", tag: "SCIENCE", description: "Peer-reviewed findings that no one has actually peer-reviewed." },
  business: { title: "Business", tag: "BUSINESS", description: "Corporate America's ongoing experiment in replacing workers with chatbots." },
  entertainment: { title: "Entertainment", tag: "ENTERTAINMENT", description: "The content industry's final form: machines entertaining machines." },
  sports: { title: "Sports", tag: "SPORTS", description: "Human athletic achievement, now with algorithmic commentary." },
  opinion: { title: "Opinion", tag: null, description: "Strongly held views generated in under 200 milliseconds." },
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const config = CATEGORIES[category];
  if (!config) return { title: 'Not Found | The Synthetic Daily' };
  return {
    title: `${config.title} | The Synthetic Daily`,
    description: config.description,
    alternates: { canonical: `https://thesyntheticdaily.com/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const config = CATEGORIES[category];

  if (!config) {
    return <div className="p-8">Category not found.</div>;
  }

  const isOpinion = category === 'opinion';
  const allStories = await storiesService.getAllStories();
  const filteredStories = config.tag
    ? allStories.filter(s => s.tag === config.tag)
    : allStories;
  const sidebarStories = await storiesService.getRandomStories(4);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      {/* Category Banner */}
      <div className="border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-5xl font-black">{config.title}</h1>
          <p className="text-gray-600 font-sans text-sm mt-2">{config.description}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Stories */}
        <section className="col-span-12 lg:col-span-8">
          {isOpinion ? (
            <div className="space-y-8">
              {OPINION_PIECES.map(piece => (
                <Link key={piece.id} href={`/opinion/${piece.slug}`} className="block">
                  <article className="bg-white rounded shadow p-6 hover:shadow-lg transition cursor-pointer flex gap-6">
                    {piece.image && (
                      <div className="relative w-48 min-h-[120px] flex-shrink-0 hidden md:block">
                        <Image
                          src={piece.image}
                          alt={piece.title}
                          fill
                          className="object-cover rounded"
                          sizes="192px"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-green-800 text-xs font-sans font-bold uppercase">Opinion</span>
                      <h2 className="text-2xl font-bold mt-2 mb-1 hover:underline">{piece.title}</h2>
                      <p className="text-sm font-sans text-gray-500 italic mb-3">By {piece.author}</p>
                      <p className="text-gray-700 font-sans">{piece.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredStories.length > 0 ? (
                filteredStories.map(story => (
                  <article key={story.id} className="bg-white rounded shadow p-6 hover:shadow-lg transition flex gap-6">
                    {story.image && (
                      <div className="relative w-48 min-h-[120px] flex-shrink-0 hidden md:block">
                        <Image
                          src={story.image}
                          alt={story.title}
                          fill
                          className="object-cover rounded"
                          sizes="192px"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-green-800 text-xs font-sans font-bold uppercase">{story.tag}</span>
                      <h2 className="text-2xl font-bold mt-2 mb-2">
                        <Link href={`/stories/${story.slug}`} className="hover:underline">{story.title}</Link>
                      </h2>
                      <p className="text-gray-700 font-sans">{story.excerpt}</p>
                      <Link href={`/stories/${story.slug}`} className="inline-block mt-4 text-green-800 hover:underline font-sans font-bold text-sm">
                        Read full story &rarr;
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <div className="bg-white rounded shadow p-8 text-center">
                  <p className="text-gray-500 font-sans">No stories in this category yet. The AI is still working on it.</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 font-sans space-y-8">
          <div className="bg-white border border-gray-200 p-4">
            <h4 className="flex items-center gap-2 font-bold uppercase text-sm tracking-wide text-green-800"><TrendingUp size={16} /> Trending</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {sidebarStories.map(ss => (
                <li key={ss.id} className="border-b border-gray-800 pb-2 hover:text-green-400">
                  <Link href={`/stories/${ss.slug}`} className="italic block">&ldquo;{ss.title}&rdquo;</Link>
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
