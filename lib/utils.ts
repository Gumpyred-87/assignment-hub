import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtDate(d: Date | string | null | undefined) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function truncate(s: string, n = 80) {
  if (s.length <= n) return s;
  return s.slice(0, n).trimEnd() + "…";
}

export function countWords(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

export function getPlanLimits(plan: string) {
  switch (plan) {
    case "pro":
      return { projectsPerMonth: Infinity, aiTokensPerMonth: Infinity };
    case "team":
      return { projectsPerMonth: Infinity, aiTokensPerMonth: Infinity };
    default:
      return { projectsPerMonth: 3, aiTokensPerMonth: 50000 };
  }
}