import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMediaQuery } from "@/hooks/use-media-query";
import generatePageNumbers from "@/lib/generate-page-numbers";
import { cn } from "@/lib/utils";

type FightersPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function FightersPagination({
  currentPage,
  totalPages,
  onPageChange,
}: FightersPaginationProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const pageNumbers = generatePageNumbers({
    currentPage,
    totalPages,
    isMobile,
  });

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <Pagination className="mt-4 flex justify-center sm:mt-6">
      <PaginationContent className="flex gap-1 sm:gap-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={cn(
              `border border-gray-200 px-2 py-1 text-xs transition-colors duration-200 hover:bg-gray-200 dark:border-gray-800 dark:hover:bg-gray-500 dark:hover:text-gray-50 sm:py-2 sm:text-sm`,
              currentPage === 1 && "pointer-events-none opacity-50",
            )}
            aria-label="Go to previous page"
          />
        </PaginationItem>
        {pageNumbers.map((page, index) => {
          const needsEllipsisBefore =
            !isMobile && index > 0 && page > pageNumbers[index - 1] + 1;

          return (
            <div key={`page-${page}`} className="flex">
              {needsEllipsisBefore && (
                <PaginationItem className="mr-2 hidden sm:flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    handlePageClick(e, page)
                  }
                  className={cn(
                    `border border-gray-200 px-2 py-1 text-xs transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 dark:border-gray-800 dark:hover:bg-gray-500 dark:hover:text-gray-50 sm:py-2 sm:text-sm`,
                    page === currentPage &&
                      `border-gray-500 bg-gray-200 hover:bg-gray-300 dark:border-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600`,
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            </div>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={cn(
              `border border-gray-200 px-2 py-1 text-xs transition-colors duration-200 hover:bg-gray-200 dark:border-gray-800 dark:hover:bg-gray-500 dark:hover:text-gray-50 sm:py-2 sm:text-sm`,
              currentPage === totalPages && "pointer-events-none opacity-50",
            )}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
