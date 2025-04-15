import FightsCarousel from "@/components/fights-carousel/fights-carousel";
import GradientHeading from "@/components/shared/gradient-heading";
import { createMetadata } from "@/lib/create-metadata";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "MMA Events",
  description: "Info about MMA events",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <GradientHeading size="large" spacing="large">
        MMA Events
      </GradientHeading>
      <FightsCarousel />
    </>
  );
}
