import Image from "next/image";
import Link from "next/link";
import ChampionBadge from "@/components/division/division-champion-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { routesConfig } from "@/config/routes-config";
import type { DivisionWithChampion } from "@/types/rankings-schema.types";

type DivisionChampionCardProps = {
  division: DivisionWithChampion;
};

export default function DivisionChampionCard({
  division,
}: DivisionChampionCardProps) {
  return (
    <Card className="mb-12 overflow-hidden bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-lg dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
      <CardContent className="flex justify-center p-6">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          {division.champion.imgUrl && (
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-gray-900 dark:border-gray-100">
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
          <div className="text-center text-gray-900 dark:text-gray-100 md:text-left">
            <h3 className="mb-1 text-xl font-bold md:text-2xl">
              {division.champion.championName}
            </h3>
            <div className="mb-1 flex justify-center md:justify-start">
              <ChampionBadge />
            </div>
            <p className="mt-1 text-base font-semibold md:text-xl">
              Record: {division.champion.wins}-{division.champion.losses}
              {division.champion.draws !== 0 && `-${division.champion.draws}`}
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-2 h-7 border-gray-600 bg-gray-200 px-2 py-1 text-xs text-gray-900 transition-colors duration-200 hover:bg-gray-300 dark:border-gray-300 dark:bg-gray-500 dark:text-gray-100 dark:hover:bg-gray-600 md:h-8 md:px-3 md:py-2 md:text-base"
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
