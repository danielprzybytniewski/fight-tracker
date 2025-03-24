import { Trash2 } from "lucide-react";

type FavoritesHeaderProps = {
  favoritesCount: number;
  onResetFavorites: () => void;
};

export default function FavoritesHeader({
  favoritesCount,
  onResetFavorites,
}: FavoritesHeaderProps) {
  return (
    <div className="text-center py-4">
      <div
        className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200
    dark:to-gray-400 bg-clip-text text-transparent"
      >
        <h1 className="inline mr-1">Favorite Fighters</h1>
        <span className="inline">({favoritesCount})</span>
      </div>
      {favoritesCount > 0 && (
        <button
          className="mx-auto mt-2"
          onClick={onResetFavorites}
          aria-label="Reset favorites"
        >
          <Trash2
            className="text-red-500 hover:text-red-600 dark:text-red-600 dark:hover:text-red-500 
        hover:cursor-pointer"
          />
        </button>
      )}
    </div>
  );
}
