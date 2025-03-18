import FightersSearchBar from "@/components/fighters/fighters-search-bar";
import FightersCategoryFilter from "@/components/fighters/fighters-category-filter";

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
    <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="flex justify-center md:justify-start w-full sm:mx-auto md:mx-0 sm:max-w-sm md:max-w-md">
        <FightersSearchBar
          searchValue={searchQuery}
          onSearch={onSearchChange}
        />
      </div>
      <div className="flex justify-center md:justify-end w-full sm:mx-auto md:mx-0 sm:max-w-sm md:max-w-md">
        <FightersCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
}
