import FightersSearchBar from "@/components/fighters/fighters-search-bar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("FightersSearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders input with correct placeholder", () => {
    render(<FightersSearchBar searchValue="" onSearch={() => {}} />);
    expect(
      screen.getByPlaceholderText("Search for Fighters...")
    ).toBeInTheDocument();
  });

  test("renders input with provided searchValue", () => {
    render(<FightersSearchBar searchValue="John Doe" onSearch={() => {}} />);
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
  });

  test("updates input value when searchValue prop changes", () => {
    const { rerender } = render(
      <FightersSearchBar searchValue="Initial Value" onSearch={() => {}} />
    );

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toHaveValue("Initial Value");

    rerender(
      <FightersSearchBar searchValue="Updated Value" onSearch={() => {}} />
    );
    expect(searchInput).toHaveValue("Updated Value");
  });

  test("calls onSearch with debounced input after user finishes typing", async () => {
    const user = userEvent.setup({ delay: null });
    const onSearchMock = jest.fn();
    render(<FightersSearchBar searchValue="" onSearch={onSearchMock} />);

    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "Conor McGregor");

    expect(onSearchMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("Conor McGregor");
  });

  test("correctly handles multiple rapid user entries with debouncing", async () => {
    const user = userEvent.setup({ delay: null });
    const onSearchMock = jest.fn();
    render(<FightersSearchBar searchValue="" onSearch={onSearchMock} />);

    const searchInput = screen.getByRole("textbox");

    await user.type(searchInput, "Khabib");
    await user.type(searchInput, " Nurmagomedov");

    jest.advanceTimersByTime(400);

    expect(onSearchMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("Khabib Nurmagomedov");
  });

  test("cleans up debounce function on unmount", () => {
    const onSearchMock = jest.fn();
    const { unmount } = render(
      <FightersSearchBar searchValue="" onSearch={onSearchMock} />
    );

    unmount();

    jest.advanceTimersByTime(500);

    expect(onSearchMock).not.toHaveBeenCalled();
  });
});
