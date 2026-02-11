import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { getAutoReplyEmail } from '@/lib/emails/contact-auto-reply';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Max message length
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be under 5,000 characters.' },
        { status: 400 }
      );
    }

    // Store submission in Supabase
    const { error } = await supabase
      .from('contact_submissions')
      .insert({ name, email, subject, message });

    if (error) {
      console.error('Contact form error:', error.message);
      return NextResponse.json(
        { error: 'Failed to submit. Please try again.' },
        { status: 500 }
      );
    }

    // Send auto-reply email
    const { html, text } = getAutoReplyEmail(name, subject);
    try {
      await resend.emails.send({
        from: 'The Synthetic Daily <noreply@thesyntheticdaily.com>',
        to: email,
        subject: `Re: ${subject} — The Synthetic Daily`,
        html,
        text,
      });
    } catch (emailError) {
      // Log but don't fail the request — the submission was already stored
      console.error('Auto-reply email failed:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}
