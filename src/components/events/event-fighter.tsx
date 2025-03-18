"use client";
import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import { Fighter } from "@/types/fight-cards-schema.types";
import Image from "next/image";
import fallbackImage from "@/public/images/og-image.png";
import { useFavorites } from "@/hooks/use-favorites";
import { CircleCheck, CircleX, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type EventFighterProps = {
  fighter: Fighter;
};

export default function EventFighter({ fighter }: EventFighterProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const { firstName, lastName } = splitFighterFullName(fighter.name);
  const imageUrl = fighter.picture.startsWith("https")
    ? fighter.picture
    : fallbackImage;

  const handleToggleFavorite = (fighter: Fighter) => {
    toggleFavorite(fighter);

    if (isFavorite(fighter)) {
      toast({
        description: (
          <div className="flex items-center">
            <CircleX className="mr-2" />
            <span>{`${fighter.name} removed from favorites!`}</span>
          </div>
        ),
        variant: "destructive",
      });
    } else {
      toast({
        description: (
          <div className="flex items-center">
            <CircleCheck className="mr-2" />
            <span>{`${fighter.name} added to favorites!`}</span>
          </div>
        ),
      });
    }
  };

  return (
    <>
      <div className="relative">
        <Image
          src={imageUrl}
          alt={fighter.name}
          width={130}
          height={130}
          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full outline outline-gray-300 dark:outline-gray-600 
          shadow-md"
          priority
        />
        <button
          aria-label="favorite"
          className="absolute top-1 left-[-8px] md:group-[.fighter-b]:left-auto md:group-[.fighter-b]:right-[-8px] p-1 rounded-full bg-gray-50 dark:bg-gray-800 shadow-md transition-colors"
          onClick={() => handleToggleFavorite(fighter)}
        >
          <StarIcon
            data-testid="favorite-icon"
            size={20}
            className={cn(
              "transition-all duration-200 hover:scale-110",
              isFavorite(fighter)
                ? "fill-yellow-500 text-yellow-500 hover:fill-yellow-600 hover:text-yellow-600 hover:scale-110"
                : "text-gray-500 hover:text-gray-400"
            )}
          />
        </button>
      </div>
      <div>
        <p
          className="block mt-2 md:mt-0 text-sm sm:text-lg uppercase font-bold text-gray-900
          dark:text-gray-100"
        >
          <span className="inline sm:block">{firstName}</span>
          <span className="inline sm:hidden">&nbsp;</span>
          <span className="inline sm:block">{lastName}</span>
        </p>
        <div
          className="flex flex-row sm:flex-col items-center justify-center md:items-center md:group-[.fighter-a]:items-start
         md:group-[.fighter-b]:items-end mt-1"
        >
          <Image
            src={fighter.country}
            alt={`${fighter.name} country`}
            width={24}
            height={16}
            className="inline-block w-5 h-3 sm:w-6 sm:h-4 ml-2 sm:ml-0 order-2 sm:order-1 text-gray-600 dark:text-gray-400"
          />
          <p className="mt-0 sm:mt-1 order-1 sm:order-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {fighter.record}
          </p>
        </div>
      </div>
    </>
  );
}
