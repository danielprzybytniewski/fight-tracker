import EventFightCard from "@/components/events/event-fight-card";
import { createMetadata } from "@/lib/create-metadata";
import formatSlugToReadableText from "@/lib/format-slug-to-readable-text";
import { Metadata } from "next";

type Params = {
  title: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { title } = await params;
  const formattedTitle = formatSlugToReadableText(title);

  return createMetadata({
    title: `${formattedTitle}`,
    description: `Check out the upcoming MMA event: ${formattedTitle}`,
    keywords: [`${formattedTitle} event, ${formattedTitle} fighters,`],
    path: `/events/${title}`,
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { title } = await params;

  return <EventFightCard title={title} />;
}
