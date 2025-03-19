import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FightResult } from "@/types/fights-history.schema.types";
import { VariantProps, cva } from "class-variance-authority";

const fightResultBadgeVariants = cva(
  "py-0 sm:py-1 text-xs text-gray-100 rounded pointer-events-none",
  {
    variants: {
      result: {
        win: "bg-green-600",
        draw: "bg-yellow-500",
        loss: "bg-red-600",
      },
    },
  }
);

const FightsHistoryResultBadge = ({
  result,
  className,
}: {
  result: FightResult;
  className?: string;
} & VariantProps<typeof fightResultBadgeVariants>) => {
  return (
    <Badge
      variant="secondary"
      className={cn(fightResultBadgeVariants({ result, className }))}
    >
      {result.toUpperCase()}
    </Badge>
  );
};

export default FightsHistoryResultBadge;
