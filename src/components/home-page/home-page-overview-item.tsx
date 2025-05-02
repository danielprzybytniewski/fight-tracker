import type { OverviewItem } from "@/types/home-page.types";

export default function HomePageOverviewItem({ icon, text }: OverviewItem) {
  const Icon = icon;

  return (
    <li className="flex items-center">
      <Icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
      <span className="text-sm text-gray-700 dark:text-gray-300 md:text-base">
        {text}
      </span>
    </li>
  );
}
