import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Fighter } from "@/types/rankings-schema.types";

type DivisionFighterCardProps = {
  fighter: Fighter;
  index: number;
};

export default function DivisionAthleteCard({
  fighter,
  index,
}: DivisionFighterCardProps) {
  return (
    <Link href={`/athlete/${fighter.id}`} className="block ">
      <Card className="overflow-hidden h-full bg-white dark:bg-gray-800 shadow-lg group">
        <CardContent className="p-6 text-center sm:text-left">
          <div className="flex flex-col items-center sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Badge
              variant="secondary"
              className="text-lg px-3 py-1 bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
            >
              #{index + 1}
            </Badge>
            {fighter.imgUrl && (
              <div className="relative w-28 h-32 sm:w-32 sm:h-32 overflow-hidden">
                <Image
                  src={fighter.imgUrl}
                  alt={fighter.name}
                  fill
                  priority
                  className="object-cover object-top py-2 group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 7rem, (max-width: 1024px) 8rem, 8rem"
                />
              </div>
            )}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {fighter.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Record: {fighter.wins}-{fighter.losses}
                {fighter.draws !== 0 && `-${fighter.draws}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
