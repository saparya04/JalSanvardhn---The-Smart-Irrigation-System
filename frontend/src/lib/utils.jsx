// src/lib/utils.jsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names and merges Tailwind classes intelligently
 * Example: cn("p-2", "p-4") -> "p-4"
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
