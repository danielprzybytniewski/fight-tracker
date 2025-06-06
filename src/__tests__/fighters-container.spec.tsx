import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FightersContainer from "@/components/fighters/fighters-container";
import { useFightersFiltersAndPagination } from "@/hooks/use-fighters-filters-and-pagination";

jest.mock("@/hooks/use-fighters-filters-and-pagination");
jest.mock("@/hooks/use-media-query");

jest.mock("@/components/shared/gradient-heading", () =>
  jest.fn(() => <h1 data-testid="gradient-heading">UFC Fighters</h1>),
);

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

jest.mock("@/hooks/use-favorites", () => ({
  useFavorites: jest.fn(() => ({
    isFavorite: jest.fn(() => false),
    toggleFavoriteWithToast: jest.fn(),
  })),
}));

const mockUseFightersFiltersAndPagination =
  useFightersFiltersAndPagination as jest.Mock;

describe("FightersContainer", () => {
  const mockInitialFighters = [
    { id: "1", name: "Fighter 1", category: "Lightweight" },
    { id: "2", name: "Fighter 2", category: "Heavyweight" },
  ];

  const mockInitialCategories = ["Lightweight", "Heavyweight", "Welterweight"];

  let handleSearchChangeMock: jest.Mock;
  let handleCategoryChangeMock: jest.Mock;
  let handlePageChangeMock: jest.Mock;

  const renderFightersContainer = () => {
    render(
      <FightersContainer
        initialFighters={mockInitialFighters}
        initialSearchQuery=""
        initialCategory={null}
        initialCategories={mockInitialCategories}
        initialPage={1}
      />,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    handleSearchChangeMock = jest.fn();
    handleCategoryChangeMock = jest.fn();
    handlePageChangeMock = jest.fn();

    mockUseFightersFiltersAndPagination.mockReturnValue({
      filters: {
        searchQuery: "",
        selectedCategory: null,
        currentPage: 1,
      },
      paginatedFighters: mockInitialFighters,
      totalPages: 1,
      handleSearchChange: jest.fn(),
      handleCategoryChange: jest.fn(),
      handlePageChange: jest.fn(),
    });
  });

  test("renders GradientHeading and initial UI correctly", () => {
    renderFightersContainer();

    expect(screen.getByTestId("gradient-heading")).toBeInTheDocument();
    expect(screen.getByText("UFC Fighters")).toBeInTheDocument();
    expect(screen.getByText(/fighter 1/i)).toBeInTheDocument();
    expect(screen.getByText(/fighter 2/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /select category/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("shows the loading state when isLoading is true", async () => {
    mockUseFightersFiltersAndPagination.mockImplementationOnce((props) => {
      props.setIsLoading(true);

      return {
        ...mockUseFightersFiltersAndPagination(),
      };
    });

    renderFightersContainer();

    await waitFor(() => {
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });
  });

  test("calls handleSearchChange when the search input changes", async () => {
    const user = userEvent.setup();

    mockUseFightersFiltersAndPagination.mockReturnValueOnce({
      ...mockUseFightersFiltersAndPagination(),
      handleSearchChange: handleSearchChangeMock,
    });

    renderFightersContainer();

    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "Conor");

    await waitFor(() => {
      expect(handleSearchChangeMock).toHaveBeenCalledWith("Conor");
    });
  });

  test("calls handleCategoryChange when a category is selected", async () => {
    const user = userEvent.setup();

    mockUseFightersFiltersAndPagination.mockReturnValueOnce({
      ...mockUseFightersFiltersAndPagination(),
      handleCategoryChange: handleCategoryChangeMock,
    });

    renderFightersContainer();

    const categorySelect = screen.getByRole("button", {
      name: /select category/i,
    });

    await user.click(categorySelect);

    const heavyweightOption = screen.getByRole("menuitem", {
      name: /heavyweight/i,
    });

    await user.click(heavyweightOption);

    await waitFor(() => {
      expect(handleCategoryChangeMock).toHaveBeenCalledWith("Heavyweight");
    });
  });

  test("calls handlePageChange when a pagination button is clicked", async () => {
    const user = userEvent.setup();

    mockUseFightersFiltersAndPagination.mockReturnValueOnce({
      ...mockUseFightersFiltersAndPagination(),
      totalPages: 3,
      filters: {
        ...mockUseFightersFiltersAndPagination().filters,
        currentPage: 1,
      },
      handlePageChange: handlePageChangeMock,
    });

    renderFightersContainer();

    const nextPageButton = screen.getByRole("link", {
      name: /go to next page/i,
    });
    await user.click(nextPageButton);

    await waitFor(() => {
      expect(handlePageChangeMock).toHaveBeenCalledWith(2);
    });
  });
});
