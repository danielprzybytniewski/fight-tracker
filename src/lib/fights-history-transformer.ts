import {
  Fight,
  FightResult,
  TransformedFightDetails,
} from "@/types/fights-history.schema.types";
import { NOT_AVAILABLE } from "@/types/rankings-schema.types";

function formatLocation(location: string | undefined): string {
  if (!location || location.trim() === "") return NOT_AVAILABLE;

  const parts = location.split(", ");
  return parts[parts.length - 1];
}

function formatWeightClass(weightClass: string | undefined): string {
  if (!weightClass || weightClass === "0") return NOT_AVAILABLE;
  return weightClass;
}

function formatEndWith(endWith: string | undefined): string {
  if (!endWith) return "";
  return endWith.toLowerCase();
}

function determineResult(fight: Fight, mainFighterName: string): FightResult {
  if (fight.draw) {
    return "draw";
  }
  return fight.winner === mainFighterName ? "win" : "loss";
}

function getMethodDisplay(fight: Fight, result: string): string {
  if (result === "draw") {
    return "Decision";
  }
  if (fight.method && fight.endWith) {
    return `${fight.method} (${formatEndWith(fight.endWith)})`;
  }
  return fight.method || formatEndWith(fight.endWith) || NOT_AVAILABLE;
}

function getRoundDisplay(fight: Fight, result: string): string {
  if (result === "draw") {
    return "3";
  }
  return fight.round || NOT_AVAILABLE;
}

function getTimeDisplay(fight: Fight, result: string): string {
  if (result === "draw") {
    return "5:00";
  }
  return fight.time || NOT_AVAILABLE;
}

export function sortFightsByDate(fights: Fight[]): Fight[] {
  return [...fights].sort((a, b) => b.date.getTime() - a.date.getTime());
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
