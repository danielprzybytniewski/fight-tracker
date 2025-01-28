import { Division } from "@/types/rankings-schema.types";
import { getRankingsWithImages } from "@/actions/rankings-actions";
import RankingsCard from "@/components/rankings-card";
import { Metadata } from "next";
import { createMetadata } from "@/lib/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "UFC Rankings",
  description: "Check out current UFC rankings",
  path: "/rankings",
});

export default async function RankingsPage() {
  const rankings = await getRankingsWithImages();

  return (
    <div className="container mx-auto p-4 py-8 dark:bg-gray-900 rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 pb-3 text-center bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
        UFC Rankings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {rankings.map((division: Division) => (
          <RankingsCard key={division.id} division={division} />
        ))}
      </div>
    </div>
  );
}
