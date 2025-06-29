import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import SessionProvider from '@/components/providers/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Talk to Legends - Converse with History\'s Greatest Minds',
  description: 'Experience revolutionary AI conversations with Einstein, Gandhi, Cleopatra and more legendary figures. Unlock timeless wisdom for modern challenges through advanced AI technology.',
  keywords: 'AI conversations, historical figures, Einstein, Gandhi, Cleopatra, artificial intelligence, history, education, wisdom, chat',
  authors: [{ name: 'Talk to Legends' }],
  creator: 'Talk to Legends',
  publisher: 'Talk to Legends',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://talk-to-legends.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Talk to Legends - Converse with History\'s Greatest Minds',
    description: 'Experience revolutionary AI conversations with Einstein, Gandhi, Cleopatra and more legendary figures. Unlock timeless wisdom for modern challenges.',
    url: 'https://talk-to-legends.com',
    siteName: 'Talk to Legends',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Talk to Legends - AI Conversations with Historical Figures',
      },
      {
        url: '/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'Talk to Legends - AI Conversations with Historical Figures',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk to Legends - Converse with History\'s Greatest Minds',
    description: 'Experience revolutionary AI conversations with Einstein, Gandhi, Cleopatra and more legendary figures. Unlock timeless wisdom for modern challenges.',
    images: ['/og-image.png'],
    creator: '@talktolegendsai',
    site: '@talktolegendsai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#16a34a' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white transition-colors duration-500">
              <main className="min-h-screen">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}