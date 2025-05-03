import AthleteDetailCard from "@/components/athlete/athlete-detail-card";
import type { DetailItem } from "@/types/rankings-schema.types";

type AthleteDetailsProps = {
  generalDetails: DetailItem[];
  additionalDetails: DetailItem[];
};

export default function AthleteDetails({
  generalDetails,
  additionalDetails,
}: AthleteDetailsProps) {
  return (
    <div className="text-gray-900 dark:text-gray-200">
      <div className="grid grid-cols-2 gap-5">
        {generalDetails.map((item) => (
          <AthleteDetailCard
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-5">
        {additionalDetails.map((item) => (
          <AthleteDetailCard
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
}
