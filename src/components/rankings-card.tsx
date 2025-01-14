import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChampionBadge from "@/components/champion-badge";
import Link from "next/link";
import { Division } from "@/types/rankings-schema.types";

type RankingsCardProps = {
  division: Division;
};

export default function RankingsCard({ division }: RankingsCardProps) {
  return (
    <Link
      href={`/rankings/${division.id}`}
      key={division.id}
      className="block transition-transform duration-300 hover:scale-105"
    >
      <Card className="overflow-hidden h-full bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow">
        <CardHeader className="p-0">
          {division.champion.imgUrl && (
            <div className="relative w-full h-64 sm:h-72 bg-gray-300 dark:bg-gray-700">
              <Image
                src={division.champion.imgUrl}
                alt={division.champion.championName}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">
            {division.categoryName}
          </CardTitle>
          <div className="flex justify-center items-center mt-3 md:mt-4">
            <ChampionBadge />
          </div>
          <p className="text-base md:text-lg font-semibold text-center mt-2 text-gray-700 dark:text-gray-300">
            {division.champion.championName}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
