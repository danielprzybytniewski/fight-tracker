import { DetailItem, Fighter } from "@/types/rankings-schema.types";
import { inchesToCm, poundsToKg } from "@/lib/unitConversion";

export const getGeneralDetails = (fighter: Fighter): DetailItem[] => [
  {
    label: "Record",
    value: `${fighter.wins}-${fighter.losses}${
      fighter.draws !== "0" ? `-${fighter.draws}` : ""
    }`,
  },
  { label: "Division", value: fighter.category || "N/A" },
  { label: "Status", value: fighter.status || "N/A" },
  { label: "Age", value: fighter.age || "N/A" },
  {
    label: "Height",
    value: fighter.height
      ? `${fighter.height} (${inchesToCm(fighter.height)})`
      : "N/A",
  },
  {
    label: "Weight",
    value: fighter.weight
      ? `${fighter.weight} lbs (${poundsToKg(fighter.weight)})`
      : "N/A",
  },
  {
    label: "Reach",
    value: fighter.reach
      ? `${fighter.reach} (${inchesToCm(fighter.reach)})`
      : "N/A",
  },
  {
    label: "Leg Reach",
    value: fighter.legReach
      ? `${fighter.legReach} (${inchesToCm(fighter.legReach)})`
      : "N/A",
  },
];

export const getAdditionalDetails = (fighter: Fighter): DetailItem[] => [
  { label: "Fighting Style", value: fighter.fightingStyle || "N/A" },
  { label: "Trains At", value: fighter.trainsAt || "N/A" },
  { label: "Place of Birth", value: fighter.placeOfBirth || "N/A" },
  { label: "Octagon Debut", value: fighter.octagonDebut || "N/A" },
];
