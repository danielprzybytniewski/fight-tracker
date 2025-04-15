import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import slugify from "@/lib/slugify";

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
                ? `bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border-gray-500 
                dark:border-gray-400 `
                : `bg-gray-50 dark:bg-gray-800 hover:text-gray-800 hover:bg-gray-200 dark:hover:text-gray-50
                 dark:hover:bg-gray-600`
            )}
          >
            {categoryLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-gray-600">
          <DropdownMenuItem
            onClick={() => onCategoryChange(null)}
            className={cn(
              "cursor-pointer hover:text-gray-800 hover:bg-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-700 transition-colors duration-200",
              selectedCategory === null &&
                "font-semibold bg-gray-100 dark:bg-gray-800"
            )}
          >
            All
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "cursor-pointer hover:text-gray-800 hover:bg-gray-200 dark:hover:text-gray-50 dark:hover:bg-gray-700 transition-colors duration-200",
                selectedCategory === slugify(category) &&
                  "font-semibold bg-gray-100 dark:bg-gray-800"
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
