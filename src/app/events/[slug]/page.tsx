import type { Metadata } from "next";
import EventFightCard from "@/components/events/event-fight-card";
import { formatSlugToReadableText } from "@/lib";
import { createMetadata } from "@/lib/create-metadata";

type Params = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = formatSlugToReadableText(slug);

  return createMetadata({
    title: `${formattedTitle}`,
    description: `Check out MMA event: ${formattedTitle}`,
    keywords: [
      `${formattedTitle} event, ${formattedTitle} fights, ${formattedTitle} fighters`,
    ],
    path: `/events/${slug}`,
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  return <EventFightCard slug={slug} />;
}
