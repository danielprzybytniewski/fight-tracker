import { NewsContentData } from "@/types/news-schema.types";
import Image from "next/image";
import {
  formatTextWithBoldPhrases,
  generateAltText,
} from "@/components/news/news-utils";

type NewsContentProps = {
  content: NewsContentData;
};

export default function NewsContent({ content }: NewsContentProps) {
  switch (content.type) {
    case "image": {
      if (!content.src || !content.src.startsWith("https")) {
        return null;
      }

      const altText = generateAltText(content.src);

      return (
        <div className="relative w-1/3 h-64 my-4">
          <Image
            src={content.src}
            alt={altText || "image"}
            fill
            sizes="50vw"
            priority
          />
        </div>
      );
    }

    case "paragraph": {
      if (!Array.isArray(content.data)) return null;

      const filteredData = content.data.filter(
        (item) => item.text && item.text.trim() !== "Share this"
      );

      if (filteredData.length === 0) return null;

      const formattedData = filteredData?.map((item, index) => (
        <span key={index}>{formatTextWithBoldPhrases(item.text)}</span>
      ));

      if (formattedData.length === 0) return null;

      return <p className="my-6">{formattedData}</p>;
    }

    default:
      return null;
  }
}
