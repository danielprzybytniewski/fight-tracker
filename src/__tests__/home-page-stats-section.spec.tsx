import { stats } from "@/components/home-page/home-page-data";
import HomePageStatsSection from "@/components/home-page/home-page-stats-section";
import { render, screen } from "@testing-library/react";

describe("HomePageStatsSection", () => {
  test("renders all stats with correct values and labels", () => {
    render(<HomePageStatsSection />);

    stats.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });
});
