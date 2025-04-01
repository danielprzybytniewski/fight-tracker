import NewsContent from "@/components/news/news-content";
import { Badge } from "@/components/ui/badge";
import { NewsDetailData } from "@/types/news-schema.types";
import { contentWithoutLastParagraphs } from "@/components/news/news-utils";

type NewsDetailProps = {
  newsItem: NewsDetailData;
};

export default function NewsDetail({ newsItem }: NewsDetailProps) {
  const categories = newsItem.categories.split(",");
  const filteredContent = contentWithoutLastParagraphs(newsItem.content);

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-gray-100 dark:bg-gray-900 rounded-lg">
      <article className="p-4">
        <h1 className="font-bold text-2xl mb-4">{newsItem.title}</h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge key={index} className="text-gray-50 bg-gray-600">
              {category}
            </Badge>
          ))}
        </div>
        <p>
          <span>
            Author: {newsItem.author} |&nbsp;
            <span>
              Published: {new Date(newsItem.modified).toLocaleDateString()}
            </span>
          </span>
        </p>
        <div>
          {filteredContent.map((content, index) => {
            if (content.type === "paragraph" || content.type === "image") {
              return <NewsContent key={index} content={content} />;
            }
            return null;
          })}
        </div>
      </article>
    </div>
  );
}
