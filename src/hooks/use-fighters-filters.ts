import { useCallback, useState, useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Fighter } from "@/types/rankings-schema.types";
import normalizeName from "@/lib/normalize-name";
import slugify from "@/lib/slugify";

type Filters = {
  searchQuery: string;
  selectedCategory: string | null;
  currentPage: number;
};

type UseFiltersProps = {
  initialFighters: Fighter[];
  initialFilters: Filters;
  itemsPerPage?: number;
};

type URLParams = {
  search?: string;
  category?: string;
  page?: string;
};

const DEFAULT_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE = 12;

export function useFightersFilters({
  initialFighters,
  initialFilters,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const { searchQuery, selectedCategory, currentPage } = filters;

  const filteredFighters = useMemo(
    () =>
      initialFighters.filter(
        (fighter) =>
          (searchQuery === "" ||
            normalizeName(fighter.name)
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          (selectedCategory === null ||
            slugify(fighter.category) === selectedCategory)
      ),
    [initialFighters, searchQuery, selectedCategory]
  );

  const totalPages = Math.ceil(filteredFighters.length / itemsPerPage);

  const paginatedFighters = useMemo(
    () =>
      filteredFighters.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredFighters, currentPage, itemsPerPage]
  );

  const updateFiltersFromURL = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    const newPage = Math.min(
      Math.max(Number(params.get("page")) || DEFAULT_PAGE, DEFAULT_PAGE),
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

  const buildURLParams = (newFilters: Filters): URLParams => {
    const params: URLParams = {};

    if (newFilters.searchQuery) {
      params.search = encodeURIComponent(newFilters.searchQuery);
    }

    if (newFilters.selectedCategory) {
      params.category = newFilters.selectedCategory;
    }

    params.page = newFilters.currentPage.toString();

    return params;
  };

  const updateURL = useCallback(
    (newFilters: Filters) => {
      setIsLoading(true);
      const params = new URLSearchParams();
      const urlParams = buildURLParams(newFilters);

      Object.entries(urlParams).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    },
    [router, pathname]
  );

  useEffect(() => {
    updateFiltersFromURL();
  }, [updateFiltersFromURL]);

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const updateFilters = (newFilters: Partial<Filters>) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
      currentPage:
        newFilters.searchQuery || newFilters.selectedCategory
          ? DEFAULT_PAGE
          : newFilters.currentPage ?? filters.currentPage,
    };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
  };

  return {
    filters,
    isLoading,
    filteredFighters: paginatedFighters,
    totalPages,
    handleSearchChange: (query: string) =>
      updateFilters({
        searchQuery: query,
        selectedCategory: query ? null : null,
      }),
    handleCategoryChange: (category: string | null) =>
      updateFilters({
        selectedCategory: category ? slugify(category) : null,
      }),
    handlePageChange: (page: number) => updateFilters({ currentPage: page }),
  };
}
