import './globals.css';
import type { Metadata } from 'next';
import { Noto_Serif_Bengali } from 'next/font/google';
import Head from 'next/head';

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ভোটার তথ্য অনুসন্ধান | Voter Information Finder',
  description: 'বাংলাদেশের ভোটার তথ্য দ্রুত এবং সহজে খুঁজে বের করুন। Search voter information in Bangladesh quickly and easily.',
  manifest: '/manifest.json',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <Head>
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Optional: offline fallback page */}
        {/* <link rel="offline-page" href="/offline.html" /> */}
      </Head>
      <body className={notoSerifBengali.className}>{children}</body>
    </html>
  );
}
