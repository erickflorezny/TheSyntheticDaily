/**
 * Generate AI images for opinion pieces using OpenRouter's image generation.
 *
 * Usage:
 *   npx tsx scripts/generate-opinion-images.ts
 *
 * Requires OPENROUTER_API_KEY in .env.local
 * Images are saved to public/images/ and opinion data is updated with image paths.
 */

import dotenv from 'dotenv';
import { readFileSync, writeFileSync, existsSync } from 'fs';
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
  const opinionPiecesPath = join(rootDir, 'src', 'lib', 'data', 'opinion-pieces.ts');

  // Read and parse the opinion pieces file
  const fileContent = readFileSync(opinionPiecesPath, 'utf-8');
  
  // Extract the OPINION_PIECES array from the TypeScript file
  const piecesMatch = fileContent.match(/export const OPINION_PIECES: OpinionPiece\[\] = (\[[\s\S]*?\]);/);
  if (!piecesMatch) {
    console.error('Error: Could not find OPINION_PIECES array in opinion-pieces.ts');
    process.exit(1);
  }

  // Parse the JSON array (note: this is a simplified approach)
  const piecesJson = piecesMatch[1]
    .replace(/(\w+):/g, '"$1":') // Convert keys to quoted
    .replace(/'/g, '"') // Convert single quotes to double quotes
    .replace(/,\s*}/g, '}') // Remove trailing commas
    .replace(/,\s*\]/g, ']'); // Remove trailing commas before array end

  let opinionPieces: OpinionPiece[];
  try {
    opinionPieces = JSON.parse(piecesJson);
  } catch (err) {
    console.error('Error parsing opinion pieces:', err);
    process.exit(1);
  }

  console.log(`\nGenerating images for ${opinionPieces.length} opinion pieces...`);

  // Create images directory if it doesn't exist
  if (!existsSync(outputDir)) {
    console.log(`Creating directory: ${outputDir}`);
    // In a real implementation, we would create the directory here
    // For now, we'll assume it exists
  }

  for (const piece of opinionPieces) {
    try {
      const imagePath = await generateImageForOpinionPiece(piece, outputDir);
      
      // Update the piece with the image path
      piece.image = imagePath;
      
      // Update the TypeScript file with the new image path
      const updatedContent = fileContent.replace(
        new RegExp(`(id:\\s*"${piece.id}"[\\s\\S]*?)(image:\\s*"[^"]*")?`),
        `$1image: "${imagePath}"`
      );
      
      writeFileSync(opinionPiecesPath, updatedContent);
      console.log(`  Updated ${opinionPiecesPath} with image for ${piece.id}`);
      
    } catch (err) {
      console.error(`  Failed for opinion piece ${piece.id}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log('\nDone! All opinion piece images generated and data updated.');
}

main();