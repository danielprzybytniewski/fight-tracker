"use client";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { Trash2, X, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FavoriteFighters() {
  const { favorites, resetFavoritesWithToast, toggleFavoriteWithToast } =
    useFavorites();
  const { toast } = useToast();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center py-4">
        <div
          className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200
        dark:to-gray-400 bg-clip-text text-transparent"
        >
          <h1 className="inline mr-1">Favorite Fighters</h1>
          <span className="inline">({favorites.length})</span>
        </div>
        {favorites.length > 0 && (
          <button
            className="mx-auto mt-2"
            onClick={() => resetFavoritesWithToast(toast)}
            aria-label="Reset favorites"
          >
            <Trash2
              className="text-red-500 hover:text-red-600 dark:text-red-600 dark:hover:text-red-500 
            hover:cursor-pointer"
            />
          </button>
        )}
      </div>
      {favorites.length === 0 ? (
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
              href={"/fighters"}
              className="mr-1 font-bold underline text-gray-800 dark:text-gray-200 hover:text-gray-400 
              dark:hover:text-gray-500 transition-colors duration-200"
            >
              fighter
            </Link>
            <span>card</span>
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {favorites.map((fighter) => (
            <motion.div
              key={fighter.name}
              variants={itemVariants}
              className="relative group"
            >
              <Link href={`/athlete/${fighter.id}`} className="block">
                <div
                  className="relative rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 
                dark:from-gray-900 dark:to-gray-800 h-80 shadow-lg"
                >
                  {fighter.imgUrl && (
                    <Image
                      src={fighter.imgUrl}
                      alt={fighter.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority
                    />
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-4 pt-8 bg-gradient-to-t from-black/70 to-transparent">
                    {fighter.nickname && (
                      <p className="min-h-5 text-sm text-gray-200">
                        &quot;{fighter.nickname}&quot;
                      </p>
                    )}
                    <h3 className="font-bold uppercase text-white">
                      {fighter.name}
                    </h3>
                    <p className="text-sm text-gray-300">{fighter.category}</p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => toggleFavoriteWithToast(fighter, toast)}
                className="absolute top-1 right-1 p-1 rounded-full bg-gray-400 hover:bg-gray-500 dark:bg-gray-800 
                dark:hover:bg-gray-700 text-white transition-all duration-500 xl:opacity-0 xl:group-hover:opacity-100"
                aria-label={`Remove ${fighter.name} from favorites`}
              >
                <X className="h-4 w-4" />
              </button>
              <div
                className="absolute bottom-0 right-0 flex text-xs font-medium text-white xl:opacity-0 
              xl:group-hover:opacity-100 transition-opacity duration-500"
              >
                <p className="px-1 bg-green-500">{fighter.wins ?? 0}W </p>
                <p className="px-1 bg-red-500">{fighter.losses ?? 0}L</p>
                <p className="px-1 bg-gray-500">{fighter.draws ?? 0}D</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
