"use client";
import { useFavorites } from "@/hooks/use-favorites";
import { Star } from "lucide-react";
import Link from "next/link";

export default function FavoritesCounter() {
  const { favorites } = useFavorites();

  return (
    <Link
      href="/favorites"
      className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg border border-transparent hover:border-yellow-500 transition-all"
    >
      <Star className="w-5 h-5 text-yellow-500" />
      <span>({favorites.length})</span>
    </Link>
  );
}
