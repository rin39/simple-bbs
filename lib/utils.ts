/**
 * Check if param is array of non-empty strings
 */
export function isStringArray(toCheck: any[]) {
  return toCheck.every((el) => typeof el === "string" && el.trim());
}
