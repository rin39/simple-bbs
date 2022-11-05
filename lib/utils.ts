/**
 * Check if param is array of non-empty strings
 */
export function isStringArray(toCheck: any[]) {
  return toCheck.every((el) => typeof el === "string" && el.trim());
}

/**
 * Truncate string to length and append "...".
 * Do nothing if length is not exceeded.
 */
export function truncateString(stringToTruncate: string, length: number) {
  if (stringToTruncate.length > length)
    stringToTruncate = stringToTruncate.slice(0, length) + "...";
  return stringToTruncate;
}
