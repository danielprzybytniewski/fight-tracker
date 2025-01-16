import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { FavoritesProvider } from "@/providers/favorites-provider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fight Tracker",
  description: "Info about UFC rankings and upcoming MMA events",
  keywords:
    "MMA, UFC, Mixed Martial Arts, fight events, upcoming fights, upcoming fight events, sports events, fight tracker, UFC rankings, rankings,  athletes, fighters, UFC fighters, divisions, champions, weight classes, weight divisions",
  openGraph: {
    title: "Fight Tracker",
    description: "Info about UFC rankings and upcoming MMA events",
    images: ["https://fight-tracker.vercel.app/images/og-image.png"],
    type: "website",
    url: "https://fight-tracker.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased bg-slate-200 dark:bg-gray-800`}
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
