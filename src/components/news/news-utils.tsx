import { cn } from "@/lib/utils";
import fallbackImage from "@/public/images/og-image.png";

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
  "Supplemental info:",
  "Broadcast:",
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
  "Updated records:",
  "Key stats:",
  "Career bonuses:",
  "2021 total:",
  "2022 total:",
  "2023 total:",
  "2024 total:",
];

//Created for improved readability in the UI
export const formatTextWithBoldPhrases = (
  text: string
): React.JSX.Element[] => {
  const lines = text.split("\n");
  const elements: React.JSX.Element[] = [];

  lines.forEach((line, lineIndex) => {
    const words = line.split(" ").filter((word) => word.length > 0);

    for (let i = 0; i < words.length; i++) {
      const currentWord = words[i];
      const nextWord = i < words.length - 1 ? words[i + 1] : "";
      const twoWordPhrase = `${currentWord} ${nextWord}`;
      const isTwoWordBold = boldPhrases.includes(twoWordPhrase);
      const isSingleBold = boldPhrases.includes(currentWord);

      if (isTwoWordBold) {
        elements.push(
          <span
            key={`line${lineIndex}-word${i}`}
            className="mr-1 inline-block font-bold"
          >
            {twoWordPhrase}
          </span>
        );
        i++;
      } else {
        elements.push(
          <span
            key={`line${lineIndex}-word${i}`}
            className={cn("mr-1 inline-block", isSingleBold && "font-bold")}
          >
            {currentWord}
          </span>
        );
      }
    }

    if (lineIndex !== lines.length - 1) {
      elements.push(<br key={`br-${lineIndex}`} />);
    }
  });

  return elements;
};

export const generateAltText = (src: string): string => {
  return src
    .substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."))
    .replace(/-/g, " ");
};

export const getFirstImageUrl = (
  images: { type: string; src?: string }[]
): string => {
  const firstImage = images.find(
    (img) => img.src && img.src.startsWith("https")
  );
  return firstImage?.src || fallbackImage.src;
};
