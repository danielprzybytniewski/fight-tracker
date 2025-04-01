import { getNews } from "@/actions/news.actions";
import NewsList from "@/components/news/news-list";

export default async function NewsPage() {
  const newsItems = await getNews();

  if (!newsItems || newsItems.length === 0) {
    return <div>No news found</div>;
  }

  return <NewsList newsItems={newsItems} />;
}
