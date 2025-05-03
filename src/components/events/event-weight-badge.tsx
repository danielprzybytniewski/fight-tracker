import { Badge } from "@/components/ui/badge";

type EventWeightBadgeProps = {
  weight: number;
};

export default function EventWeightBadge({ weight }: EventWeightBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="mb-3 rounded-full border border-gray-300 bg-gray-100/80 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 sm:mb-0"
    >
      {`${weight.toFixed(1)} kg`}
    </Badge>
  );
}
