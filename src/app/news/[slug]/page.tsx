import { getNewsBySlug } from "@/actions/news.actions";
import NewsDetail from "@/components/news/news-detail";

type Params = {
  slug: string;
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);

  if (!newsItem) {
    return <div>News not found</div>;
  }

  return <NewsDetail newsItem={newsItem} />;
}
