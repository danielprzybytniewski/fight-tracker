import HomePageFeatureIcon from "@/components/home-page/home-page-feature-icon";
import { Card, CardContent } from "@/components/ui/card";
import type { Feature } from "@/types/home-page.types";

export default function HomePageFeatureCard({
  icon,
  title,
  description,
}: Feature) {
  return (
    <Card className="min-h-52 border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800 md:min-h-56">
      <CardContent className="pt-4">
        <HomePageFeatureIcon iconName={icon} />
        <h3 className="mb-2 text-center text-lg font-bold text-gray-800 dark:text-gray-200 md:text-left md:text-xl">
          {title}
        </h3>
        <p className="text-left text-sm text-gray-600 dark:text-gray-400 md:text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
