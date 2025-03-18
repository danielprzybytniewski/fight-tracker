import { Badge } from "@/components/ui/badge";

type EventWeightBadgeProps = {
  weight: number;
};

export default function EventWeightBadge({ weight }: EventWeightBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="px-2 py-1 mb-3 sm:mb-0 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100/80 
      dark:bg-gray-800/80 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm"
    >
      {`${weight.toFixed(1)} kg`}
    </Badge>
  );
}
