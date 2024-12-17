import EventFightCard from "@/components/event-fight-card";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const { title } = await params;

  return {
    title: `${title.toUpperCase()} | Fight Tracker`,
    description: `Upcoming MMA event: ${title}`,
    openGraph: {
      title: `${title} | Fight Tracker`,
      description: `Upcoming MMA event: ${title}`,
      images: ["https://fight-tracker.vercel.app/images/og-image.png"],
      type: "website",
      url: `https://fight-tracker.vercel.app/events/${title}`,
    },
  };
}
export default async function EventsPage({
  params,
}: {
  params: { title: string };
}) {
  const { title } = await params;

  return <EventFightCard title={title} />;
}
