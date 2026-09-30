import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Your Call Is Confirmed — PT Domination",
  description: 'Your strategy call is booked. Here is what happens next.',
  robots: { index: false, follow: false },
};

export default function BookedConfirmedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
