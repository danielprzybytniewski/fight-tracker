import FavoritesFighters from "@/components/favorites-fighters";
import { createMetadata } from "@/lib/create-metadata";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Favorites",
  description: "Check out your favorite fighters",
  path: "/favorites",
});

export default function FavoritesPage() {
  return <FavoritesFighters />;
}
