import FightsCarousel from "@/components/fights-carousel";
import GradientHeading from "@/components/gradient-heading";

export default function HomePage() {
  return (
    <>
      <GradientHeading size="large" spacing="large">
        Upcoming MMA Events
      </GradientHeading>
      <FightsCarousel />
    </>
  );
}
