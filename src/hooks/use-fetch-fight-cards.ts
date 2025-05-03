import { useQuery } from "@tanstack/react-query";
import { fetchFightsCards } from "@/actions/fight-cards.actions";

export const useFetchFightCards = () => {
  return useQuery({
    queryKey: ["fightCards"],
    queryFn: fetchFightsCards,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 3 * 24 * 60 * 60 * 1000,
    select: (data) => data.data || [],
  });
};
