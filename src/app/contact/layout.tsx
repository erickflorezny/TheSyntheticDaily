import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | The Synthetic Daily',
  description: 'Contact The Synthetic Daily editorial team. Story tips, corrections, and existential complaints welcome.',
  alternates: { canonical: 'https://thesyntheticdaily.com/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
