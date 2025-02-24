"use client";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import LoadingFightsCards from "@/components/shared/loading-fights-cards";
import ErrorFightsCards from "@/components/shared/error-fights-cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import FightsCarouselFighterProfile from "@/components/fights-carousel/fights-carousel-fighter-profile";
import { slugify } from "@/lib/slugify";
import { convertApiDateToLocalTime } from "@/lib/convert-api-date-to-local-time";

export default function FightsCarousel() {
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

  return (
    <div className="flex items-center justify-center sm:pt-10 px-4 sm:px-0">
      <Carousel
        className="w-full max-w-5xl relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800
      dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden"
      >
        <CarouselContent>
          {fightCards.map((event) => {
            const firstFight = event.fights[0];
            return (
              <CarouselItem
                key={`${event.title}-${event.date}`}
                className="flex flex-col items-center justify-items-start sm:justify-center h-auto p-6 sm:p-10 text-center"
              >
                <Link
                  href={`/events/${slugify(event.title)}`}
                  className="text-lg sm:text-2xl uppercase font-extrabold text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  {event.title}
                </Link>
                <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium">
                  {convertApiDateToLocalTime(event.date)}
                </p>
                <div className="flex flex-col sm:flex-row justify-between w-full mt-8 p-6 sm:p-10 border-t border-gray-300 dark:border-gray-700">
                  <FightsCarouselFighterProfile fighter={firstFight.fighterA} />
                  <div className="flex items-center justify-center sm:w-full mx-4 my-6 sm:my-0">
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 dark:text-gray-200">
                      VS
                    </h2>
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
