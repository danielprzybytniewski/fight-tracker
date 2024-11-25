import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fight Tracker",
  description: "Info about upcoming MMA events",
  keywords:
    "MMA,UFC, Mixed Martial Arts, fight events, upcoming fights, upcoming fight events, fight tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
