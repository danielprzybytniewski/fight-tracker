import { render, screen } from "@testing-library/react";
import NewsParagraph from "@/components/news/news-paragraph";
import { formatTextWithBoldPhrases } from "@/components/news/news-utils";

jest.mock("@/components/news/news-utils", () => ({
  formatTextWithBoldPhrases: jest.fn(),
}));

describe("NewsParagraph", () => {
  const renderComponent = (data?: { text: string }[]) => {
    render(<NewsParagraph data={data} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (formatTextWithBoldPhrases as jest.Mock).mockImplementation((text) => text);
  });

  test("renders formatted text using formatTextWithBoldPhrases", () => {
    const mockData = [{ text: "This is a valid paragraph" }];
    renderComponent(mockData);

    expect(formatTextWithBoldPhrases).toHaveBeenCalledWith(mockData[0].text);
    expect(screen.getByText(mockData[0].text)).toBeInTheDocument();
  });

  test("renders null when data is not an array", () => {
    renderComponent(undefined);
    expect(screen.queryByText(/abc/)).toBeNull();
  });

  test("renders null when data is an empty array", () => {
    renderComponent([]);
    expect(screen.queryByText(/abc/)).toBeNull();
  });

  test("filters out items with text 'Share this'", () => {
    const mockData = [
      { text: "This is a valid paragraph" },
      { text: "Share this" },
    ];
    renderComponent(mockData);

    expect(screen.getByText(mockData[0].text)).toBeInTheDocument();
    expect(screen.queryByText(mockData[1].text)).not.toBeInTheDocument();
  });

  test("renders null when all items are filtered out", () => {
    const mockData = [{ text: "Share this" }];
    renderComponent(mockData);

    expect(screen.queryByText(/abc/)).toBeNull();
  });

  test("renders null when formatted data is empty", () => {
    const mockData = [{ text: "Valid paragraph" }];
    (formatTextWithBoldPhrases as jest.Mock).mockReturnValue(null);
    renderComponent(mockData);

    expect(screen.queryByText(/abc/)).toBeNull();
  });
});
