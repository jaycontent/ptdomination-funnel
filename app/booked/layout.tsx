import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Call — PT Domination',
  description:
    'Pick a time for your High Performance Content strategy call with the PT Domination team.',
  // Only qualified applicants are sent here, so keep it out of search results.
  robots: { index: false, follow: false },
};

export default function BookedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
