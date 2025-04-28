import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/providers/theme-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { FavoritesProvider } from "@/providers/favorites-provider";
import { Toaster } from "@/components/ui/toaster";
import { createMetadata } from "@/lib/create-metadata";

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
        className={`${roboto.className} antialiased bg-gray-200 dark:bg-gray-800`}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FavoritesProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="container mx-auto flex-1 pt-20 pb-16">
                  {children}
                </main>
                <Footer />
                <Toaster />
              </div>
            </FavoritesProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
