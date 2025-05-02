import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { routesConfig } from "@/config/routes-config";
import type { Fighter } from "@/types/rankings-schema.types";

type DivisionAthleteCardProps = {
  fighter: Fighter;
  index: number;
};

export default function DivisionAthleteCard({
  fighter,
  index,
}: DivisionAthleteCardProps) {
  return (
    <Link href={routesConfig.athlete(fighter.id)}>
      <Card className="group h-full overflow-hidden bg-white shadow-lg transition-colors duration-300 hover:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-300">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
            <Badge
              variant="secondary"
              className="pointer-events-none bg-gray-200 px-3 py-1 text-base text-gray-800 dark:bg-gray-900 dark:text-gray-200 sm:text-lg"
            >
              #{index + 1}
            </Badge>
            {fighter.imgUrl && (
              <div className="relative h-36 w-36 overflow-hidden">
                <Image
                  src={fighter.imgUrl}
                  alt={fighter.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 9rem, 9rem"
                  className="object-cover object-top py-2 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 xl:min-h-24 xl:max-w-16">
                {fighter.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
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
