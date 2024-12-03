"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import LoadingFightsCards from "@/components/loading-fights-cards";
import ErrorFightCards from "@/components/error-fights-cards";
import FightsCarouselFighterProfile from "@/components/fights-carousel-fighter-profile";

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
    return <ErrorFightCards message={error.message} onRetry={refetch} />;
  }

  return (
    <div className="flex items-center justify-center pt-48">
      <Carousel className="w-full max-w-4xl relative bg-zinc-300 dark:bg-gray-600 rounded-lg shadow-md">
        <CarouselContent>
          {fightCards.map((event, index) => {
            const firstFight = event.fights[0];
            return (
              <CarouselItem
                key={index}
                className="flex flex-col items-center justify-center h-96 p-8"
              >
                <p className="text-2xl font-bold text-zinc-900 dark:text-gray-100">
                  {event.title}
                </p>
                <p className="mt-2 text-zinc-600 dark:text-gray-400">
                  {event.date}
                </p>
                <div className="flex justify-between w-full mt-4 p-4 pt-10 border-t border-zinc-200 dark:border-gray-500">
                  <FightsCarouselFighterProfile fighter={firstFight.fighterA} />
                  <div className="flex items-center justify-center mx-4">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-gray-100">
                      VS
                    </h2>
                  </div>
                  <FightsCarouselFighterProfile fighter={firstFight.fighterB} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-7 md:left-2 top-[5.5rem] dark:bg-gray-500 dark:hover:bg-gray-600" />
        <CarouselNext className="absolute right-7 md:right-2 top-[5.5rem] dark:bg-gray-500 dark:hover:bg-gray-600" />
      </Carousel>
    </div>
  );
}
