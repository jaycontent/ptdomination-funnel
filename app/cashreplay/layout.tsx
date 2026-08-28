import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content to Cash Replay — PT Domination',
  description:
    'Watch the Instagram Marketing Funnel masterclass replay. Then book a free 30-minute strategy call with Brian\'s team.',
  openGraph: {
    title: 'Content to Cash Replay — PT Domination',
    description:
      'Watch the Instagram Marketing Funnel masterclass replay. Then book a free 30-minute strategy call with Brian\'s team.',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content to Cash Replay — PT Domination',
    description:
      'Watch the Instagram Marketing Funnel masterclass replay. Then book a free 30-minute strategy call with Brian\'s team.',
    images: [{ url: '/og-image.png' }],
  },
};

export default function CashReplayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
