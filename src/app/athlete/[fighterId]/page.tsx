import Image from "next/image";
import { getFighterDetails } from "@/actions/rankings-actions";
import {
  getAdditionalDetails,
  getGeneralDetails,
} from "@/lib/athlete-get-details";
import { AthleteDetails } from "@/components/athlete-details";
import AthleteRecordChart from "@/components/athlete-record-chart";
import { Metadata } from "next";
import BackButton from "@/components/back-button";

type Params = {
  fighterId: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { fighterId } = await params;

  return {
    title: `${fighterId.toUpperCase()} | Fight Tracker`,
    description: `Check out the info about athlete: ${fighterId}`,
    openGraph: {
      title: `${fighterId} | Fight Tracker`,
      description: `Check out the info about athlete: ${fighterId}`,
      images: ["https://fight-tracker.vercel.app/images/og-image.png"],
      type: "website",
      url: `https://fight-tracker.vercel.app/athlete/${fighterId}`,
    },
  };
}

export default async function AthletePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { fighterId } = await params;
  const fighter = await getFighterDetails(fighterId);

  const generalDetails = getGeneralDetails(fighter);
  const additionalDetails = getAdditionalDetails(fighter);

  const wins = fighter.wins || "0";
  const losses = fighter.losses || "0";
  const draws = fighter.draws || "0";

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-white dark:bg-gray-900 rounded-lg">
      <BackButton />
      <div className="grid grid-cols-1 gap-8 items-center p-6">
        <div className="relative h-72 sm:h-96 overflow-hidden">
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
          <AthleteRecordChart wins={wins} losses={losses} draws={draws} />
        </div>
      </div>
      <div className="mt-8 text-center">
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
  );
}
