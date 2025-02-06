"use client";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import LoadingFightsCards from "@/components/loading-fights-cards";
import ErrorFightsCards from "@/components/error-fights-cards";
import { slugify } from "@/lib/slugify";
import NotFoundFightCard from "@/components/not-found-fight-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EventFighter from "@/components/event-fighter";
import { convertApiDateToLocalTime } from "@/lib/convert-api-date-to-local-time";
import EventFightSeparator from "@/components/event-fight-separator";
import EventTypeBadge from "@/components/event-type-badge";
import EventWeightBadge from "@/components/event-weight-badge";

export default function EventFightCard({ title }: { title: string }) {
  const {
    data: fightCards = [],
    isLoading,
    error,
    refetch,
  } = useFetchFightCards();

  if (isLoading) {
    return <LoadingFightsCards />;
  }

  if (error) {
    return <ErrorFightsCards message={error.message} onRetry={refetch} />;
  }

  const fightEvent = fightCards?.find(
    (event) => slugify(event.title) === slugify(title)
  );

  if (!fightEvent) return <NotFoundFightCard />;

  const convertedDate = convertApiDateToLocalTime(fightEvent.date);

  return (
    <Card
      className="max-w-5xl mx-auto bg-gray-50 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-600 rounded-lg
    shadow-md"
    >
      <CardHeader className="text-center py-6 border-b border-gray-300 dark:border-gray-600">
        <CardTitle className="text-xl sm:text-3xl uppercase font-semibold text-gray-900 dark:text-gray-100">
          <h1>{fightEvent.title}</h1>
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          {convertedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 lg:p-6">
        {fightEvent.fights.map((fighter) => (
          <div
            key={`${fighter.fighterA.name}-${fighter.fighterB.name}`}
            className="flex flex-col sm:flex-row items-center justify-center bg-gray-200 dark:bg-gray-900 gap-y-4 sm:gap-y-0 p-4 sm:p-6 mb-6 rounded-lg shadow-inner w-full"
          >
            <div className="group fighter-a flex flex-col md:flex-row justify-center sm:justify-normal items-center flex-1 gap-x-4 text-center md:text-left w-full">
              <span className="inline-block sm:hidden mb-2">
                <EventTypeBadge isMainCard={fighter.main} />
              </span>
              <span className="inline-block sm:hidden mb-2">
                <EventWeightBadge weight={fighter.weight} />
              </span>
              <EventFighter fighter={fighter.fighterA} />
            </div>
            <EventFightSeparator
              isMainCard={fighter.main}
              weight={fighter.weight}
            />
            <div className="group fighter-b flex flex-col md:flex-row-reverse justify-center sm:justify-normal items-center flex-1 gap-x-4 text-center md:text-right w-full">
              <EventFighter fighter={fighter.fighterB} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
