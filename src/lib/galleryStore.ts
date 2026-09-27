import { supabase } from "./supabase";
import { formatDriveImageUrl } from "./utils";
import { DEFAULT_GALLERY_ITEMS } from "./defaultGallery";

export { formatDriveImageUrl };

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

const GALLERY_STORAGE_KEY = "emsurg_gallery_items_v2";
const GALLERY_VERSION_KEY = "emsurg_gallery_60_seeded_v5";

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = DEFAULT_GALLERY_ITEMS;

let inMemoryGalleryCache: GalleryItem[] | null = null;
let isSeedingGallery = false;

function normalizeGalleryItem(item: any): GalleryItem {
  return {
    id: item.id || `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: item.title || "Facility Highlight",
    description: item.description || "",
    image_url: formatDriveImageUrl(item.image_url || ""),
    category: item.category || "Cleanrooms & Sterile Processing",
    col_span: item.col_span || "col-span-1",
    is_featured: item.is_featured ?? true,
    created_at: item.created_at || new Date().toISOString(),
  };
}

/**
 * Reads gallery items from memory/localStorage synchronous cache
 */
export function getLocalGalleryItems(): GalleryItem[] {
  if (inMemoryGalleryCache && inMemoryGalleryCache.length > 0) {
    return inMemoryGalleryCache;
  }

  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const normalized = parsed.map(normalizeGalleryItem);
        inMemoryGalleryCache = normalized;
        return normalized;
      }
    }
  } catch (err) {
    console.warn("Failed to load local gallery items:", err);
  }

  const initial = DEFAULT_GALLERY_ITEMS.map(normalizeGalleryItem);
  inMemoryGalleryCache = initial;
  return initial;
}

/**
 * Seeds default 60-image gallery into Supabase
 */
export async function seedGalleryToSupabase(): Promise<void> {
  if (isSeedingGallery) return;
  isSeedingGallery = true;
  try {
    const payloads = DEFAULT_GALLERY_ITEMS.map((item) => ({
      title: item.title,
      description: item.description,
      image_url: formatDriveImageUrl(item.image_url),
      category: item.category,
      col_span: item.col_span || "col-span-1",
      is_featured: item.is_featured ?? true,
      created_at: item.created_at,
    }));

    await supabase.from("gallery").upsert(payloads, { onConflict: "image_url" });
  } catch (err) {
    console.info("Gallery Supabase auto-seed notice:", err);
  } finally {
    isSeedingGallery = false;
  }
}

/**
 * Fetches gallery items directly from Supabase, caching in memory
 */
export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const normalized = data.map(normalizeGalleryItem);
      inMemoryGalleryCache = normalized;
      try {
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(normalized));
        localStorage.setItem(GALLERY_VERSION_KEY, "true");
      } catch {}

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("emsurg_gallery_updated", { detail: normalized }));
      }
      return normalized;
    }

    if (!error && Array.isArray(data) && data.length === 0) {
      await seedGalleryToSupabase();
    }
  } catch (err) {
    console.info("Supabase fetchGalleryItems notice:", err);
  }

  return getLocalGalleryItems();
}

export const getGalleryItems = fetchGalleryItems;

/**
 * Resets gallery back to the pristine 60-photo dataset in Supabase and local cache
 */
export async function resetToDefaultGallery(): Promise<GalleryItem[]> {
  const defaults = DEFAULT_GALLERY_ITEMS.map(normalizeGalleryItem);
  inMemoryGalleryCache = defaults;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(defaults));
    localStorage.setItem(GALLERY_VERSION_KEY, "true");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("emsurg_gallery_updated", { detail: defaults }));
    }
  } catch {}

  try {
    await seedGalleryToSupabase();
  } catch (err) {
    console.info("Supabase reset gallery error:", err);
  }

  return defaults;
}

/**
 * Inserts or updates a single gallery item directly in Supabase
 */
export async function saveGalleryItem(itemData: Partial<GalleryItem>, editId?: string): Promise<GalleryItem> {
  const current = [...getLocalGalleryItems()];
  const idToUse = editId || itemData.id;
  const sanitizedUrl = itemData.image_url ? formatDriveImageUrl(itemData.image_url) : "";
  let updatedItem: GalleryItem;

  if (idToUse) {
    const idx = current.findIndex((g) => g.id === idToUse || (sanitizedUrl && g.image_url === sanitizedUrl));
    if (idx !== -1) {
      updatedItem = {
        ...current[idx],
        ...itemData,
        id: idToUse,
        image_url: sanitizedUrl || current[idx].image_url,
      };
      current[idx] = updatedItem;
    } else {
      updatedItem = normalizeGalleryItem({
        ...itemData,
        id: idToUse,
        image_url: sanitizedUrl,
      });
      current.unshift(updatedItem);
    }
  } else {
    updatedItem = normalizeGalleryItem({
      ...itemData,
      id: `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      image_url: sanitizedUrl,
    });
    current.unshift(updatedItem);
  }

  inMemoryGalleryCache = current;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(current));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("emsurg_gallery_updated", { detail: current }));
    }
  } catch {}

  // Direct Supabase sync
  try {
    const dbPayload = {
      title: updatedItem.title,
      description: updatedItem.description,
      image_url: updatedItem.image_url,
      category: updatedItem.category,
      col_span: updatedItem.col_span || "col-span-1",
      is_featured: updatedItem.is_featured ?? true,
    };

    if (idToUse && !idToUse.startsWith("gal-") && !idToUse.startsWith("fac-")) {
      await supabase.from("gallery").update(dbPayload).eq("id", idToUse);
    } else {
      const { data } = await supabase.from("gallery").upsert([dbPayload], { onConflict: "image_url" }).select();
      if (data && data[0]) {
        updatedItem.id = data[0].id;
      }
    }
  } catch (err) {
    console.info("Supabase saveGalleryItem error:", err);
  }

  return updatedItem;
}

