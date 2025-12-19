import './globals.css';
import type { Metadata } from 'next';
import { Noto_Serif_Bengali } from 'next/font/google';

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ভোটার তথ্য অনুসন্ধান | Voter Information Finder',
  description: 'বাংলাদেশের ভোটার তথ্য দ্রুত এবং সহজে খুঁজে বের করুন। Search voter information in Bangladesh quickly and easily.',
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
      <body className={notoSerifBengali.className}>{children}</body>
    </html>
  );
}
