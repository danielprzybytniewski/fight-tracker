"use client";
import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import { Fighter } from "@/types/fight-cards-schema.types";
import Image from "next/image";
import fallbackImage from "@/public/images/og-image.png";

type EventFighterProps = {
  fighter: Fighter;
};

export default function EventFighter({ fighter }: EventFighterProps) {
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
          width={130}
          height={130}
          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full outline outline-gray-300 dark:outline-gray-600 
          shadow-md"
          priority
        />
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
