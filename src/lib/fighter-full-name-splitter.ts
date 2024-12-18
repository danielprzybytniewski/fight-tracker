export function fighterFullNameSplitter(fullName: string) {
  const nameParts = fullName.split(" ");
  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(" "),
  };
}
