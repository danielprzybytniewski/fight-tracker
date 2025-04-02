import { formatTextWithBoldPhrases } from "@/components/news/news-utils";

type NewsParagraphProps = {
  data?: { text: string }[];
};

export default function NewsParagraph({ data }: NewsParagraphProps) {
  if (!Array.isArray(data)) return null;

  const filteredData = data?.filter(
    (item) => item.text && item.text.trim() !== "Share this"
  );

  if (filteredData.length === 0) return null;

  const formattedData = filteredData?.map((item, index) => (
    <span key={index}>{formatTextWithBoldPhrases(item.text)}</span>
  ));

  if (formattedData.length === 0) return null;

  return <p className="my-6">{formattedData}</p>;
}
