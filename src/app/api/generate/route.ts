import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function GET(request: Request) {
  // Auth Check (Prevent random people from running up your bill)
  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a lead writer for The Onion. Write a satirical AI news headline and a 2-sentence excerpt. The location is Utica, NY." },
        { role: "user", content: "Write a story about a ridiculous AI failure." }
      ],
    });

    const story = completion.choices[0].message.content;
    
    // Logic to save 'story' to Supabase or a local JSON file goes here
    
    return NextResponse.json({ success: true, story });
  } catch (error) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}