"use client";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { Input } from "@/components/ui/input";

type FightersSearchBarProps = {
  searchValue: string;
  onSearch: (query: string) => void;
};

export default function FightersSearchBar({
  searchValue,
  onSearch,
}: FightersSearchBarProps) {
  const [value, setValue] = useState(searchValue);

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, 500),
    [onSearch],
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
        className="border-gray-300 bg-gray-50 text-sm dark:border-gray-700 dark:bg-gray-800"
      />
    </div>
  );
}
