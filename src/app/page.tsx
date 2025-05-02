import { overviewSections } from "@/components/home-page/home-page-data";
import HomePageFeaturesSection from "@/components/home-page/home-page-features-section";
import HomePageHeroSection from "@/components/home-page/home-page-hero-section";
import HomePageMmaOrganizationsSection from "@/components/home-page/home-page-mma-organizations-section";
import HomePageOverviewSection from "@/components/home-page/home-page-overview-section";
import HomePageStatsSection from "@/components/home-page/home-page-stats-section";

export default function HomePage() {
  return (
    <div className="container mx-auto min-h-screen max-w-7xl text-gray-800 dark:text-gray-100">
      <HomePageHeroSection />
      <HomePageFeaturesSection />
      {overviewSections.map((section) => (
        <HomePageOverviewSection key={section.title} {...section} />
      ))}
      <HomePageStatsSection />
      <HomePageMmaOrganizationsSection />
    </div>
  );
}
