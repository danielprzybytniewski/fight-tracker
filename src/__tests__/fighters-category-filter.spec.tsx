import FightersCategoryFilter from "@/components/fighters/fighters-category-filter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import slugify from "@/lib/slugify";

const categories = ["Heavyweight", "Middleweight", "Lightweight"];
const selectedCategory = slugify("Middleweight");

describe("FightersCategoryFilter", () => {
  let onCategoryChange: jest.Mock;

  const renderComponent = (props = {}) =>
    render(
      <FightersCategoryFilter
        categories={categories}
        selectedCategory={null}
        onCategoryChange={onCategoryChange}
        {...props}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
    onCategoryChange = jest.fn();
  });

  test('renders the dropdown button with "Select Category" when no category is selected', () => {
    renderComponent();
    expect(screen.getByText("Select Category")).toBeInTheDocument();
  });

  test("renders the dropdown button with the selected category label", () => {
    renderComponent({ selectedCategory });
    expect(screen.getByText("Middleweight")).toBeInTheDocument();
  });

  test('renders "Select Category" when selectedCategory does not match any category', () => {
    renderComponent({ selectedCategory: "testcategory" });
    expect(screen.getByText("Select Category")).toBeInTheDocument();
  });

  test('calls onCategoryChange with null when "All" is selected', async () => {
    const user = userEvent.setup();
    renderComponent({ selectedCategory });

    await user.click(screen.getByText("Middleweight"));
    await user.click(screen.getByText("All"));
    expect(onCategoryChange).toHaveBeenCalledWith(null);
  });

  test("calls onCategoryChange with the correct category when a category is selected", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Select Category"));
    await user.click(screen.getByText("Lightweight"));
    expect(onCategoryChange).toHaveBeenCalledWith("Lightweight");
  });
});
