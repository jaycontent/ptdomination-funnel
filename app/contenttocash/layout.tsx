import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Instagram Marketing Funnel — Free Masterclass',
  description:
    'Free 60-minute masterclass for business owners doing $10K+/month: the exact Instagram marketing funnel behind 700K followers, 30M monthly views, and $50M in sales.',
  openGraph: {
    title: 'The Instagram Marketing Funnel — Free Masterclass',
    description:
      'Free 60-minute masterclass: turn your Instagram content into cash. For business owners doing $10K+/month who want to scale.',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Instagram Marketing Funnel — Free Masterclass',
    description:
      'Free 60-minute masterclass: turn your Instagram content into cash. For business owners doing $10K+/month who want to scale.',
    images: [{ url: '/og-image.png' }],
  },
};

export default function ContentToCashLayout({ children }: { children: React.ReactNode }) {
  return children;
}
