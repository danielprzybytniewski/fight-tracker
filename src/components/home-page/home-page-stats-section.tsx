import HomePageStats from "@/components/home-page/home-page-stats";
import { stats } from "@/components/home-page/home-page-data";

export default function HomePageStatsSection() {
  return (
    <section className="p-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
