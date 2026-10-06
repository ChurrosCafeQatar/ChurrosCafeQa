import type { Metadata, Viewport } from 'next';
import '../styles.css';
import '../theme.css';
import { SITE_URL } from '../data/site';
import Analytics from '../components/analytics';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Original_Surfer, Pacifico } from 'next/font/google';

const originalSurfer = Original_Surfer({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-small',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-accent',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Churros Cafe',
  title: {
    default: 'Churros Cafe Qatar | Churros, Desserts & Coffee',
    template: '%s | Churros Cafe Qatar',
  },
  description: 'Visit Churros Cafe in Qatar for fresh Spanish churros, desserts, waffles, crepes, matcha, milkshakes, and hot or iced coffee.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Churros Cafe Qatar | Churros, Desserts & Coffee',
    description: 'Fresh Spanish churros, desserts, matcha, milkshakes, and coffee at four Churros Cafe branches across Qatar.',
    siteName: 'Churros Cafe',
    type: 'website',
    locale: 'en_QA',
    url: '/',
    images: [{ url: '/assets/campaign-dessert-spread.png', width: 2048, height: 2048, alt: 'Churros Cafe desserts with chocolate, pistachio, strawberries, and banana' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Churros Cafe Qatar | Churros, Desserts & Coffee',
    description: 'Fresh Spanish churros, desserts, matcha, milkshakes, and coffee at four Churros Cafe branches across Qatar.',
    images: ['/assets/campaign-dessert-spread.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/assets/churros-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/churros-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/assets/churros-apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#d0551d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${originalSurfer.variable} ${pacifico.variable}`}>
      <head>
        <link rel="stylesheet" href="/assets/fonts/fonts.css" />
      </head>
      <body>
        <Header />
        <main id="main">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
