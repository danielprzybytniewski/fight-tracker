import { stats } from "@/components/home-page/home-page-data";
import HomePageStats from "@/components/home-page/home-page-stats";

export default function HomePageStatsSection() {
  return (
    <section className="bg-gray-50 px-4 py-10 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <HomePageStats
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
