import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routesConfig } from "@/config/routes-config";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Fighter } from "@/types/rankings-schema.types";

type FighterCardProps = {
  fighter: Fighter;
};

export default function FighterCard({ fighter }: FighterCardProps) {
  const { isFavorite, toggleFavoriteWithToast } = useFavorites();
  const { toast } = useToast();

  return (
    <div className="relative">
      <button
        onClick={() => toggleFavoriteWithToast(fighter, toast)}
        className="absolute right-1 top-1 z-10 p-1"
        aria-label="favorite"
      >
        <Heart
          data-testid="favorite-icon"
          size={20}
          className={cn(
            "transition-all duration-200 hover:scale-110",
            isFavorite(fighter)
              ? "fill-red-500 text-red-500 hover:scale-110 hover:fill-red-600 hover:text-red-600"
              : "text-red-500 hover:text-red-600 dark:text-red-400 hover:dark:text-red-500",
          )}
        />
      </button>
      <Link href={routesConfig.athlete(fighter.id)}>
        <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-gray-50 shadow-md transition-colors duration-300 hover:border-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-300">
          <CardHeader className="p-0">
            <div className="relative h-60 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800 sm:h-64 md:h-72 lg:h-80">
              {fighter.imgUrl && (
                <Image
                  src={fighter.imgUrl}
                  alt={fighter.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400 sm:mb-1 sm:min-h-5">
              {fighter.nickname && <span>&quot;{fighter.nickname}&quot;</span>}
            </CardDescription>
            <CardTitle className="mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-100">
              {fighter.name}
            </CardTitle>
            {fighter.category && (
              <span className="mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                {fighter.category}
              </span>
            )}
          </CardContent>
          <CardFooter className="rounded-b-xl border-t border-gray-200 bg-gray-100 p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex w-full items-center justify-around space-x-3">
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
