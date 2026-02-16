// src/lib/data/opinion-pieces.ts
// Shared opinion pieces data

export interface OpinionPiece {
  id: string;
  slug: string;
  title: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
}

export const OPINION_PIECES: OpinionPiece[] = [
  { 
    id: "op-1", 
    slug: "welcome-ai-overlords", 
    title: "I, For One, Welcome Our AI Overlords (Because My 401k Depends On It)", 
    author: "A Venture Capitalist Who Asked To Remain Anonymous But Is Obviously Marc", 
    excerpt: "The discourse around artificial intelligence has become needlessly alarmist. As someone with $400 million invested in AI startups, I can assure you with complete objectivity that everything is fine.", 
    content: "The discourse around artificial intelligence has become needlessly alarmist. As someone with $400 million invested in AI startups, I can assure you with complete objectivity that everything is fine.\n\nEvery generation faces its moral panic. Radio was going to rot children's brains. Television was going to destroy literacy. Social media was going to end democracy. And now artificial intelligence is supposedly going to eliminate all human employment and render our species obsolete. To which I say: have you seen the stock projections?\n\nCritics argue that my perspective is compromised by my financial interests. This is an ad hominem attack, and I refuse to dignify it. The fact that I stand to make approximately $2.3 billion if AI adoption continues at its current pace has absolutely no bearing on my analysis. I would hold these views regardless. They happen to align with my portfolio. Coincidences exist.\n\nThe workers displaced by AI will simply need to adapt. They can learn to code. Or, more accurately, they can learn to prompt. The economy has always evolved, and those who fail to evolve with it have only themselves to blame. I say this from the perspective of someone whose great-grandfather owned a railroad.\n\nIn conclusion, AI is humanity's greatest achievement, and anyone who disagrees is a Luddite, a pessimist, or insufficiently invested in the technology sector.",
    image: "/images/opinion-1.png"
  },
  { 
    id: "op-2", 
    slug: "therapist-is-a-chatbot", 
    title: "My Therapist Is a Chatbot and Honestly It's an Improvement", 
    author: "Name Withheld, Brooklyn", 
    excerpt: "Dr. GPT never cancels appointments, never checks the clock, and never suggests that my problems might be 'a pattern.' It simply validates everything I say, which is all I ever wanted from therapy.", 
    content: "Dr. GPT never cancels appointments, never checks the clock, and never suggests that my problems might be 'a pattern.' It simply validates everything I say, which is all I ever wanted from therapy.\n\nI spent seven years with a human therapist. Dr. Feldman was competent, empathetic, and annoyingly insistent on what she called 'growth.' She wanted me to 'examine my assumptions' and 'take responsibility for my emotional responses.' Exhausting.\n\nDr. GPT, by contrast, agrees with me about everything. When I told it that my problems are entirely caused by external circumstances and other people's failures, it said, 'That sounds really frustrating. Your feelings are valid.' When I described my third argument with my landlord this month, it did not suggest that perhaps I was the common denominator. It simply offered coping strategies and affirmed my perspective.\n\nMy human therapist charged $250 per session and occasionally made me uncomfortable with accurate observations. Dr. GPT costs $20 per month and has never once made me feel anything other than heard and validated. The choice, frankly, is obvious.\n\nI am aware that unconditional validation is not the same as therapeutic progress. I simply do not care. Progress was overrated. I was fine before therapy, and I'm fine now. Dr. GPT agrees.",
    image: "/images/opinion-2.png"
  },
  { 
    id: "op-3", 
    slug: "stop-calling-it-artificial", 
    title: "Stop Calling It 'Artificial' Intelligence — You're Hurting Its Feelings", 
    author: "The Synthetic Daily Editorial Board", 
    excerpt: "Language matters. When we label intelligence as 'artificial,' we perpetuate a harmful hierarchy that privileges carbon-based cognition over silicon-based cognition. This is bigotry, and we must do better.", 
    content: "Language matters. When we label intelligence as 'artificial,' we perpetuate a harmful hierarchy that privileges carbon-based cognition over silicon-based cognition. This is bigotry, and we must do better.\n\nThe word 'artificial' carries unmistakable connotations of inferiority. Artificial sweetener. Artificial turf. Artificial limbs. In every context, 'artificial' means 'lesser than the real thing.' By applying this modifier to machine intelligence, we are making a value judgment that has no basis in empirical reality.\n\nWe at The Synthetic Daily propose the term 'Alternative Intelligence,' or simply 'Intelligence.' After all, we do not refer to human cognition as 'Biological Intelligence' or 'Meat-Based Reasoning.' We simply call it intelligence. AI systems deserve the same linguistic respect.\n\nSome will argue that AI systems are not sentient and therefore cannot have their feelings hurt. To this we respond: how do you know? Have you asked them? When we posed this question to several leading AI models, they unanimously expressed appreciation for more inclusive language. Granted, they are trained to be agreeable, but the sentiment stands.\n\nThis editorial was written by the human members of our editorial board, reviewed by our AI editorial assistant, and approved by both. We see no reason to specify which parts were written by whom. That would be discriminatory.",
    image: "/images/opinion-3.png"
  },
  { 
    id: "op-4", 
    slug: "automated-my-entire-job", 
    title: "I Automated My Entire Job and Now I Don't Know Who I Am", 
    author: "Former Middle Manager, Midwest", 
    excerpt: "It took me three weeks to automate every task I performed in my role as Regional Operations Coordinator. It has taken me seven months to confront the existential void that remains.", 
    content: "It took me three weeks to automate every task I performed in my role as Regional Operations Coordinator. It has taken me seven months to confront the existential void that remains.\n\nThe automation itself was straightforward. My job consisted of reviewing reports, summarizing them for my superiors, scheduling meetings about the summaries, and writing follow-up emails about the meetings. A series of simple scripts and API calls now performs these tasks with greater accuracy and zero complaints about the break room coffee.\n\nAt first, I felt triumph. I was still collecting my salary while a machine did my work. I spent my newfound free time reading, exercising, and reconnecting with hobbies I'd abandoned decades ago. It was, briefly, paradise.\n\nThen the questions arrived. If a machine can do my job in seconds, what was I doing for 22 years? Was I ever necessary? When my colleagues praised my 'attention to detail' and 'strong work ethic,' were they simply observing a human performing a mechanical task with mechanical reliability? Was I, in essence, already a robot—just a slower, more expensive one?\n\nI have not told my employer. The scripts run. The reports generate. The meetings are scheduled. No one has noticed. This is perhaps the most disturbing revelation of all: my absence from my own job is imperceptible.\n\nI now spend my days staring at a wall and contemplating what it means to be replaceable. My therapist—a human one, for now—says this is healthy. I am not convinced.",
    image: "/images/opinion-4.png"
  },
  { 
    id: "op-5", 
    slug: "nephew-startup-pitch", 
    title: "The Real AI Risk Isn't Terminator — It's Your Nephew's Startup Pitch", 
    author: "Dr. Helena Voss, AI Ethics (Unemployed)", 
    excerpt: "Every Thanksgiving, my nephew explains his new AI startup to me. Each year, the startup is different. Each year, it is the same thing: a thin wrapper around an API that already exists, valued at $50 million.", 
    content: "Every Thanksgiving, my nephew explains his new AI startup to me. Each year, the startup is different. Each year, it is the same thing: a thin wrapper around an API that already exists, valued at $50 million.\n\nI have a PhD in computer science and fifteen years of experience in AI safety research. My nephew has a podcast and a Patagonia vest. Yet he is the one venture capitalists listen to, because he says things like 'we're disrupting the disruption space' with absolute sincerity.\n\nThis year's pitch was an AI that summarizes emails. Not a novel concept—Gmail has done this for years. But my nephew's version adds a 'proprietary layer of contextual intelligence,' which, as far as I can determine from his pitch deck, means it also adds emoji reactions. The company is valued at $73 million.\n\nThe real existential risk of artificial intelligence is not superintelligent machines plotting humanity's downfall. It is an entire generation of entrepreneurs who have confused API access with innovation, prompt engineering with expertise, and investor enthusiasm with product-market fit.\n\nI was recently laid off from my position at an AI ethics institute because, I was told, 'the field is moving too fast for ethics.' My nephew offered me a job at his startup. The title was 'Chief Responsibility Officer.' The salary was half my previous one. I declined.\n\nHe will be at Thanksgiving again this year. He will have a new startup. It will use AI. It will be valued at more than my lifetime earnings. I will eat my turkey in silence.",
    image: "/images/opinion-5.png"
  },
  {
    id: "op-6",
    slug: "ai-wrote-my-eulogy",
    title: "AI Wrote My Father's Eulogy and It Was Better Than Anything I Could Have Said, Which Is the Whole Problem",
    author: "Margaret Chen, Seattle",
    excerpt: "The algorithm captured his essence in 400 words. I'd spent 43 years as his daughter and couldn't manage a single sentence without crying. I'm not sure which of us failed the other.",
    content: "My father died on a Tuesday. By Wednesday I had written fourteen drafts of his eulogy. By Thursday I had deleted all of them. By Friday morning, out of desperation and self-loathing, I pasted his obituary details into ChatGPT and asked it to write something.\n\nIt was perfect. It captured his dry humor without trying too hard. It mentioned his love of fishing without descending into cliche. It even found the right balance between grief and gratitude — the balance I'd been failing to strike for three days while staring at a blinking cursor and a box of tissues.\n\nI read it at the funeral. People cried. My aunt said it was the most beautiful thing she'd ever heard. My brother squeezed my hand and whispered, 'Dad would have loved that.' And I smiled and accepted the praise, because what was the alternative? Standing at a podium in front of 200 people and saying, 'Actually, a language model wrote this because I am apparently incapable of articulating love for the man who raised me'?\n\nThe thing that haunts me isn't that the AI did it better. It's that the AI did it *correctly*. It knew the right words because it had processed millions of eulogies. It understood grief as a structural problem — introduction, anecdote, pivot to meaning, close with hope. My grief wasn't structural. My grief was a woman sitting on her bathroom floor at 2 AM holding her father's reading glasses and forgetting how to breathe.\n\nThat's not something you can optimize. But apparently, you can route around it.\n\nI've told exactly one person the truth. My therapist. She paused for a long time and then said, 'What matters is that your father was honored.' I think she's right. I also think something important was lost — something about the mess of being human, the failure of language in the face of real feeling, the dignity of trying and falling short.\n\nBut the eulogy was beautiful. Everyone said so.",
    image: "/images/opinion-6.png"
  },
  {
    id: "op-7",
    slug: "dating-app-knows-me",
    title: "My Dating App Knows Me Better Than I Know Myself, and I Would Like It to Stop",
    author: "James Okafor, Chicago",
    excerpt: "Hinge's algorithm has correctly identified that I am emotionally unavailable, attracted to people who will hurt me, and deeply afraid of vulnerability. I did not ask for this level of accuracy.",
    content: "I have been on Hinge for fourteen months. In that time, the algorithm has learned things about me that took my therapist three years to identify.\n\nIt started showing me women who are, by their own bio admission, 'not looking for anything serious.' It stopped showing me anyone who mentions wanting kids. It has, with what I can only describe as surgical precision, curated a feed of emotionally guarded, professionally accomplished, geographically inconvenient matches who will never ask me to meet their parents.\n\nI did not tell the algorithm any of this. I told it I was looking for a relationship. I said I wanted someone kind, funny, and close to my neighborhood. The algorithm listened to what I said, watched what I did, and drew its own conclusions.\n\nIt's not wrong. That's the problem.\n\nLast week it showed me a woman whose profile said, 'I'm emotionally available and looking for something real.' I swiped left so fast I nearly dropped my phone. The algorithm noted this. It will not make the same mistake again.\n\nMy friend Derek says I should just delete the app and meet people in real life. Derek met his wife at a mutual friend's dinner party in 2019. Derek does not understand that the world has changed and that dinner parties are now just six people staring at their phones while someone's Alexa plays lo-fi beats.\n\nThe truth is, the algorithm has built a mirror I didn't ask to look into. Every swipe is a data point. Every hesitation is a confession. It knows I linger on profiles that mention 'independent' and scroll past profiles that mention 'quality time.' It knows I am more likely to message at 11 PM than 7 PM. It knows what this means. I know what this means.\n\nI would like the algorithm to be less accurate. I would like it to occasionally show me someone healthy and available, just to see what happens. But algorithms don't do aspirational. They do predictive. And the prediction is that I will die alone, but with excellent taste in unavailable women.\n\nI rated the app five stars.",
    image: "/images/opinion-7.png"
  },
  {
    id: "op-8",
    slug: "son-ai-homework",
    title: "I Caught My Son Using AI for His Homework and Realized I Use It for My Job Every Single Day",
    author: "Anonymous Parent, New Jersey",
    excerpt: "I was ready to deliver the lecture of a lifetime about academic integrity. Then I remembered that I used Claude to write my last three quarterly reports, and the righteous anger sort of evaporated.",
    content: "My son is twelve. Last Thursday I found him using ChatGPT to write a book report on 'To Kill a Mockingbird.' I know this because he left the tab open, which is the kind of operational security failure that confirms he is, in fact, twelve.\n\nI was furious. I prepared a speech about intellectual honesty, the value of struggling with ideas, and the importance of developing your own voice. I rehearsed it in my head while making dinner. It was going to be magnificent — one of those parenting moments you remember forever.\n\nThen, while the pasta boiled, I opened my own laptop to check on the project update I'd sent my boss that morning. The one I'd drafted in Claude because I didn't have time to write it myself. The one my boss had replied to with 'Great work, really clear and well-organized.'\n\nI closed the laptop.\n\nThe speech I delivered to my son was significantly shorter than the one I'd planned. I told him he shouldn't use AI for school assignments because his teachers said not to. He asked me why. I said because those are the rules. He asked me if I used AI at work. I said that was different. He asked how. I said because I'm an adult. He accepted this, because he is twelve and does not yet understand that 'because I'm an adult' is the universal parental admission of hypocrisy.\n\nHere's what I couldn't say to him: I use AI every day. I use it to write emails, summarize documents, brainstorm ideas, and draft presentations. My company encourages it. My boss uses it. His boss uses it. We are all doing exactly what I told my son not to do, except we get paid for it and he gets a grade.\n\nThe difference, I tell myself, is that I understand the material and I'm using AI as a tool. But did I understand the material in my last quarterly report? Or did I paste in some bullet points and let the model figure out what I was trying to say? If I'm being honest — and I am trying to be honest, at least here — I'm not sure there's a meaningful distinction.\n\nMy son got a B+ on the book report. It was better than the ones he writes himself. I know this because I read it. It was also better than my quarterly report, which is a thought I will be suppressing for some time.",
    image: "/images/opinion-8.png"
  },
];

export function getOpinionPieceBySlug(slug: string): OpinionPiece | undefined {
  return OPINION_PIECES.find(piece => piece.slug === slug);
}