import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DM Sales Training Replay — PT Domination',
  description: 'Watch the DM Sales blueprint. Then book a free 30-minute strategy call with Brian\'s team.',
  openGraph: {
    title: 'DM Sales Training Replay — PT Domination',
    description: 'Watch the DM Sales blueprint. Then book a free 30-minute strategy call with Brian\'s team.',
    images: [{ url: '/image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DM Sales Training Replay — PT Domination',
    description: 'Watch the DM Sales blueprint. Then book a free 30-minute strategy call with Brian\'s team.',
    images: [{ url: '/image.png' }],
  },
};

export default function DMSalesTrainingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
