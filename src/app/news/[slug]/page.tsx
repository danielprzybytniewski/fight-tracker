import { getNewsBySlug } from "@/actions/news.actions";
import NewsDetail from "@/components/news/news-detail";
import { formatSlugToReadableText } from "@/lib";
import { createMetadata } from "@/lib/create-metadata";
import { Metadata } from "next";

type Params = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = formatSlugToReadableText(slug);

  return createMetadata({
    title: `${formattedTitle}`,
    description: `Checkout more info about ${formattedTitle}`,
    keywords: [
      `${formattedTitle} news, ${formattedTitle} info, ${formattedTitle} content`,
    ],
    path: `/news/${slug}`,
  });
}

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
