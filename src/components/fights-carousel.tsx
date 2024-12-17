"use client";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import LoadingFightsCards from "@/components/loading-fights-cards";
import ErrorFightsCards from "@/components/error-fights-cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import FightsCarouselFighterProfile from "@/components/fights-carousel-fighter-profile";
import { v4 as uuidv4 } from "uuid";
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
    <div className="flex items-center justify-center sm:pt-[15vh]">
      <Carousel className="w-full max-w-4xl relative sm:bg-zinc-300 sm:dark:bg-gray-600 sm:rounded-lg sm:shadow-md">
        <CarouselContent>
          {fightCards.map((event) => {
            const firstFight = event.fights[0];
            return (
              <CarouselItem
                key={uuidv4()}
                className="flex flex-col items-center justify-items-start sm:justify-center h-auto p-2 sm:p-8 px-5 sm:px-0  text-center"
              >
                <Link
                  href={`/events/${slugify(event.title)}`}
                  className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-gray-100 transition-all hover:underline"
                >
                  {event.title}
                </Link>
                <p className="mt-2 text-zinc-600 dark:text-gray-400 text-sm sm:text-base">
                  {convertApiDateToLocalTime(event.date)}
                </p>
                <div className="flex flex-col sm:flex-row justify-between w-full mt-4 p-4 sm:p-8 pt-5 sm:pt-10 border-t border-zinc-300 sm:border-zinc-200 dark:border-gray-500">
                  <FightsCarouselFighterProfile fighter={firstFight.fighterA} />
                  <div className="flex items-center justify-center mx-4">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-gray-100 mt-5 mb-5 sm:mt-0 sm:mb-0">
                      VS
                    </h2>
                  </div>
                  <FightsCarouselFighterProfile fighter={firstFight.fighterB} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 md:left-2 sm:top-[5.5rem] dark:bg-gray-500 dark:hover:bg-gray-600" />
        <CarouselNext className="absolute right-4 md:right-2 sm:top-[5.5rem] dark:bg-gray-500 dark:hover:bg-gray-600" />
      </Carousel>
    </div>
  );
}
