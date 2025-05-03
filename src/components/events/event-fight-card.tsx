"use client";
import EventFighter from "@/components/events/event-fighter";
import EventFighterSeparator from "@/components/events/event-fighter-separator";
import EventTypeBadge from "@/components/events/event-type-badge";
import EventWeightBadge from "@/components/events/event-weight-badge";
import NotFoundFightCard from "@/components/events/not-found-fight-card";
import BackButton from "@/components/shared/back-button";
import ErrorFightCards from "@/components/shared/error-fight-cards";
import LoadingContainer from "@/components/shared/loading-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import slugify from "@/lib/slugify";

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
    <Card className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-gray-200 bg-gray-50/90 dark:border-gray-800 dark:bg-gray-900/90">
      <CardHeader className="border-b border-gray-200 bg-gray-50 py-2 text-center dark:border-gray-800 dark:bg-gray-900">
        <BackButton />
        <CardTitle className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-gray-100 lg:text-3xl">
          <h1>{fightEvent.title}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4 lg:p-8">
        {fightEvent.fights.map((fighter) => (
          <div
            key={`${fighter.fighterA.name}-${fighter.fighterB.name}`}
            className="relative flex flex-col items-center justify-center gap-y-6 rounded-xl border border-gray-200 bg-gradient-to-b from-gray-100 to-gray-200 p-6 shadow-sm dark:border-gray-800 dark:from-gray-800 dark:to-gray-900 sm:flex-row sm:gap-y-0 sm:p-8"
          >
            <div className="fighter-a group flex w-full flex-1 flex-col items-center justify-center gap-x-6 text-center sm:justify-normal lg:flex-row lg:text-left">
              <span className="mb-2 inline-block sm:hidden">
                <EventTypeBadge isMainCard={fighter.main} />
              </span>
              <span className="mb-2 inline-block sm:hidden">
                <EventWeightBadge weight={fighter.weight} />
              </span>
              <EventFighter fighter={fighter.fighterA} />
            </div>
            <EventFighterSeparator
              isMainCard={fighter.main}
              weight={fighter.weight}
            />
            <div className="fighter-b group flex w-full flex-1 flex-col items-center justify-center gap-x-6 text-center sm:justify-normal lg:flex-row-reverse lg:text-right">
              <EventFighter fighter={fighter.fighterB} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
