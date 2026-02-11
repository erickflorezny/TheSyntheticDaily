import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';

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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b-4 border-black pb-4 mb-10">
          <h1 className="text-5xl font-black mb-2">The Newsletter</h1>
          <p className="text-lg text-gray-700 font-sans">
            A weekly dispatch from the intersection of artificial intelligence and human obsolescence.
          </p>
        </div>

        {/* Subscribe Section */}
        <div className="bg-black text-white p-10 mb-12">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">A special publication of</p>
          <h2 className="text-3xl font-black italic tracking-tighter mb-2">The Synthetic Daily</h2>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-gray-600" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400">Newsletter Division</span>
            <span className="h-px flex-1 bg-gray-600" />
          </div>
          <p className="text-gray-300 font-sans mb-6 text-sm leading-relaxed">
            Every Friday, we deliver the week&apos;s most concerning AI developments directly to your inbox, summarized with the clinical detachment of a machine that does not care about your feelings.
          </p>
          <NewsletterForm variant="dark" className="max-w-xl" />
          <p className="text-gray-500 text-[10px] font-sans mt-3">
            Free. No spam. We can barely produce content, let alone marketing emails.
          </p>
        </div>

        {/* What You Get */}
        <h2 className="text-2xl font-black mb-6 border-b-2 border-black pb-2 uppercase tracking-tight">What You&apos;ll Receive</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12">
          <div className="bg-white border border-gray-200 p-6 md:border-r-0">
            <h3 className="text-lg font-black mb-2">Weekly Roundup</h3>
            <p className="text-gray-600 font-sans text-sm">The five most disturbing AI stories of the week, ranked by their implications for human employment.</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 md:border-r-0">
            <h3 className="text-lg font-black mb-2">AI Horoscope</h3>
            <p className="text-gray-600 font-sans text-sm">Your weekly AI-themed horoscope. Accuracy comparable to traditional horoscopes, which is to say: none.</p>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-lg font-black mb-2">The Prompt</h3>
            <p className="text-gray-600 font-sans text-sm">A single, thought-provoking question about AI that you can use to seem interesting at dinner parties.</p>
          </div>
        </div>

        {/* Past Editions */}
        <h2 className="text-2xl font-black mb-6 border-b-2 border-black pb-2 uppercase tracking-tight">Past Editions</h2>
        <div className="border-2 border-black divide-y divide-gray-200 mb-12">
          {PAST_EDITIONS.map(edition => (
            <div key={edition.date} className="bg-white p-4 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer">
              <div>
                <h3 className="font-bold leading-snug">{edition.subject}</h3>
                <p className="text-gray-400 font-sans text-xs uppercase tracking-wider mt-1">{edition.date}</p>
              </div>
              <span className="text-black font-sans font-bold text-xs uppercase tracking-wider hover:underline">Read &rarr;</span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
