import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FightersPagination from "@/components/fighters/fighters-pagination";
import { useMediaQuery } from "@/hooks/use-media-query";

jest.mock("@/hooks/use-media-query");

describe("FightersPagination", () => {
  const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
    typeof useMediaQuery
  >;

  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  const renderComponent = (props = defaultProps) => {
    return render(<FightersPagination {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination component with correct number of page links", () => {
    mockUseMediaQuery.mockReturnValue(false);
    renderComponent();
    const pageLinks = screen.getAllByRole("link");
    expect(pageLinks.length).toBe(defaultProps.totalPages);
  });

  test('disables the "Previous" button on the first page', () => {
    mockUseMediaQuery.mockReturnValue(false);
    renderComponent();
    const prevButton = screen.getByLabelText("Go to previous page");
    expect(prevButton).toHaveClass("pointer-events-none");
  });

  test('disables the "Next" button on the last page', () => {
    mockUseMediaQuery.mockReturnValue(false);
    renderComponent({ ...defaultProps, currentPage: 5 });
    const nextButton = screen.getByLabelText("Go to next page");
    expect(nextButton).toHaveClass("pointer-events-none");
  });

  test("calls onPageChange with the correct page when a page link is clicked", async () => {
    mockUseMediaQuery.mockReturnValue(false);
    const user = userEvent.setup();
    renderComponent();
    const secondPageLink = screen.getByText("2");
    await user.click(secondPageLink);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with the previous page when "Previous" is clicked', async () => {
    mockUseMediaQuery.mockReturnValue(false);
    const user = userEvent.setup();
    renderComponent({ ...defaultProps, currentPage: 2 });
    const prevButton = screen.getByLabelText("Go to previous page");
    await user.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  test('calls onPageChange with the next page when "Next" is clicked', async () => {
    mockUseMediaQuery.mockReturnValue(false);
    const user = userEvent.setup();
    renderComponent({ ...defaultProps, currentPage: 2 });
    const nextButton = screen.getByLabelText("Go to next page");
    await user.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  test("renders ellipsis for skipped pages in desktop view", () => {
    mockUseMediaQuery.mockReturnValue(false);
    renderComponent({
      currentPage: 1,
      totalPages: 10,
      onPageChange: jest.fn(),
    });
    const ellipsis = screen.getByText("More pages");
    expect(ellipsis).toBeInTheDocument();
  });

  test("does not render ellipsis in mobile view", () => {
    mockUseMediaQuery.mockReturnValue(true);
    renderComponent({
      currentPage: 1,
      totalPages: 10,
      onPageChange: jest.fn(),
    });
    const ellipsis = screen.queryByText("More pages");
    expect(ellipsis).not.toBeInTheDocument();
  });

  test("prevents navigation if clicking disabled buttons", async () => {
    mockUseMediaQuery.mockReturnValue(false);
    const user = userEvent.setup();
    renderComponent();
    const prevButton = screen.getByLabelText("Go to previous page");
    await user.click(prevButton);
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });
});
