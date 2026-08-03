import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Replay — PT Domination',
  description: 'Watch the blueprint. Then book a free 30-minute strategy call with Brian\'s team.',
  openGraph: {
    title: 'AI Replay — PT Domination',
    description: 'Watch the blueprint. Then book a free 30-minute strategy call with Brian\'s team.',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Replay — PT Domination',
    description: 'Watch the blueprint. Then book a free 30-minute strategy call with Brian\'s team.',
    images: [{ url: '/og-image.png' }],
  },
};

export default function AIReplayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
