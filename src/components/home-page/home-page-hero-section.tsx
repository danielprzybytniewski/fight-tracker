import FightsCarousel from "@/components/fights-carousel/fights-carousel";

export default function HomePageHeroSection() {
  return (
    <section className="min-h-screen py-4 md:py-8 flex flex-col items-center justify-center overflow-visible rounded-t-xl bg-gradient-to-tr from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600">
      <div className="flex flex-col items-center justify-center w-full px-4">
        <div className="text-center mb-6">
          <h1 className="mb-4 text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100">
            Fight Tracker
          </h1>
          <h2 className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300">
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
