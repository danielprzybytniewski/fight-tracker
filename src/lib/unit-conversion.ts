import { NOT_AVAILABLE } from "@/types/rankings-schema.types";

export const inchesToCm = (inches: number): string => {
  return isNaN(inches) ? NOT_AVAILABLE : `${(inches * 2.54).toFixed(1)} cm`;
};

export const poundsToKg = (pounds: number): string => {
  return isNaN(pounds) ? NOT_AVAILABLE : `${(pounds * 0.453592).toFixed(1)} kg`;
};
