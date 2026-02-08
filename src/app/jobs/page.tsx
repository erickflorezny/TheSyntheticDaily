import Header from '@/components/Header';
import Footer from '@/components/Footer';

const JOB_LISTINGS = [
  {
    title: "Human Oversight Specialist",
    department: "Editorial",
    location: "Remote (until the AI learns to oversee itself)",
    type: "Full-Time",
    description: "Sit in a room and watch an AI write articles. Intervene if it attempts to publish anything optimistic. No writing skills required \u2014 in fact, they may be a hindrance.",
    requirements: ["Ability to stay awake for 8 hours", "Familiarity with the concept of journalism", "Willingness to feel professionally irrelevant", "Must not be an AI pretending to be human"],
  },
  {
    title: "Prompt Engineer (Senior)",
    department: "Technology",
    location: "San Francisco, CA",
    type: "Full-Time",
    description: "Craft the prompts that tell our AI what to write. This position previously required a journalism degree, a decade of reporting experience, and a Pulitzer Prize. It now requires the ability to type \u2018be funnier\u2019 in various sophisticated ways.",
    requirements: ["BA in anything (or equivalent ChatGPT certification)", "3+ years of asking AI to do things", "Comfort with the phrase \u2018that\u2019s not what I meant\u2019", "Portfolio of successful prompts (screenshots acceptable)"],
  },
  {
    title: "AI Therapist",
    department: "Human Resources (Remaining)",
    location: "Remote",
    type: "Contract",
    description: "Provide emotional support to staff members experiencing existential crises related to their professional obsolescence. Must be comfortable with the question \u2018what\u2019s the point?\u2019 asked repeatedly in various phrasings.",
    requirements: ["Licensed therapist or convincing approximation", "Experience with tech-industry grief cycles", "Must not suggest \u2018learning to code\u2019 as a solution", "Genuine empathy (AI applicants need not apply)"],
  },
  {
    title: "Fact Checker",
    department: "Editorial",
    location: "N/A",
    type: "Volunteer",
    description: "Review AI-generated satirical articles for factual accuracy. This is a largely ceremonial position, as the stories are intentionally false. However, someone needs to ensure they are false in the correct way.",
    requirements: ["Ability to distinguish between \u2018satirically untrue\u2019 and \u2018dangerously untrue\u2019", "Comfort with ambiguity", "No strong opinions about anything", "Immune to existential dread"],
  },
  {
    title: "Chief Revenue Officer",
    department: "Business",
    location: "New York, NY",
    type: "Full-Time",
    description: "Develop and execute revenue strategies for a satirical newspaper that openly mocks the concept of monetization. Must be comfortable selling something that is, by its own admission, essentially a very elaborate joke.",
    requirements: ["10+ years in media revenue (survivors preferred)", "MBA or equivalent capacity for self-delusion", "Track record of monetizing content no one asked for", "High tolerance for irony"],
  },
  {
    title: "Print Edition Operator",
    department: "Production",
    location: "Warehouse, New Jersey",
    type: "Part-Time",
    description: "Operate the printing press that produces our physical newspaper. This role exists solely so we can claim to be a \u2018print publication\u2019 for credibility purposes. The press runs once monthly and produces 200 copies, most of which are used as packaging material.",
    requirements: ["Ability to operate industrial machinery from the 1990s", "Tolerance for the smell of ink", "Does not ask \u2018why are we still doing this?\u2019", "CDL preferred but not required"],
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="border-b-4 border-black pb-4 mb-10">
          <h1 className="text-5xl font-black mb-2">Careers</h1>
          <p className="text-lg text-gray-700 font-sans mb-1">
            Join the team that&apos;s documenting humanity&apos;s slow surrender to artificial intelligence.
          </p>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-wider">
            The Synthetic Daily is an equal-opportunity employer. We discriminate against no one, because our AI hiring system lacks the capacity for prejudice. It rejects everyone equally.
          </p>
        </div>

        <div className="border-2 border-black divide-y-2 divide-black">
          {JOB_LISTINGS.map(job => (
            <div key={job.title} className="bg-white p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-black leading-tight">{job.title}</h2>
                  <div className="flex items-center gap-3 mt-1 font-sans text-xs text-gray-500 uppercase tracking-wider">
                    <span>{job.department}</span>
                    <span>&middot;</span>
                    <span>{job.location}</span>
                    <span>&middot;</span>
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 font-sans text-sm mb-4 leading-relaxed">{job.description}</p>
              <div className="mb-4">
                <h3 className="font-bold font-sans text-[10px] uppercase tracking-[0.2em] mb-2">Requirements</h3>
                <ul className="space-y-1 text-gray-600 font-sans text-sm">
                  {job.requirements.map(req => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="text-gray-400">&mdash;</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="bg-black text-white px-6 py-2 font-sans font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 border-2 border-black p-6 text-center">
          <p className="text-gray-500 font-sans text-xs">
            Don&apos;t see a role that fits? That&apos;s because the AI is handling everything else.
            Check back when it inevitably breaks down and we need humans again.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
