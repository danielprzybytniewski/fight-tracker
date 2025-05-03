import NewsImage from "@/components/news/news-image";
import NewsParagraph from "@/components/news/news-paragraph";
import { getFirstImageUrl } from "@/components/news/news-utils";

type NewsContentProps = {
  images: { type: string; src?: string | undefined }[];
  paragraphs: { type: string; data?: { text: string }[] | undefined }[];
};

export default function NewsContent({ images, paragraphs }: NewsContentProps) {
  const validImages = images.filter((image) => image.src);
  const firstImageUrl = getFirstImageUrl(validImages);

  if (validImages.length === 0) {
    return null;
  }

  return (
    <>
      {validImages.length > 4 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {validImages.map((image, index) => (
            <NewsImage key={index} src={image.src} />
          ))}
        </div>
      ) : (
        <>
          <NewsImage src={firstImageUrl} />
          {paragraphs.map((paragraph, index) => (
            <NewsParagraph key={index} data={paragraph.data} />
          ))}
        </>
      )}
    </>
  );
}
