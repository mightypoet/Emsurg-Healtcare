import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDriveImageUrl(url: string): string {
  if (!url) return '';
  
  // Extract ID from /file/d/{id}, id={id}, or /open?id={id}
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    // lh3.googleusercontent.com/d/{id}=s1600 bypasses the uc?export=view block and hotlink restrictions
    return `https://lh3.googleusercontent.com/d/${match[1]}=s1600`;
  }
  return url;
}

