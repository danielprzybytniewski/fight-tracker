"use client";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import LoadingContainer from "@/components/shared/loading-container";
import ErrorFightCards from "@/components/shared/error-fight-cards";
import NotFoundFightCard from "@/components/events/not-found-fight-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventFighter from "@/components/events/event-fighter";
import EventFightSeparator from "@/components/events/event-fight-separator";
import EventTypeBadge from "@/components/events/event-type-badge";
import EventWeightBadge from "@/components/events/event-weight-badge";
import slugify from "@/lib/slugify";
import BackButton from "@/components/shared/back-button";

export default function EventFightCard({ slug }: { slug: string }) {
  const {
    data: fightCards = [],
    isLoading,
    error,
    refetch,
  } = useFetchFightCards();

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <ErrorFightCards message={error.message} onRetry={refetch} />;
  }

  const fightEvent = fightCards?.find((event) => slugify(event.title) === slug);

  if (!fightEvent) return <NotFoundFightCard />;

  return (
    <Card
      className="overflow-hidden max-w-5xl mx-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/90 
      dark:bg-gray-900/90"
    >
      <CardHeader className="py-2 text-center border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <BackButton />
        <CardTitle className="text-xl lg:text-3xl uppercase font-black tracking-tight text-gray-900 dark:text-gray-100">
          <h1>{fightEvent.title}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-8 space-y-6">
        {fightEvent.fights.map((fighter) => (
          <div
            key={`${fighter.fighterA.name}-${fighter.fighterB.name}`}
            className="relative flex flex-col sm:flex-row items-center justify-center gap-y-6 sm:gap-y-0 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 
            shadow-sm"
          >
            <div className="group fighter-a flex flex-col lg:flex-row justify-center sm:justify-normal items-center flex-1 gap-x-6 w-full text-center lg:text-left">
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
            <div className="group fighter-b flex flex-col lg:flex-row-reverse justify-center sm:justify-normal items-center flex-1 gap-x-6 w-full text-center lg:text-right">
              <EventFighter fighter={fighter.fighterB} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
