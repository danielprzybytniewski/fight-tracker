import { fetchFightCards } from "@/actions/fight-cards-actions";
import { useQuery } from "@tanstack/react-query";

export const useFetchFightCards = () => {
  return useQuery({
    queryKey: ["fightCards"],
    queryFn: fetchFightCards,
    select: (data) => data.data || [],
  });
};
