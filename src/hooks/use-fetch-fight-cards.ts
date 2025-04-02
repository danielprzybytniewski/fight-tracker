import { fetchFightsCards } from "@/actions/fight-cards.actions";
import { useQuery } from "@tanstack/react-query";

export const useFetchFightCards = () => {
  return useQuery({
    queryKey: ["fightCards"],
    queryFn: fetchFightsCards,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (data) => data.data || [],
  });
};
