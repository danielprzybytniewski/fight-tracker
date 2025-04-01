import { NewsContentData } from "@/types/news-schema.types";
import NewsImage from "@/components/news/news-image";
import NewsParagraph from "@/components/news/news-paragraph";

type NewsContentProps = {
  content: NewsContentData;
};

export default function NewsContent({ content }: NewsContentProps) {
  switch (content.type) {
    case "image": {
      return <NewsImage src={content.src} />;
    }

    case "paragraph": {
      return <NewsParagraph data={content.data} />;
    }

    default:
      return null;
  }
}
