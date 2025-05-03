"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { routesConfig } from "@/config/routes-config";
import {
  favoritesContainerVariants,
  favoritesItemVariants,
} from "@/lib/framer-motion-variants";
import type { Fighter } from "@/types/rankings-schema.types";

type FavoritesFighterGridProps = {
  favorites: Fighter[];
  toggleFavoriteWithToast: (fighter: Fighter) => void;
};

export default function FavoritesFighterGrid({
  favorites,
  toggleFavoriteWithToast,
}: FavoritesFighterGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      variants={favoritesContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {favorites.map((fighter: Fighter) => (
        <motion.div
          key={fighter.name}
          variants={favoritesItemVariants}
          className="group relative"
        >
          <Link href={routesConfig.athlete(fighter.id)}>
            <div className="relative h-80 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg dark:from-gray-900 dark:to-gray-800">
              {fighter.imgUrl && (
                <Image
                  src={fighter.imgUrl}
                  alt={fighter.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
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
            onClick={() => toggleFavoriteWithToast(fighter)}
            className="absolute right-1 top-1 rounded-full bg-gray-400 p-1 text-gray-50 transition-all duration-500 hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 xl:opacity-0 xl:group-hover:opacity-100"
            aria-label={`Remove ${fighter.name} from favorites`}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-0 right-0 flex text-xs font-medium text-white transition-opacity duration-500 xl:opacity-0 xl:group-hover:opacity-100">
            <p className="bg-green-500 px-1">{fighter.wins ?? 0}W </p>
            <p className="bg-red-500 px-1">{fighter.losses ?? 0}L</p>
            <p className="bg-gray-500 px-1">{fighter.draws ?? 0}D</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
