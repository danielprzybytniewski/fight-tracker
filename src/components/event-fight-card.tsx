"use client";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import LoadingFightsCards from "@/components/loading-fights-cards";
import ErrorFightsCards from "@/components/error-fights-cards";
import { slugify } from "@/lib/slugify";
import { v4 as uuidv4 } from "uuid";
import NotFoundFightCard from "@/components/not-found-fight-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EventFights from "@/components/event-fights";
import { convertApiDateToLocalTime } from "@/lib/convert-api-date-to-local-time";

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
    <Card className="max-w-7xl mx-auto bg-white dark:bg-gray-700 rounded-lg">
      <CardHeader className="text-center py-4 border-b border-zinc-200 dark:border-gray-500">
        <CardTitle className="text-2xl font-semibold text-zinc-900 dark:text-gray-100">
          {fightEvent.title}
        </CardTitle>
        <CardDescription className="text-md text-zinc-600 dark:text-gray-400">
          {convertedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 lg:p-4">
        {fightEvent.fights.map((fighter) => (
          <div
            key={uuidv4()}
            className="flex flex-row items-center justify-between bg-slate-200 dark:bg-gray-800 p-2 sm:p-4 mb-4 
            rounded-lg"
          >
            <div className="flex flex-col items-center flex-1 md:flex-row space-x-4 text-center md:text-left">
              <EventFights fighter={fighter.fighterA} />
            </div>
            <div className="flex items-center justify-center w-auto mx-4">
              <p className="text-zinc-600 dark:text-gray-400 font-semibold text-lg">
                VS
              </p>
            </div>
            <div className="flex flex-col items-center flex-1 md:flex-row-reverse space-x-4 space-x-reverse text-center md:text-right">
              <EventFights fighter={fighter.fighterB} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
