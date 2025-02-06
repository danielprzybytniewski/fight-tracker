import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ChampionBadge from "@/components/champion-badge";
import { DivisionWithChampion } from "@/types/rankings-schema.types";

type DivisionChampionCardProps = {
  division: DivisionWithChampion;
};

export default function DivisionChampionCard({
  division,
}: DivisionChampionCardProps) {
  return (
    <Link href={`/athlete/${division.champion.id}`} className="block">
      <Card
        className="mb-12 overflow-hidden bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 shadow-lg group"
      >
        <CardContent className="p-6 flex justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {division.champion.imgUrl && (
              <div className="relative w-64 h-64 rounded-full border-2 border-gray-900 dark:border-gray-100 overflow-hidden   group-hover:border-yellow-400 transition-colors duration-200">
                <Image
                  src={division.champion.imgUrl}
                  alt={division.champion.championName}
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="16rem"
                />
              </div>
            )}
            <div className="text-center md:text-left text-gray-900 dark:text-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {division.champion.championName}
              </h3>
              <div className="flex justify-center md:justify-start mb-2">
                <ChampionBadge />
              </div>
              <p className="text-xl mt-4 font-semibold">
                Record: {division.champion.wins}-{division.champion.losses}
                {division.champion.draws !== 0 && `-${division.champion.draws}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
