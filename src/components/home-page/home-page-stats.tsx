import type { Stats } from "@/types/home-page.types";

export default function HomePageStats({ value, label }: Stats) {
  return (
    <div className="text-center">
      <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-4xl">
        {value}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
        {label}
      </p>
    </div>
  );
}
