import FightsCarousel from "@/components/fights-carousel/fights-carousel";

export default function HomePageHeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center overflow-visible rounded-t-xl bg-gradient-to-tr from-gray-300 to-gray-400 py-4 dark:from-gray-700 dark:to-gray-600 md:py-8">
      <div className="flex w-full flex-col items-center justify-center px-4">
        <div className="mb-6 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-gray-100 md:text-7xl">
            Fight Tracker
          </h1>
          <h2 className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl">
            Dive Into the World of MMA
          </h2>
        </div>
        <div className="w-full">
          <FightsCarousel />
        </div>
      </div>
    </section>
  );
}
