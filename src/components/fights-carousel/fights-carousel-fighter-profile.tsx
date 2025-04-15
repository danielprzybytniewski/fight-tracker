import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import { FightCardsFighter } from "@/types/fight-cards-schema.types";
import Image from "next/image";

type FightsCarouselFighterProfileProps = {
  fighter: FightCardsFighter;
};

export default function FightsCarouselFighterProfile({
  fighter,
}: FightsCarouselFighterProfileProps) {
  const { firstName, lastName } = splitFighterFullName(fighter.name);

  return (
    <div className="flex flex-col items-center md:px-4">
      <div className="relative w-28 h-28 md:w-40 md:h-40 mb-2 md:mb-4">
        <Image
          src={fighter.picture}
          alt={fighter.name}
          fill
          priority
          sizes="(max-width: 640px) 7rem, 10rem"
          className="object-cover object-top rounded-full outline outline-gray-400 dark:outline-gray-600 shadow-xl"
        />
      </div>
      <p className="text-lg md:text-xl font-bold uppercase text-gray-800 dark:text-gray-100">
        <span className="inline md:block">{firstName}</span>
        <span className="inline md:hidden">&nbsp;</span>
        <span className="inline md:block md:font-black md:text-2xl">
          {lastName}
        </span>
      </p>
      <div className="flex flex-row items-center justify-center mt-1">
        <Image
          src={fighter.country}
          alt={`${fighter.name} country`}
          width={24}
          height={16}
          className="inline-block w-5 h-3 md:w-6 md:h-4 mr-2 text-gray-600 dark:text-gray-400"
        />
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          {fighter.record}
        </p>
      </div>
    </div>
  );
}
