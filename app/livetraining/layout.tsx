import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Masterclass for Fitness Coaches | PT Domination',
  description: 'How Online Fitness Coaches Are Using AI to Add $1K–$2K/Week — Without Working More Hours. Free 60-Minute Masterclass. Reserve your spot now.',
  openGraph: {
    title: 'Free AI Masterclass for Fitness Coaches | PT Domination',
    description: 'How Online Fitness Coaches Are Using AI to Add $1K–$2K/Week — Without Working More Hours. Free 60-Minute Masterclass. Reserve your spot now.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Online Fitness Coaches Are Using AI to Add $1K–$2K/Week',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Masterclass for Fitness Coaches | PT Domination',
    description: 'How Online Fitness Coaches Are Using AI to Add $1K–$2K/Week — Without Working More Hours. Free 60-Minute Masterclass. Reserve your spot now.',
    images: ['/og-image.png'],
  },
};

export default function LiveTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
