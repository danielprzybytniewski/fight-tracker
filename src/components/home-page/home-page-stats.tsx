import type { Stats } from "@/types/home-page.types";

export default function HomePageStats({ value, label }: Stats) {
  return (
    <div className="text-center">
      <h3 className="mb-2 text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
        {value}
      </h3>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
        {label}
      </p>
    </div>
  );
}
