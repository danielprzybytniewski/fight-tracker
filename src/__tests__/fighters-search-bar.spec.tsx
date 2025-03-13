import FightersSearchBar from "@/components/fighters/fighters-search-bar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("FightersSearchBar", () => {
  let onSearchMock: jest.Mock;

  const renderComponent = (searchValue = "") => {
    return render(
      <FightersSearchBar searchValue={searchValue} onSearch={onSearchMock} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    onSearchMock = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders input with correct placeholder", () => {
    renderComponent();
    expect(
      screen.getByPlaceholderText("Search for Fighters...")
    ).toBeInTheDocument();
  });

  test("renders input with provided searchValue", () => {
    renderComponent("John Doe");
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
  });

  test("updates input value when searchValue prop changes", () => {
    const { rerender } = renderComponent("Initial Value");
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toHaveValue("Initial Value");

    rerender(
      <FightersSearchBar searchValue="Updated Value" onSearch={onSearchMock} />
    );
    expect(searchInput).toHaveValue("Updated Value");
  });

  test("calls onSearch with debounced input after user finishes typing", async () => {
    const user = userEvent.setup({ delay: null });
    renderComponent();

    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "Conor");

    expect(onSearchMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(onSearchMock).toHaveBeenCalledWith("Conor");
  });

  test("correctly handles multiple rapid user entries with debouncing", async () => {
    const user = userEvent.setup({ delay: null });
    renderComponent();

    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "Khabib");
    await user.type(searchInput, " Nurmagomedov");
    jest.advanceTimersByTime(400);
    expect(onSearchMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(onSearchMock).toHaveBeenCalledWith("Khabib Nurmagomedov");
  });

  test("cleans up debounce function on unmount", () => {
    const { unmount } = renderComponent();
    unmount();
    jest.advanceTimersByTime(500);
    expect(onSearchMock).not.toHaveBeenCalled();
  });
});
