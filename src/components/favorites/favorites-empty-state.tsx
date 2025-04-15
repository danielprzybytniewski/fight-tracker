import { routesConfig } from "@/config/routes-config";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoritesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mx-5 sm:mx-0 mt-3 py-16 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
      <Heart className="h-16 w-16 mb-4 text-red-500 dark:text-red-600" />
      <h3 className="mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
        No favorite fighters yet
      </h3>
      <p className="max-w-md text-center text-gray-500 dark:text-gray-400">
        <span className="mr-1">
          Add fighter to your favorites by clicking the heart icon on a
        </span>
        <Link
          href={routesConfig.fighters}
          className="mr-1 font-bold underline text-gray-800 dark:text-gray-200 hover:text-gray-400 
        dark:hover:text-gray-500 transition-colors duration-200"
        >
          fighter
        </Link>
        <span>card</span>
      </p>
    </div>
  );
}
