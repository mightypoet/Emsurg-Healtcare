import { supabase } from "./supabase";
import { formatDriveImageUrl } from "./utils";
import { DEFAULT_GALLERY_ITEMS } from "./defaultGallery";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  col_span?: "col-span-1" | "md:col-span-2";
  is_featured?: boolean;
  created_at: string;
}

const GALLERY_STORAGE_KEY = "emsurg_gallery_items";
const GALLERY_VERSION_KEY = "emsurg_gallery_60_seeded_v2";

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = DEFAULT_GALLERY_ITEMS;

/**
 * Reads all gallery items directly from localStorage.
 * If empty or outdated (< 10 items, e.g. legacy placeholder), seeds with the complete 60-image clinical dataset.
 * Ensures all image URLs are sanitized through formatDriveImageUrl.
 */
export function getLocalGalleryItems(): GalleryItem[] {
  try {
    const isSeeded = localStorage.getItem(GALLERY_VERSION_KEY);
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);

    // If completely empty or not yet upgraded to the full 60-image dataset
    if (!raw || !isSeeded) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(DEFAULT_GALLERY_ITEMS));
      localStorage.setItem(GALLERY_VERSION_KEY, "true");
      return DEFAULT_GALLERY_ITEMS;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < 10) {
      // Outdated previous store with only 6 placeholder items
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(DEFAULT_GALLERY_ITEMS));
      localStorage.setItem(GALLERY_VERSION_KEY, "true");
      return DEFAULT_GALLERY_ITEMS;
    }

    return parsed.map((item: any) => ({
      ...item,
      image_url: formatDriveImageUrl(item.image_url || ""),
    }));
  } catch (err) {
    console.warn("Failed to load local gallery items:", err);
  }
  return DEFAULT_GALLERY_ITEMS;
}

/**
 * Resets local gallery storage back to the pristine 60-photo dataset.
 */
export function resetToDefaultGallery(): GalleryItem[] {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(DEFAULT_GALLERY_ITEMS));
    localStorage.setItem(GALLERY_VERSION_KEY, "true");
    window.dispatchEvent(new Event("emsurg_gallery_updated"));
  } catch (err) {
    console.warn("Failed to reset gallery:", err);
  }
  return DEFAULT_GALLERY_ITEMS;
}

/**
 * Persists gallery items to localStorage and dispatches the update event.
 */
export function saveLocalGalleryItems(items: GalleryItem[]): void {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(GALLERY_VERSION_KEY, "true");
    window.dispatchEvent(new Event("emsurg_gallery_updated"));
  } catch (err) {
    console.warn("Failed to save local gallery items:", err);
  }
}

/**
 * Inserts or updates a single gallery item locally, with Drive URL sanitization.
 */
