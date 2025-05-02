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
    <div className="py-4 text-center">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-2xl font-bold text-transparent dark:from-gray-200 dark:to-gray-400 sm:text-4xl">
        <h1 className="mr-1 inline">Favorite Fighters</h1>
        <span className="inline">({favoritesCount})</span>
      </div>
      {favoritesCount > 0 && (
        <button
          onClick={onResetFavorites}
          className="mx-auto mt-2"
          aria-label="Reset favorites"
        >
          <Trash2 className="text-red-500 hover:cursor-pointer hover:text-red-600 dark:text-red-600 dark:hover:text-red-500" />
        </button>
      )}
    </div>
  );
}
