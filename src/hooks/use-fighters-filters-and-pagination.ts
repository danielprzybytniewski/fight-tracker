"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import normalizeName from "@/lib/normalize-name";
import slugify from "@/lib/slugify";
import type { Fighter } from "@/types/rankings-schema.types";

type Filters = {
  searchQuery: string;
  selectedCategory: string | null;
  currentPage: number;
};

export type UseFightersFiltersAndPaginationProps = {
  initialFighters: Fighter[];
  initialSearchQuery: string;
  initialCategory: string | null;
  initialCategories: string[];
  initialPage: number;
  setIsLoading: (isLoading: boolean) => void;
};

const FIGHTERS_PER_PAGE = 12;

export function useFightersFiltersAndPagination({
  initialFighters,
  initialSearchQuery,
  initialCategory,
  initialCategories,
  initialPage,
  setIsLoading,
}: UseFightersFiltersAndPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSearchingRef = useRef(false);

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
        slugify(fighter.category) === selectedCategory),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFighters.length / FIGHTERS_PER_PAGE),
  );

  useEffect(() => {
    if (isSearchingRef.current) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    const pageParams = params.get("page");
    const pageNumber = Number(pageParams);
    const searchParam = params.get("search");
    const categoryParams = params.get("category");

    const isPageNumberInvalid =
      pageParams !== null &&
      (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages);

    const validPage = isPageNumberInvalid ? 1 : pageNumber || 1;

    const matchingCategory = categoryParams
      ? initialCategories.find(
          (category) => slugify(category) === slugify(categoryParams),
        )
      : null;

    const isCategoryNotFound = categoryParams && !matchingCategory;

    setFilters({
      searchQuery: searchParam ? decodeURIComponent(searchParam) : "",
      selectedCategory: matchingCategory ? slugify(matchingCategory) : null,
      currentPage: validPage,
    });

    if (isPageNumberInvalid || isCategoryNotFound) {
      setIsLoading(true);
      const newParams = new URLSearchParams(searchParams.toString());

      if (isPageNumberInvalid) {
        newParams.set("page", validPage.toString());
      }

      if (isCategoryNotFound) {
        newParams.delete("category");
      }

      router.push(`${pathname}?${newParams.toString()}`, { scroll: true });

      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  }, [
    searchParams,
    totalPages,
    router,
    pathname,
    initialCategories,
    setIsLoading,
  ]);

  useEffect(() => {
    if (!searchParams.get("page") || !isNaN(Number(searchParams.get("page")))) {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  }, [searchParams, setIsLoading]);

  const paginatedFighters = filteredFighters.slice(
    (currentPage - 1) * FIGHTERS_PER_PAGE,
    currentPage * FIGHTERS_PER_PAGE,
  );

  const updateUrl = useCallback(
    (newFilters: Filters) => {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (newFilters.searchQuery.trim()) {
        params.set("search", encodeURIComponent(newFilters.searchQuery.trim()));
      }

      if (newFilters.selectedCategory) {
        params.set("category", newFilters.selectedCategory);
      }

      params.set("page", newFilters.currentPage.toString());

      isSearchingRef.current = true;

      router.push(`${pathname}?${params.toString()}`, { scroll: true });

      setTimeout(() => {
        isSearchingRef.current = false;
        setIsLoading(false);
      }, 100);
    },
    [router, pathname, setIsLoading],
  );

  function handleSearchChange(query: string) {
    isSearchingRef.current = true;

    const newFilters = {
      searchQuery: query,
      selectedCategory: query ? null : filters.selectedCategory,
      currentPage: 1,
    };

    setFilters(newFilters);

    updateUrl(newFilters);
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
    if (page === currentPage) {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (searchQuery) {
        params.set("search", encodeURIComponent(searchQuery));
      }

      if (selectedCategory) {
        params.set("category", selectedCategory);
      }

      params.set("page", page.toString());

      router.push(`${pathname}?${params.toString()}`, { scroll: true });

      setTimeout(() => {
        setIsLoading(false);
      }, 0);

      return;
    }

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
