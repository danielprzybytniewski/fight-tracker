import { getDivisionWithImages } from "@/actions/rankings.actions";
import { Fighter } from "@/types/rankings-schema.types";
import DivisionChampionCard from "@/components/division/division-champion-card";
import DivisionAthleteCard from "@/components/division/division-athlete-card";
import { Metadata } from "next";
import BackButton from "@/components/shared/back-button";
import { createMetadata } from "@/lib/create-metadata";
import { formatSlugToReadableText } from "@/lib";

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
    <div className="container mx-auto p-7 py-8 dark:bg-gray-900 rounded-lg">
      <BackButton />
      <h1 className="mb-2 pb-3 mt-2 sm:mt-0 text-2xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200">
        {division.categoryName} UFC Divison
      </h1>
      <DivisionChampionCard division={division} />
      <h2 className="mb-8 text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        Rankings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
