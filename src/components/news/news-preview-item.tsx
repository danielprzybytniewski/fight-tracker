"use client";
import Image from "next/image";
import Link from "next/link";
import { getFirstImageUrl } from "@/components/news/news-utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { routesConfig } from "@/config/routes-config";
import { useUnoptimizedImage } from "@/hooks/use-unoptimized-image";
import slugify from "@/lib/slugify";
import type { NewsDetailData } from "@/types/news-schema.types";

type NewsPreviewItemProps = {
  newsItem: NewsDetailData;
};

export default function NewsPreviewItem({ newsItem }: NewsPreviewItemProps) {
  const { unoptimized, handleImageLoadError } = useUnoptimizedImage();
  const slug = slugify(newsItem.title);
  const images = newsItem.content.filter((item) => item.type === "image");
  const imageUrl = getFirstImageUrl(images);

  return (
    <Link href={routesConfig.newsDetails(slug)}>
      <Card className="group h-full overflow-hidden border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <CardHeader className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={newsItem.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            unoptimized={unoptimized}
            onError={handleImageLoadError}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="mb-2 min-h-10 text-left text-base font-bold text-gray-900 transition-colors duration-200 group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300 md:min-h-14 md:text-lg lg:text-xl">
            {newsItem.title}
          </h2>
        </CardContent>
      </Card>
    </Link>
  );
}
