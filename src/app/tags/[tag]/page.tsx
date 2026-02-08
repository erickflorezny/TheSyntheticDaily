import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import stories from '../../../../lib/stories.json';
import sidebarStories from '../../../../lib/sidebar-stories.json';

const EXPLORE_TAGS = [
  "Artificial Intelligence", "Machine Learning", "Silicon Valley", "Venture Capital",
  "Automation", "ChatGPT", "Big Tech", "Surveillance", "Algorithms", "Data Privacy",
  "Robotics", "Crypto", "Metaverse", "Smart Devices", "Neural Networks",
];

function slugify(tag: string) {
  return tag.toLowerCase().replace(/ /g, '-');
}

export async function generateStaticParams() {
  return EXPLORE_TAGS.map((tag) => ({ tag: slugify(tag) }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const tagName = EXPLORE_TAGS.find(t => slugify(t) === tag) || tag.replace(/-/g, ' ');

  const matchingStories = stories.filter(s =>
    s.title.toLowerCase().includes(tag.replace(/-/g, ' ')) ||
    s.content.toLowerCase().includes(tag.replace(/-/g, ' '))
  );

  const matchingSidebar = sidebarStories.filter(s =>
    s.title.toLowerCase().includes(tag.replace(/-/g, ' ')) ||
    s.content.toLowerCase().includes(tag.replace(/-/g, ' '))
  );

  const allMatches = [
    ...matchingStories.map(s => ({ ...s, type: 'story' as const })),
    ...matchingSidebar.map(s => ({ ...s, type: 'sidebar' as const })),
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <div className="border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-green-800 text-xs font-sans font-bold uppercase tracking-wider mb-2">Explore Tag</p>
          <h1 className="text-5xl font-black capitalize">{tagName}</h1>
          <p className="text-gray-600 font-sans text-sm mt-2">
            {allMatches.length} {allMatches.length === 1 ? 'story' : 'stories'} tagged with &ldquo;{tagName}&rdquo;
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {allMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMatches.map(item => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.type === 'story' ? `/stories/${item.id}` : `/sidebar/${item.id}`}
                className="group bg-white rounded shadow hover:shadow-lg transition"
              >
                <div className="w-full aspect-[16/10] bg-gray-300 flex items-center justify-center rounded-t">
                  <span className="text-gray-500 font-sans text-xs">Image</span>
                </div>
                <div className="p-4">
                  <span className="text-green-800 text-[10px] font-sans font-bold uppercase">{item.tag}</span>
                  <h3 className="text-base font-bold mt-1 leading-snug group-hover:underline">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-sans mt-2">{item.content.split('\n\n')[0].substring(0, 120)}...</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded shadow p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">No Stories Found</h2>
            <p className="text-gray-600 font-sans mb-2">
              Our AI-powered content generation pipeline has not yet produced stories on this topic.
            </p>
            <p className="text-gray-500 font-sans text-sm">
              This is either a temporary gap in coverage or evidence that even machines find some subjects too boring to write about.
            </p>
            <Link href="/stories" className="inline-block mt-6 text-green-800 hover:underline font-sans font-bold">
              Browse all stories &rarr;
            </Link>
          </div>
        )}

        {/* All Tags */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4 font-sans border-b-2 border-black pb-2">All Tags</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {EXPLORE_TAGS.map(t => (
              <Link
                key={t}
                href={`/tags/${slugify(t)}`}
                className={`px-3 py-1 border text-sm font-sans transition rounded-full ${
                  slugify(t) === tag
                    ? 'bg-green-800 text-white border-green-800'
                    : 'border-gray-300 text-gray-700 hover:bg-green-800 hover:text-white hover:border-green-800'
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
