"use client";
import { routesConfig } from "@/config/routes-config";
import { useActiveLink } from "@/hooks/use-active-link";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoritesCounter() {
  const { favorites } = useFavorites();
  const isActive = useActiveLink(routesConfig.favorites);

  return (
    <Link
      href={routesConfig.favorites}
      className={cn(
        `flex items-center py-2 px-1 text-sm rounded-lg hover:border-red-600 dark:hover:border-red-500 transition-colors duration-200`,
        isActive
          ? "border border-red-600 dark:border-red-500"
          : "border border-transparent hover:border-red-600 dark:hover:border-red-500"
      )}
    >
      <Heart className="w-5 h-5 mr-1 fill-red-500 text-red-500" />
      <span>({favorites.length})</span>
    </Link>
  );
}
