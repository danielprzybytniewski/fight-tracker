"use client";
import { Fighter } from "@/types/rankings-schema.types";
import { CircleCheck, CircleX } from "lucide-react";
import { createContext, useEffect, useState } from "react";

export type CustomToastProps = {
  title?: string;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

type FavoritesContextType = {
  favorites: Fighter[];
  isFavorite: (fighter: Fighter) => boolean;
  toggleFavorite: (fighter: Fighter) => void;
  toggleFavoriteWithToast: (
    fighter: Fighter,
    toast: (props: CustomToastProps) => void
  ) => void;
  resetFavorites: () => void;
  resetFavoritesWithToast: (toast: (props: CustomToastProps) => void) => void;
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
    const storedFavorites = localStorage.getItem("favoriteFighters");
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
        "favoriteFighters",
        JSON.stringify(updatedFavorites)
      );
      return updatedFavorites;
    });
  };

  const isFavorite = (fighter: Fighter) =>
    favorites.some((f) => f.name === fighter.name);

  const toggleFavoriteWithToast = (
    fighter: Fighter,
    toast: (props: CustomToastProps) => void
  ) => {
    toggleFavorite(fighter);

    const isFav = isFavorite(fighter);

    toast({
      description: (
        <div className="flex items-center">
          {isFav ? (
            <CircleX className="mr-2" />
          ) : (
            <CircleCheck className="mr-2" />
          )}
          <span>{`${fighter.name} ${
            isFav ? "removed from" : "added to"
          } favorites!`}</span>
        </div>
      ),
      variant: "default",
    });
  };

  const resetFavorites = () => {
    localStorage.removeItem("favoriteFighters");
    setFavorites([]);
  };

  const resetFavoritesWithToast = (
    toast: (props: CustomToastProps) => void
  ) => {
    resetFavorites();

    toast({
      description: (
        <div className="flex items-center">
          <CircleX className="mr-2" />
          <span>{"All fighters removed from favorites!"}</span>
        </div>
      ),
      variant: "default",
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        toggleFavoriteWithToast,
        resetFavorites,
        resetFavoritesWithToast,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
