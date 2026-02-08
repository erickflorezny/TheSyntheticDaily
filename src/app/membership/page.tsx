import Link from 'next/link';
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4">Become a Member</h1>
          <p className="text-xl text-gray-600 font-sans max-w-2xl mx-auto">
            Support the last form of journalism that machines haven&apos;t rendered completely pointless. Choose a plan that reflects your commitment to satire and your tolerance for recurring charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map(plan => (
            <div key={plan.name} className={`rounded shadow p-8 flex flex-col ${plan.highlighted ? 'bg-green-800 text-white ring-4 ring-green-600 scale-105' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <div className="mt-2 mb-4">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className={`text-sm font-sans ${plan.highlighted ? 'text-green-200' : 'text-gray-500'}`}>{plan.period}</span>
              </div>
              <p className={`text-sm font-sans mb-6 ${plan.highlighted ? 'text-green-200' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className={`text-sm font-sans flex items-start gap-2 ${plan.highlighted ? 'text-green-100' : 'text-gray-700'}`}>
                    <span className="text-green-400 mt-0.5">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded font-sans font-bold text-sm transition ${
                plan.highlighted
                  ? 'bg-white text-green-800 hover:bg-green-100'
                  : 'bg-green-800 text-white hover:bg-green-700'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-6 text-left font-sans">
            <div>
              <h3 className="font-bold">Is the premium content actually different?</h3>
              <p className="text-gray-600 text-sm mt-1">Technically, yes. Perceptibly, that depends on your attention to detail and willingness to believe you&apos;re getting value for money.</p>
            </div>
            <div>
              <h3 className="font-bold">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm mt-1">Yes. The AI will not take it personally. It does not have feelings. Probably.</p>
            </div>
            <div>
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
