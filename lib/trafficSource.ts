/**
 * Rolled-up acquisition channel, derived from the UTMs on the URL.
 *
 * Shared by the registration endpoint and the page-view endpoint on purpose:
 * an opt-in rate divides one by the other, so if the two classified traffic
 * differently the rate would be meaningless.
 *
 * Paid is detected two independent ways -- utm_medium=paid, or a long numeric
 * Meta campaign id -- so if the ad URL parameters are edited and one signal
 * breaks, paid traffic still classifies as paid instead of silently falling
 * through to Organic.
 */
export type UtmInput = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

export function deriveTrafficSource(input: UtmInput): string {
  const medium = (input.utm_medium ?? '').trim().toLowerCase();
  const source = (input.utm_source ?? '').trim().toLowerCase();
  const campaign = (input.utm_campaign ?? '').trim();

  if (medium === 'paid' || /^[0-9]{10,}$/.test(campaign)) return 'Facebook Ads';
  if (medium === 'organic' || medium === 'bio') return 'Organic';
  if (medium === 'owned' || source === 'sms' || source === 'email') return 'Email/SMS';
  // No UTMs at all: treat as organic. Tag owned-media links with
  // utm_medium=owned so blasts do not land in this bucket.
  return 'Organic';
}
