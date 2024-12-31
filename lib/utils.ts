import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIdFromShopifyString = (shopifyString: string) => {
  const chunks = shopifyString.split("/");
  return chunks[chunks.length - 1];
}

