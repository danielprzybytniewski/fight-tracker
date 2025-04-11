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
import slugify from "@/lib/slugify";
import { Button } from "@/components/ui/button";

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
            return (
              <CarouselItem
                key={event.title}
                className="flex flex-col items-center justify-items-start md:justify-center h-auto p-5 md:p-8 text-center"
              >
                <Link
                  href={`/events/${slugify(event.title)}`}
                  className="text-lg md:text-2xl uppercase font-extrabold text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  {event.title}
                </Link>
                <div className="flex flex-col md:flex-row justify-between w-full mt-6 p-6 md:p-10 border-t border-gray-300 dark:border-gray-700">
                  <FightsCarouselFighterProfile fighter={firstFight.fighterA} />
                  <div className="flex flex-col items-center h-full md:w-full mx-4 mt-4 md:mt-0 mb-6 md:mb-0">
                    <p className="md:mt-auto text-base md:text-3xl font-extrabold text-gray-800 dark:text-gray-200">
                      VS
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="my-1 h-7 md:h-9 px-2 md:px-4 py-1 md:py-2 md:mt-auto text-xs md:text-base border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors 
                      duration-200"
                    >
                      <Link href={`/events/${slugify(event.title)}`}>
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
