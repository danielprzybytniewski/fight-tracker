import { FavoritesContext } from "@/providers/favorites-provider";
import { useContext } from "react";

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
