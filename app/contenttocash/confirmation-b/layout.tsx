import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "You're Registered: Free Live Training with Brian Mark",
  description:
    'Thanks for registering. Watch the short video and check your email for your Zoom link.',
  robots: { index: false, follow: false },
};

export default function ContentToCashConfirmationBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
