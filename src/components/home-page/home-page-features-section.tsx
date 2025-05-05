import { features } from "@/components/home-page/home-page-data";
import HomePageFeatureCard from "@/components/home-page/home-page-feature-card";

export default function HomePageFeaturesSection() {
  return (
    <section className="bg-gray-50 py-10 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-extrabold md:text-4xl">
          Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
