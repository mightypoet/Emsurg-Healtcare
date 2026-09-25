import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Robust Google Drive ID Extractor & High-Res CDN Formatter
 * Parses:
 * - https://drive.google.com/file/d/{id}/view...
 * - https://drive.google.com/open?id={id}
 * - https://drive.google.com/uc?id={id} or /uc?export=view&id={id}
 * - https://drive.google.com/.../{id}
 * - https://lh3.googleusercontent.com/d/{id} (adds =s1600 if missing)
 * - Raw Google Drive File IDs (25-45 characters)
 * 
 * Returns https://lh3.googleusercontent.com/d/{id}=s1600 to bypass Google's uc?export=view blocks.
 */
export function formatDriveImageUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  // If already a formatted Google usercontent CDN link
  if (trimmed.includes("googleusercontent.com/d/")) {
    if (trimmed.includes("=")) {
      return trimmed;
    }
    const idMatch = trimmed.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}=s1600`;
    }
    return trimmed;
  }

  // Match: /file/d/{id}, id={id}, /open?id={id}, /uc?id={id}, or /d/{id} in drive URLs
  const match =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/drive\.google\.com\/.*\/([a-zA-Z0-9_-]{25,})/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    // Raw Drive ID directly pasted (typically 28 to 44 characters)
    (trimmed.match(/^[a-zA-Z0-9_-]{25,45}$/) ? [null, trimmed] : null);

  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}=s1600`;
  }

  // Already a direct CDN URL or standard image URL
  return trimmed;
}
