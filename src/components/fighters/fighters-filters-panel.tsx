import FightersCategoryFilter from "@/components/fighters/fighters-category-filter";
import FightersSearchBar from "@/components/fighters/fighters-search-bar";

type FightersFiltersPanelProps = {
  searchQuery: string;
  selectedCategory: string | null;
  categories: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string | null) => void;
};

export default function FightersFiltersPanel({
  searchQuery,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: FightersFiltersPanelProps) {
  return (
    <div className="mb-8 space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
      <div className="flex w-full justify-center sm:mx-auto sm:max-w-sm md:mx-0 md:max-w-md md:justify-start">
        <FightersSearchBar
          searchValue={searchQuery}
          onSearch={onSearchChange}
        />
      </div>
      <div className="flex w-full justify-center sm:mx-auto sm:max-w-sm md:mx-0 md:max-w-md md:justify-end">
        <FightersCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
}
