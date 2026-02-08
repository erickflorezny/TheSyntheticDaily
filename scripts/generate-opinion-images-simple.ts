/**
 * Generate AI images for opinion pieces using OpenRouter's image generation.
 * Simple version that works with the existing TypeScript file structure.
 *
 * Usage:
 *   npx tsx scripts/generate-opinion-images-simple.ts
 *
 * Requires OPENROUTER_API_KEY in .env.local
 * Images are saved to public/images/
 */

import dotenv from 'dotenv';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-3-pro-image-preview';

interface OpinionPiece {
  id: string;
  slug: string;
  title: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
}

// Opinion pieces data - we'll use the same data as in opinion-pieces.ts
const OPINION_PIECES: OpinionPiece[] = [
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
];

const OPINION_STYLE_PROMPT = `Photojournalism style, grainy texture, slight motion blur, shitty local news photography. Realistic, candid, slightly absurd. Shot with a DSLR, natural lighting, shallow depth of field. No text, no watermarks, no logos. The scene should look like a real newspaper photo that subtly reveals something darkly funny about modern technology.`;

function buildOpinionImagePrompt(piece: OpinionPiece): string {
  // Extract key themes from the opinion piece
  const themes = extractThemes(piece);
  
  return `${OPINION_STYLE_PROMPT}

Topic: ${piece.title}
Author Perspective: ${piece.author}
Key Themes: ${themes.join(', ')}

Create a single compelling editorial photograph that could accompany this opinion piece. Focus on capturing the absurdity or irony described in the text. Use photojournalism style with grainy texture and slight motion blur to give it a "shitty local news photography" feel.`;
}

function extractThemes(piece: OpinionPiece): string[] {
  const themes: string[] = [];
  const content = piece.content.toLowerCase();
  
  // Extract key themes based on content
  if (content.includes('ai') || content.includes('artificial intelligence')) {
    themes.push('AI technology');
  }
  if (content.includes('venture capital') || content.includes('investment')) {
    themes.push('venture capital');
  }
  if (content.includes('therapy') || content.includes('therapist')) {
    themes.push('mental health');
  }
  if (content.includes('job') || content.includes('automation') || content.includes('employment')) {
    themes.push('workplace automation');
  }
  if (content.includes('startup') || content.includes('entrepreneur')) {
    themes.push('startup culture');
  }
  if (content.includes('language') || content.includes('terminology')) {
    themes.push('linguistics');
  }
  
  // Add some generic themes based on tone
  themes.push('satirical commentary');
  themes.push('modern technology critique');
  
  return themes.length > 0 ? themes : ['technology satire', 'modern life'];
}

interface OpenRouterImageResponse {
  choices: Array<{
    message: {
      role: string;
      content: string | null;
      images?: Array<{
        type: string;
        image_url: {
          url: string;
        };
      }>;
    };
  }>;
}

async function generateImageForOpinionPiece(piece: OpinionPiece, outputDir: string): Promise<string> {
  const filename = `opinion-${piece.id.replace('op-', '')}.png`;
  const filepath = join(outputDir, filename);

  if (existsSync(filepath)) {
    console.log(`  Skipping opinion piece ${piece.id} — image already exists`);
    return `/images/${filename}`;
  }

  const prompt = buildOpinionImagePrompt(piece);
  console.log(`  Generating image for opinion piece ${piece.id}: "${piece.title.substring(0, 60)}..."`);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      modalities: ['image', 'text'],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text.substring(0, 200)}`);
  }

  const data = (await response.json()) as OpenRouterImageResponse;
  const message = data.choices?.[0]?.message;
  const imageData = message?.images?.[0]?.image_url?.url;

  if (!imageData) {
    throw new Error(`No image returned for opinion piece ${piece.id}`);
  }

  // Extract base64 data from data URL (e.g., "data:image/png;base64,...")
  const base64Match = imageData.match(/^data:image\/\w+;base64,(.+)$/);
  if (!base64Match) {
    throw new Error(`Unexpected image format for opinion piece ${piece.id}`);
  }

  const buffer = Buffer.from(base64Match[1], 'base64');
  writeFileSync(filepath, buffer);
  console.log(`  Saved: ${filepath} (${(buffer.length / 1024).toFixed(0)} KB)`);

  return `/images/${filename}`;
}

async function main() {
  if (!API_KEY) {
    console.error('Error: OPENROUTER_API_KEY not found in .env.local');
    process.exit(1);
  }

  console.log(`Using model: ${MODEL}`);

  const rootDir = join(__dirname, '..');
  const outputDir = join(rootDir, 'public', 'images');

  // Create images directory if it doesn't exist
  if (!existsSync(outputDir)) {
    console.log(`Creating directory: ${outputDir}`);
    mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\nGenerating images for ${OPINION_PIECES.length} opinion pieces...`);

  for (const piece of OPINION_PIECES) {
    try {
      const imagePath = await generateImageForOpinionPiece(piece, outputDir);
      console.log(`  Generated image for ${piece.id}: ${imagePath}`);
    } catch (err) {
      console.error(`  Failed for opinion piece ${piece.id}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log('\nDone! All opinion piece images generated.');
  console.log('\nNote: The image paths are already set in src/lib/data/opinion-pieces.ts');
  console.log('The generated images will be available at the specified paths.');
}

main();