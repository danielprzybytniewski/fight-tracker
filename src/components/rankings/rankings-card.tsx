import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Division } from "@/types/rankings-schema.types";

type RankingsCardProps = {
  division: Division;
};

export default function RankingsCard({ division }: RankingsCardProps) {
  return (
    <Link href={`/rankings/${division.id}`}>
      <Card className="overflow-hidden h-full bg-gray-50 dark:bg-gray-800 shadow-md group">
        <CardHeader className="p-0">
          {division.champion.imgUrl && (
            <div className="overflow-hidden relative w-full h-64 sm:h-72 bg-gray-300 dark:bg-gray-700">
              <Image
                src={division.champion.imgUrl}
                alt={division.champion.championName}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center p-4 md:p-6">
          <div className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-400">
            {division.champion.championName}
          </div>
          <h3 className="mt-1 text-lg sm:text-xl lg:text-2xl font-extrabold text-center tracking-tight text-gray-900 dark:text-gray-100">
            {division.categoryName}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
