import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "You're Registered — The Instagram Marketing Funnel Masterclass",
  description: "Thanks for registering. Watch the short video, DM BOOKED for your free training, and add the masterclass to your calendar.",
  robots: { index: false, follow: false },
};

export default function ContentToCashConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
