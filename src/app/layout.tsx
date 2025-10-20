import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import { createMetadata } from "@/lib/create-metadata";
import { FavoritesProvider } from "@/providers/favorites-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata({
  title: "Dive Into the World of MMA",
  description:
    "The ultimate MMA and UFC resource: Discover comprehensive profiles of top UFC fighters, current UFC rankings, event cards from organizations like UFC, PFL, RIZIN and ONE, breaking news from MMA world, interviews, betting odds, predictions and more, all in one place.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-gray-200 antialiased dark:bg-gray-800`}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FavoritesProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="container mx-auto flex-1 pb-16 pt-20">
                  {children}
                </main>
                <Footer />
                <Toaster />
              </div>
            </FavoritesProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
