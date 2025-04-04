"use client";
import Image from "next/image";
import { useState } from "react";
import { generateAltText } from "@/components/news/news-utils";
import { X } from "lucide-react";

type NewsImageProps = {
  src?: string;
};

export default function NewsImage({ src }: NewsImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

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
      <div className="overflow-hidden rounded-lg" onClick={toggleZoom}>
        <div className="relative w-full aspect-video">
          <Image
            src={src}
            alt={altText || "news image"}
            fill
            priority
            className="object-cover hover:scale-[1.02] hover:cursor-zoom-in transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
          />
        </div>
      </div>
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-950/70 backdrop-blur-md"
          onClick={toggleZoom}
        >
          <div className="relative max-h-[90vh] w-full h-full">
            <Image
              src={src}
              alt={altText || "zoomed news image"}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
            <button
              className="absolute top-[-2.3rem] right-[-1.2rem] p-1 mt-3 md:mt-0 rounded-full bg-gray-500 hover:bg-gray-400 
              dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-50 transition-colors duration-200"
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
