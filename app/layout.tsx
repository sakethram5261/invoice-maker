import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Free Invoice Generator — Create PDF Invoices Instantly',
  description:
    'Free online invoice generator. Create professional PDF invoices in seconds with zero sign-up or registration. Download or print instantly.',
  keywords: 'free invoice generator, invoice generator online, pdf invoice maker, free invoice template, online billing tool',
  verification: {
    google: 'cK7R0r8CMaUlH7grxM8Hjufgud-8b2pPbRBFDZg_3e0',
  },
  openGraph: {
    title: 'Free Invoice Generator — No Sign Up Required',
    description: 'Instant, professional PDF invoice maker for freelancers and small businesses.',
    url: 'https://invoicefree.app',
    siteName: 'InvoiceFree',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="cK7R0r8CMaUlH7grxM8Hjufgud-8b2pPbRBFDZg_3e0" />
        <link rel="canonical" href="https://invoice-maker-7tr.pages.dev" />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white transition-colors">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
