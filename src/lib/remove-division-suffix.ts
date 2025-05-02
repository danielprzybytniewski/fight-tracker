export default function removeDivisionSuffix(
  text: string | null | undefined,
): string {
  if (text == null) return "";
  return text.replace(/\s*Division$/i, "").trim();
}
