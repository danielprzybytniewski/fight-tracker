"use client";
import { useFavorites } from "@/hooks/use-favorites";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoritesCounter() {
  const { favorites } = useFavorites();

  return (
    <Link
      href="/favorites"
      className="flex items-center py-2 px-1 text-sm rounded-lg border border-transparent hover:border-red-600 dark:hover:border-red-500 transition-colors duration-200"
    >
      <Heart className="w-5 h-5 mr-1 fill-red-500 text-red-500" />
      <span>({favorites.length})</span>
    </Link>
  );
}
