import FavoritesFighters from "@/components/favorites-fighters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites | Fight Tracker",
  description: "Check out your favorite fighters",
  keywords: "favorites, your favorite fighters, top fighters",
  openGraph: {
    title: "Favorites | Fight Tracker",
    description: "Check out your favorite fighters",
    images: ["https://fight-tracker.vercel.app/images/og-image.png"],
    type: "website",
    url: "https://fight-tracker.vercel.app/favorites",
  },
};

export default function FavoritesPage() {
  return <FavoritesFighters />;
}
