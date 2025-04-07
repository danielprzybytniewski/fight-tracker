"use client";
import Image from "next/image";
import Link from "next/link";
import slugify from "@/lib/slugify";
import { useUnoptimizedImage } from "@/hooks/use-unoptimized-image";
import { NewsDetailData } from "@/types/news-schema.types";
import { getFirstImageUrl } from "@/components/news/news-utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarIcon, UserIcon } from "lucide-react";

type NewsPreviewItemProps = {
  newsItem: NewsDetailData;
};

export default function NewsPreviewItem({ newsItem }: NewsPreviewItemProps) {
  const { unoptimized, handleImageLoadError } = useUnoptimizedImage();
  const slug = slugify(newsItem.title);
  const imageUrl = getFirstImageUrl(newsItem.content);

  return (
    <Link href={`/news/${slug}`}>
      <Card
        className="overflow-hidden h-full border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900  
      group"
      >
        <CardHeader className="overflow-hidden relative aspect-video w-full">
          <Image
            src={imageUrl}
            alt={newsItem.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            unoptimized={unoptimized}
            onError={handleImageLoadError}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </CardHeader>
        <CardContent className="p-4">
          <h2
            className="min-h-10 md:min-h-14 mb-2 font-bold text-center text-base md:text-lg lg:text-xl line-clamp-2 text-gray-900 
          dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200"
          >
            {newsItem.title}
          </h2>
        </CardContent>
        <CardFooter className="pb-4 flex items-center justify-between flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{new Date(newsItem.modified).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-1" />
            <span>{newsItem.author}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
