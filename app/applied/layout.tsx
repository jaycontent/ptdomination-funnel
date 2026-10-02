import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Application Received — PT Domination',
  description: 'Thanks for your interest. Your application is being reviewed.',
  robots: { index: false, follow: false },
};

export default function AppliedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
