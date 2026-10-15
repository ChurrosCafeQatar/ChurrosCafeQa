import Link from 'next/link';
import type { ComponentProps } from 'react';

// Shared navigation appears on every page. Fetch the destination on click,
// not during initial rendering of several unrelated page payloads.
export default function NavigationLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}
