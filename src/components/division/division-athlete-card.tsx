import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Fighter } from "@/types/rankings-schema.types";
import { routesConfig } from "@/config/routes-config";

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
      <Card className="overflow-hidden h-full bg-white dark:bg-gray-800 shadow-lg hover:border-gray-600 dark:hover:border-gray-300 transition-colors duration-300 group">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <Badge
              variant="secondary"
              className="text-base sm:text-lg px-3 py-1 bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200 pointer-events-none"
            >
              #{index + 1}
            </Badge>
            {fighter.imgUrl && (
              <div className="relative w-36 h-36 overflow-hidden">
                <Image
                  src={fighter.imgUrl}
                  alt={fighter.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 9rem, 9rem"
                  className="object-cover object-top py-2 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <div className="text-center lg:text-left">
              <h3 className="xl:max-w-16 xl:min-h-24 text-xl font-semibold text-gray-800 dark:text-gray-200">
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
