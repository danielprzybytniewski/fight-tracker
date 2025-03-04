"use client";
import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FighterCard from "@/components/fighters/fighter-card";
import FightersCategoryFilter from "@/components/fighters/fighters-category-filter";
import FightersPagination from "@/components/fighters/fighters-pagination";
import FightersSearchBar from "@/components/fighters/fighters-search-bar";
import type { Fighter } from "@/types/rankings-schema.types";
import GradientHeading from "@/components/shared/gradient-heading";
import normalizeName from "@/lib/normalize-name";
import slugify from "@/lib/slugify";
import LoadingContainer from "@/components/shared/loading-container";

type FightersContainerProps = {
  initialFighters: Fighter[];
  initialCategories: string[];
  initialSearchQuery: string;
  initialCategory: string | null;
  initialPage: number;
};

type Filters = {
  searchQuery?: string;
  selectedCategory?: string | null;
  currentPage: number;
};

export default function FightersContainer({
  initialFighters,
  initialCategories,
  initialSearchQuery,
  initialCategory,
  initialPage,
}: FightersContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    searchQuery: initialSearchQuery,
    selectedCategory: initialCategory,
    currentPage: initialPage,
  });

  const { searchQuery, selectedCategory, currentPage } = filters;
  const itemsPerPage = 12;

  const filteredFighters = initialFighters.filter(
    (fighter) =>
      (searchQuery === "" ||
        normalizeName(fighter.name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (selectedCategory === null ||
        slugify(fighter.category) === selectedCategory)
  );

  const totalPages = Math.ceil(filteredFighters.length / itemsPerPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newPage = Math.min(
      Math.max(Number(params.get("page")) || 1, 1),
      totalPages
    );

    setFilters({
      searchQuery: params.get("search")
        ? decodeURIComponent(params.get("search")!)
        : "",
      selectedCategory: params.get("category")
        ? slugify(params.get("category") as string)
        : null,
      currentPage: newPage,
    });
  }, [searchParams, totalPages]);

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const paginatedFighters = filteredFighters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateUrl = useCallback(
    (newFilters: Filters) => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.searchQuery) {
        params.set("search", newFilters.searchQuery);
        params.delete("category");
      } else {
        params.delete("search");
      }

      if (newFilters.selectedCategory) {
        params.set("category", newFilters.selectedCategory);
      } else {
        params.delete("category");
      }

      params.set("page", newFilters.currentPage.toString());

      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    },
    [router, pathname, searchParams]
  );

  function handleSearchChange(query: string) {
    const newFilters = {
      searchQuery: query,
      selectedCategory: query ? null : null,
      currentPage: 1,
    };
    const encodedFilters = {
      ...newFilters,
      searchQuery: encodeURIComponent(newFilters.searchQuery || ""),
    };

    setFilters(newFilters);
    updateUrl(encodedFilters);
  }

  function handleCategoryChange(category: string | null) {
    const newFilters = {
      searchQuery,
      selectedCategory: category ? slugify(category) : null,
      currentPage: 1,
    };

    setFilters(newFilters);
    updateUrl(newFilters);
  }

  function handlePageChange(page: number) {
    const newFilters = {
      searchQuery,
      selectedCategory,
      currentPage: page,
    };

    setFilters(newFilters);
    updateUrl(newFilters);
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen rounded-lg">
      <GradientHeading>UFC Fighters</GradientHeading>
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <>
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
          {paginatedFighters.length === 0 ? (
            <p className="text-center py-12 text-gray-600 dark:text-gray-400 text-lg">
              No fighters found
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedFighters.map((fighter) => (
                  <FighterCard key={fighter.id} fighter={fighter} />
                ))}
              </div>

              <FightersPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
