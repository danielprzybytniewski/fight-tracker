import Image from "next/image";
import { getFighterDetails } from "@/actions/rankings-actions";
import {
  getAdditionalDetails,
  getGeneralDetails,
} from "@/lib/athlete-get-details";
import { AthleteDetails } from "@/components/athlete-details";

type Params = {
  fighterId: string;
};

export default async function AthletePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { fighterId } = await params;
  const fighter = await getFighterDetails(fighterId);

  const generalDetails = getGeneralDetails(fighter);
  const additionalDetails = getAdditionalDetails(fighter);

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-white dark:bg-gray-900 rounded-lg">
      <div className="transition-all duration-300 text-center sm:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="relative h-64 sm:h-full overflow-hidden rounded-lg">
            {fighter.imgUrl && (
              <Image
                src={fighter.imgUrl}
                alt={fighter.name}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-200">
              {fighter.name}
            </h1>
            {fighter.nickname && (
              <p className="text-xl italic mb-6 opacity-80 text-gray-700 dark:text-gray-300">
                &quot;{fighter.nickname}&quot;
              </p>
            )}
            <AthleteDetails
              generalDetails={generalDetails}
              additionalDetails={additionalDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
