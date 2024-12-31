"use client";
import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import { Fighter } from "@/types/fight-cards-schema.types";
import Image from "next/image";
import Link from "next/link";
import fallbackImage from "../../public/images/og-image.png";
import { useFavorites } from "@/hooks/use-favorites";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type EventFighterProps = {
  fighter: Fighter;
  position: string;
};

export default function EventFighter({ fighter, position }: EventFighterProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { firstName, lastName } = splitFighterFullName(fighter.name);
  const imageUrl = fighter.picture.startsWith("https")
    ? fighter.picture
    : fallbackImage;

  return (
    <>
      <div className="relative">
        <Image
          src={imageUrl}
          alt={fighter.name}
          width={84}
          height={84}
          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-2 border-zinc-300 dark:border-gray-500"
          priority
        />
        <button
          aria-label="favorite"
          className={cn(
            "absolute top-1 p-1 rounded-full bg-white dark:bg-gray-700 shadow-md",
            position === "A" ? "left-[-12px]" : "right-[-12px]"
          )}
          onClick={() => toggleFavorite(fighter)}
        >
          <StarIcon
            data-testid="favorite-icon"
            size={20}
            className={cn(
              "transition-all",
              isFavorite(fighter)
                ? "fill-yellow-500 text-yellow-500 hover:fill-yellow-600 hover:text-yellow-600"
                : "text-gray-500 hover:text-gray-400"
            )}
          />
        </button>
      </div>
      <div>
        <Link
          href={fighter.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 sm:mt-0 text-sm sm:text-lg uppercase font-bold text-zinc-900 dark:text-gray-100 
          hover:underline transition-all"
        >
          <span className="block sm:inline">{firstName}</span>
          <span className="hidden sm:inline">&nbsp;</span>
          <span className="block sm:inline">{lastName}</span>
        </Link>
        <Image
          src={fighter.country}
          alt={`${fighter.name} country`}
          width={18}
          height={18}
          className="w-auto h-auto inline-block mt-1"
        />
        <p className="text-sm text-zinc-600 dark:text-gray-400 mt-2 sm:mt-1">
          {fighter.record}
        </p>
      </div>
    </>
  );
}
