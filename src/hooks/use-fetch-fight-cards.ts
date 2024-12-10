import { fetchFightsCards } from "@/actions/fights-cards-actions";
import { useQuery } from "@tanstack/react-query";

export const useFetchFightCards = () => {
  return useQuery({
    queryKey: ["fightCards"],
    queryFn: fetchFightsCards,
    select: (data) => data.data || [],
  });
};
