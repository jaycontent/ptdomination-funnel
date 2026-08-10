import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Trainer Virtual Summit — PT Domination',
  description:
    'A FREE Online Trainer Virtual Summit for fitness coaches who want to scale from 10k–100k+/month, featuring guest speakers with 20 million combined social media followers. August 20–21.',
  openGraph: {
    title: 'Free Online Trainer Virtual Summit — PT Domination',
    description:
      'For fitness coaches who want to scale from 10k–100k+/month. Guest speakers with 20M combined followers. August 20–21 — register free.',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Trainer Virtual Summit — PT Domination',
    description:
      'For fitness coaches who want to scale from 10k–100k+/month. Guest speakers with 20M combined followers. August 20–21 — register free.',
    images: [{ url: '/og-image.png' }],
  },
};

export default function VirtualSummitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
