import { Badge } from "@/components/ui/badge";

type EventWeightBadgeProps = {
  weight: number;
};

export default function EventWeightBadge({ weight }: EventWeightBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50
        px-1 sm:px-3 py-1 rounded-full"
    >
      {`${weight.toFixed(1)} kg`}
    </Badge>
  );
}
