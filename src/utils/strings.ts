export function truncate(str: string, minLength: number = 8) {
  if (str.length > minLength) {
    return str.substring(0, 4) + "..." + str.substring(str.length - 4);
  }
  return str;
}
