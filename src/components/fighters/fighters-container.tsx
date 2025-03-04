"use client";
import type { Fighter } from "@/types/rankings-schema.types";
import { useFightersFilters } from "@/hooks/use-fighters-filters";
import FighterCard from "@/components/fighters/fighter-card";
import FightersCategoryFilter from "@/components/fighters/fighters-category-filter";
import FightersPagination from "@/components/fighters/fighters-pagination";
import FightersSearchBar from "@/components/fighters/fighters-search-bar";
import GradientHeading from "@/components/shared/gradient-heading";
import LoadingContainer from "@/components/shared/loading-container";

type FightersContainerProps = {
  initialFighters: Fighter[];
  initialCategories: string[];
  initialSearchQuery: string;
  initialCategory: string | null;
  initialPage: number;
};

export default function FightersContainer({
  initialFighters,
  initialCategories,
  initialSearchQuery,
  initialCategory,
  initialPage,
}: FightersContainerProps) {
  const {
    filters: { searchQuery, selectedCategory, currentPage },
    isLoading,
    filteredFighters,
    totalPages,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
  } = useFightersFilters({
    initialFighters,
    initialFilters: {
      searchQuery: initialSearchQuery,
      selectedCategory: initialCategory,
      currentPage: initialPage,
    },
  });

  const renderFilters = () => (
    <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="w-full sm:mx-auto md:mx-0 sm:max-w-sm md:max-w-md flex justify-center md:justify-start">
        <FightersSearchBar
          initialValue={searchQuery}
          onSearch={handleSearchChange}
        />
      </div>
      <div className="w-full sm:mx-auto md:mx-0 sm:max-w-sm md:max-w-md flex justify-center md:justify-end">
        <FightersCategoryFilter
          categories={initialCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );

  const renderFightersList = () => {
    if (filteredFighters.length === 0) {
      return (
        <p className="text-center py-12 text-gray-600 dark:text-gray-400 text-lg">
          No fighters found
        </p>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFighters.map((fighter) => (
            <FighterCard key={fighter.id} fighter={fighter} />
          ))}
        </div>

        <FightersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen rounded-lg">
      <GradientHeading>UFC Fighters</GradientHeading>
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <>
          {renderFilters()}
          {renderFightersList()}
        </>
      )}
    </div>
  );
}
