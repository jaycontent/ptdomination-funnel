import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "You're Registered — Free Live Training with Brian Mark",
  description:
    'Thanks for registering. Watch the short video, add the training to your calendar, and check your email for the Zoom link.',
  robots: { index: false, follow: false },
};

export default function ContentCashFlowLiveConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
