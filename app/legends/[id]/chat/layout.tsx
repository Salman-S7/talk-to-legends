import { ThemeProvider } from '@/components/ui/theme-provider';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white transition-colors duration-500">
      {children}
    </div>
  );
}