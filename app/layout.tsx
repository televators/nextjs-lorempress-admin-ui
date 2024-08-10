import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/globals.scss';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from '@/components/ui/toaster';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

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
          <Navbar />

          <div className="flex">
            <div className="hidden md:block h-[100vh] w-[300px]">
              <Sidebar />
            </div>

            <div className="p-5 w-full md:max-w-[1140px]">
              {children}
            </div>w
          </div>

          {/* NOTE: Toast used in app/(main)/posts/edit/[id]/page.tsx */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
