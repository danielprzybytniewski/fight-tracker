import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type EventTypeBadgeProps = {
  isMainCard: boolean;
};

export default function EventTypeBadge({ isMainCard }: EventTypeBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium px-2 sm:px-4 py-1 sm:py-2 border border-gray-400 rounded-full",
        isMainCard
          ? "bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      )}
    >
      {isMainCard ? "MAIN CARD" : "PRELIMS"}
    </Badge>
  );
}
