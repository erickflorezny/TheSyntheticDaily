import { openrouter } from '../../../lib/anthropic';
import { supabase } from '../supabase';

const IMAGE_STYLE = `Raw editorial news photograph. Shot by an AP or Reuters photojournalist on assignment. Canon EOS R5 or Nikon Z9, 35mm or 50mm prime lens, f/2.8, natural available light only — fluorescent office lighting, overcast daylight, or harsh indoor overhead lights. Slight motion blur on hands or background. Visible film grain or high-ISO noise. Muted, desaturated color palette — not vibrant or saturated. Imperfect composition: slightly off-center subject, background clutter, someone partially cut off at the frame edge. Real-world messiness: wrinkled clothes, messy desks, scuffed floors, coffee cups, lanyards. No text, no watermarks, no logos, no overlays. Absolutely no stylized lighting, no dramatic shadows, no golden hour glow, no bokeh circles. This should look like it was pulled from a wire service photo feed — unglamorous, candid, documentary.`;

const IMAGE_MODEL = 'google/gemini-3-pro-image-preview';

function buildImagePrompt(title: string, tag: string): string {
  return `${IMAGE_STYLE}\n\nHeadline: ${title}\nCategory: ${tag}\n\nCreate a single compelling editorial photograph that could accompany this news headline. Vary the subject matter — sometimes people, sometimes empty environments, sometimes objects or signage or screens or documents. Not every photo needs a human subject. Think wire service variety: a deserted office, a close-up of a screen, a parking lot, a whiteboard, a press conference podium with no one at it.`;
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
