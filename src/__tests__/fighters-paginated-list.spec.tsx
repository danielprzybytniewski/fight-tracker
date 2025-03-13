import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FightersPaginatedList from "@/components/fighters/fighters-paginated-list";
import type { Fighter } from "@/types/rankings-schema.types";

jest.mock("@/components/fighters/fighter-card", () => {
  return jest.fn(({ fighter }) => (
    <div data-testid="fighter-card">
      <p>{fighter.name}</p>
      <p>{fighter.category}</p>
    </div>
  ));
});

jest.mock("@/components/fighters/fighters-pagination", () => {
  return jest.fn(({ currentPage, totalPages, onPageChange }) => (
    <div data-testid="fighters-pagination">
      <button
        data-testid="prev-button"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <p data-testid="current-page">{currentPage}</p>
      <p data-testid="total-pages">{totalPages}</p>
      <button
        data-testid="next-button"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  ));
});

const mockFighters: Fighter[] = [
  {
    id: "1",
    name: "Fighter 1",
    category: "Lightweight",
  },
  {
    id: "2",
    name: "Fighter 2",
    category: "Middleweight",
  },
];

describe("FightersPaginatedList", () => {
  const mockProps = {
    paginatedFighters: mockFighters,
    currentPage: 1,
    totalPages: 2,
    onPageChange: jest.fn(),
  };

  const renderComponent = (props = {}) =>
    render(<FightersPaginatedList {...mockProps} {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correct text when paginatedFighters is empty", () => {
    renderComponent({ paginatedFighters: [] });
    expect(screen.getByText("No fighters found")).toBeInTheDocument();
  });

  test("renders FighterCard components for each fighter", () => {
    renderComponent();
    expect(screen.getAllByTestId("fighter-card")).toHaveLength(
      mockFighters.length
    );
    mockFighters.forEach((fighter) => {
      expect(screen.getByText(fighter.name)).toBeInTheDocument();
      expect(screen.getByText(fighter.category)).toBeInTheDocument();
    });
  });

  test("renders FightersPagination component with correct props", () => {
    renderComponent();

    expect(screen.getByTestId("fighters-pagination")).toBeInTheDocument();

    expect(screen.getByTestId("current-page")).toHaveTextContent(
      mockProps.currentPage.toString()
    );

    expect(screen.getByTestId("total-pages")).toHaveTextContent(
      mockProps.totalPages.toString()
    );

    expect(screen.getByTestId("prev-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-button")).toBeInTheDocument();
  });

  test("calls onPageChange with the correct page number when 'Next' button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByText("Next"));
    expect(mockProps.onPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange with the correct page number when 'Previous' button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent({ currentPage: 2 });
    await user.click(screen.getByText("Previous"));
    expect(mockProps.onPageChange).toHaveBeenCalledWith(1);
  });
});
