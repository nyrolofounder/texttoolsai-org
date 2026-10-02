import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function calculateReadingTime(wordsCount: number): string {
  const minutes = Math.ceil(wordsCount / 200);
  return `${minutes} min read`;
}
