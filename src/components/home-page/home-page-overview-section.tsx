import Image from "next/image";
import Link from "next/link";
import HomePageOverviewItem from "@/components/home-page/home-page-overview-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Overview } from "@/types/home-page.types";

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
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row",
          )}
        >
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-800 dark:text-gray-100 md:text-4xl lg:text-left">
              {title}
            </h2>
            <p className="mb-8 text-sm text-gray-600 dark:text-gray-400 md:text-base">
              {description}
            </p>
            <ul className="mb-8 space-y-4">
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
              className="h-7 border border-gray-800 bg-gray-100 px-2 py-1 text-xs text-gray-800 transition-colors duration-200 hover:bg-gray-200 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 md:h-9 md:px-3 md:text-base"
            >
              <Link href={linkHref}>{linkText}</Link>
            </Button>
          </div>
          <div className="w-full overflow-hidden rounded-xl lg:w-1/2">
            <Image
              src={`/images/home-page/showcase-${imageKey}.webp`}
              alt={imageAlt}
              width={800}
              height={600}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
