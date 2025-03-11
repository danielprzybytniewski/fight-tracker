import FightersCategoryFilter from "@/components/fighters/fighters-category-filter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import slugify from "@/lib/slugify";

const categories = ["Heavyweight", "Middleweight", "Lightweight"];
const selectedCategory = slugify("Middleweight");

describe("FightersCategoryFilter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dropdown button with "Select Category" when no category is selected', () => {
    render(
      <FightersCategoryFilter
        categories={categories}
        selectedCategory={null}
        onCategoryChange={jest.fn()}
      />
    );
    expect(screen.getByText("Select Category")).toBeInTheDocument();
  });

  test("renders the dropdown button with the selected category label", () => {
    render(
      <FightersCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={jest.fn()}
      />
    );
    expect(screen.getByText("Middleweight")).toBeInTheDocument();
  });

  test('renders "Select Category" when selectedCategory does not match any category', () => {
    render(
      <FightersCategoryFilter
        categories={categories}
        selectedCategory="testcategory"
        onCategoryChange={jest.fn()}
      />
    );
    expect(screen.getByText("Select Category")).toBeInTheDocument();
  });

  test('calls onCategoryChange with null when "All" is selected', async () => {
    const onCategoryChange = jest.fn();
    const user = userEvent.setup();
    render(
      <FightersCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    );

    await user.click(screen.getByText("Middleweight"));
    await user.click(screen.getByText("All"));
    expect(onCategoryChange).toHaveBeenCalledWith(null);
  });

  test("calls onCategoryChange with the correct category when a category is selected", async () => {
    const onCategoryChange = jest.fn();
    const user = userEvent.setup();
    render(
      <FightersCategoryFilter
        categories={categories}
        selectedCategory={null}
        onCategoryChange={onCategoryChange}
      />
    );

    await user.click(screen.getByText("Select Category"));
    await user.click(screen.getByText("Lightweight"));
    expect(onCategoryChange).toHaveBeenCalledWith("Lightweight");
  });
});
