import NewsImage from "@/components/news/news-image";
import NewsParagraph from "@/components/news/news-paragraph";

type NewsContentProps = {
  images: { type: string; src?: string | undefined }[];
  paragraphs: { type: string; data?: { text: string }[] | undefined }[];
};

export default function NewsContent({ images, paragraphs }: NewsContentProps) {
  const shouldRenderParagraphs = images.length <= 6;

  return (
    <div>
      {images.length === 1 ? (
        <NewsImage src={images[0].src} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <NewsImage key={index} src={image.src} />
          ))}
        </div>
      )}
      {shouldRenderParagraphs &&
        paragraphs.map((paragraph, index) => (
          <NewsParagraph key={index} data={paragraph.data} />
        ))}
    </div>
  );
}
