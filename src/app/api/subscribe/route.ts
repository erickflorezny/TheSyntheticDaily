import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { getNewsletterWelcomeEmail } from '@/lib/emails/newsletter-welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, unsubscribed_at')
      .eq('email', email.toLowerCase())
      .single();

    if (existing && !existing.unsubscribed_at) {
      return NextResponse.json({ error: 'This email is already subscribed.' }, { status: 409 });
    }

    if (existing && existing.unsubscribed_at) {
      // Re-subscribe
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ unsubscribed_at: null, subscribed_at: new Date().toISOString() })
        .eq('id', existing.id);
      if (error) {
        console.error('Re-subscribe error:', error.message);
        return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
      }
    } else {
      // New subscriber
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.toLowerCase() });
      if (error) {
        console.error('Subscribe error:', error.message);
        return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
      }
    }

    // Send welcome email
    const { html, text } = getNewsletterWelcomeEmail();
    try {
      await resend.emails.send({
        from: 'The Synthetic Daily <noreply@thesyntheticdaily.com>',
        to: email.toLowerCase(),
        subject: 'Your Subscription Has Been Processed — The Synthetic Daily',
        html,
        text,
      });
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
