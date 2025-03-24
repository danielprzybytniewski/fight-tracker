"use client";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import FavoritesEmptyState from "@/components/favorites/favorites-empty-state";
import FavoritesHeader from "@/components/favorites/favorites-header";
import FavoritesFighterGrid from "@/components/favorites/favorites-fighter-grid";

export default function FavoritesContainer() {
  const { favorites, resetFavoritesWithToast, toggleFavoriteWithToast } =
    useFavorites();
  const { toast } = useToast();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <FavoritesHeader
        favoritesCount={favorites.length}
        onResetFavorites={() => resetFavoritesWithToast(toast)}
      />
      {favorites.length === 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FavoritesFighterGrid
          favorites={favorites}
          toggleFavoriteWithToast={(fighter) =>
            toggleFavoriteWithToast(fighter, toast)
          }
        />
      )}
    </div>
  );
}
