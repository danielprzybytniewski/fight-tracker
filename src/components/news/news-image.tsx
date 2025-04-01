import Image from "next/image";
import { generateAltText } from "@/components/news/news-utils";

type NewsImageProps = {
  src?: string;
};

export default function NewsImage({ src }: NewsImageProps) {
  if (!src || !src.startsWith("https")) {
    return null;
  }

  const altText = generateAltText(src);

  return (
    <div className="relative w-1/3 h-64 my-4">
      <Image
        src={src}
        alt={altText || "news image"}
        fill
        sizes="50vw"
        priority
      />
    </div>
  );
}
