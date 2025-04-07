import { getNews } from "@/actions/news.actions";
import NewsList from "@/components/news/news-list";
import { createMetadata } from "@/lib/create-metadata";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "News",
  description: "Check out newest MMA news",
  path: "/news",
});

export default async function NewsPage() {
  const newsItems = await getNews();

  if (!newsItems || newsItems.length === 0) {
    return <div>No news found</div>;
  }

  return <NewsList newsItems={newsItems} />;
}
