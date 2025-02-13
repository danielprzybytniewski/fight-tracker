import { getDivisionWithImages } from "@/actions/rankings-actions";
import { Fighter } from "@/types/rankings-schema.types";
import DivisionChampionCard from "@/components/division-champion-card";
import DivisionAthleteCard from "@/components/division-athlete-card";
import { Metadata } from "next";
import BackButton from "@/components/back-button";
import { createMetadata } from "@/lib/create-metadata";
import formatSlugToReadableText from "@/lib/format-slug-to-readable-text";

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
    <div className="container mx-auto p-7 py-8 dark:bg-gray-900">
      <BackButton />
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 pb-3 text-center text-gray-800 dark:text-gray-200">
        {division.categoryName} UFC Divison
      </h1>
      <DivisionChampionCard division={division} />
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
        Rankings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
