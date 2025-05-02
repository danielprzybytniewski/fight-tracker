import Link from "next/link";
import { Heart } from "lucide-react";
import { routesConfig } from "@/config/routes-config";

export default function FavoritesEmptyState() {
  return (
    <div className="mx-5 mt-3 flex flex-col items-center justify-center rounded-xl border border-gray-300 bg-gray-100 px-4 py-16 dark:border-gray-700 dark:bg-gray-900 sm:mx-0">
      <Heart className="mb-4 h-16 w-16 text-red-500 dark:text-red-600" />
      <h3 className="mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
        No favorite fighters yet
      </h3>
      <p className="max-w-md text-center text-gray-500 dark:text-gray-400">
        <span className="mr-1">
          Add fighter to your favorites by clicking the heart icon on a
        </span>
        <Link
          href={routesConfig.fighters}
          className="mr-1 font-bold text-gray-800 underline transition-colors duration-200 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-500"
        >
          fighter
        </Link>
        <span>card</span>
      </p>
    </div>
  );
}