export const saveLocalGalleryItem = saveGalleryItem;

/**
 * Bulk saves gallery items directly in Supabase
 */
export async function saveBulkGalleryItems(itemsData: Array<Partial<GalleryItem>>): Promise<GalleryItem[]> {
  const current = [...getLocalGalleryItems()];
  const created: GalleryItem[] = [];

  for (let i = 0; i < itemsData.length; i++) {
    const data = itemsData[i];
    const sanitizedUrl = data.image_url ? formatDriveImageUrl(data.image_url) : "";
    const newItem: GalleryItem = normalizeGalleryItem({
      ...data,
      id: data.id || `gal-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title?.trim() || `Facility Highlight ${current.length + i + 1}`,
      image_url: sanitizedUrl,
    });
    created.push(newItem);
  }

  const combined = [...created, ...current];
  inMemoryGalleryCache = combined;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(combined));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("emsurg_gallery_updated", { detail: combined }));
    }
  } catch {}

  // Supabase bulk insert
  try {
    const dbPayloads = created.map((c) => ({
      title: c.title,
      description: c.description,
      image_url: c.image_url,
      category: c.category,
      col_span: c.col_span || "col-span-1",
      is_featured: c.is_featured ?? true,
    }));

    await supabase.from("gallery").upsert(dbPayloads, { onConflict: "image_url" });
  } catch (err) {
    console.info("Supabase saveBulkGalleryItems error:", err);
  }

  return created;
}

export const saveBulkLocalGalleryItems = saveBulkGalleryItems;

/**
 * Deletes a gallery item directly from Supabase and local cache
 */
export async function deleteGalleryItem(id: string): Promise<boolean> {
  const current = getLocalGalleryItems();
  const itemToDelete = current.find((g) => g.id === id);
  const filtered = current.filter((g) => g.id !== id);

  inMemoryGalleryCache = filtered;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(filtered));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("emsurg_gallery_updated", { detail: filtered }));
    }
  } catch {}

  try {
    if (id && !id.startsWith("gal-") && !id.startsWith("fac-")) {
      await supabase.from("gallery").delete().eq("id", id);
    } else if (itemToDelete) {
      await supabase.from("gallery").delete().eq("image_url", itemToDelete.image_url);
    }
  } catch (err) {
    console.info("Supabase deleteGalleryItem error:", err);
  }

  return true;
}

export const deleteLocalGalleryItem = deleteGalleryItem;

/**
 * Toggles featured state for gallery item directly in Supabase
 */
export async function toggleGalleryItemFeatured(id: string): Promise<GalleryItem | null> {
  const current = getLocalGalleryItems();
  const item = current.find((g) => g.id === id);
  if (!item) return null;

  item.is_featured = !item.is_featured;
  inMemoryGalleryCache = current;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(current));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("emsurg_gallery_updated", { detail: current }));
    }
  } catch {}

  try {
    if (!id.startsWith("gal-") && !id.startsWith("fac-")) {
      await supabase.from("gallery").update({ is_featured: item.is_featured }).eq("id", id);
    } else {
      await supabase.from("gallery").update({ is_featured: item.is_featured }).eq("image_url", item.image_url);
    }
  } catch (err) {
    console.info("Supabase toggleGalleryItemFeatured error:", err);
  }

  return item;
}

export const toggleLocalGalleryFeatured = toggleGalleryItemFeatured;

/**
 * Real-time Supabase subscription for Gallery
 */
export function subscribeToGallery(callback: (items: GalleryItem[]) => void): () => void {
  const channel = supabase
    .channel("public:gallery-live-sync")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "gallery" },
      async () => {
        const refreshed = await fetchGalleryItems();
        callback(refreshed);
      }
    )
    .subscribe();

  const handleCustomEvent = (e: any) => {
    if (e.detail) {
      callback(e.detail);
    } else {
      callback(getLocalGalleryItems());
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("emsurg_gallery_updated", handleCustomEvent);
  }

  return () => {
    supabase.removeChannel(channel);
    if (typeof window !== "undefined") {
      window.removeEventListener("emsurg_gallery_updated", handleCustomEvent);
    }
  };
}
