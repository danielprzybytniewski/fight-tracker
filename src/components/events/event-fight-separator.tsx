import EventTypeBadge from "@/components/events/event-type-badge";
import EventWeightBadge from "@/components/events/event-weight-badge";

type EventFightSeparatorProps = {
  isMainCard: boolean;
  weight: number;
};

export default function EventFightSeparator({
  isMainCard,
  weight,
}: EventFightSeparatorProps) {
  return (
    <div className="flex flex-col items-center justify-center mx-4 my-3 sm:my-0 w-auto min-w-[6rem]">
      <span className="hidden sm:inline-block mb-3">
        <EventTypeBadge isMainCard={isMainCard} />
      </span>
      <p
        className="py-1 px-2 text-xs sm:text-sm font-bold tracking-wider text-center text-gray-900 dark:text-gray-100 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full border border-gray-300
         dark:border-gray-700 shadow-sm"
      >
        VS
      </p>
      <span className="hidden sm:inline-block mt-3">
        <EventWeightBadge weight={weight} />
      </span>
    </div>
  );
}
