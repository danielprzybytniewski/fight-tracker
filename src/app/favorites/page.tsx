import type { Metadata } from "next";
import FavoritesContainer from "@/components/favorites/favorites-container";
import { createMetadata } from "@/lib/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Favorite Fighters",
  description: "Check out your favorite fighters",
  path: "/favorites",
});

export default async function FavoritesPage() {
  return <FavoritesContainer />;
}
