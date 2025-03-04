export default function removeDivisionSuffix(text: string): string {
  return text.replace(/\s*Division$/i, "").trim();
}
