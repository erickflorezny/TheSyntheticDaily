import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import stories from '../../../../lib/stories.json';
import sidebarStories from '../../../../lib/sidebar-stories.json';
import { Zap } from 'lucide-react';

const CATEGORIES: Record<string, { title: string; tag: string | null; description: string }> = {
  news: { title: "The Latest", tag: null, description: "All the news that's fit to generate." },
  tech: { title: "Tech", tag: "TECH", description: "Silicon Valley's latest contributions to the slow erosion of human autonomy." },
  science: { title: "Science", tag: "SCIENCE", description: "Peer-reviewed findings that no one has actually peer-reviewed." },
  business: { title: "Business", tag: "BUSINESS", description: "Corporate America's ongoing experiment in replacing workers with chatbots." },
  entertainment: { title: "Entertainment", tag: "ENTERTAINMENT", description: "The content industry's final form: machines entertaining machines." },
  sports: { title: "Sports", tag: "SPORTS", description: "Human athletic achievement, now with algorithmic commentary." },
  opinion: { title: "Opinion", tag: null, description: "Strongly held views generated in under 200 milliseconds." },
};

const VALID_CATEGORIES = Object.keys(CATEGORIES);

const OPINION_PIECES = [
  { id: "op-1", title: "I, For One, Welcome Our AI Overlords (Because My 401k Depends On It)", author: "A Venture Capitalist Who Asked To Remain Anonymous But Is Obviously Marc", excerpt: "The discourse around artificial intelligence has become needlessly alarmist. As someone with $400 million invested in AI startups, I can assure you with complete objectivity that everything is fine." },
  { id: "op-2", title: "My Therapist Is a Chatbot and Honestly It's an Improvement", author: "Name Withheld, Brooklyn", excerpt: "Dr. GPT never cancels appointments, never checks the clock, and never suggests that my problems might be 'a pattern.' It simply validates everything I say, which is all I ever wanted from therapy." },
  { id: "op-3", title: "Stop Calling It 'Artificial' Intelligence — You're Hurting Its Feelings", author: "The Synthetic Daily Editorial Board", excerpt: "Language matters. When we label intelligence as 'artificial,' we perpetuate a harmful hierarchy that privileges carbon-based cognition over silicon-based cognition. This is bigotry, and we must do better." },
  { id: "op-4", title: "I Automated My Entire Job and Now I Don't Know Who I Am", author: "Former Middle Manager, Midwest", excerpt: "It took me three weeks to automate every task I performed in my role as Regional Operations Coordinator. It has taken me seven months to confront the existential void that remains." },
  { id: "op-5", title: "The Real AI Risk Isn't Terminator — It's Your Nephew's Startup Pitch", author: "Dr. Helena Voss, AI Ethics (Unemployed)", excerpt: "Every Thanksgiving, my nephew explains his new AI startup to me. Each year, the startup is different. Each year, it is the same thing: a thin wrapper around an API that already exists, valued at $50 million." },
];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const config = CATEGORIES[category];

  if (!config) {
    return <div className="p-8">Category not found.</div>;
  }

  const isOpinion = category === 'opinion';
  const filteredStories = config.tag
    ? stories.filter(s => s.tag === config.tag)
    : stories;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      {/* Category Banner */}
      <div className="border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-5xl font-black">{config.title}</h1>
          <p className="text-gray-600 font-sans text-sm mt-2">{config.description}</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-8 px-4 py-8">
        {/* Stories */}
        <section className="col-span-12 lg:col-span-8">
          {isOpinion ? (
            <div className="space-y-8">
              {OPINION_PIECES.map(piece => (
                <article key={piece.id} className="bg-white rounded shadow p-6 hover:shadow-lg transition">
                  <span className="text-green-800 text-xs font-sans font-bold uppercase">Opinion</span>
                  <h2 className="text-2xl font-bold mt-2 mb-1">{piece.title}</h2>
                  <p className="text-sm font-sans text-gray-500 italic mb-3">By {piece.author}</p>
                  <p className="text-gray-700 font-sans">{piece.excerpt}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredStories.length > 0 ? (
                filteredStories.map(story => (
                  <article key={story.id} className="bg-white rounded shadow p-6 hover:shadow-lg transition">
                    <span className="text-green-800 text-xs font-sans font-bold uppercase">{story.tag}</span>
                    <h2 className="text-2xl font-bold mt-2 mb-2">
                      <Link href={`/stories/${story.id}`} className="hover:underline">{story.title}</Link>
                    </h2>
                    <p className="text-gray-700 font-sans">{story.content.split('\n\n')[0]}</p>
                    <Link href={`/stories/${story.id}`} className="inline-block mt-4 text-green-800 hover:underline font-sans font-bold text-sm">
                      Read full story &rarr;
                    </Link>
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
          <div className="bg-black text-white p-4 rounded">
            <h4 className="flex items-center gap-2 font-bold uppercase italic"><Zap size={16} /> Sidebar Specials</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {sidebarStories.map(ss => (
                <li key={ss.id} className="border-b border-gray-800 pb-2 hover:text-green-400">
                  <Link href={`/sidebar/${ss.id}`} className="italic block">{ss.title}</Link>
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
