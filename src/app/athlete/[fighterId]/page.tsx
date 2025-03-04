import Image from "next/image";
import { getFighterDetails } from "@/actions/rankings-actions";
import {
  getAdditionalDetails,
  getGeneralDetails,
} from "@/lib/athlete-get-details";
import AthleteRecordChart from "@/components/athlete/athlete-record-chart";
import { Metadata } from "next";
import BackButton from "@/components/shared/back-button";
import { createMetadata } from "@/lib/create-metadata";
import AthleteDetails from "@/components/athlete/athlete-details";
import { getFightsHistory } from "@/actions/fights-history-actions";
import FightsHistory from "@/components/fights-history/fights-history";
import normalizeName from "@/lib/normalize-name";
import formatSlugToReadableText from "@/lib/format-slug-to-readable-text";

type Params = {
  fighterId: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { fighterId } = await params;
  const formattedFighterId = formatSlugToReadableText(fighterId);

  const fighterProfileKeywords = [
    "profile",
    "info",
    "stats",
    "fight history",
    "UFC record",
    "past fights",
    "career highlights",
    "UFC journey",
    "fight results",
    "UFC performance",
  ];

  const keywords = fighterProfileKeywords.map(
    (keyword) => `${formattedFighterId} ${keyword}`
  );

  return createMetadata({
    title: `${formattedFighterId}`,
    description: `Check out the info about athlete: ${formattedFighterId}`,
    keywords: keywords,
    path: `/athlete/${fighterId}`,
  });
}

export default async function AthletePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { fighterId } = await params;
  const fighter = await getFighterDetails(fighterId);

  const normalizedFighterName = normalizeName(fighter.name);
  const fightsHistory = await getFightsHistory(normalizedFighterName);

  const generalDetails = getGeneralDetails(fighter);
  const additionalDetails = getAdditionalDetails(fighter);

  const wins = fighter.wins || 0;
  const losses = fighter.losses || 0;
  const draws = fighter.draws || 0;

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
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          )}
        </div>
        <div>
          <AthleteRecordChart wins={wins} losses={losses} draws={draws} />
        </div>
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-200">
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
        <FightsHistory
          fightsHistory={fightsHistory}
          mainFighterName={normalizedFighterName}
        />
      </div>
    </div>
  );
}
