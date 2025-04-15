"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { Fighter } from "@/types/rankings-schema.types";
import {
  favoritesContainerVariants,
  favoritesItemVariants,
} from "@/lib/framer-motion-variants";
import { routesConfig } from "@/config/routes-config";

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
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
      variants={favoritesContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {favorites.map((fighter: Fighter) => (
        <motion.div
          key={fighter.name}
          variants={favoritesItemVariants}
          className="relative group"
        >
          <Link href={routesConfig.athlete(fighter.id)}>
            <div
              className="relative h-80 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 
                dark:from-gray-900 dark:to-gray-800 shadow-lg"
            >
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
            onClick={() => toggleFavoriteWithToast(fighter)}
            className="absolute top-1 right-1 p-1 rounded-full bg-gray-400 hover:bg-gray-500 dark:bg-gray-800 
                dark:hover:bg-gray-700 text-gray-50 transition-all duration-500 xl:opacity-0 xl:group-hover:opacity-100"
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
  );
}
