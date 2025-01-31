"use client";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EventFighter from "@/components/event-fighter";
import { CircleX, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FavoritesFighters() {
  const { favorites, resetFavorites } = useFavorites();
  const { toast } = useToast();

  const handleResetFavorites = () => {
    resetFavorites();

    toast({
      description: (
        <div className="flex items-center">
          <CircleX className="mr-2" />
          <span>{"All fighters removed from favorites!"}</span>
        </div>
      ),
      variant: "destructive",
    });
  };

  return (
    <Card className="max-w-7xl mx-auto bg-gray-200 dark:bg-gray-900 shadow-lg">
      <CardHeader className="text-center py-4 border-b border-gray-300 dark:border-gray-500">
        <CardTitle
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 
        dark:to-gray-400 bg-clip-text text-transparent"
        >
          Favorite Fighters ({favorites.length})
        </CardTitle>
        {favorites.length > 0 && (
          <button className="mx-auto" onClick={handleResetFavorites}>
            <Trash2 className="text-red-600 hover:text-red-500 hover:cursor-pointer" />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-8 sm:p-4">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No favorite fighters yet
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-center">
            {favorites.map((fighter) => (
              <div
                key={fighter.name}
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <EventFighter fighter={fighter} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
