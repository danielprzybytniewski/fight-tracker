import EventFightCardTypeBadge from "@/components/event-fight-card-type-badge";
import EventFightCardWeightBadge from "@/components/event-fight-card-weight-badge";

type EventFightCardDetailsProps = {
  isMainCard: boolean;
  weight: number;
};

export default function EventFightCardDetails({
  isMainCard,
  weight,
}: EventFightCardDetailsProps) {
  return (
    <div className="flex flex-col items-center justify-center mx-2 w-auto min-w-[5rem]">
      <span className="hidden sm:inline-block mb-2">
        <EventFightCardTypeBadge isMainCard={isMainCard} />
      </span>
      <p
        className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 text-sm sm:text-lg py-1 px-2 font-semibold 
      rounded-full text-center"
      >
        VS
      </p>
      <span className="hidden sm:inline-block mt-2">
        <EventFightCardWeightBadge weight={weight} />
      </span>
    </div>
  );
}
