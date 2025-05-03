import { mockAppFight } from "@/__mocks__/mock-data";
import {
  sortFightsByDate,
  transformFightDetails,
} from "@/lib/fights-history-transformer";
import type {
  Fight,
  TransformedFightDetails,
} from "@/types/fights-history-schema.types";
import { NOT_AVAILABLE } from "@/types/rankings-schema.types";

describe("fightsHistoryTransformer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("sortFightsByDate", () => {
    test("sorts fights by date in descending order", () => {
      const fights: Fight[] = [
        { ...mockAppFight, date: new Date("2023-01-01") },
        { ...mockAppFight, date: new Date("2023-02-01") },
        { ...mockAppFight, date: new Date("2022-12-01") },
      ];

      const sortedFights = sortFightsByDate(fights);

      expect(sortedFights[0].date).toEqual(new Date("2023-02-01"));
      expect(sortedFights[2].date).toEqual(new Date("2022-12-01"));
    });
  });

  describe("transformFightDetails", () => {
    test("transforms fight details correctly for the winner", () => {
      const result = transformFightDetails(mockAppFight, "Brandon Moreno");

      const expected: TransformedFightDetails = {
        opponentName: "Louis Smolka",
        result: "win",
        methodDisplay: "SUB (guillotine choke)",
        roundDisplay: "1",
        timeDisplay: "2:23",
        locationDisplay: "USA",
        weightClassDisplay: "Flyweight",
        endWithDisplay: "guillotine choke",
      };

      expect(result).toEqual(expected);
    });

    test("transforms fight details correctly for the loser", () => {
      const result = transformFightDetails(mockAppFight, "Louis Smolka");

      expect(result.result).toBe("loss");
      expect(result.opponentName).toBe("Brandon Moreno");
    });

    test("handles draw correctly", () => {
      const drawFight: Fight = {
        ...mockAppFight,
        draw: true,
        winner: undefined,
      };
      const result = transformFightDetails(drawFight, "Brandon Moreno");

      expect(result.result).toBe("draw");
      expect(result.methodDisplay).toBe("Decision");
      expect(result.roundDisplay).toBe("3");
      expect(result.timeDisplay).toBe("5:00");
    });

    test("formats weight class correctly", () => {
      const result = transformFightDetails(mockAppFight, "Brandon Moreno");

      expect(result.weightClassDisplay).toBe("Flyweight");
    });

    test("formats location correctly", () => {
      const result = transformFightDetails(mockAppFight, "Brandon Moreno");

      expect(result.locationDisplay).toBe("USA");
    });

    test("handles location with single part correctly", () => {
      const fightWithSinglePartLocation: Fight = {
        ...mockAppFight,
        location: "USA",
      };
      const result = transformFightDetails(
        fightWithSinglePartLocation,
        "Brandon Moreno",
      );

      expect(result.locationDisplay).toBe("USA");
    });

    test("handles missing data correctly", () => {
      const incompleteFight: Fight = {
        ...mockAppFight,
        method: undefined,
        endWith: undefined,
        round: undefined,
        time: undefined,
        location: undefined,
        weightClass: "0",
      };

      const result = transformFightDetails(incompleteFight, "Brandon Moreno");

      expect(result.methodDisplay).toBe(NOT_AVAILABLE);
      expect(result.roundDisplay).toBe(NOT_AVAILABLE);
      expect(result.timeDisplay).toBe(NOT_AVAILABLE);
      expect(result.locationDisplay).toBe(NOT_AVAILABLE);
      expect(result.weightClassDisplay).toBe(NOT_AVAILABLE);
      expect(result.endWithDisplay).toBe("");
    });
  });
});
