import EventTypeBadge from "@/components/events/event-type-badge";
import EventWeightBadge from "@/components/events/event-weight-badge";

type EventFighterSeparatorProps = {
  isMainCard: boolean;
  weight: number;
};

export default function EventFighterSeparator({
  isMainCard,
  weight,
}: EventFighterSeparatorProps) {
  return (
    <div className="mx-4 my-3 flex w-auto min-w-[6rem] flex-col items-center justify-center sm:my-0">
      <span className="mb-3 hidden sm:inline-block">
        <EventTypeBadge isMainCard={isMainCard} />
      </span>
      <p className="rounded-full border border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200 px-2 py-1 text-center text-xs font-bold tracking-wider text-gray-900 shadow-sm dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 dark:text-gray-100 sm:text-sm">
        VS
      </p>
      <span className="mt-3 hidden sm:inline-block">
        <EventWeightBadge weight={weight} />
      </span>
    </div>
  );
}
