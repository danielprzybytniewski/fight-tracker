"use client";
import { useState, useEffect } from "react";
import NewsPreviewItem from "@/components/news/news-preview-item";
import { NewsDetailData } from "@/types/news-schema.types";
import { Button } from "@/components/ui/button";
import GradientHeading from "@/components/shared/gradient-heading";

type NewsListProps = {
  newsItems: NewsDetailData[];
};

export default function NewsList({ newsItems }: NewsListProps) {
  const [visibleCount, setVisibleCount] = useState(() => {
    return parseInt(sessionStorage.getItem("visibleCount") || "9");
  });

  useEffect(() => {
    sessionStorage.setItem("visibleCount", String(visibleCount));
  }, [visibleCount]);

  const visibleNewsItems = newsItems.slice(0, visibleCount);

  return (
    <>
      <GradientHeading size="large" className="mt-3">
        News
      </GradientHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-3 p-4 rounded-lg dark:bg-gray-600">
        {visibleNewsItems.map((newsItem) => (
          <NewsPreviewItem key={newsItem.title} newsItem={newsItem} />
        ))}
      </div>
      {newsItems.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            variant="outline"
            className="px-4 py-2 text-sm bg-gray-50 dark:bg-gray-900 hover:text-gray-800 hover:bg-gray-300 
            dark:hover:text-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Load more news"
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
}
