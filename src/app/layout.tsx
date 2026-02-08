import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SubscriptionPopup from "@/components/SubscriptionPopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Synthetic Daily",
  description: "Humanity's Final Draft - AI-Generated Satirical News",
  keywords: ["AI news", "satire", "artificial intelligence", "tech humor", "future news"],
  authors: [{ name: "The Synthetic Daily" }],
  creator: "The Synthetic Daily",
  publisher: "The Synthetic Daily",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thesyntheticdaily.com",
    title: "The Synthetic Daily",
    description: "Humanity's Final Draft - AI-Generated Satirical News",
    siteName: "The Synthetic Daily",
    images: [
      {
        url: "https://thesyntheticdaily.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Synthetic Daily - AI-Generated Satirical News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Synthetic Daily",
    description: "Humanity's Final Draft - AI-Generated Satirical News",
    images: ["https://thesyntheticdaily.com/og-image.png"],
    creator: "@TheSyntheticDaily",
    site: "@TheSyntheticDaily",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "",
    // yandex: "",
    // yahoo: "",
    // other: {},
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <SubscriptionPopup />
      </body>
    </html>
  );
}
