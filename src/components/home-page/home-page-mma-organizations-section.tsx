"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { logoImageKeys } from "@/components/home-page/home-page-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
              className="flex h-20 w-full items-center justify-center md:h-28 md:basis-1/3"
            >
              <div className="relative h-20 w-36 md:h-28 md:w-52">
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
