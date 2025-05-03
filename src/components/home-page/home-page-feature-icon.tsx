import {
  BarChart2,
  Globe,
  Heart,
  Medal,
  Newspaper,
  ScrollText,
  Star,
  User,
} from "lucide-react";
import type { FeautureIconName } from "@/types/home-page.types";

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
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-700 md:h-12 md:w-12">
        <IconComponent className="h-6 w-6 text-gray-700 dark:text-gray-300" />
      </div>
    </div>
  );
}
