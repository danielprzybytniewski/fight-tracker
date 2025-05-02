import { UserIcon } from "lucide-react";
import NewsContent from "@/components/news/news-content";
import BackButton from "@/components/shared/back-button";
import { Badge } from "@/components/ui/badge";
import type { NewsDetailData } from "@/types/news-schema.types";

type NewsDetailProps = {
  newsItem: NewsDetailData;
};

export default function NewsDetail({ newsItem }: NewsDetailProps) {
  const categories = newsItem.categories.split(";");
  const images = newsItem.content.filter((item) => item.type === "image");
  const paragraphs = newsItem.content.filter(
    (item) => item.type === "paragraph",
  );

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-5">
        <BackButton />
      </div>
      <article className="overflow-hidden rounded-xl bg-gray-50 shadow-lg dark:bg-gray-900">
        <div className="p-4 md:p-6">
          <h1 className="text-center text-xl font-extrabold text-gray-900 dark:text-gray-50 md:text-3xl">
            {newsItem.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-gray-700 dark:text-gray-300 md:text-sm">
            <div className="flex items-center">
              <UserIcon className="mr-1 h-4 w-4 md:h-5" />
              <span className="font-medium">{newsItem.author}</span>
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <NewsContent images={images} paragraphs={paragraphs} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                className="pointer-events-none bg-gray-300 text-xs font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-200 md:text-sm"
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
