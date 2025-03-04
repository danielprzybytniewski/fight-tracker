type generatePageNumbersProps = {
  currentPage: number;
  totalPages: number;
  isMobile: boolean;
};

export default function generatePageNumbers({
  currentPage,
  totalPages,
  isMobile,
}: generatePageNumbersProps): number[] {
  const pages: number[] = [];

  if (isMobile) {
    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages) pages.push(currentPage + 1);
  } else {
    pages.push(1);
    if (currentPage > 2) pages.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages)
      pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);
    if (totalPages > 1) pages.push(totalPages);
  }

  return [...new Set(pages)];
}
