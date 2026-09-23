import { supabase } from "./supabase";

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

const GALLERY_STORAGE_KEY = "emsurg_gallery_items_v1";

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

export function getLocalGalleryItems(): GalleryItem[] {
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_ITEMS));
      return INITIAL_GALLERY_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn("Failed to load local gallery items:", err);
  }
  return INITIAL_GALLERY_ITEMS;
}

export function saveLocalGalleryItems(items: GalleryItem[]): void {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("emsurg_gallery_updated"));
  } catch (err) {
    console.warn("Failed to save local gallery items:", err);
  }
}

export function saveLocalGalleryItem(itemData: Partial<GalleryItem>, editId?: string): GalleryItem {
  const current = getLocalGalleryItems();
  let updatedItem: GalleryItem;

  if (editId) {
    const idx = current.findIndex((g) => g.id === editId);
    if (idx !== -1) {
      updatedItem = {
        ...current[idx],
        ...itemData,
        id: editId,
      };
      current[idx] = updatedItem;
    } else {
      updatedItem = {
        id: editId,
        title: itemData.title || "Facility Highlight",
        description: itemData.description || "",
        image_url: itemData.image_url || "",
        category: itemData.category || "Cleanrooms & Facilities",
        col_span: itemData.col_span || "col-span-1",
        is_featured: itemData.is_featured ?? true,
        created_at: itemData.created_at || new Date().toISOString(),
      };
      current.unshift(updatedItem);
    }
  } else {
    updatedItem = {
      id: `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: itemData.title || "Facility Highlight",
      description: itemData.description || "",
      image_url: itemData.image_url || "",
      category: itemData.category || "Cleanrooms & Facilities",
      col_span: itemData.col_span || "col-span-1",
      is_featured: itemData.is_featured ?? true,
      created_at: new Date().toISOString(),
    };
    current.unshift(updatedItem);
  }

  saveLocalGalleryItems(current);
  return updatedItem;
}

export function saveBulkLocalGalleryItems(itemsData: Array<Partial<GalleryItem>>): GalleryItem[] {
  const current = getLocalGalleryItems();
  const created: GalleryItem[] = [];

  for (let i = 0; i < itemsData.length; i++) {
    const data = itemsData[i];
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title || `Facility Highlight ${current.length + i + 1}`,
      description: data.description || "High-precision biomedical manufacturing and clinical operations at Emsurg.",
      image_url: data.image_url || "",
      category: data.category || "Cleanrooms & Facilities",
      col_span: data.col_span || (i % 3 === 0 ? "md:col-span-2" : "col-span-1"),
      is_featured: data.is_featured ?? true,
      created_at: new Date().toISOString(),
    };
    created.push(newItem);
  }

  current.unshift(...created);
  saveLocalGalleryItems(current);
  return created;
}

export function deleteLocalGalleryItem(id: string): boolean {
  const current = getLocalGalleryItems();
  const filtered = current.filter((g) => g.id !== id);
  saveLocalGalleryItems(filtered);
  return true;
}

export function toggleLocalGalleryFeatured(id: string): GalleryItem | null {
  const current = getLocalGalleryItems();
  const item = current.find((g) => g.id === id);
  if (!item) return null;
  item.is_featured = !item.is_featured;
  saveLocalGalleryItems(current);
  return item;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const promise = Promise.resolve(
      supabase.from("gallery").select("*").order("created_at", { ascending: false })
    );

    const { data, error } = (await Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000)),
    ])) as any;

    if (!error && Array.isArray(data) && data.length > 0) {
      // Merge with local items (local items take priority if added recently)
      const local = getLocalGalleryItems();
      const localOnly = local.filter((l) => l.id.startsWith("gal-"));
      
      const remoteFormatted: GalleryItem[] = data.map((d: any) => ({
        id: String(d.id),
        title: d.title || "Facility Showcase",
        description: d.description || "",
        image_url: d.image_url,
        category: d.category || "Cleanrooms & Facilities",
        col_span: d.col_span || "col-span-1",
        is_featured: d.is_featured ?? true,
        created_at: d.created_at || new Date().toISOString(),
      }));

      const mergedMap = new Map<string, GalleryItem>();
      remoteFormatted.forEach((item) => mergedMap.set(item.id, item));
      localOnly.forEach((item) => mergedMap.set(item.id, item));
      
      const combined = Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      saveLocalGalleryItems(combined);
      return combined;
    }
  } catch (err) {
    console.info("Supabase gallery load graceful fallback to local storage:", err);
  }

  return getLocalGalleryItems();
}

export async function saveGalleryItem(itemData: Partial<GalleryItem>, editId?: string): Promise<GalleryItem> {
  const localItem = saveLocalGalleryItem(itemData, editId);
  try {
    const payload = {
      title: localItem.title,
      description: localItem.description,
      image_url: localItem.image_url,
      category: localItem.category,
      col_span: localItem.col_span,
      is_featured: localItem.is_featured,
    };

    if (editId && !editId.startsWith("gal-")) {
      const promise = Promise.resolve(supabase.from("gallery").update(payload).eq("id", editId));
      await Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000)),
      ]);
    } else {
      const promise = Promise.resolve(supabase.from("gallery").insert([payload]));
      await Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000)),
      ]);
    }
  } catch (err) {
    console.info("Supabase gallery sync bypassed:", err);
  }
  return localItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  deleteLocalGalleryItem(id);
  try {
    if (!id.startsWith("gal-")) {
      const promise = Promise.resolve(supabase.from("gallery").delete().eq("id", id));
      await Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000)),
      ]);
    }
  } catch (err) {
    console.info("Supabase gallery delete bypassed:", err);
  }
  return true;
}

export async function toggleGalleryItemFeatured(id: string): Promise<GalleryItem | null> {
  const updated = toggleLocalGalleryFeatured(id);
  if (updated && !id.startsWith("gal-")) {
    try {
      const promise = Promise.resolve(
        supabase.from("gallery").update({ is_featured: updated.is_featured }).eq("id", id)
      );
      await Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000)),
      ]);
    } catch (err) {
      console.info("Supabase toggle featured bypassed:", err);
    }
  }
  return updated;
}
