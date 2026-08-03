import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cash Flow Content — Brian Mark',
  description:
    'The system that grew over 6M followers & generated $50M in revenue. For online business owners who want to create content that makes them more money.',
  openGraph: {
    title: 'Cash Flow Content — Brian Mark',
    description:
      'The system that grew over 6M followers & generated $50M in revenue. Join the waitlist.',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cash Flow Content — Brian Mark',
    description:
      'The system that grew over 6M followers & generated $50M in revenue. Join the waitlist.',
    images: [{ url: '/og-image.png' }],
  },
};

export default function CashFlowContentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
