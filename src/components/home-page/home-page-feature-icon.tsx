import type { FeautureIconName } from "@/types/home-page.types";
import {
  User,
  ScrollText,
  BarChart2,
  Globe,
  Newspaper,
  Heart,
  Star,
  Medal,
} from "lucide-react";

type HomePageFeatureIconProps = {
  iconName: FeautureIconName;
};

export default function HomePageFeatureIcon({
  iconName,
}: HomePageFeatureIconProps) {
  const icons = {
    User,
    ScrollText,
    BarChart2,
    Globe,
    Newspaper,
    Heart,
    Star,
    Medal,
  };

  const IconComponent = icons[iconName];

  return (
    <div className="flex justify-center md:justify-start">
      <div className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center p-2 mb-2 rounded-full bg-gray-100 dark:bg-gray-700">
        <IconComponent className="h-6 w-6 text-gray-700 dark:text-gray-300" />
      </div>
    </div>
  );
}
