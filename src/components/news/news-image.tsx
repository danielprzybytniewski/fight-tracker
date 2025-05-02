"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { generateAltText } from "@/components/news/news-utils";
import { useUnoptimizedImage } from "@/hooks/use-unoptimized-image";

type NewsImageProps = {
  src?: string;
};

export default function NewsImage({ src }: NewsImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const { unoptimized, handleImageLoadError } = useUnoptimizedImage();

  if (!src || !src.startsWith("https")) {
    return null;
  }

  const altText = generateAltText(src);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    // Created to prevent site scrolling when the image is zoomed
    if (isZoomed) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <div
        className="overflow-hidden rounded-lg"
        onClick={toggleZoom}
        data-testid="image-container"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={src}
            alt={altText || "news image"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            unoptimized={unoptimized}
            onError={handleImageLoadError}
            className="object-cover transition-transform duration-300 hover:scale-[1.02] hover:cursor-zoom-in"
          />
        </div>
      </div>
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 p-6 backdrop-blur-md"
          onClick={toggleZoom}
          data-testid="zoomed-image-container"
        >
          <div className="relative h-full max-h-[90vh] w-full">
            <Image
              src={src}
              alt={altText || "zoomed news image"}
              fill
              priority
              sizes="100vw"
              unoptimized={unoptimized}
              onError={handleImageLoadError}
              className="object-contain"
              data-testid="zoomed-image"
            />
            <button
              className="absolute right-[-1.2rem] top-[-2.3rem] mt-3 rounded-full bg-gray-500 p-1 text-gray-50 transition-colors duration-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 md:mt-0"
              onClick={toggleZoom}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
