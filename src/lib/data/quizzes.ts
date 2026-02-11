// src/lib/data/quizzes.ts
// Satirical AI/tech quizzes in the ClickHole tradition

export interface QuizAnswer {
  text: string;
  result: string; // key into results map
}

export interface QuizQuestion {
  question: string;
  answers: QuizAnswer[];
}

export interface QuizResult {
  title: string;
  description: string;
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  results: Record<string, QuizResult>;
}

export const QUIZZES: Quiz[] = [
  {
    id: "quiz-1",
    slug: "personality-replaced-by-python-script",
    title: "Which Part of Your Personality Is Most Easily Replaced by a Python Script?",
    description: "We all have traits that a competent junior developer could automate in an afternoon. Find out which one is yours.",
    questions: [
      {
        question: "How do you typically greet coworkers in the morning?",
        answers: [
          { text: "A cheerful 'Good morning!' regardless of how I actually feel", result: "small-talk" },
          { text: "I analyze their facial expression first and calibrate my response accordingly", result: "empathy" },
          { text: "I send a Slack message from 6 feet away", result: "communication" },
          { text: "I have a ranking system for who deserves acknowledgment", result: "decision-making" },
        ],
      },
      {
        question: "Your friend asks for advice about a major life decision. You:",
        answers: [
          { text: "Ask follow-up questions you don't actually care about", result: "small-talk" },
          { text: "Feel their pain deeply for about 45 seconds before checking your phone", result: "empathy" },
          { text: "Send them a relevant podcast episode instead of engaging", result: "communication" },
          { text: "Create a pros and cons list that suspiciously favors whatever is easiest for you", result: "decision-making" },
        ],
      },
      {
        question: "You're at a dinner party. What's your move?",
        answers: [
          { text: "Rotate between 4 pre-loaded conversation topics", result: "small-talk" },
          { text: "Mirror the energy of whoever is nearest", result: "empathy" },
          { text: "Narrate what you're eating to no one in particular", result: "communication" },
          { text: "Mentally rank every dish and silently judge anyone who disagrees", result: "decision-making" },
        ],
      },
      {
        question: "How do you handle conflict?",
        answers: [
          { text: "Say 'No worries!' when there are, in fact, worries", result: "small-talk" },
          { text: "Absorb the other person's emotions until I'm angry about something I don't care about", result: "empathy" },
          { text: "Write a carefully worded email that takes 3 hours and accomplishes nothing", result: "communication" },
          { text: "Weigh outcomes, pick the path of least resistance, call it 'choosing my battles'", result: "decision-making" },
        ],
      },
      {
        question: "It's Friday night. What are you doing?",
        answers: [
          { text: "Asking people 'Any fun plans this weekend?' without listening to the answer", result: "small-talk" },
          { text: "Crying at a commercial for a product I'll never buy", result: "empathy" },
          { text: "Texting 'We should hang out soon!' to someone I will not hang out with", result: "communication" },
          { text: "Optimizing my Netflix queue using a spreadsheet", result: "decision-making" },
        ],
      },
    ],
    results: {
      "small-talk": {
        title: "Your Small Talk",
        description: "Congratulations. The part of your personality most easily replaced by a Python script is your small talk. A simple random.choice() from a list of ['How was your weekend?', 'Can you believe this weather?', 'Working hard or hardly working?'] would be indistinguishable from your current output. In fact, several of your coworkers already suspect this has happened.",
      },
      "empathy": {
        title: "Your Empathy",
        description: "The part of you most easily automated is your empathy. A sentiment analysis model with a response template ('That sounds really hard' / 'I'm so sorry you're going through that' / 'Wow, that's a lot') would replicate your emotional support with 97% accuracy. The remaining 3% is the part where you accidentally make it about yourself.",
      },
      "communication": {
        title: "Your Communication Skills",
        description: "A GPT-2 model — not even GPT-4, just GPT-2 — could replicate your communication style. Your emails follow a rigid template. Your texts are 80% emojis. Your phone calls are just you saying 'Yeah... yeah... totally... yeah' while scrolling Reddit. The script has already been written. It's 14 lines long.",
      },
      "decision-making": {
        title: "Your Decision-Making",
        description: "Your decision-making process is so algorithmic it's basically already automated. You weigh options, pick the safest one, and retroactively justify it as 'going with your gut.' A decision tree with 6 nodes could replicate every major choice you've made since 2019. The tree's accuracy rate is 100%. You should find this unsettling.",
      },
    },
  },
  {
    id: "quiz-2",
    slug: "how-many-days-until-ai-takes-your-job",
    title: "How Many Days Until AI Takes Your Specific Job?",
    description: "An imprecise but emotionally devastating estimate.",
    questions: [
      {
        question: "How would you describe your daily work?",
        answers: [
          { text: "I move information from one spreadsheet to another spreadsheet", result: "days" },
          { text: "I explain things to people who could Google it", result: "months" },
          { text: "I manage people who manage people", result: "weeks" },
          { text: "I do something with my hands that requires physical dexterity", result: "years" },
        ],
      },
      {
        question: "How often does your boss check your actual output?",
        answers: [
          { text: "Never. I could be dead at my desk for 3 days before anyone noticed", result: "days" },
          { text: "Quarterly, and only because HR requires it", result: "weeks" },
          { text: "They watch my Slack status light like a hawk", result: "months" },
          { text: "My work product is physically visible and hard to fake", result: "years" },
        ],
      },
      {
        question: "Could you explain your job to a 10-year-old?",
        answers: [
          { text: "No, and I suspect that means something", result: "days" },
          { text: "I could explain it, but the kid would ask 'Why doesn't a computer do that?'", result: "weeks" },
          { text: "Sort of. They'd understand the 'helping people' part", result: "months" },
          { text: "Yes. 'I build/fix/make things with my hands'", result: "years" },
        ],
      },
      {
        question: "What percentage of your job involves email?",
        answers: [
          { text: "It IS email. My job is email", result: "days" },
          { text: "60-80%. The rest is meetings about the emails", result: "weeks" },
          { text: "30-50%. There's some actual human interaction required", result: "months" },
          { text: "Under 20%. Most of my work is physical or creative", result: "years" },
        ],
      },
      {
        question: "Have you ever thought 'A bot could do this' while doing your job?",
        answers: [
          { text: "I think it every single day. Sometimes I mouth the words", result: "days" },
          { text: "Occasionally, during the repetitive parts", result: "weeks" },
          { text: "Rarely. My work requires judgment and nuance", result: "months" },
          { text: "Never. You can't automate what I do. Yet", result: "years" },
        ],
      },
    ],
    results: {
      "days": {
        title: "47 Days",
        description: "We regret to inform you that your job could be automated in approximately 47 days. Not by some hypothetical future AGI — by a mid-level developer with access to the OpenAI API and a free weekend. Your role exists because someone in 2014 couldn't figure out Zapier. The clock is ticking. Update your LinkedIn while LinkedIn still exists.",
      },
      "weeks": {
        title: "8-14 Months",
        description: "Your job has a medium-term runway. The technology to replace you exists but hasn't been packaged into a SaaS product with a catchy name yet. Give it 8 to 14 months. When it happens, your company will frame it as 'streamlining operations' and your manager will personally assure you that 'this isn't about performance' while escorting you to the parking lot.",
      },
      "months": {
        title: "3-5 Years",
        description: "You have a few years. Your job requires enough human judgment, emotional labor, or regulatory compliance that automating it is technically possible but not yet economically worth it. Enjoy this window. Use it to develop skills that are harder to automate. Or don't. It's your obsolescence.",
      },
      "years": {
        title: "12+ Years (Probably)",
        description: "Your job is relatively safe for now. It requires physical presence, manual dexterity, or the kind of creative unpredictability that AI still struggles with. That said, 'relatively safe' is doing a lot of heavy lifting in that sentence. Boston Dynamics is working on it. Enjoy the reprieve.",
      },
    },
  },
  {
    id: "quiz-3",
    slug: "which-tech-ceo-would-you-be",
    title: "Which Tech CEO Would You Be If You Had Mass Delusions of Grandeur?",
    description: "Everyone's a visionary when the board hasn't fired them yet.",
    questions: [
      {
        question: "You're running late to a meeting. What do you do?",
        answers: [
          { text: "Show up 45 minutes late and act like the meeting just started", result: "musk" },
          { text: "Send a polished apology email drafted by your assistant's assistant", result: "nadella" },
          { text: "Arrive on time because meetings are sacred. Then cancel all of them next quarter", result: "zuck" },
          { text: "Post a cryptic tweet implying the meeting was unnecessary anyway", result: "altman" },
        ],
      },
      {
        question: "An employee disagrees with you publicly. Your response?",
        answers: [
          { text: "Fire them on Twitter at 2 AM", result: "musk" },
          { text: "Schedule a 1:1 to 'align on values' (they will not be seen again)", result: "nadella" },
          { text: "Pivot the entire company strategy so their objection no longer applies", result: "zuck" },
          { text: "Write a 3,000-word blog post about how disagreement is 'the engine of progress'", result: "altman" },
        ],
      },
      {
        question: "How do you unwind after work?",
        answers: [
          { text: "Post memes until 4 AM, then sleep 3 hours in the factory", result: "musk" },
          { text: "Read a leadership book and highlight passages about empathy", result: "nadella" },
          { text: "Practice mixed martial arts and review engagement metrics simultaneously", result: "zuck" },
          { text: "Host a dinner party where every guest happens to be an investor", result: "altman" },
        ],
      },
      {
        question: "Your product has a major bug that affects millions. You:",
        answers: [
          { text: "Blame the media for reporting on it", result: "musk" },
          { text: "Release a statement about 'responsible innovation' that addresses nothing specific", result: "nadella" },
          { text: "Rename the bug a 'feature' and A/B test whether users prefer it", result: "zuck" },
          { text: "Publish an essay about how the bug is actually 'a step toward AGI'", result: "altman" },
        ],
      },
      {
        question: "What's your vision for humanity's future?",
        answers: [
          { text: "Mars. Obviously. Everything else is a distraction", result: "musk" },
          { text: "Empowering every person and organization on the planet (to buy our software)", result: "nadella" },
          { text: "Connecting the world in a virtual space where no one can leave", result: "zuck" },
          { text: "A future so bright we need to build an alignment team to stare at it safely", result: "altman" },
        ],
      },
    ],
    results: {
      "musk": {
        title: "Elon Musk",
        description: "You are Elon Musk. You have 14 companies, 11 children, and zero impulse control. Your management style is 'chaos that occasionally produces rockets.' You believe sleep is optional, deadlines are suggestions, and every problem can be solved by posting about it at 3 AM. Your employees describe working for you as 'the most stressful experience of my life' and 'weirdly addictive.' You will die on Mars or in a defamation lawsuit.",
      },
      "nadella": {
        title: "Satya Nadella",
        description: "You are Satya Nadella. You speak exclusively in corporate poetry about 'growth mindset' and 'empowering every human.' Behind the gentle demeanor is a strategist who quietly absorbed the entire AI industry while everyone was watching the other guys argue on Twitter. Your PowerPoints have PowerPoints. Your empathy is genuine but also extremely profitable.",
      },
      "zuck": {
        title: "Mark Zuckerberg",
        description: "You are Mark Zuckerberg. You have reinvented yourself so many times that even you aren't sure which version is running anymore. Hoodie Zuck. Metaverse Zuck. MMA Zuck. AI Zuck. Each pivot is executed with the terrifying precision of someone who views human social dynamics as an engineering problem. Your 'year of efficiency' lasted 3 years. No one corrected you.",
      },
      "altman": {
        title: "Sam Altman",
        description: "You are Sam Altman. You have been fired from and rehired to the same job more times than anyone in corporate history. You speak about existential risk with the calm authority of someone who is actively creating it. Your blog posts are manifestos. Your dinner parties are fundraising rounds. You have somehow convinced the world that the person building the potentially dangerous thing is also the best person to regulate it.",
      },
    },
  },
];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return QUIZZES.find(q => q.slug === slug);
}
