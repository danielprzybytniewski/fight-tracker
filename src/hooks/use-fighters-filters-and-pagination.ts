"use client";
import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Fighter } from "@/types/rankings-schema.types";
import normalizeName from "@/lib/normalize-name";
import slugify from "@/lib/slugify";

type Filters = {
  searchQuery: string;
  selectedCategory: string | null;
  currentPage: number;
};

type UseFightersFiltersAndPaginationProps = {
  initialFighters: Fighter[];
  initialSearchQuery: string;
  initialCategory: string | null;
  initialPage: number;
  setIsLoading: (isLoading: boolean) => void;
};

const ITEMS_PER_PAGE = 12;

export function useFightersFiltersAndPagination({
  initialFighters,
  initialSearchQuery,
  initialCategory,
  initialPage,
  setIsLoading,
}: UseFightersFiltersAndPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    searchQuery: initialSearchQuery,
    selectedCategory: initialCategory,
    currentPage: initialPage,
  });

  const { searchQuery, selectedCategory, currentPage } = filters;

  const filteredFighters = initialFighters.filter(
    (fighter) =>
      (searchQuery === "" ||
        normalizeName(fighter.name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (selectedCategory === null ||
        slugify(fighter.category) === selectedCategory)
  );

  const totalPages = Math.ceil(filteredFighters.length / ITEMS_PER_PAGE);

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
  }, [searchParams, setIsLoading]);

  const paginatedFighters = filteredFighters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
    [router, pathname, searchParams, setIsLoading]
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

  return {
    filters,
    filteredFighters,
    paginatedFighters,
    totalPages,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
  };
}
