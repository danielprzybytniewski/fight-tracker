import { generateMockNewsImages } from "@/__mocks__/mock-data";
import {
  formatTextWithBoldPhrases,
  generateAltText,
  getFirstImageUrl,
} from "@/components/news/news-utils";
import fallbackImage from "@/public/images/og-image.png";
import type { NewsContentData } from "@/types/news-schema.types";

describe("news-utils", () => {
  describe("formatTextWithBoldPhrases", () => {
    test("formats text with bold phrases", () => {
      const text = "Records: 10-0, Division: Heavyweight";
      const formattedText = formatTextWithBoldPhrases(text);
      expect(formattedText.length).toBe(4);
      expect(formattedText[0].props.children).toBe("Records:");
      expect(formattedText[0].props.className).toContain("font-bold");
      expect(formattedText[2].props.children).toBe("Division:");
      expect(formattedText[2].props.className).toContain("font-bold");
    });

    test("handles two-word bold phrases", () => {
      const text = "MAIN CARD";
      const formattedText = formatTextWithBoldPhrases(text);
      expect(formattedText.length).toBe(1);
      expect(formattedText[0].props.children).toBe("MAIN CARD");
      expect(formattedText[0].props.className).toContain("font-bold");
    });

    test("handles non-bold text", () => {
      const text = "This is a normal text";
      const formattedText = formatTextWithBoldPhrases(text);
      expect(formattedText.length).toBe(5);
      expect(formattedText[0].props.children).toBe("This");
      expect(formattedText[0].props.className).not.toContain("font-bold");
    });

    test("break line correctly for multi-line text", () => {
      const text = "Records: 10-0\nDivision: Heavyweight";
      const formattedText = formatTextWithBoldPhrases(text);

      const hasBr = formattedText.some((element) => element.type === "br");
      expect(hasBr).toBe(true);
    });
  });

  describe("generateAltText", () => {
    test("generates alt text from image URL", () => {
      const src = "https://example.com/image-name.jpg";
      const altText = generateAltText(src);
      expect(altText).toBe("image name");
    });

    test("handles URLs without hyphens", () => {
      const src = "https://example.com/imagename.jpg";
      const altText = generateAltText(src);
      expect(altText).toBe("imagename");
    });
  });

  describe("getFirstImageUrl", () => {
    test("returns the first image URL", () => {
      const firstImageUrl = getFirstImageUrl(generateMockNewsImages(3));
      expect(firstImageUrl).toBe("https://example.com/image-1.jpg");
    });

    test("returns fallback image if no image is found", () => {
      const content: NewsContentData[] = [
        { type: "paragraph", data: [{ text: "First paragraph" }] },
      ];

      const firstImageUrl = getFirstImageUrl(content);
      expect(firstImageUrl).toBe(fallbackImage.src);
    });

    test("returns fallback image if image URL does not start with https", () => {
      const content: NewsContentData[] = [
        { type: "paragraph", data: [{ text: "First paragraph" }] },
        { type: "image", src: "localhost/image.jpg" },
      ];

      const firstImageUrl = getFirstImageUrl(content);
      expect(firstImageUrl).toBe(fallbackImage.src);
    });
  });
});
