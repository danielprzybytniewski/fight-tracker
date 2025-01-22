import { DetailItem } from "@/types/rankings-schema.types";
import AthleteDetailCard from "@/components/athlete-detail-card";

type FighterDetailsProps = {
  generalDetails: DetailItem[];
  additionalDetails: DetailItem[];
};

export default function AthleteDetails({
  generalDetails,
  additionalDetails,
}: FighterDetailsProps) {
  return (
    <div className="text-gray-900 dark:text-gray-200">
      <div className="grid grid-cols-2 gap-5">
        {generalDetails.map((item, index) => (
          <AthleteDetailCard
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {additionalDetails.map((item, index) => (
          <AthleteDetailCard
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
}
