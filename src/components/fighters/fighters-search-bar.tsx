import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

type FightersSearchBarProps = {
  initialValue: string;
  onSearch: (query: string) => void;
};

export default function FightersSearchBar({
  initialValue,
  onSearch,
}: FightersSearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, 500),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search for Fighters..."
        value={value}
        onChange={handleChange}
        className="text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      />
    </div>
  );
}
