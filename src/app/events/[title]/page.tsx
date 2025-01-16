import EventFightCard from "@/components/event-fight-card";
import { createMetadata } from "@/lib/create-metadata";
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

  return createMetadata({
    title: `${title.toUpperCase()}`,
    description: `Check out the upcoming MMA event: ${title.toUpperCase()}`,
    keywords: [
      `${title.toUpperCase()} event, ${title.toUpperCase()} fighters,`,
    ],
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
