import { Badge } from "@/components/ui/badge";
import { poundsToKg } from "@/lib/unit-conversion";

type EventFightCardWeightBadgeProps = {
  weight: number;
};

export default function EventFightCardWeightBadge({
  weight,
}: EventFightCardWeightBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50
        px-1 sm:px-3 py-1 rounded-full"
    >
      {poundsToKg(weight)}
    </Badge>
  );
}
