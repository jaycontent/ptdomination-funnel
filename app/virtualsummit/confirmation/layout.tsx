import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "You're Registered — Online Trainer Virtual Summit",
  description:
    'Thanks for registering for the Online Trainer Virtual Summit. Check your email and texts for the Zoom link, and donate to the families affected by the BC wildfires.',
  robots: { index: false, follow: false },
};

export default function SummitConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
