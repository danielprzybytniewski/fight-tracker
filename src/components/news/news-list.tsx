"use client";
import { useState, useEffect } from "react";
import NewsPreviewItem from "@/components/news/news-preview-item";
import { NewsDetailData } from "@/types/news-schema.types";

type NewsListProps = {
  newsItems: NewsDetailData[];
};

export default function NewsList({ newsItems }: NewsListProps) {
  const [visibleCount, setVisibleCount] = useState(() => {
    return parseInt(sessionStorage.getItem("visibleCount") || "10");
  });

  useEffect(() => {
    sessionStorage.setItem("visibleCount", String(visibleCount));
  }, [visibleCount]);

  const visibleNewsItems = newsItems.slice(0, visibleCount);

  return (
    <div>
      {visibleNewsItems.map((newsItem) => (
        <NewsPreviewItem key={newsItem.title} newsItem={newsItem} />
      ))}
      {newsItems.length > visibleCount && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 10)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Load more
        </button>
      )}
    </div>
  );
}
