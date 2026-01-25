import { getLuminance } from "polished";

export function isLight(color: string): boolean {
  return getLuminance(color) >= 0.5;
}
