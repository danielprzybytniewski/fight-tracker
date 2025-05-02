import type { Metadata } from "next";
import { getAllFighters } from "@/actions/rankings.actions";
import FightersContainer from "@/components/fighters/fighters-container";
import { createMetadata } from "@/lib/create-metadata";
import removeDivisionSuffix from "@/lib/remove-division-suffix";
import slugify from "@/lib/slugify";
import type { Fighter } from "@/types/rankings-schema.types";

type SearchParams = {
  page?: string;
  search?: string;
  category?: string;
};

export const metadata: Metadata = createMetadata({
  title: "UFC Fighters",
  description: "Check out best UFC fighters",
  path: "/fighters",
});

export default async function FightersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const fighters = await getAllFighters();
  const fightersArray = Object.entries(fighters).map(([id, fighter]) => ({
    ...fighter,
    category: removeDivisionSuffix(fighter.category),
    id,
  }));

  const { page, search, category } = await searchParams;
  const currentPage = Number(page) || 1;
  const searchQuery = search || "";
  const selectedCategory = category ? slugify(category) : null;

  const categories = [
    ...new Set(
      fightersArray.map((fighter: Fighter) => fighter.category).filter(Boolean),
    ),
  ];

  return (
    <FightersContainer
      initialFighters={fightersArray}
      initialCategories={categories}
      initialSearchQuery={searchQuery}
      initialCategory={selectedCategory}
      initialPage={currentPage}
    />
  );
}
