"use client";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import LoadingContainer from "@/components/shared/loading-container";
import ErrorFightCards from "@/components/shared/error-fight-cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import FightsCarouselFighterProfile from "@/components/fights-carousel/fights-carousel-fighter-profile";
import { Button } from "@/components/ui/button";
import EventFighterSeparator from "@/components/events/event-fighter-separator";
import { routesConfig } from "@/config/routes-config";
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
    <div className="flex items-center justify-center py-10 px-4 md:px-6">
      <Carousel className="overflow-hidden w-full max-w-5xl relative rounded-3xl bg-gray-100 dark:bg-gray-900 shadow-xl">
        <CarouselContent>
          {fightCards.map((event) => {
            const firstFight = event.fights[0];
            const slug = slugify(event.title);

            return (
              <CarouselItem
                key={event.title}
                className="flex flex-col items-center justify-items-start md:justify-center h-auto p-5 md:p-8 text-center"
              >
                <Link
                  href={routesConfig.event(slug)}
                  className="text-lg md:text-2xl uppercase font-extrabold text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  {event.title}
                </Link>
                <div className="flex flex-col md:flex-row justify-between w-full mt-6 p-6 md:p-10 border-t border-gray-300 dark:border-gray-700">
                  <FightsCarouselFighterProfile fighter={firstFight.fighterA} />
                  <div className="flex flex-col items-center justify-center h-full md:w-full mx-4 mt-4 mb-6">
                    <EventFighterSeparator
                      isMainCard={true}
                      weight={firstFight.weight}
                    />
                    <Button
                      asChild
                      variant="outline"
                      className="sm:mt-4 h-7 md:h-8 px-2 md:px-3 py-1 md:py-2 text-xs md:text-base border-gray-300 dark:border-gray-700 hover:border-gray-600 dark:hover:border-gray-300 text-gray-800 dark:text-gray-100 dark:bg-gray-800 
                      hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
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
        <CarouselPrevious className="absolute left-4 top-1/3 sm:top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200" />
        <CarouselNext className="absolute right-4 top-1/3 sm:top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200" />
      </Carousel>
    </div>
  );
}
