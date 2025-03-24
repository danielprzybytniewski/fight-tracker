import FightersFiltersPanel from "@/components/fighters/fighters-filters-panel";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/components/fighters/fighters-search-bar", () => {
  return jest.fn(({ searchValue, onSearch }) => (
    <div data-testid="search-bar">
      <input
        placeholder="Search for Fighters..."
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  ));
});

jest.mock("@/components/fighters/fighters-category-filter", () => {
  return jest.fn(({ categories, selectedCategory, onCategoryChange }) => (
    <div data-testid="category-filter">
      <button onClick={() => onCategoryChange("test-category")}>
        Select Category
      </button>
      <div data-testid="selected-category">{selectedCategory}</div>
      <ul data-testid="categories-list">
        {categories.map((category: string) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  ));
});

describe("FightersFiltersPanel", () => {
  const mockProps = {
    searchQuery: "initial search",
    selectedCategory: "heavyweight",
    categories: ["Heavyweight", "Lightweight", "Featherweight"],
    onSearchChange: jest.fn(),
    onCategoryChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    render(<FightersFiltersPanel {...mockProps} />);
  });

  test("renders both the search bar and category filter components correctly", () => {
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("category-filter")).toBeInTheDocument();
  });

  test("passes search value to FightersSearchBar correctly", () => {
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toHaveValue(mockProps.searchQuery);
  });

  test("calls onSearchChange when typing into the search input", async () => {
    const user = userEvent.setup();
    const searchInput = screen.getByRole("textbox");

    await user.clear(searchInput);
    await user.type(searchInput, "test query");

    expect(mockProps.onSearchChange).toHaveBeenCalled();
  });

  test("passes categories and selectedCategory props correctly to FightersCategoryFilter", () => {
    expect(screen.getByTestId("selected-category")).toHaveTextContent(
      mockProps.selectedCategory
    );

    const categoriesList = screen.getByTestId("categories-list");
    mockProps.categories.forEach((category) => {
      expect(within(categoriesList).getByText(category)).toBeInTheDocument();
    });
  });

  test("calls onCategoryChange when category selection is triggered", async () => {
    const user = userEvent.setup();
    const categoryButton = screen.getByText("Select Category");

    await user.click(categoryButton);

    expect(mockProps.onCategoryChange).toHaveBeenCalledWith("test-category");
  });
});
