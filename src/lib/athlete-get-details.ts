import { inchesToCm, poundsToKg } from "@/lib/unit-conversion";
import {
  type DetailItem,
  type Fighter,
  NOT_AVAILABLE,
} from "@/types/rankings-schema.types";

export const getGeneralDetails = (fighter: Fighter): DetailItem[] => [
  {
    label: "Record",
    value: `${fighter.wins}-${fighter.losses}${
      fighter.draws !== 0 ? `-${fighter.draws}` : ""
    }`,
  },
  { label: "Division", value: fighter.category || NOT_AVAILABLE },
  { label: "Status", value: fighter.status || NOT_AVAILABLE },
  { label: "Age", value: fighter.age || NOT_AVAILABLE },
  {
    label: "Height",
    value: fighter.height
      ? `${fighter.height} in (${inchesToCm(fighter.height)})`
      : NOT_AVAILABLE,
  },
  {
    label: "Weight",
    value: fighter.weight
      ? `${fighter.weight} lbs (${poundsToKg(fighter.weight)})`
      : NOT_AVAILABLE,
  },
  {
    label: "Reach",
    value: fighter.reach
      ? `${fighter.reach} in (${inchesToCm(fighter.reach)})`
      : NOT_AVAILABLE,
  },
  {
    label: "Leg Reach",
    value: fighter.legReach
      ? `${fighter.legReach} in (${inchesToCm(fighter.legReach)})`
      : NOT_AVAILABLE,
  },
];

export const getAdditionalDetails = (fighter: Fighter): DetailItem[] => [
  { label: "Fighting Style", value: fighter.fightingStyle || NOT_AVAILABLE },
  { label: "Trains At", value: fighter.trainsAt || NOT_AVAILABLE },
  { label: "Place of Birth", value: fighter.placeOfBirth || NOT_AVAILABLE },
  { label: "Octagon Debut", value: fighter.octagonDebut || NOT_AVAILABLE },
];
