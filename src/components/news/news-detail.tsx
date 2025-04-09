import NewsContent from "@/components/news/news-content";
import { Badge } from "@/components/ui/badge";
import { NewsDetailData } from "@/types/news-schema.types";
import { contentWithoutLastParagraphs } from "@/components/news/news-utils";
import { CalendarIcon, UserIcon } from "lucide-react";
import BackButton from "@/components/shared/back-button";

type NewsDetailProps = {
  newsItem: NewsDetailData;
};

export default function NewsDetail({ newsItem }: NewsDetailProps) {
  const categories = newsItem.categories.split(",");
  const filteredContent = contentWithoutLastParagraphs(newsItem.content);
  const images = filteredContent.filter((item) => item.type === "image");
  const paragraphs = filteredContent.filter(
    (item) => item.type === "paragraph"
  );

  return (
    <div className="container max-w-5xl mx-auto py-6 px-4 md:py-8 md:px-6">
      <div className="mb-5">
        <BackButton />
      </div>
      <article className="overflow-hidden rounded-xl shadow-lg bg-gray-50 dark:bg-gray-900">
        <div className="p-4 md:p-6">
          <h1 className="font-extrabold text-xl md:text-3xl text-center text-gray-900 dark:text-gray-50">
            {newsItem.title}
          </h1>
          <div className="flex justify-center items-center flex-wrap mt-3 gap-x-6 gap-y-1 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <UserIcon className="h-4 md:h-5 w-4 mr-1" />
              <span className="font-medium">{newsItem.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 md:h-5 w-4 mr-1" />
              <span>{new Date(newsItem.modified).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <NewsContent images={images} paragraphs={paragraphs} />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {categories.map((category, index) => (
              <Badge
                key={index}
                className="pointer-events-none font-medium text-xs md:text-sm bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-200"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
