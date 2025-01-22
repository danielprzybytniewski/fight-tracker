export const inchesToCm = (inches: number): string => {
  return isNaN(inches) ? "N/A" : `${(inches * 2.54).toFixed(1)} cm`;
};

export const poundsToKg = (pounds: number): string => {
  return isNaN(pounds) ? "N/A" : `${(pounds * 0.453592).toFixed(1)} kg`;
};
