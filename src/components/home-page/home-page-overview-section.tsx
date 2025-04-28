import Image from "next/image";
import { Button } from "@/components/ui/button";
import HomePageOverviewItem from "@/components/home-page/home-page-overview-item";
import type { Overview } from "@/types/home-page.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HomePageOverviewSection({
  title,
  description,
  items,
  linkHref,
  linkText,
  imageKey,
  imageAlt,
  isReversed = false,
  customBgClass,
}: Overview) {
  const defaultBgClass = isReversed
    ? "bg-gray-50 dark:bg-gray-900"
    : "bg-gray-300 dark:bg-gray-950";
  const bgClass = customBgClass || defaultBgClass;

  return (
    <section className={cn("py-10 xl:py-20", bgClass)}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex flex-col items-center gap-12",
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          )}
        >
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-center lg:text-left text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              {title}
            </h2>
            <p className="mb-8 text-sm md:text-base text-gray-600 dark:text-gray-400">
              {description}
            </p>
            <ul className="space-y-4 mb-8">
              {items.map((item) => (
                <HomePageOverviewItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                />
              ))}
            </ul>
            <Button
              asChild
              className="h-7 md:h-9 px-2 py-1 md:px-3 text-xs md:text-base border border-gray-800 dark:border-gray-500 text-gray-800 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors 
              duration-200"
            >
              <Link href={linkHref}>{linkText}</Link>
            </Button>
          </div>
          <div className="w-full lg:w-1/2 overflow-hidden rounded-xl">
            <Image
              src={`/images/home-page/showcase-${imageKey}.webp`}
              alt={imageAlt}
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
