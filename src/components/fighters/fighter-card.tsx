import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Fighter } from "@/types/rankings-schema.types";

type FighterCardProps = {
  fighter: Fighter;
};

export default function FighterCard({ fighter }: FighterCardProps) {
  return (
    <Link href={`/athlete/${fighter.id}`}>
      <Card className="h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out group">
        <CardHeader className="p-0">
          <div className="relative h-60 sm:h-64 md:h-72 lg:h-80 bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-t-xl">
            {fighter.imgUrl && (
              <Image
                src={fighter.imgUrl}
                alt={fighter.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover object-top brightness-100 group-hover:brightness-105 group-hover:scale-105 transition-all duration-300"
                priority={true}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6 text-center">
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400 sm:mb-1 sm:min-h-5">
            <span>{fighter.nickname && `"${fighter.nickname}"`}</span>
          </CardDescription>
          <CardTitle className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            <span>{fighter.name}</span>
          </CardTitle>
          {fighter.category && (
            <span
              className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold
             px-3 py-1 rounded-full mb-2"
            >
              {fighter.category}
            </span>
          )}
        </CardContent>
        <CardFooter className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-b-xl">
          <div className="flex items-center justify-around w-full space-x-3">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Wins
              </span>
              <span className="text-green-500 font-medium">
                {fighter.wins ?? 0}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Losses
              </span>
              <span className="text-red-500 font-medium">
                {fighter.losses ?? 0}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Draws
              </span>
              <span className="text-gray-500 font-medium">
                {fighter.draws ?? 0}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
