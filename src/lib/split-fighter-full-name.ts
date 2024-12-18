export function splitFighterFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const nameParts = fullName.split(" ");
  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(" "),
  };
}
