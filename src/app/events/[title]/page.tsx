import EventFightCard from "@/components/event-fight-card";
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

  return {
    title: `${title.toUpperCase()} | Fight Tracker`,
    description: `Check out the upcoming MMA event: ${title}`,
    keywords: `${title}, ${title} event, ${title} fighters`,
    openGraph: {
      title: `${title} | Fight Tracker`,
      description: `Check out the upcoming MMA event: ${title}`,
      images: ["https://fight-tracker.vercel.app/images/og-image.png"],
      type: "website",
      url: `https://fight-tracker.vercel.app/events/${title}`,
    },
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { title } = await params;

  return <EventFightCard title={title} />;
}