export function saveLocalGalleryItem(itemData: Partial<GalleryItem>, editId?: string): GalleryItem {
  const current = getLocalGalleryItems();
  const idToUse = editId || itemData.id;
  const sanitizedUrl = itemData.image_url ? formatDriveImageUrl(itemData.image_url) : "";
  let updatedItem: GalleryItem;

  if (idToUse) {
    const idx = current.findIndex((g) => g.id === idToUse);
    if (idx !== -1) {
      updatedItem = {
        ...current[idx],
        ...itemData,
        id: idToUse,
        image_url: sanitizedUrl || current[idx].image_url,
      };
      current[idx] = updatedItem;
    } else {
      updatedItem = {
        id: idToUse,
        title: itemData.title?.trim() || "Facility Highlight",
        description: itemData.description?.trim() || "",
        image_url: sanitizedUrl,
        category: itemData.category || "Cleanrooms & Sterile Processing",
        col_span: itemData.col_span || "col-span-1",
        is_featured: itemData.is_featured ?? true,
        created_at: itemData.created_at || new Date().toISOString(),
      };
      current.unshift(updatedItem);
    }
  } else {
    updatedItem = {
      id: `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: itemData.title?.trim() || "Facility Highlight",
      description: itemData.description?.trim() || "",
      image_url: sanitizedUrl,
      category: itemData.category || "Cleanrooms & Sterile Processing",
      col_span: itemData.col_span || "col-span-1",
      is_featured: itemData.is_featured ?? true,
      created_at: new Date().toISOString(),
    };
    current.unshift(updatedItem);
  }

  saveLocalGalleryItems(current);
  return updatedItem;
}

/**
 * Bulk saves items locally with Drive URL sanitization.
 */
export function saveBulkLocalGalleryItems(itemsData: Array<Partial<GalleryItem>>): GalleryItem[] {
  const current = getLocalGalleryItems();
  const created: GalleryItem[] = [];

  for (let i = 0; i < itemsData.length; i++) {
    const data = itemsData[i];
    const sanitizedUrl = data.image_url ? formatDriveImageUrl(data.image_url) : "";
    const newItem: GalleryItem = {
      id: data.id || `gal-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title?.trim() || `Facility Highlight ${current.length + i + 1}`,
      description: data.description?.trim() || "High-precision biomedical manufacturing and clinical operations at Emsurg.",
      image_url: sanitizedUrl,
      category: data.category || "Cleanrooms & Sterile Processing",
      col_span: data.col_span || (i % 3 === 0 ? "md:col-span-2" : "col-span-1"),
      is_featured: data.is_featured ?? true,
      created_at: new Date().toISOString(),
    };
    created.push(newItem);
  }

  current.unshift(...created);
  saveLocalGalleryItems(current);

  // Optional non-blocking Supabase sync
  try {
    if (created.length > 0) {
      const payloads = created.map((c) => ({
        title: c.title,
        description: c.description,
        image_url: c.image_url,
        category: c.category,
      }));
      Promise.resolve(supabase.from("gallery").insert(payloads))
        .catch(() => {});
    }
  } catch (err) {
    // Non-blocking
  }

  return created;
}

/**
 * Removes an item from localStorage and fires update event.
 */
export function deleteLocalGalleryItem(id: string): boolean {
  const current = getLocalGalleryItems();
  const filtered = current.filter((g) => g.id !== id);
  saveLocalGalleryItems(filtered);
  return true;
}

/**
 * Toggles featured state locally and dispatches update event.
 */
export function toggleLocalGalleryFeatured(id: string): GalleryItem | null {
  const current = getLocalGalleryItems();
  const item = current.find((g) => g.id === id);
  if (!item) return null;
  item.is_featured = !item.is_featured;
  saveLocalGalleryItems(current);
  return item;
}

/**
 * Unified getter: Reads immediately from localStorage.
 * If empty or outdated, seeds with the 60 cleanroom dataset.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  return getLocalGalleryItems();
}

/**
 * Unified saver: Sanitizes image_url via formatDriveImageUrl(),
 * saves locally, dispatches emsurg_gallery_updated, and syncs
 * non-blocking to Supabase in a try/catch.
 */
export async function saveGalleryItem(itemData: Partial<GalleryItem>, editId?: string): Promise<GalleryItem> {
  const idToUse = editId || itemData.id;
  const localItem = saveLocalGalleryItem(itemData, idToUse);

  // Non-blocking sync to Supabase
  try {
    const payload = {
      title: localItem.title,
      description: localItem.description,
      image_url: localItem.image_url,
      category: localItem.category,
    };

    if (idToUse && !idToUse.startsWith("gal-") && !idToUse.startsWith("fac-")) {
      Promise.resolve(supabase.from("gallery").update(payload).eq("id", idToUse)).catch(() => {});
    } else {
      Promise.resolve(supabase.from("gallery").insert([payload])).catch(() => {});
    }
  } catch (err) {
    console.info("Supabase gallery sync bypassed:", err);
  }

  return localItem;
}

/**
 * Unified deleter: Removes from localStorage, dispatches event,
 * and non-blocking syncs to Supabase.
 */
export async function deleteGalleryItem(id: string): Promise<boolean> {
  deleteLocalGalleryItem(id);
  try {
    if (!id.startsWith("gal-") && !id.startsWith("fac-")) {
      Promise.resolve(supabase.from("gallery").delete().eq("id", id)).catch(() => {});
    }
  } catch (err) {
    console.info("Supabase gallery delete bypassed:", err);
  }
  return true;
}

/**
 * Unified toggle featured: Updates locally, dispatches event.
 */
export async function toggleGalleryItemFeatured(id: string): Promise<GalleryItem | null> {
  return toggleLocalGalleryFeatured(id);
}
