import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import slugify from "@/lib/slugify";
import { cn } from "@/lib/utils";

type FightersCategoryFilterProps = {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

export default function FightersCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: FightersCategoryFilterProps) {
  const isValidCategory = selectedCategory
    ? categories.some((category) => slugify(category) === selectedCategory)
    : true;

  const categoryLabel =
    selectedCategory && isValidCategory
      ? categories.find((category) => slugify(category) === selectedCategory)
      : "Select Category";

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "text-sm transition-colors duration-200",
              selectedCategory && isValidCategory
                ? `border-gray-500 bg-gray-200 hover:bg-gray-300 dark:border-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600`
                : `bg-gray-50 hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-50`,
            )}
          >
            {categoryLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-gray-600">
          <DropdownMenuItem
            onClick={() => onCategoryChange(null)}
            className={cn(
              "cursor-pointer transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-50",
              selectedCategory === null &&
                "bg-gray-100 font-semibold dark:bg-gray-800",
            )}
          >
            All
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "cursor-pointer transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-50",
                selectedCategory === slugify(category) &&
                  "bg-gray-100 font-semibold dark:bg-gray-800",
              )}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
