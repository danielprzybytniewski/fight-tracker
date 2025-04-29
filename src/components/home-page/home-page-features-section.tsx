import HomePageFeatureCard from "@/components/home-page/home-page-feature-card";
import { features } from "@/components/home-page/home-page-data";

export default function HomePageFeaturesSection() {
  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl md:text-3xl font-bold text-center">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <HomePageFeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
