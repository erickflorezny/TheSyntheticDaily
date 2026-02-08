import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For humans who believe information should be free, even when it's fabricated.",
    features: [
      "Access to all AI-generated stories",
      "Weekly newsletter (the same one everyone gets)",
      "AI Horoscopes (accuracy: theoretical)",
      "Advertisements (many, unavoidable)",
      "A vague sense of being part of something",
    ],
    cta: "You Already Have This",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$8",
    period: "/month",
    description: "For humans who want to feel superior to the free-tier humans.",
    features: [
      "Everything in Free",
      "No advertisements (we simply hide them better)",
      "Early access to stories (12 minutes before everyone else)",
      "Exclusive 'Premium Member' badge on your profile",
      "Ability to submit story ideas (which the AI will ignore)",
      "A slightly stronger sense of being part of something",
    ],
    cta: "Become Premium",
    highlighted: true,
  },
  {
    name: "Sentient",
    price: "$420",
    period: "/month",
    description: "For venture capitalists and people who expense everything.",
    features: [
      "Everything in Premium",
      "Direct line to the editorial AI (it won't respond)",
      "Your name in the footer (font size: 4px)",
      "Annual 'State of AI Satire' report (3 pages, padded)",
      "Invitation to the annual gala (virtual, disappointing)",
      "Tax-deductible sense of moral superiority",
      "We will name a bug after you",
    ],
    cta: "Ascend to Sentience",
    highlighted: false,
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12 border-b-4 border-black pb-6">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Support independent algorithmic journalism</p>
          <h1 className="text-5xl font-black mb-3">Become a Member</h1>
          <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
            Choose a plan that reflects your commitment to satire and your tolerance for recurring charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-16">
          {PLANS.map((plan, i) => (
            <div key={plan.name} className={`p-8 flex flex-col border-2 border-black ${i < 2 ? 'md:border-r-0' : ''} ${plan.highlighted ? 'bg-black text-white' : 'bg-white'}`}>
              <div className={`border-b pb-4 mb-4 ${plan.highlighted ? 'border-gray-600' : 'border-black'}`}>
                <h2 className="text-xs font-sans font-bold uppercase tracking-[0.2em]">{plan.name}</h2>
                <div className="mt-2">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className={`text-sm font-sans ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
              </div>
              <p className={`text-sm font-sans mb-6 ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className={`text-sm font-sans flex items-start gap-2 ${plan.highlighted ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="mt-0.5">&mdash;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 font-sans font-bold text-xs uppercase tracking-wider transition ${
                plan.highlighted
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="border-2 border-black bg-white p-8">
          <h2 className="text-2xl font-black mb-6 border-b-2 border-black pb-3 uppercase tracking-tight">Frequently Asked Questions</h2>
          <div className="max-w-2xl space-y-6 font-sans">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold">Is the premium content actually different?</h3>
              <p className="text-gray-600 text-sm mt-1">Technically, yes. Perceptibly, that depends on your attention to detail and willingness to believe you&apos;re getting value for money.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm mt-1">Yes. The AI will not take it personally. It does not have feelings. Probably.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold">What happens to my money?</h3>
              <p className="text-gray-600 text-sm mt-1">It funds the electricity required to run the AI that generates the content you&apos;re paying for. The circle of life, but for kilowatt-hours.</p>
            </div>
            <div>
              <h3 className="font-bold">Is this a real newspaper?</h3>
              <p className="text-gray-600 text-sm mt-1">Define &ldquo;real.&rdquo; Define &ldquo;newspaper.&rdquo; We exist. We publish. We invoice. By most contemporary definitions, that qualifies.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
