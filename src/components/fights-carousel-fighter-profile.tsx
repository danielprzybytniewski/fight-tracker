import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import { Fighter } from "@/types/fight-cards-schema.types";
import Image from "next/image";
import Link from "next/link";

export default function FightsCarouselFighterProfile({
  fighter,
}: {
  fighter: Fighter;
}) {
  const { firstName, lastName } = splitFighterFullName(fighter.name);

  return (
    <div className="flex flex-col items-center sm:px-4">
      <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-2 sm:mb-4">
        <Image
          src={fighter.picture}
          alt={fighter.name}
          fill
          sizes="(max-width: 640px) 7rem, 10rem"
          className="object-cover rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg"
          priority
        />
      </div>
      <p className="text-lg sm:text-xl font-bold uppercase mt-2 text-gray-800 dark:text-gray-100">
        <Link
          href={fighter.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
        >
          <span className="inline sm:block">{firstName}</span>
          <span className="inline sm:hidden">&nbsp;</span>
          <span className="inline sm:block">{lastName}</span>
        </Link>
      </p>
    </div>
  );
}
