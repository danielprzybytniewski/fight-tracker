"use client";
import Image from "next/image";
import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import fallbackImage from "@/public/images/og-image.png";
import type { FightCardsFighter } from "@/types/fight-cards-schema.types";

type EventFighterProps = {
  fighter: FightCardsFighter;
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
          priority
          className="h-28 w-28 rounded-full object-cover object-top shadow-md outline outline-gray-300 dark:outline-gray-600 sm:h-32 sm:w-32"
        />
      </div>
      <div>
        <p className="mt-2 block text-sm font-bold uppercase text-gray-900 dark:text-gray-100 sm:text-lg lg:mt-0">
          <span className="inline sm:block">{firstName}</span>
          <span className="inline sm:hidden">&nbsp;</span>
          <span className="inline sm:block">{lastName}</span>
        </p>
        <div className="mt-1 flex flex-row items-center justify-center sm:flex-col lg:items-center lg:group-[.fighter-a]:items-start lg:group-[.fighter-b]:items-end">
          <Image
            src={fighter.country}
            alt={`${fighter.name} country`}
            width={24}
            height={16}
            className="order-2 ml-2 inline-block h-3 w-5 text-gray-600 dark:text-gray-400 sm:order-1 sm:ml-0 sm:h-4 sm:w-6"
          />
          <p className="order-1 mt-0 text-xs text-gray-600 dark:text-gray-400 sm:order-2 sm:mt-1 sm:text-sm">
            {fighter.record}
          </p>
        </div>
      </div>
    </>
  );
}
