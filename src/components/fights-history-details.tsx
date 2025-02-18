import type { LucideIcon } from "lucide-react";

type FightsHistoryDetailsProps = {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
};

export default function FightsHistoryDetails({
  icon: Icon,
  label,
  value,
}: FightsHistoryDetailsProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="flex items-center text-gray-600 dark:text-gray-400">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
        {label}:
      </span>
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {value}
      </span>
    </div>
  );
}
