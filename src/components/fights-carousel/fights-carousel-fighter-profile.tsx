import Image from "next/image";
import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import type { FightCardsFighter } from "@/types/fight-cards-schema.types";

type FightsCarouselFighterProfileProps = {
  fighter: FightCardsFighter;
};

export default function FightsCarouselFighterProfile({
  fighter,
}: FightsCarouselFighterProfileProps) {
  const { firstName, lastName } = splitFighterFullName(fighter.name);

  return (
    <div className="flex flex-col items-center md:px-4">
      <div className="relative mb-2 h-28 w-28 md:mb-4 md:h-40 md:w-40">
        <Image
          src={fighter.picture}
          alt={fighter.name}
          fill
          priority
          sizes="(max-width: 768px) 7rem, 10rem"
          className="rounded-full object-cover object-top shadow-xl outline outline-gray-400 dark:outline-gray-600"
        />
      </div>
      <p className="text-lg font-bold uppercase text-gray-800 dark:text-gray-100 md:text-xl">
        <span className="inline md:block">{firstName}</span>
        <span className="inline md:hidden">&nbsp;</span>
        <span className="inline md:block md:text-2xl md:font-black">
          {lastName}
        </span>
      </p>
      <div className="mt-1 flex flex-row items-center justify-center">
        <Image
          src={fighter.country}
          alt={`${fighter.name} country`}
          width={24}
          height={16}
          className="mr-2 inline-block h-3 w-5 text-gray-600 dark:text-gray-400 md:h-4 md:w-6"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
          {fighter.record}
        </p>
      </div>
    </div>
  );
}
