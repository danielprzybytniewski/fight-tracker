import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import { Fighter } from "@/types/fight-cards-schema.types";
import Image from "next/image";

export default function FightsCarouselFighterProfile({
  fighter,
}: {
  fighter: Fighter;
}) {
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
          className="object-cover rounded-full outline outline-gray-400 dark:outline-gray-600 shadow-xl"
        />
      </div>
      <p className="text-lg md:text-xl font-bold uppercase text-gray-800 dark:text-gray-100">
        <span className="inline md:block">{firstName}</span>
        <span className="inline md:hidden">&nbsp;</span>
        <span className="inline md:block md:font-black md:text-2xl">
          {lastName}
        </span>
      </p>
    </div>
  );
}
