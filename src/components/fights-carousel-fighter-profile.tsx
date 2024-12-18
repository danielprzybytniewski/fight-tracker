import { Fighter } from "@/types/fight-cards-schema.types";
import Image from "next/image";
import Link from "next/link";

export default function FightsCarouselFighterProfile({
  fighter,
}: {
  fighter: Fighter;
}) {
  return (
    <div className="flex flex-col items-center sm:px-3">
      <div className="relative w-32 h-32">
        <Image
          src={fighter.picture}
          alt={fighter.name}
          fill
          sizes="128px"
          className="object-cover rounded-full"
          priority
        />
      </div>
      <p className="text-xl font-bold uppercase mt-1 text-zinc-900 dark:text-gray-100">
        <Link
          href={fighter.link}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:underline"
        >
          {fighter.name}
        </Link>
      </p>
    </div>
  );
}
