"use client";
import { createContext, useEffect, useState } from "react";
import { Fighter } from "@/types/fight-cards-schema.types";

type FavoritesContextType = {
  favorites: Fighter[];
  toggleFavorite: (fighter: Fighter) => void;
  isFavorite: (fighter: Fighter) => boolean;
  resetFavorites: () => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Fighter[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoritesFighters");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (fighter: Fighter) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((f) => f.name === fighter.name);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((f) => f.name !== fighter.name)
        : [...prevFavorites, fighter];

      localStorage.setItem(
        "favoritesFighters",
        JSON.stringify(updatedFavorites)
      );
      return updatedFavorites;
    });
  };

  const isFavorite = (fighter: Fighter) =>
    favorites.some((f) => f.name === fighter.name);

  const resetFavorites = () => {
    localStorage.removeItem("favoritesFighters");
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, resetFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
