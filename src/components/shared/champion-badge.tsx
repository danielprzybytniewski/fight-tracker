import { Badge } from "@/components/ui/badge";

export default function ChampionBadge() {
  return (
    <Badge
      variant="outline"
      className="px-3 py-1 text-xs md:text-sm font-semibold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900 rounded-full shadow-md border border-yellow-500"
    >
      🏆 Champion
    </Badge>
  );
}
