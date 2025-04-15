import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ChampionBadge from "@/components/division/division-champion-badge";
import { DivisionWithChampion } from "@/types/rankings-schema.types";
import { Button } from "@/components/ui/button";
import { routesConfig } from "@/config/routes-config";

type DivisionChampionCardProps = {
  division: DivisionWithChampion;
};

export default function DivisionChampionCard({
  division,
}: DivisionChampionCardProps) {
  return (
    <Card
      className="mb-12 overflow-hidden bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 shadow-lg"
    >
      <CardContent className="p-6 flex justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {division.champion.imgUrl && (
            <div className="relative w-64 h-64 rounded-full border-2 border-gray-900 dark:border-gray-100 overflow-hidden">
              <Image
                src={division.champion.imgUrl}
                alt={division.champion.championName}
                fill
                priority
                className="object-cover object-top"
                sizes="16rem"
              />
            </div>
          )}
          <div className="text-center md:text-left text-gray-900 dark:text-gray-100">
            <h3 className="text-xl md:text-2xl font-bold mb-1">
              {division.champion.championName}
            </h3>
            <div className="flex justify-center md:justify-start mb-1">
              <ChampionBadge />
            </div>
            <p className="text-base md:text-xl mt-1 font-semibold">
              Record: {division.champion.wins}-{division.champion.losses}
              {division.champion.draws !== 0 && `-${division.champion.draws}`}
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-2 h-7 md:h-8 px-2 md:px-3 py-1 md:py-2 text-xs md:text-base border-gray-600 dark:border-gray-300 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Link href={routesConfig.champion(division.champion.id)}>
                View Athlete
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
