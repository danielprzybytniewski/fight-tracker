"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { routesConfig } from "@/config/routes-config";
import { useActiveLink } from "@/hooks/use-active-link";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export default function FavoritesCounter() {
  const { favorites } = useFavorites();
  const isActive = useActiveLink(routesConfig.favorites);

  return (
    <Link
      href={routesConfig.favorites}
      className={cn(
        `flex items-center rounded-lg px-1 py-2 text-sm transition-colors duration-200 hover:border-red-600 dark:hover:border-red-500`,
        isActive
          ? "border border-red-600 dark:border-red-500"
          : "border border-transparent hover:border-red-600 dark:hover:border-red-500",
      )}
    >
      <Heart className="mr-1 h-5 w-5 fill-red-500 text-red-500" />
      <span>({favorites.length})</span>
    </Link>
  );
}
