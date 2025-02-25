import { Division } from "@/types/rankings-schema.types";
import { getRankingsWithImages } from "@/actions/rankings-actions";
import RankingsCard from "@/components/rankings/rankings-card";
import { Metadata } from "next";
import { createMetadata } from "@/lib/create-metadata";
import GradientHeading from "@/components/shared/gradient-heading";

export const metadata: Metadata = createMetadata({
  title: "UFC Rankings",
  description: "Check out current UFC rankings",
  path: "/rankings",
});

export default async function RankingsPage() {
  const rankings = await getRankingsWithImages();

  return (
    <div className="container mx-auto p-4 py-6 dark:bg-gray-900 rounded-lg">
      <GradientHeading size="large">UFC Rankings</GradientHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {rankings.map((division: Division) => (
          <RankingsCard key={division.id} division={division} />
        ))}
      </div>
    </div>
  );
}
