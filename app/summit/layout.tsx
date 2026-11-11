import type { Metadata } from 'next';

const TITLE = 'Free 2-Day Online Trainer Virtual Summit — PT Domination';
const DESCRIPTION =
  'A free 2-day virtual summit for online coaches who want to scale from $10K to $100K per month. Content, lead generation, high-ticket sales, plus two clients past $100K/month.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-image.png' }],
  },
};

// globals.css paints #030712; this funnel is a shade lighter. Shipping the rule
// in the server-rendered HTML keeps the right background on first paint.
const BODY_BG = 'html,body{background:#0a0e1a}';

export default function SummitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BODY_BG }} />
      {children}
    </>
  );
}
