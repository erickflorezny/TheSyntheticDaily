import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | The Synthetic Daily',
  description: 'Contact The Synthetic Daily editorial team. Story tips, corrections, and existential complaints welcome.',
  alternates: { canonical: 'https://thesyntheticdaily.com/contact' },
  openGraph: {
    title: 'Contact | The Synthetic Daily',
    description: 'Contact The Synthetic Daily editorial team. Story tips, corrections, and existential complaints welcome.',
    url: 'https://thesyntheticdaily.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact | The Synthetic Daily',
    description: 'Contact The Synthetic Daily editorial team.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
