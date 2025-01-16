import { Division } from "@/types/rankings-schema.types";
import { getRankingsWithImages } from "@/actions/rankings-actions";
import RankingsCard from "@/components/rankings-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UFC Rankings | Fight Tracker",
  description: "Check out current UFC rankings",
  openGraph: {
    title: "UFC Rankings | Fight Tracker",
    description: "Check out current UFC rankings",
    images: ["https://fight-tracker.vercel.app/images/og-image.png"],
    type: "website",
    url: "https://fight-tracker.vercel.app/rankings",
  },
};

export default async function RankingsPage() {
  const rankings = await getRankingsWithImages();

  return (
    <div className="container mx-auto p-4 py-8 dark:bg-gray-900 rounded-lg">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2 pb-3 text-center text-gray-800 dark:text-gray-200">
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
