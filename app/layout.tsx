import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import SessionProvider from '@/components/providers/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Talk to Legends - Converse with History\'s Greatest Minds',
  description: 'Experience revolutionary AI conversations with Einstein, Gandhi, Cleopatra and more legendary figures. Unlock timeless wisdom for modern challenges.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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