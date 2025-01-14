import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ChampionBadge from "@/components/champion-badge";
import { Division, Fighter } from "@/types/rankings-schema.types";

type DivisionChampionCardProps = {
  division: Division & { champion: Fighter };
};

export default function DivisionChampionCard({
  division,
}: DivisionChampionCardProps) {
  return (
    <Link
      href={`/athlete/${division.champion.id}`}
      className="block transition-transform duration-300 hover:scale-105"
    >
      <Card
        className="mb-12 overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
        dark:from-yellow-700 dark:via-yellow-600 dark:to-yellow-500 shadow-lg"
      >
        <CardContent className="p-6 flex justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {division.champion.imgUrl && (
              <div
                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-black 
                dark:border-white shadow-lg"
              >
                <Image
                  src={division.champion.imgUrl}
                  alt={division.champion.championName}
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="256px"
                />
              </div>
            )}
            <div className="text-center md:text-left text-gray-900 dark:text-gray-100">
              <h3 className="text-3xl font-bold mb-2">
                {division.champion.championName}
              </h3>
              <div className="flex justify-center md:justify-start mb-2">
                <ChampionBadge />
              </div>
              <p className="text-xl mt-4 font-semibold">
                Record: {division.champion.wins}-{division.champion.losses}
                {division.champion.draws !== "0" &&
                  `-${division.champion.draws}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
