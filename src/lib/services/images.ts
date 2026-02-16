import { openrouter } from '../../../lib/anthropic';
import { supabase } from '../supabase';

const IMAGE_STYLE = `Editorial news photograph. Wire service quality — AP, Reuters, Getty. Natural lighting. Realistic colors — not oversaturated but not desaturated or washed out either. Normal everyday color palette as seen by the human eye. No post-apocalyptic or dystopian mood. No text, watermarks, logos, or overlays. No stylized lighting or bokeh.`;

const IMAGE_MODEL = 'google/gemini-3-pro-image-preview';

// Widely diverse subject categories — each batch should feel like a real newspaper photo section
const SUBJECT_APPROACHES = [
  'A candid photo of one or two people in a normal everyday setting — coffee shop, grocery store, bus stop, park bench, kitchen table. Natural body language, not posed.',
  'A close-up of a non-electronic object that tells a story — a handwritten sign, a receipt, a name badge, food on a plate, a crumpled memo, a parking ticket, a grocery bag.',
  'An outdoor scene with life in it — a busy sidewalk, a playground, a farmers market, a suburban neighborhood, a strip mall parking lot with cars.',
  'An overhead or flat-lay composition — a kitchen counter mid-cooking, a workbench with tools, a dining table set for dinner, a desk with papers and coffee.',
  'An interior space that feels lived-in — a classroom with backpacks on chairs, a break room with a microwave, a living room with a couch, a doctor\'s waiting room with magazines.',
  'A person interacting with their environment — someone walking a dog, a parent at a school pickup line, a worker on a lunch break, someone reading a newspaper on a bench.',
  'A nature or outdoor scene — a park trail, a suburban backyard, a beach boardwalk, a community garden, a dog park, a lake.',
  'A retail, service, or commercial environment — a pharmacy counter, a gym interior, a hotel lobby, a car dealership, a hair salon, a restaurant kitchen.',
  'A workplace scene — a cubicle farm, a hospital hallway, a warehouse with shelves, a teacher\'s desk, a fire station, a newsroom.',
  'A transportation moment — a subway platform, an airport gate area, a bike lane, a gas station, a drive-through window, a school bus.',
];

function buildImagePrompt(title: string, tag: string): string {
  // Pick a random subject approach to force diversity
  const approach = SUBJECT_APPROACHES[Math.floor(Math.random() * SUBJECT_APPROACHES.length)];
  return `${IMAGE_STYLE}\n\nSubject approach for this image: ${approach}\n\nHeadline: ${title}\nCategory: ${tag}\n\nCreate a single editorial photograph for this headline using the subject approach above. Make it look like a real photo from a real newspaper — normal, everyday life. NOT dark or dystopian. NOT abandoned or empty. The world in this photo is normal and functioning. IMPORTANT: Do NOT show phones, laptops, tablets, smartwatches, screens, or electronic devices as the main subject. Focus on people, places, objects, and environments instead.`;
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
