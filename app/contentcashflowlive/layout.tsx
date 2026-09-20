import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Live Training: Turn Instagram Into High-Ticket Clients | Brian Mark',
  description:
    'Free live training for business owners: the 3-part Conversation Engine Brian Mark uses to turn everyday Instagram content into booked sales calls, with no funnels, email lists, ads or tech.',
  openGraph: {
    title: 'Free Live Training: Turn Instagram Into High-Ticket Clients | Brian Mark',
    description:
      'The 3-part machine behind $50M+ in sales, all from Instagram. Live on Zoom, free.',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Live Training: Turn Instagram Into High-Ticket Clients | Brian Mark',
    description:
      'The 3-part machine behind $50M+ in sales, all from Instagram. Live on Zoom, free.',
    images: [{ url: '/og-image.png' }],
  },
};

export default function ContentCashFlowLiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
