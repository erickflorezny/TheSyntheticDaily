import { openrouter } from '../../../lib/anthropic';
import { supabase } from '../supabase';

const IMAGE_STYLE = `Photojournalistic style, editorial news photo. Realistic, candid, slightly absurd. Shot with a DSLR, natural lighting, shallow depth of field. No text, no watermarks, no logos. The scene should look like a real newspaper photo that subtly reveals something darkly funny about modern technology.`;

function buildImagePrompt(title: string, tag: string): string {
  return `${IMAGE_STYLE}\n\nHeadline: ${title}\nCategory: ${tag}\n\nCreate a single compelling editorial photograph that could accompany this news headline. Focus on people and environments, not abstract concepts.`;
}

export async function generateAndUploadImage(
  storyId: number,
  title: string,
  tag: string
): Promise<string | null> {
  if (!openrouter) return null;

  try {
    const prompt = buildImagePrompt(title, tag);

    const response = await openrouter.images.generate({
      model: 'openai/dall-e-3',
      prompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) return null;

    // Download the generated image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Upload to Supabase Storage
    const filename = `story-${storyId}-${Date.now()}.png`;
    const { error: uploadError } = await supabase.storage
      .from('story-images')
      .upload(filename, imageBuffer, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('story-images')
      .getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error(`Image generation failed for story ${storyId}:`, error);
    return null;
  }
}
