import { darken, getLuminance, lighten } from "polished";

export function isLight(color: string): boolean {
  return getLuminance(color) >= 0.5;
}

export function adjustLuminance(amount: number, color: string) {
  return isLight(color) ? darken(amount, color) : lighten(amount, color);
}
