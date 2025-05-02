import type { Metadata } from "next";
import Image from "next/image";
import { getFightsHistory } from "@/actions/fights-history.actions";
import { getFighterDetails } from "@/actions/rankings.actions";
import AthleteDetails from "@/components/athlete/athlete-details";
import AthleteRecordChart from "@/components/athlete/athlete-record-chart";
import FightsHistory from "@/components/fights-history/fights-history";
import BackButton from "@/components/shared/back-button";
import { formatSlugToReadableText } from "@/lib";
import {
  getAdditionalDetails,
  getGeneralDetails,
} from "@/lib/athlete-get-details";
import { createMetadata } from "@/lib/create-metadata";
import normalizeName from "@/lib/normalize-name";

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
    (keyword) => `${formattedFighterId} ${keyword}`,
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
    <div className="container mx-auto max-w-6xl rounded-lg bg-white p-4 dark:bg-gray-900">
      <BackButton />
      <div className="grid grid-cols-1 items-center gap-8 p-6">
        <div className="relative h-72 overflow-hidden sm:h-96">
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
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-4xl">
          {fighter.name}
        </h1>
        {fighter.nickname && (
          <p className="mb-6 text-xl italic text-gray-700 opacity-80 dark:text-gray-300">
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
