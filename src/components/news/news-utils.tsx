import { cn } from "@/lib/utils";
import { NewsContentData } from "@/types/news-schema.types";
import fallbackImage from "@/public/images/og-image.png";
import { StaticImageData } from "next/image";

const boldPhrases = [
  "Records:",
  "Record:",
  "Division:",
  "Rankings:",
  "Odds",
  "Odds:",
  "Opponent:",
  "Key wins:",
  "Misc.:",
  "Past five:",
  "Staple info:",
  "Round 1",
  "Round 2",
  "Round 3",
  "Round 4",
  "Round 5",
  "MAIN CARD",
  "PRELIMINARY CARD",
  "Result:",
  "Recap:",
  "Referee:",
  "Judging:",
  "Event:",
  "Location:",
];

//Created for improved readability in the UI
export const formatTextWithBoldPhrases = (
  text: string
): React.JSX.Element[] => {
  const words = text.split(" ");
  const elements = [];

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];
    const nextWord = i < words.length - 1 ? words[i + 1] : "";
    const twoWordPhrase = `${currentWord} ${nextWord}`;
    const isTwoWordBold = boldPhrases.includes(twoWordPhrase);
    const isSingleBold = boldPhrases.includes(currentWord);

    if (isTwoWordBold) {
      elements.push(
        <span key={i} className="mr-1 inline-block font-bold">
          {twoWordPhrase}
        </span>
      );
      i++;
      continue;
    }

    elements.push(
      <span
        key={i}
        className={cn("mr-1 inline-block", isSingleBold && "font-bold")}
      >
        {currentWord}
      </span>
    );
  }

  return elements;
};

//Created to eliminate redundant content
export const contentWithoutLastParagraphs = (
  content: NewsContentData[]
): NewsContentData[] => {
  const paragraphs = content.filter((item) => item.type === "paragraph");
  const paragraphsCount = paragraphs.length;
  const paragraphsToCut = Math.min(Math.floor(paragraphsCount * 0.65), 8);

  return content.filter((contentItem) => {
    const currentIndex = paragraphs.indexOf(contentItem);

    if (
      contentItem.type === "paragraph" &&
      currentIndex >= paragraphsCount - paragraphsToCut
    ) {
      return false;
    }

    return true;
  });
};

export const generateAltText = (src: string): string => {
  return src
    .substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."))
    .replace(/-/g, " ");
};

export const getFirstImageUrl = (
  content: NewsContentData[]
): string | StaticImageData => {
  const firstImage = content.find((item) => item.type === "image");
  return firstImage && firstImage.src && firstImage.src.startsWith("https")
    ? firstImage.src
    : fallbackImage;
};
