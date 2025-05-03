"use client";
import { useState } from "react";
import FightersFiltersPanel from "@/components/fighters/fighters-filters-panel";
import FightersPaginatedList from "@/components/fighters/fighters-paginated-list";
import GradientHeading from "@/components/shared/gradient-heading";
import LoadingContainer from "@/components/shared/loading-container";
import { useFightersFiltersAndPagination } from "@/hooks/use-fighters-filters-and-pagination";
import type { Fighter } from "@/types/rankings-schema.types";

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
    <div className="container mx-auto min-h-screen rounded-lg bg-gray-50 px-4 py-8 dark:bg-gray-900">
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
