// Normalizes a name for API requests e.g. Jiří Procházka -> Jiri Prochazka

export default function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-']/g, "")
    .trim();
}
