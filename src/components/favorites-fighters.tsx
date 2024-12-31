"use client";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EventFighter from "@/components/event-fighter";
import { Trash2 } from "lucide-react";

export default function FavoritesFighters() {
  const { favorites, resetFavorites } = useFavorites();

  return (
    <Card className="max-w-7xl mx-auto bg-white dark:bg-gray-700 rounded-lg">
      <CardHeader className="text-center py-4 border-b border-zinc-200 dark:border-gray-500">
        <CardTitle className="text-2xl font-semibold text-zinc-900 dark:text-gray-100">
          Favorite Fighters ({favorites.length})
        </CardTitle>
        {favorites.length > 0 && (
          <button className="mx-auto" onClick={resetFavorites}>
            <Trash2 className="text-red-600 hover:text-red-500 hover:cursor-pointer" />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No favorite fighters yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-center">
            {favorites.map((fighter) => (
              <div
                key={fighter.name}
                className="flex flex-col items-center p-4 bg-slate-200 dark:bg-gray-800 rounded-lg hover:scale-105 
                hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
              >
                <EventFighter fighter={fighter} position="A" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
