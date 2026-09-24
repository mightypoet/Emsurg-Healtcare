import { supabase } from "./supabase";
import { formatDriveImageUrl } from "./utils";

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
const LEGACY_STORAGE_KEY = "emsurg_gallery_items_v1";

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "State-of-the-Art Cleanrooms",
    description: "Our ISO-certified cleanrooms ensure the highest level of sterility for the manufacturing of critical orthobiologics and wound care solutions.",
    image_url: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
    category: "Cleanrooms & Sterile Processing",
    col_span: "md:col-span-2",
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "gal-2",
    title: "Precision Dialysis Manufacturing",
    description: "Advanced indigenous production lines for high-purity hemodialysis fluids, ensuring supply chain resilience across India.",
    image_url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
    category: "Dialysis & Fluid Production",
    col_span: "col-span-1",
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "gal-3",
    title: "R&D Laboratories",
    description: "Our scientists pushing the boundaries of biomaterials, continually testing and developing the next generation of synthetic bone grafts.",
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
    category: "Biomaterials Research & R&D",
    col_span: "col-span-1",
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "gal-4",
    title: "Quality Assurance & Batch Testing",
    description: "Every batch undergoes rigorous quality control checks in our in-house testing facility before reaching healthcare providers.",
    image_url: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2070&auto=format&fit=crop",
    category: "Quality Assurance & QA",
    col_span: "md:col-span-2",
    is_featured: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "gal-5",
    title: "Sterile Packaging & Robotic Sealing",
    description: "Automated medical barrier packaging lines ensuring integrity, shelf-life, and complete traceability of all sterile clinical units.",
    image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    category: "Packaging & Logistics",
    col_span: "col-span-1",
    is_featured: false,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "gal-6",
    title: "Surgeon Training & Clinical Workshop",
    description: "Hands-on orthobiologics application workshops and surgical theater simulations conducted in partnership with premier hospitals.",
    image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop",
    category: "Clinical Workshops",
    col_span: "col-span-1",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

/**
 * Reads all gallery items directly from localStorage.
 * If empty, seeds with the initial default clinical items.
 * Ensures all image URLs are sanitized through formatDriveImageUrl.
 */
export function getLocalGalleryItems(): GalleryItem[] {
  try {
    let raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) {
      // Migrate from legacy key if present
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        localStorage.setItem(GALLERY_STORAGE_KEY, legacyRaw);
      }
    }
    if (!raw) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_ITEMS));
      return INITIAL_GALLERY_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item: any) => ({
        ...item,
        image_url: formatDriveImageUrl(item.image_url || ""),
      }));
    }
  } catch (err) {
    console.warn("Failed to load local gallery items:", err);
  }
  return INITIAL_GALLERY_ITEMS;
}

/**
 * Persists gallery items to localStorage and dispatches the update event.
 */
export function saveLocalGalleryItems(items: GalleryItem[]): void {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
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
        col_span: c.col_span,
        is_featured: c.is_featured,
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
 * If empty, seeds with default clinical items.
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
      col_span: localItem.col_span,
      is_featured: localItem.is_featured,
    };

    if (idToUse && !idToUse.startsWith("gal-")) {
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
    if (!id.startsWith("gal-")) {
      Promise.resolve(supabase.from("gallery").delete().eq("id", id)).catch(() => {});
    }
  } catch (err) {
    console.info("Supabase gallery delete bypassed:", err);
  }
  return true;
}

/**
 * Unified toggle featured: Updates locally, dispatches event,
 * and non-blocking syncs to Supabase.
 */
export async function toggleGalleryItemFeatured(id: string): Promise<GalleryItem | null> {
  const updated = toggleLocalGalleryFeatured(id);
  if (updated && !id.startsWith("gal-")) {
    try {
      Promise.resolve(
        supabase.from("gallery").update({ is_featured: updated.is_featured }).eq("id", id)
      ).catch(() => {});
    } catch (err) {
      console.info("Supabase toggle featured bypassed:", err);
    }
  }
  return updated;
}
