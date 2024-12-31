import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIdFromShopifyString = (shopifyString: string) => {
  const chunks = shopifyString.split("/");
  return chunks[chunks.length - 1];
}

export const resolveImageSize = (index: number) => {
  const isBetweenOneAndTwo = index >= 1 && index <= 2;

  return {
    width: isBetweenOneAndTwo ? 500 : 1000,
    height: isBetweenOneAndTwo ? 750 : 1500,
  }
}