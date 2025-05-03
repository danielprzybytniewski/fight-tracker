import { Badge } from "@/components/ui/badge";

export default function ChampionBadge() {
  return (
    <Badge
      variant="outline"
      className="rounded-full border border-yellow-500 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 px-3 py-1 text-xs font-semibold text-yellow-900 shadow-md md:text-sm"
    >
      🏆 Champion
    </Badge>
  );
}
