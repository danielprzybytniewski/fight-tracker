import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Fighter } from "@/types/rankings-schema.types";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type FighterCardProps = {
  fighter: Fighter;
};

export default function FighterCard({ fighter }: FighterCardProps) {
  const { isFavorite, toggleFavoriteWithToast } = useFavorites();
  const { toast } = useToast();

  return (
    <div className="relative">
      <button
        aria-label="favorite"
        className="absolute top-1 right-1 p-1 z-10"
        onClick={() => toggleFavoriteWithToast(fighter, toast)}
      >
        <Heart
          data-testid="favorite-icon"
          size={20}
          className={cn(
            "transition-all duration-200 hover:scale-110",
            isFavorite(fighter)
              ? "fill-red-500 text-red-500 hover:fill-red-600 hover:text-red-600 hover:scale-110"
              : "text-red-500 hover:text-red-600 dark:text-red-400 hover:dark:text-red-500"
          )}
        />
      </button>
      <Link href={`/athlete/${fighter.id}`} className="block group">
        <Card className="relative flex flex-col h-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-md">
          <CardHeader className="p-0">
            <div className="relative h-60 sm:h-64 md:h-72 lg:h-80 bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-t-xl">
              {fighter.imgUrl && (
                <Image
                  src={fighter.imgUrl}
                  alt={fighter.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <CardDescription className="text-sm sm:mb-1 sm:min-h-5 text-gray-500 dark:text-gray-400">
              {fighter.nickname && <span>&quot;{fighter.nickname}&quot;</span>}
            </CardDescription>
            <CardTitle className="mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-100">
              {fighter.name}
            </CardTitle>
            {fighter.category && (
              <span
                className="inline-block px-3 py-1 mb-2 text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 
                dark:text-gray-300 rounded-full"
              >
                {fighter.category}
              </span>
            )}
          </CardContent>
          <CardFooter className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-b-xl">
            <div className="flex items-center justify-around w-full space-x-3">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Wins
                </span>
                <span className="font-medium text-green-500">
                  {fighter.wins ?? 0}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Losses
                </span>
                <span className="font-medium text-red-500">
                  {fighter.losses ?? 0}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Draws
                </span>
                <span className="font-medium text-gray-500">
                  {fighter.draws ?? 0}
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
