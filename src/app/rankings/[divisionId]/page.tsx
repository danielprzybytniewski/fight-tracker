import { getDivisionWithImages } from "@/actions/rankings-actions";
import { Fighter } from "@/types/rankings-schema.types";
import DivisionChampionCard from "@/components/division-champion-card";
import DivisionAthleteCard from "@/components/division-athlete-card";

type Params = {
  divisionId: string;
};

export default async function DivisionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { divisionId } = await params;
  const division = await getDivisionWithImages(divisionId);

  return (
    <div className="container mx-auto p-7 py-8 dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2 pb-3 text-center text-gray-800 dark:text-gray-200">
        {division.categoryName}
      </h1>
      <DivisionChampionCard division={division} />
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
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
