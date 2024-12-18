import moment from "moment-timezone";

// workaround for API invalid date
export function convertApiDateToLocalTime(apiDate: string): string {
  const currentYear = moment().year();
  const [, monthName, day, time, period, timeZone] = apiDate.split(/[ ,]+/);
  let formattedDate = `${monthName} ${day} ${currentYear} ${time} ${period} ${timeZone}`;
  let parsedDate = moment.tz(
    formattedDate,
    "MMMM D YYYY hh:mm A z",
    "America/New_York"
  );

  if (parsedDate.isBefore(moment())) {
    formattedDate = `${monthName} ${day} ${
      currentYear + 1
    } ${time} ${period} ${timeZone}`;
    parsedDate = moment.tz(
      formattedDate,
      "MMMM D YYYY hh:mm A z",
      "America/New_York"
    );
  }

  const localDate = parsedDate.tz("Europe/Warsaw");
  return localDate.format("dddd, D MMMM YYYY, HH:mm");
}
