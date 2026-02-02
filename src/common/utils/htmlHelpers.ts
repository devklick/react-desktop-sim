import { ForwardedRef } from "react";

export function setRef<T extends HTMLElement>(
  ref: ForwardedRef<T>,
  value: T | null,
): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref != null) {
    ref.current = value;
  }
}
