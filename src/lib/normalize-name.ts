// Normalizes a name for Searching and API requests e.g. Jiří Procházka -> Jiri Prochazka, Jan Błachowicz -> Jan Blachowicz

export default function normalizeName(name: string): string {
  const polishChars: { [key: string]: string } = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
    Ą: "A",
    Ć: "C",
    Ę: "E",
    Ł: "L",
    Ń: "N",
    Ó: "O",
    Ś: "S",
    Ź: "Z",
    Ż: "Z",
  };

  return name
    .split("")
    .map((char) => polishChars[char] || char)
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-']/g, "")
    .trim();
}
