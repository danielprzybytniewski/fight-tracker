import { fighterFullNameSplitter } from "@/lib/fighter-full-name-splitter";
import { Fighter } from "@/types/fight-cards-schema.types";
import Image from "next/image";
import Link from "next/link";

export default function EventFighter({ fighter }: { fighter: Fighter }) {
  const { firstName, lastName } = fighterFullNameSplitter(fighter.name);
  return (
    <>
      <Image
        src={fighter.picture}
        alt={fighter.name}
        width={84}
        height={84}
        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-2 border-zinc-300 dark:border-gray-500"
        priority
      />
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
