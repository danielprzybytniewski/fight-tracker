import { Fight } from "@/types/fights-history.schema.types";

export type TransformedFightDetails = {
  opponentName: string;
  result: "Win" | "Loss" | "Draw";
  methodDisplay: string;
  roundDisplay: string;
  timeDisplay: string;
  locationDisplay: string;
  weightClassDisplay: string;
  endWithDisplay?: string;
};

export function formatLocation(location: string | undefined): string {
  if (!location) return "N/A";

  const parts = location.split(", ");
  return parts.length > 0 ? parts[parts.length - 1] : "N/A";
}

export function formatWeightClass(weightClass: string | undefined): string {
  if (!weightClass || weightClass === "0") return "N/A";
  return weightClass;
}

export function formatEndWith(endWith: string | undefined): string {
  if (!endWith) return "";
  return endWith.toLowerCase();
}

export function sortFightsByDate(fights: Fight[]): Fight[] {
  return [...fights].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function determineResult(
  fight: Fight,
  mainFighterName: string
): "Win" | "Loss" | "Draw" {
  if (fight.draw) {
    return "Draw";
  }
  return fight.winner === mainFighterName ? "Win" : "Loss";
}

export function getMethodDisplay(fight: Fight, result: string): string {
  if (result === "Draw") {
    return "Decision";
  }
  if (fight.method && fight.endWith) {
    return `${fight.method} (${formatEndWith(fight.endWith)})`;
  }
  return fight.method || formatEndWith(fight.endWith) || "N/A";
}

export function getRoundDisplay(fight: Fight, result: string): string {
  if (result === "Draw") {
    return "3";
  }
  return fight.round || "N/A";
}

export function getTimeDisplay(fight: Fight, result: string): string {
  if (result === "Draw") {
    return "5:00";
  }
  return fight.time || "N/A";
}

export function transformFightDetails(
  fight: Fight,
  mainFighterName: string
): TransformedFightDetails {
  const opponentName =
    fight.fighter1Name === mainFighterName
      ? fight.fighter2Name
      : fight.fighter1Name;

  const result = determineResult(fight, mainFighterName);

  const methodDisplay = getMethodDisplay(fight, result);
  const roundDisplay = getRoundDisplay(fight, result);
  const timeDisplay = getTimeDisplay(fight, result);
  const locationDisplay = formatLocation(fight.location);
  const weightClassDisplay = formatWeightClass(fight.weightClass);
  const endWithDisplay = formatEndWith(fight.endWith);

  return {
    opponentName,
    result,
    methodDisplay,
    roundDisplay,
    timeDisplay,
    locationDisplay,
    weightClassDisplay,
    endWithDisplay,
  };
}
