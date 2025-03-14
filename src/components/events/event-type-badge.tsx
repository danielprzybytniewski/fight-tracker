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
        "text-xs font-medium px-2 py-1 border border-gray-400 rounded-full",
        isMainCard
          ? "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      )}
    >
      {isMainCard ? "MAIN CARD" : "PRELIMS"}
    </Badge>
  );
}
