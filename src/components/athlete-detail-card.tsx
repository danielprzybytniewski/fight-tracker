import { DetailItem, NOT_AVAILABLE } from "@/types/rankings-schema.types";

export default function AthleteDetailCard({ label, value }: DetailItem) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800/80 p-4 rounded-lg shadow-md text-sm sm:text-base">
      <h2 className="font-semibold text-gray-900 dark:text-gray-200">
        {label}
      </h2>
      <p className="text-gray-900 dark:text-gray-300">
        {value || NOT_AVAILABLE}
      </p>
    </div>
  );
}
