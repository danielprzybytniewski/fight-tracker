export const inchesToCm = (inches: string): string => {
  const inchesNum = parseFloat(inches);
  if (isNaN(inchesNum)) return "N/A";
  return `${(inchesNum * 2.54).toFixed(1)} cm`;
};

export const poundsToKg = (pounds: string): string => {
  const poundsNum = parseFloat(pounds);
  if (isNaN(poundsNum)) return "N/A";
  return `${(poundsNum * 0.453592).toFixed(1)} kg`;
};
