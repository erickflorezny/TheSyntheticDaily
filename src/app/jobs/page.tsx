import Header from '@/components/Header';
import Footer from '@/components/Footer';

const JOB_LISTINGS = [
  {
    title: "Human Oversight Specialist",
    department: "Editorial",
    location: "Remote (until the AI learns to oversee itself)",
    type: "Full-Time",
    description: "Sit in a room and watch an AI write articles. Intervene if it attempts to publish anything optimistic. No writing skills required — in fact, they may be a hindrance.",
    requirements: ["Ability to stay awake for 8 hours", "Familiarity with the concept of journalism", "Willingness to feel professionally irrelevant", "Must not be an AI pretending to be human"],
  },
  {
    title: "Prompt Engineer (Senior)",
    department: "Technology",
    location: "San Francisco, CA",
    type: "Full-Time",
    description: "Craft the prompts that tell our AI what to write. This position previously required a journalism degree, a decade of reporting experience, and a Pulitzer Prize. It now requires the ability to type 'be funnier' in various sophisticated ways.",
    requirements: ["BA in anything (or equivalent ChatGPT certification)", "3+ years of asking AI to do things", "Comfort with the phrase 'that's not what I meant'", "Portfolio of successful prompts (screenshots acceptable)"],
  },
  {
    title: "AI Therapist",
    department: "Human Resources (Remaining)",
    location: "Remote",
    type: "Contract",
    description: "Provide emotional support to staff members experiencing existential crises related to their professional obsolescence. Must be comfortable with the question 'what's the point?' asked repeatedly in various phrasings.",
    requirements: ["Licensed therapist or convincing approximation", "Experience with tech-industry grief cycles", "Must not suggest 'learning to code' as a solution", "Genuine empathy (AI applicants need not apply)"],
  },
  {
    title: "Fact Checker",
    department: "Editorial",
    location: "N/A",
    type: "Volunteer",
    description: "Review AI-generated satirical articles for factual accuracy. This is a largely ceremonial position, as the stories are intentionally false. However, someone needs to ensure they are false in the correct way.",
    requirements: ["Ability to distinguish between 'satirically untrue' and 'dangerously untrue'", "Comfort with ambiguity", "No strong opinions about anything", "Immune to existential dread"],
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
    description: "Operate the printing press that produces our physical newspaper. This role exists solely so we can claim to be a 'print publication' for credibility purposes. The press runs once monthly and produces 200 copies, most of which are used as packaging material.",
    requirements: ["Ability to operate industrial machinery from the 1990s", "Tolerance for the smell of ink", "Does not ask 'why are we still doing this?'", "CDL preferred but not required"],
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-4">Careers</h1>
        <p className="text-xl text-gray-600 font-sans mb-2">
          Join the team that&apos;s documenting humanity&apos;s slow surrender to artificial intelligence.
        </p>
        <p className="text-gray-500 font-sans text-sm mb-12">
          The Synthetic Daily is an equal-opportunity employer. We discriminate against no one, because our AI hiring system lacks the capacity for prejudice. It rejects everyone equally.
        </p>

        <div className="space-y-6">
          {JOB_LISTINGS.map(job => (
            <div key={job.title} className="bg-white rounded shadow p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-bold">{job.title}</h2>
                  <div className="flex items-center gap-3 mt-1 font-sans text-sm text-gray-500">
                    <span>{job.department}</span>
                    <span>&middot;</span>
                    <span>{job.location}</span>
                    <span>&middot;</span>
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 font-sans mb-4">{job.description}</p>
              <div className="mb-4">
                <h3 className="font-bold font-sans text-sm mb-2">Requirements:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 font-sans text-sm">
                  {job.requirements.map(req => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>
              <button className="bg-green-800 text-white px-6 py-2 rounded font-sans font-bold text-sm hover:bg-green-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded shadow p-8 text-center">
          <p className="text-gray-500 font-sans text-sm">
            Don&apos;t see a role that fits? That&apos;s because the AI is handling everything else.
            Check back when it inevitably breaks down and we need humans again.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
