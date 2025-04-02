import Image from "next/image";
import Link from "next/link";
import slugify from "@/lib/slugify";
import { NewsDetailData } from "@/types/news-schema.types";
import { getFirstImageUrl } from "@/components/news/news-utils";

type NewsPreviewItemProps = {
  newsItem: NewsDetailData;
};
export default function NewsPreviewItem({ newsItem }: NewsPreviewItemProps) {
  const slug = slugify(newsItem.title);
  const imageUrl = getFirstImageUrl(newsItem.content);

  return (
    <article className="border p-4 mb-4">
      <h2 className="font-bold text-xl mb-2">
        <Link href={`/news/${slug}`}>{newsItem.title}</Link>
      </h2>
      <Link href={`/news/${slug}`} className="relative inline-block w-1/2 h-64">
        <Image src={imageUrl} alt={newsItem.title} fill sizes="33vw" priority />
      </Link>
    </article>
  );
}
