import { openrouter } from '../../../lib/anthropic';
import { supabase } from '../supabase';

const IMAGE_STYLE = `Raw editorial news photograph. Wire service quality — AP, Reuters, Getty editorial. Natural available light only. Slight film grain or high-ISO noise. Muted, desaturated color palette. Imperfect composition: slightly off-center, background clutter, real-world messiness. No text, no watermarks, no logos, no overlays. No stylized lighting, no dramatic shadows, no golden hour glow, no bokeh circles.`;

const IMAGE_MODEL = 'google/gemini-3-pro-image-preview';

// Diverse subject categories to avoid repetitive people-and-screens compositions
const SUBJECT_APPROACHES = [
  'An empty environment or architecture — abandoned room, hallway, building exterior, parking lot, waiting room with no people.',
  'A close-up of a physical object or document — printed memo, official form, product packaging, nameplate, crumpled paper, sticky notes on a wall.',
  'An outdoor urban or suburban scene — street view, storefront, sidewalk signage, construction site, loading dock, crosswalk.',
  'An overhead or flat-lay composition — desk surface with scattered items, table with paperwork, workbench with tools.',
  'A wide establishing shot of an institutional space — lobby, conference room, factory floor, warehouse, lab, classroom — with no people or only distant silhouettes.',
  'A piece of technology or machinery in situ — server rack, vending machine, kiosk, printer, robot arm, conveyor belt — no human hands visible.',
  'Nature or environment juxtaposed with human infrastructure — power lines, antenna towers, solar panels, a bench in a park, a dumpster behind a strip mall.',
  'A vehicle, transportation, or logistics scene — delivery truck, parking garage, airport terminal, loading bay, empty bus interior.',
];

function buildImagePrompt(title: string, tag: string): string {
  // Pick a random subject approach to force diversity
  const approach = SUBJECT_APPROACHES[Math.floor(Math.random() * SUBJECT_APPROACHES.length)];
  return `${IMAGE_STYLE}\n\nSubject approach for this image: ${approach}\n\nHeadline: ${title}\nCategory: ${tag}\n\nCreate a single editorial photograph for this headline using the subject approach above. CRITICAL: Do NOT default to showing people staring at screens or monitors. Do NOT show glowing screens, laptops, or phones as the main subject. Instead, find an unexpected, oblique visual angle that evokes the story without being literal. Think like a photojournalist who arrives after the event — capture the aftermath, the environment, the evidence, the periphery.`;
}

interface OpenRouterImageResponse {
  choices: Array<{
    message: {
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

export async function generateAndUploadImage(
  storyId: number,
  title: string,
  tag: string
): Promise<string | null> {
  if (!openrouter) return null;

  try {
    const prompt = buildImagePrompt(title, tag);

    // Use chat completions with Gemini for image generation (OpenRouter doesn't support images.generate)
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
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

    if (!imageData) return null;

    // Extract base64 data from data URL (e.g., "data:image/png;base64,...")
    const base64Match = imageData.match(/^data:image\/\w+;base64,(.+)$/);
    if (!base64Match) throw new Error(`Unexpected image format for story ${storyId}`);

    const imageBuffer = Buffer.from(base64Match[1], 'base64');

    // Upload to Supabase Storage
    const filename = `story-${storyId}-${Date.now()}.png`;
    const { error: uploadError } = await supabase.storage
      .from('stories-images')
      .upload(filename, imageBuffer, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('stories-images')
      .getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error(`Image generation failed for story ${storyId}:`, error);
    return null;
  }
}
