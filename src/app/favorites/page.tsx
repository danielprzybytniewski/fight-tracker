import FavoritesFighters from "@/components/favorites-fighters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites | Fight Tracker",
  description: "Your favorite fighters",
  keywords:
    "MMA, UFC, Mixed Martial Arts, fight events, upcoming fights, upcoming fight events, fight tracker, Favorites, your favorite fighters, fight tracker",
  openGraph: {
    title: "Favorites | Fight Tracker",
    description: "Your favorite fighters",
    images: ["https://fight-tracker.vercel.app/images/og-image.png"],
    type: "website",
    url: "https://fight-tracker.vercel.app/favorites",
  },
};

export default function FavoritesPage() {
  return <FavoritesFighters />;
}
