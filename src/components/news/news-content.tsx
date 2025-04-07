import NewsImage from "@/components/news/news-image";
import NewsParagraph from "@/components/news/news-paragraph";

type NewsContentProps = {
  images: { type: string; src?: string | undefined }[];
  paragraphs: { type: string; data?: { text: string }[] | undefined }[];
};

export default function NewsContent({ images, paragraphs }: NewsContentProps) {
  const validImages = images.filter((image) => image.src);

  if (validImages.length === 0) {
    return null;
  }

  return (
    <>
      {validImages.length > 6 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validImages.map((image, index) => (
            <NewsImage key={index} src={image.src} />
          ))}
        </div>
      ) : (
        <>
          <NewsImage src={validImages[0].src} />
          {paragraphs.map((paragraph, index) => (
            <NewsParagraph key={index} data={paragraph.data} />
          ))}
        </>
      )}
    </>
  );
}
