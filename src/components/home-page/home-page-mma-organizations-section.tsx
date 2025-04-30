"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { logoImageKeys } from "@/components/home-page/home-page-data";

export default function HomePageMmaOrganizationsSection() {
  return (
    <section className="flex justify-center bg-gray-300 dark:bg-gray-600">
      <Carousel
        className="w-full"
        data-testid="mma-organizations-carousel"
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {logoImageKeys.map((imgKey) => (
            <CarouselItem
              key={imgKey}
              className="flex items-center justify-center h-20 md:h-28 w-full md:basis-1/3"
            >
              <div className="relative w-36 h-20 md:w-52 md:h-28">
                <Image
                  src={`/images/home-page/logo-${imgKey}.svg`}
                  alt={imgKey}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 9rem, 13rem"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
