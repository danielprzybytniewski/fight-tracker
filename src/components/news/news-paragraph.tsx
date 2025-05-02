import { formatTextWithBoldPhrases } from "@/components/news/news-utils";

type NewsParagraphProps = {
  data?: { text: string }[];
};

export default function NewsParagraph({ data }: NewsParagraphProps) {
  if (!Array.isArray(data)) return null;

  const filteredData = data?.filter((item) => item.text);

  if (filteredData.length === 0) return null;

  const formattedData = filteredData
    ?.map((item, index) => {
      const formattedText = formatTextWithBoldPhrases(item.text);
      return formattedText ? <span key={index}>{formattedText}</span> : null;
    })
    .filter(Boolean);

  if (formattedData.length === 0) return null;

  return (
    <p className="my-6 text-base leading-relaxed tracking-wide text-gray-800 dark:text-gray-200 md:text-lg">
      {formattedData}
    </p>
  );
}
