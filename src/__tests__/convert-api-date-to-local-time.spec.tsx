import { convertApiDateToLocalTime } from "@/lib/convert-api-date-to-local-time";
import moment from "moment-timezone";

describe("convertApiDateToLocalTime", () => {
  let originalNow: () => number;

  beforeAll(() => {
    originalNow = Date.now;
    jest
      .spyOn(moment, "tz")
      .mockImplementation(
        (date: string, formatOrTimezone: string, timezone?: string) => {
          if (timezone) {
            return moment(date, formatOrTimezone).tz(timezone);
          } else {
            return moment(date).tz(formatOrTimezone);
          }
        }
      );
  });

  afterAll(() => {
    jest.restoreAllMocks();
    Date.now = originalNow;
  });

  test("converts 'Friday, January 10, 8:00 PM ET' to local time correctly", () => {
    const mockDate = "Friday, January 10, 8:00 PM ET";
    const expectedLocalTime = moment
      .tz(mockDate, "dddd, MMMM D, hh:mm A z", "America/New_York")
      .tz("Europe/Warsaw")
      .format("dddd, D MMMM YYYY, HH:mm");

    const result = convertApiDateToLocalTime(mockDate);
    expect(result).toBe(expectedLocalTime);
  });

  test("converts 'Saturday, February 15, 3:30 PM ET' to local time correctly", () => {
    const mockDate = "Saturday, February 15, 3:30 PM ET";
    const expectedLocalTime = moment
      .tz(mockDate, "dddd, MMMM D, hh:mm A z", "America/New_York")
      .tz("Europe/Warsaw")
      .format("dddd, D MMMM YYYY, HH:mm");

    const result = convertApiDateToLocalTime(mockDate);
    expect(result).toBe(expectedLocalTime);
  });

  test("handles past dates by converting to next year", () => {
    const fixedNow = new Date("2024-12-31T23:59:59Z").getTime();
    Date.now = jest.fn(() => fixedNow);

    const originalYear = moment.prototype.year;
    moment.prototype.year = jest.fn(() => 2024);

    const mockDate = "Monday, January 1, 8:00 PM ET";

    const expectedLocalTime = moment
      .tz("January 1 2025 8:00 PM", "MMMM D YYYY hh:mm A", "America/New_York")
      .tz("Europe/Warsaw")
      .format("dddd, D MMMM YYYY, HH:mm");

    const result = convertApiDateToLocalTime(mockDate);
    expect(result).toBe(expectedLocalTime);

    moment.prototype.year = originalYear;
  });
});
