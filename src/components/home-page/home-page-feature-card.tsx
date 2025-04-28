import { Card, CardContent } from "@/components/ui/card";
import type { Feature } from "@/types/home-page.types";
import HomePageFeatureIcon from "@/components/home-page/home-page-feature-icon";

export default function HomePageFeatureCard({
  icon,
  title,
  description,
}: Feature) {
  return (
    <Card className="min-h-52 md:min-h-56 border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800">
      <CardContent className="pt-4">
        <HomePageFeatureIcon iconName={icon} />
        <h3 className="mb-2 text-center md:text-left text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <p className="text-left text-sm md:text-base text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
