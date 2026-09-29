import { supabase } from "./supabase";
import { formatDriveImageUrl } from "./utils";
import { DEFAULT_GALLERY_ITEMS } from "./defaultGallery";
import { uploadProductImage } from "./productsStore";

export { formatDriveImageUrl, uploadProductImage };

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  col_span?: "col-span-1" | "md:col-span-2";
  is_featured?: boolean;
  order_index?: number;
  orderIndex?: number;
  created_at: string;
}

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = DEFAULT_GALLERY_ITEMS;

let isSeedingGallery = false;

function normalizeGalleryItem(item: any, index: number = 0): GalleryItem {
  return {
    id: item.id || `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: item.title || item.name || "Facility Highlight",
    description: item.description || item.notes || "",
    image_url: formatDriveImageUrl(item.image_url || item.image || ""),
    category: item.category || "Cleanrooms & Sterile Processing",
    col_span: item.col_span || (index % 3 === 0 ? "md:col-span-2" : "col-span-1"),
    is_featured: item.is_featured ?? item.featured ?? true,
    order_index: item.order_index ?? item.orderIndex ?? index,
    orderIndex: item.order_index ?? item.orderIndex ?? index,
    created_at: item.created_at || new Date().toISOString(),
  };
}

/**
 * Seeds default 60-image gallery into Supabase gallery_items table
 */
export async function seedGalleryToSupabase(): Promise<GalleryItem[]> {
  if (isSeedingGallery) return DEFAULT_GALLERY_ITEMS.map(normalizeGalleryItem);
  isSeedingGallery = true;
  try {
    const payloads = DEFAULT_GALLERY_ITEMS.map((item, idx) => ({
      title: item.title,
      description: item.description || "",
      image_url: formatDriveImageUrl(item.image_url),
      category: item.category || "Cleanrooms & Sterile Processing",
      is_featured: item.is_featured ?? true,
      order_index: idx,
      created_at: item.created_at || new Date().toISOString(),
    }));

    // Insert into gallery_items
    const { data, error } = await supabase
      .from("gallery_items")
      .insert(payloads)
      .select();

    if (!error && data && data.length > 0) {
      console.log(`Successfully seeded ${data.length} gallery items into Supabase gallery_items table!`);
      return data.map(normalizeGalleryItem);
    }

    // Fallback try gallery table if gallery_items is not provisioned
    const res2 = await supabase
      .from("gallery")
      .upsert(payloads, { onConflict: "image_url" })
      .select();

    if (!res2.error && res2.data && res2.data.length > 0) {
      return res2.data.map(normalizeGalleryItem);
    }
  } catch (err) {
    console.info("Gallery Supabase auto-seed notice:", err);
  } finally {
    isSeedingGallery = false;
  }

  return DEFAULT_GALLERY_ITEMS.map(normalizeGalleryItem);
}

/**
 * Direct Supabase fetch for gallery items with auto-seeding
 */
export async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    // 1. Query primary table: gallery_items
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data.map(normalizeGalleryItem);
    }

    // 2. Query fallback table: gallery
    const resFallback = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!resFallback.error && Array.isArray(resFallback.data) && resFallback.data.length > 0) {
      return resFallback.data.map(normalizeGalleryItem);
    }

    // 3. If empty, auto-seed with standard clinical facility array
    if (!error || !resFallback.error) {
      console.log("Gallery empty in Supabase, auto-seeding default 60 facility images...");
      return await seedGalleryToSupabase();
    }
  } catch (err) {
    console.error("Error fetching gallery from Supabase:", err);
  }

  return DEFAULT_GALLERY_ITEMS.map(normalizeGalleryItem);
}

export const fetchGalleryItems = fetchGallery;
export const getGalleryItems = fetchGallery;
export const getLocalGalleryItems = () => DEFAULT_GALLERY_ITEMS.map(normalizeGalleryItem);

/**
 * Saves a single gallery item directly to Supabase
 */
export async function saveGalleryItem(item: any, editId?: string): Promise<GalleryItem> {
  const sanitizedUrl = item.image_url || item.image ? formatDriveImageUrl(item.image_url || item.image) : "";
  const targetId = editId || item.id;

  // Do not include col_span in database payload because the Postgres schema does not contain col_span column
  const payload: any = {
    title: item.title?.trim() || "Untitled Facility Highlight",
    category: item.category || "Cleanrooms & Sterile Processing",
    image_url: sanitizedUrl,
    description: item.description?.trim() || "",
    is_featured: item.is_featured ?? true,
    order_index: item.order_index ?? item.orderIndex ?? 0,
  };

  try {
    if (targetId && !targetId.startsWith("fac-") && !targetId.startsWith("gal-")) {
      // Update existing record
      const { data, error } = await supabase
        .from("gallery_items")
        .update(payload)
        .eq("id", targetId)
        .select();

      if (!error && data && data[0]) {
        notifyGalleryChanged();
        return normalizeGalleryItem(data[0]);
      }

      // Fallback try gallery table
      const res2 = await supabase
        .from("gallery")
        .update(payload)
        .eq("id", targetId)
        .select();

      if (!res2.error && res2.data && res2.data[0]) {
        notifyGalleryChanged();
        return normalizeGalleryItem(res2.data[0]);
      }
    }

    // Insert new record
    const { data, error } = await supabase
      .from("gallery_items")
      .insert([payload])
      .select();

    if (!error && data && data[0]) {
      notifyGalleryChanged();
      return normalizeGalleryItem(data[0]);
    }

    // Fallback try gallery table
    const resFallback = await supabase
      .from("gallery")
      .upsert([payload], { onConflict: "image_url" })
      .select();

    if (!resFallback.error && resFallback.data && resFallback.data[0]) {
      notifyGalleryChanged();
      return normalizeGalleryItem(resFallback.data[0]);
    }

    if (error) {
      console.error("Supabase gallery_items insert error:", error);
      throw error;
    }
  } catch (err) {
    console.error("Critical error saving gallery item to Supabase:", err);
    throw err;
  }

  notifyGalleryChanged();
  return normalizeGalleryItem({ ...payload, id: targetId || `gal-${Date.now()}` });
}

export const saveLocalGalleryItem = saveGalleryItem;

/**
 * Bulk saves gallery items to Supabase
 */
export async function saveBulkGalleryItems(itemsData: Array<Partial<GalleryItem>>): Promise<GalleryItem[]> {
  // Do not include col_span in database payload because the Postgres schema does not contain col_span column
  const payloads = itemsData.map((item, idx) => ({
    title: item.title?.trim() || `Facility Highlight ${idx + 1}`,
    category: item.category || "Cleanrooms & Sterile Processing",
    image_url: item.image_url ? formatDriveImageUrl(item.image_url) : "",
    description: item.description?.trim() || "Clinical facility, laboratory research, and medical manufacturing highlight.",
    is_featured: item.is_featured ?? true,
    order_index: item.order_index ?? item.orderIndex ?? idx,
  }));

  try {
    const { data, error } = await supabase
      .from("gallery_items")
      .insert(payloads)
      .select();

    if (!error && data) {
      notifyGalleryChanged();
      return data.map(normalizeGalleryItem);
    }

    // If column mismatch occurs, retry with minimal schema
    if (error && error.message && error.message.includes("Could not find the")) {
      console.warn("Retrying bulk gallery insert without optional columns due to:", error.message);
      const minimalPayloads = payloads.map((p) => ({
        title: p.title,
        category: p.category,
        image_url: p.image_url,
        description: p.description,
      }));

      const resMin = await supabase
        .from("gallery_items")
        .insert(minimalPayloads)
        .select();

      if (!resMin.error && resMin.data) {
        notifyGalleryChanged();
        return resMin.data.map(normalizeGalleryItem);
      }
    }

    // Fallback to gallery table
    const res2 = await supabase
      .from("gallery")
      .upsert(payloads, { onConflict: "image_url" })
      .select();

    if (!res2.error && res2.data) {
      notifyGalleryChanged();
      return res2.data.map(normalizeGalleryItem);
    }

    if (error) throw error;
  } catch (err) {
    console.error("Critical error in saveBulkGalleryItems:", err);
    throw err;
  }

  notifyGalleryChanged();
  return payloads.map(normalizeGalleryItem);
}

export const saveBulkLocalGalleryItems = saveBulkGalleryItems;

/**
 * Deletes a gallery item directly from Supabase
 */
export async function deleteGalleryItem(id: string): Promise<boolean> {
  try {
    // Delete from gallery_items
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) {
      await supabase.from("gallery").delete().eq("id", id);
    }
  } catch (err) {
    console.error("Error deleting gallery item from Supabase:", err);
  }

  notifyGalleryChanged();
  return true;
}

export const deleteLocalGalleryItem = deleteGalleryItem;

/**
 * Toggles featured state for a gallery item in Supabase
 */
export async function toggleGalleryItemFeatured(id: string): Promise<GalleryItem | null> {
  try {
    const all = await fetchGallery();
    const item = all.find((g) => g.id === id);
    if (!item) return null;

    const nextVal = !item.is_featured;

    await supabase
      .from("gallery_items")
      .update({ is_featured: nextVal })
      .eq("id", id);

    await supabase
      .from("gallery")
      .update({ is_featured: nextVal })
      .eq("id", id);

    notifyGalleryChanged();
    return { ...item, is_featured: nextVal };
  } catch (err) {
    console.error("Error toggling gallery item featured in Supabase:", err);
    return null;
  }
}

export const toggleLocalGalleryFeatured = toggleGalleryItemFeatured;

/**
 * Resets gallery back to standard pristine 60-image dataset in Supabase
 */
export async function resetToDefaultGallery(): Promise<GalleryItem[]> {
  try {
    await supabase.from("gallery_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("gallery").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  } catch (err) {
    console.warn("Notice resetting gallery:", err);
  }

  const seeded = await seedGalleryToSupabase();
  notifyGalleryChanged();
  return seeded;
}

function notifyGalleryChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("emsurg-gallery-changed"));
    window.dispatchEvent(new CustomEvent("emsurg_gallery_updated"));
  }
}

/**
 * Real-time Supabase subscription for Gallery
 */
export function subscribeToGallery(callback: (items: GalleryItem[]) => void): () => void {
  const channel = supabase
    .channel("public:gallery-sync-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "gallery_items" },
      async () => {
        const refreshed = await fetchGallery();
        callback(refreshed);
      }
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "gallery" },
      async () => {
        const refreshed = await fetchGallery();
        callback(refreshed);
      }
    )
    .subscribe();

  const handleCustomEvent = async () => {
    const refreshed = await fetchGallery();
    callback(refreshed);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("emsurg-gallery-changed", handleCustomEvent);
    window.addEventListener("emsurg_gallery_updated", handleCustomEvent);
  }

  return () => {
    supabase.removeChannel(channel);
    if (typeof window !== "undefined") {
      window.removeEventListener("emsurg-gallery-changed", handleCustomEvent);
      window.removeEventListener("emsurg_gallery_updated", handleCustomEvent);
    }
  };
}
