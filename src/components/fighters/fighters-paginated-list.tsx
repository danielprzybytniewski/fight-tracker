"use client";
import FighterCard from "@/components/fighters/fighter-card";
import FightersPagination from "@/components/fighters/fighters-pagination";
import type { Fighter } from "@/types/rankings-schema.types";

type FightersPaginatedListProps = {
  paginatedFighters: Fighter[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function FightersPaginatedList({
  paginatedFighters,
  currentPage,
  totalPages,
  onPageChange,
}: FightersPaginatedListProps) {
  if (paginatedFighters.length === 0) {
    return (
      <p className="py-12 text-center text-lg text-gray-600 dark:text-gray-400">
        No fighters found
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedFighters.map((fighter) => (
          <FighterCard key={fighter.id} fighter={fighter} />
        ))}
      </div>

      <FightersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
