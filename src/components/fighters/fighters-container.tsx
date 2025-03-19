"use client";
import { useState } from "react";
import type { Fighter } from "@/types/rankings-schema.types";
import GradientHeading from "@/components/shared/gradient-heading";
import LoadingContainer from "@/components/shared/loading-container";
import FightersFiltersPanel from "@/components/fighters/fighters-filters-panel";
import FightersPaginatedList from "@/components/fighters/fighters-paginated-list";
import { useFightersFiltersAndPagination } from "@/hooks/use-fighters-filters-and-pagination";

type FightersContainerProps = {
  initialFighters: Fighter[];
  initialSearchQuery: string;
  initialCategory: string | null;
  initialCategories: string[];
  initialPage: number;
};

export default function FightersContainer({
  initialFighters,
  initialSearchQuery,
  initialCategory,
  initialCategories,
  initialPage,
}: FightersContainerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    filters,
    paginatedFighters,
    totalPages,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
  } = useFightersFiltersAndPagination({
    initialFighters,
    initialSearchQuery,
    initialCategory,
    initialCategories,
    initialPage,
    setIsLoading,
  });

  const { searchQuery, selectedCategory, currentPage } = filters;

  return (
    <div className="container min-h-screen mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <GradientHeading size="large">UFC Fighters</GradientHeading>
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <>
          <FightersFiltersPanel
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            categories={initialCategories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
          />

          <FightersPaginatedList
            paginatedFighters={paginatedFighters}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
