import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'You Are Registered — Online Trainer Virtual Summit',
  description: 'Your seat for the free 2-day Online Trainer Virtual Summit is confirmed.',
  robots: { index: false, follow: false },
};

const BODY_BG = 'html,body{background:#0a0e1a}';

export default function SummitConfirmationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BODY_BG }} />
      {children}
    </>
  );
}
