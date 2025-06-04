import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatPoints(points: number): string {
  if (points >= 1_000_000) {
    return (points / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (points >= 1_000) {
    return (points / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return points.toString();
}
