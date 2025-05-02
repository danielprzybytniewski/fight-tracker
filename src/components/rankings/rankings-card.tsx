import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { routesConfig } from "@/config/routes-config";
import type { Division } from "@/types/rankings-schema.types";

type RankingsCardProps = {
  division: Division;
};

export default function RankingsCard({ division }: RankingsCardProps) {
  return (
    <Link href={routesConfig.rankingDetails(division.id)}>
      <Card className="group h-full overflow-hidden bg-gray-50 shadow-md transition-colors duration-300 hover:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-300">
        <CardHeader className="p-0">
          {division.champion.imgUrl && (
            <div className="relative h-64 w-full overflow-hidden bg-gray-300 dark:bg-gray-700 sm:h-72">
              <Image
                src={division.champion.imgUrl}
                alt={division.champion.championName}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center p-4 md:p-6">
          <div className="text-base font-medium text-gray-700 dark:text-gray-400 md:text-lg">
            {division.champion.championName}
          </div>
          <h3 className="mt-1 text-center text-lg font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl lg:text-2xl">
            {division.categoryName}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
