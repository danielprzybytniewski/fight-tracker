"use client";
import Link from "next/link";
import EventFighterSeparator from "@/components/events/event-fighter-separator";
import FightsCarouselFighterProfile from "@/components/fights-carousel/fights-carousel-fighter-profile";
import ErrorFightCards from "@/components/shared/error-fight-cards";
import LoadingContainer from "@/components/shared/loading-container";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { routesConfig } from "@/config/routes-config";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import slugify from "@/lib/slugify";

export default function FightsCarousel() {
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

  return (
    <div className="flex items-center justify-center px-4 py-5 md:px-6 md:py-10">
      <Carousel
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-gray-100 shadow-xl dark:bg-gray-900"
        data-testid="fights-carousel"
      >
        <CarouselContent>
          {fightCards.map((event) => {
            const firstFight = event.fights[0];
            const slug = slugify(event.title);

            return (
              <CarouselItem
                key={event.title}
                className="flex h-auto flex-col items-center justify-items-start p-4 pb-0 text-center md:justify-center md:p-6"
              >
                <Link
                  href={routesConfig.event(slug)}
                  className="text-lg font-extrabold uppercase text-gray-800 transition-colors duration-200 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-400 md:text-2xl"
                >
                  {event.title}
                </Link>
                <div className="mt-2 flex w-full flex-col justify-between border-t border-gray-300 p-6 dark:border-gray-700 md:mt-6 md:flex-row md:p-10 md:pb-6">
                  <FightsCarouselFighterProfile fighter={firstFight.fighterA} />
                  <div className="mx-4 mb-6 mt-4 flex h-full flex-col items-center justify-center md:w-full">
                    <EventFighterSeparator
                      isMainCard={true}
                      weight={firstFight.weight}
                    />
                    <Button
                      asChild
                      variant="outline"
                      className="h-7 border-gray-300 px-2 py-1 text-xs text-gray-800 transition-colors duration-200 hover:border-gray-600 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-300 dark:hover:bg-gray-600 sm:mt-4 md:h-8 md:px-3 md:py-2 md:text-base"
                    >
                      <Link href={routesConfig.event(slug)}>
                        View Fight Card
                      </Link>
                    </Button>
                  </div>
                  <FightsCarouselFighterProfile fighter={firstFight.fighterB} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/3 -translate-y-1/2 bg-gray-200 text-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:top-1/2" />
        <CarouselNext className="absolute right-4 top-1/3 -translate-y-1/2 bg-gray-200 text-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:top-1/2" />
      </Carousel>
    </div>
  );
}
