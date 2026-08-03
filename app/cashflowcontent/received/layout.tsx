import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Application Received — Cash Flow Content',
  description:
    "You've applied to Cash Flow Content. Here are the next steps to confirm your application with Brian Mark.",
  robots: { index: false, follow: false },
};

export default function ReceivedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
