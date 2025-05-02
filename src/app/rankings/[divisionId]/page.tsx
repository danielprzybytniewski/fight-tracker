import type { Metadata } from "next";
import { getDivisionWithImages } from "@/actions/rankings.actions";
import DivisionAthleteCard from "@/components/division/division-athlete-card";
import DivisionChampionCard from "@/components/division/division-champion-card";
import BackButton from "@/components/shared/back-button";
import { formatSlugToReadableText } from "@/lib";
import { createMetadata } from "@/lib/create-metadata";
import type { Fighter } from "@/types/rankings-schema.types";

type Params = {
  divisionId: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { divisionId } = await params;
  const formattedDivisionId = formatSlugToReadableText(divisionId);

  return createMetadata({
    title: `${formattedDivisionId} UFC Division`,
    description: `${formattedDivisionId} UFC division. Check out the current champion and top fighters in this weight class.`,
    keywords: [
      `UFC ${formattedDivisionId} division, UFC ${formattedDivisionId} champion, UFC ${formattedDivisionId} fighters, UFC ${formattedDivisionId} rankings`,
    ],
    path: `/rankings/${divisionId}`,
  });
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { divisionId } = await params;
  const division = await getDivisionWithImages(divisionId);

  return (
    <div className="container mx-auto rounded-lg p-7 py-8 dark:bg-gray-900">
      <BackButton />
      <h1 className="mb-2 mt-2 pb-3 text-center text-2xl font-extrabold text-gray-800 dark:text-gray-200 sm:mt-0 md:text-4xl">
        {division.categoryName} UFC Divison
      </h1>
      <DivisionChampionCard division={division} />
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-3xl">
        Rankings
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {division.fighters.map((fighter: Fighter, index: number) => (
          <DivisionAthleteCard
            fighter={fighter}
            index={index}
            key={fighter.id}
          />
        ))}
      </div>
    </div>
  );
}
