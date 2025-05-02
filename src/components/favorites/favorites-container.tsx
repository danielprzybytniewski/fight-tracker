"use client";
import FavoritesEmptyState from "@/components/favorites/favorites-empty-state";
import FavoritesFighterGrid from "@/components/favorites/favorites-fighter-grid";
import FavoritesHeader from "@/components/favorites/favorites-header";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

export default function FavoritesContainer() {
  const { favorites, resetFavoritesWithToast, toggleFavoriteWithToast } =
    useFavorites();
  const { toast } = useToast();

  return (
    <div className="mx-auto w-full max-w-7xl">
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
