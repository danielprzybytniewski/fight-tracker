import { type DetailItem, NOT_AVAILABLE } from "@/types/rankings-schema.types";

export default function AthleteDetailCard({ label, value }: DetailItem) {
  return (
    <div className="rounded-lg bg-gray-100 p-4 text-sm shadow-md dark:bg-gray-800/80 sm:text-base">
      <h2 className="font-semibold text-gray-900 dark:text-gray-200">
        {label}
      </h2>
      <p className="text-gray-900 dark:text-gray-300">
        {value || NOT_AVAILABLE}
      </p>
    </div>
  );
}
