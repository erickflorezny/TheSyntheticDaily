import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PAST_EDITIONS = [
  { date: "February 5, 2026", subject: "Your Weekly Dose of Algorithmically Curated Dread" },
  { date: "January 29, 2026", subject: "This Week in AI: Everything Is Fine (It Is Not Fine)" },
  { date: "January 22, 2026", subject: "Breaking: Your Job Has Been Automated While You Read This" },
  { date: "January 15, 2026", subject: "The Newsletter Your AI Already Read For You" },
  { date: "January 8, 2026", subject: "New Year, New Existential Threats to Human Relevance" },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-4">The Newsletter</h1>
        <p className="text-xl text-gray-600 mb-12 font-sans">
          A weekly dispatch from the intersection of artificial intelligence and human obsolescence.
        </p>

        {/* Subscribe Section */}
        <div className="bg-green-800 text-white p-10 rounded mb-12">
          <h2 className="text-3xl font-black mb-2">Subscribe to The Synthetic Daily</h2>
          <p className="text-green-200 font-sans mb-6">
            Every Friday, we deliver the week&apos;s most concerning AI developments directly to your inbox, summarized with the clinical detachment of a machine that does not care about your feelings.
          </p>
          <div className="flex gap-2 max-w-xl">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-1 px-4 py-3 bg-transparent border border-green-600 text-white text-sm font-sans placeholder-green-400 focus:outline-none focus:border-white rounded"
            />
            <button className="bg-white text-green-800 px-8 py-3 text-sm font-sans font-bold hover:bg-green-100 transition rounded">
              Subscribe
            </button>
          </div>
          <p className="text-green-400 text-xs font-sans mt-3">
            Free. No spam. We can barely produce content, let alone marketing emails.
          </p>
        </div>

        {/* What You Get */}
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-black pb-2">What You&apos;ll Receive</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-bold mb-2">Weekly Roundup</h3>
            <p className="text-gray-600 font-sans text-sm">The five most disturbing AI stories of the week, ranked by their implications for human employment.</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-bold mb-2">AI Horoscope</h3>
            <p className="text-gray-600 font-sans text-sm">Your weekly AI-themed horoscope. Accuracy comparable to traditional horoscopes, which is to say: none.</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-bold mb-2">The Prompt</h3>
            <p className="text-gray-600 font-sans text-sm">A single, thought-provoking question about AI that you can use to seem interesting at dinner parties.</p>
          </div>
        </div>

        {/* Past Editions */}
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-black pb-2">Past Editions</h2>
        <ul className="space-y-4 mb-12">
          {PAST_EDITIONS.map(edition => (
            <li key={edition.date} className="bg-white rounded shadow p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold">{edition.subject}</h3>
                <p className="text-gray-500 font-sans text-sm">{edition.date}</p>
              </div>
              <span className="text-green-800 font-sans font-bold text-sm hover:underline cursor-pointer">Read &rarr;</span>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
