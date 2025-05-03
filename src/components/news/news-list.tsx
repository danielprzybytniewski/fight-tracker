"use client";
import { useEffect, useState } from "react";
import NewsPreviewItem from "@/components/news/news-preview-item";
import GradientHeading from "@/components/shared/gradient-heading";
import { Button } from "@/components/ui/button";
import type { NewsDetailData } from "@/types/news-schema.types";

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
      <div className="mt-3 grid grid-cols-1 gap-7 rounded-lg p-4 dark:bg-gray-600 md:grid-cols-2 xl:grid-cols-3">
        {visibleNewsItems.map((newsItem) => (
          <NewsPreviewItem key={newsItem.title} newsItem={newsItem} />
        ))}
      </div>
      {newsItems.length > visibleCount && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            variant="outline"
            className="bg-gray-50 px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-300 hover:text-gray-800 dark:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            aria-label="Load more news"
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
}
