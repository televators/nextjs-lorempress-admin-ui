import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/globals.scss';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoremPress",
  description: "Admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          { children }

          {/* NOTE: Toast used in app/(main)/posts/edit/[id]/page.tsx */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
