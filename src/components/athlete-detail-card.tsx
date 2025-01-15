import { DetailItem } from "@/types/rankings-schema.types";

export function AthleteDetailCard({ label, value }: DetailItem) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:bg-opacity-80 p-4 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1">
      <h2 className="font-semibold text-gray-900 dark:text-gray-200">
        {label}
      </h2>
      <p className="text-lg text-gray-900 dark:text-gray-300">
        {value || "N/A"}
      </p>
    </div>
  );
}
