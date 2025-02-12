import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const fightResultBadgeVariants = cva(
  "text-xs sm:text-sm text-gray-100 pointer-events-none",
  {
    variants: {
      result: {
        Win: "bg-green-600",
        Draw: "bg-yellow-500",
        Loss: "bg-red-600",
      },
    },
    defaultVariants: {
      result: "Win",
    },
  }
);

const FightsHistoryResultBadge = ({
  result,
  className,
}: {
  result: "Win" | "Draw" | "Loss";
  className?: string;
} & VariantProps<typeof fightResultBadgeVariants>) => {
  return (
    <Badge
      variant="secondary"
      className={cn(fightResultBadgeVariants({ result, className }))}
    >
      {result}
    </Badge>
  );
};

export default FightsHistoryResultBadge;
