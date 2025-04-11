import FightsCarousel from "@/components/fights-carousel/fights-carousel";
import GradientHeading from "@/components/shared/gradient-heading";

export default function HomePage() {
  return (
    <>
      <GradientHeading size="large" spacing="large">
        MMA Events
      </GradientHeading>
      <FightsCarousel />
    </>
  );
}
