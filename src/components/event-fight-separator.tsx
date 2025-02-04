import EventTypeBadge from "@/components/event-type-badge";
import EventWeightBadge from "@/components/event-weight-badge";

type EventFightSeparatorProps = {
  isMainCard: boolean;
  weight: number;
};

export default function EventFightSeparator({
  isMainCard,
  weight,
}: EventFightSeparatorProps) {
  return (
    <div className="flex flex-col items-center justify-center mx-2 w-auto min-w-[5rem]">
      <span className="hidden sm:inline-block mb-2">
        <EventTypeBadge isMainCard={isMainCard} />
      </span>
      <p
        className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 text-sm sm:text-lg py-1 px-2 font-semibold 
      rounded-full text-center"
      >
        VS
      </p>
      <span className="hidden sm:inline-block mt-2">
        <EventWeightBadge weight={weight} />
      </span>
    </div>
  );
}
