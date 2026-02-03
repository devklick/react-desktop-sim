export function toKebabCase(str: string) {
  return str
    .normalize("NFKD") // split accented chars
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // camelCase → camel-Case
    .replace(/[^a-zA-Z0-9]+/g, "-") // non-alphanumerics → -
    .replace(/^-+|-+$/g, "") // trim leading/trailing -
    .toLowerCase();
}
