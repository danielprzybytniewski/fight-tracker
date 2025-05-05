import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routesConfig } from "@/config/routes-config";

export default function HomePageCTASection() {
  return (
    <section className="mb-2 flex flex-col items-center justify-center rounded-b-xl bg-gray-100 px-6 py-16 text-center dark:bg-gray-950 md:mb-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 md:text-4xl">
          Your Gateway to the World of MMA
        </h2>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 sm:text-base md:text-lg">
          Fight Tracker is your ultimate hub for everything in MMA world. Stay
          up-to-date with fighter stats, rankings, historical fights, events and
          exclusive news. Track, analyze and enjoy the thrill of mixed martial
          arts. All in one place.
        </p>
        <div className="mt-6">
          <Button
            className="h-7 bg-gray-800 px-3 py-1 text-base font-semibold text-gray-50 transition-colors duration-200 hover:bg-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-400 md:h-10 md:px-8 md:py-4 md:text-lg"
            asChild
          >
            <Link href={routesConfig.fighters}>Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
