import '../styles.css';
import '../theme.css';

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Churros Cafe — Desserts & Coffee',
    template: '%s — Churros Cafe',
  },
  description: 'Fresh churros, desserts, matcha, milkshakes, and coffee from Churros Cafe in Qatar.',
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/assets/churros-favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/churros-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/churros-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/assets/churros-apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport = {
  themeColor: '#d0551d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/fonts/fonts.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
