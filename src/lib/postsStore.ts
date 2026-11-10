import { supabase } from "./supabase";
import { formatDriveImageUrl } from "./utils";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  published: boolean;
  featured: boolean;
  created_at: string;
}

export const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "Advancements in Nanocrystalline Hydroxyapatite (BoneSurg HA) for Orthopaedic Surgery",
    slug: "advancements-in-nanocrystalline-hydroxyapatite-bonesurg-ha",
    excerpt: "Exploring the latest clinical outcomes and surgical techniques utilizing next-generation synthetic bone grafts.",
    content: `## The Evolution of Synthetic Bone Grafts

For decades, autografts have been considered the gold standard in orthopaedic and maxillofacial bone grafting due to their osteoconductive, osteoinductive, and osteogenic properties. However, donor site morbidity, limited availability, and prolonged surgical times have driven the search for effective alternatives.

### Enter Nanocrystalline Hydroxyapatite (HA)

BoneSurg HA represents a significant leap forward in synthetic grafting. By mimicking the exact mineral composition and nanostructure of natural human bone, it provides an optimal scaffold for new bone ingrowth.

- **High Porosity:** Ensures excellent vascularization and cellular penetration.
- **Biocompatibility:** Elicits minimal immune response.
- **Resorption Profile:** Gradually resorbs as it is replaced by natural host bone.

### Clinical Outcomes

Recent multi-center studies indicate that when used in spinal fusion and trauma cases, BoneSurg HA demonstrates fusion rates comparable to autografts, without the associated donor site complications. The handling characteristics—allowing it to be mixed with blood or bone marrow aspirate—make it highly versatile in the operating theater.

As we continue to advance our manufacturing techniques in India, making these high-grade synthetic materials more accessible will be crucial for improving patient outcomes globally.`,
    cover_image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop",
    category: "Orthobiologics",
    author: "Emsurg Medical Team",
    published: true,
    featured: true,
    created_at: new Date(Date.now() - 100000000).toISOString(),
  },
  {
    id: "2",
    title: "The Role of Negative Pressure Wound Therapy (NPWT) in Managing Complex Surgical Wounds",
    slug: "role-of-npwt-in-managing-complex-surgical-wounds",
    excerpt: "A comprehensive review of NPWT protocols, efficacy, and patient recovery metrics in postoperative care.",
    content: `## Transforming Wound Care

Complex surgical wounds present a significant challenge in postoperative patient care. Negative Pressure Wound Therapy (NPWT) has emerged as a critical modality in accelerating healing.

Our research into optimized pressure settings and advanced dressing materials highlights how maintaining a controlled negative pressure environment promotes angiogenesis, reduces edema, and stimulates granulation tissue formation.

### Clinical Indications
- Diabetic foot ulcers and pressure sores
- Dehisced surgical incisions
- High-risk orthopedic and abdominal wounds

By pairing specialized foam dressings with calibrated suction mechanics, NPWT creates micro-deformations on the wound surface that visibly accelerate tissue regeneration.`,
    cover_image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
    category: "Wound Care",
    author: "Emsurg Medical Team",
    published: true,
    featured: false,
    created_at: new Date(Date.now() - 200000000).toISOString(),
  },
  {
    id: "3",
    title: "Indigenous Manufacturing of Hemodialysis Fluids: Strengthening India's Nephro Infrastructure",
    slug: "indigenous-manufacturing-of-hemodialysis-fluids",
    excerpt: "How domestic production of critical dialysis components is transforming accessibility and cost-efficiency in renal care.",
    content: `## Building a Self-Reliant Healthcare Ecosystem

The rising prevalence of chronic kidney disease (CKD) in India necessitates a robust and accessible dialysis infrastructure. Historically, the reliance on imported hemodialysis fluids and consumables has driven up costs for patients.

At Emsurg, our focus on indigenous manufacturing of high-purity hemodialysis fluids is changing this paradigm. By producing locally under stringent WHO-GMP guidelines, we ensure unbroken supply chains and significant cost reductions for partner hospitals and clinics across the subcontinent.

### Quality Assurance & Purity
Our Kolkata facility incorporates multi-stage reverse osmosis filtration and continuous automated conductivity monitoring to guarantee endotoxin-free solutions that meet pharmacopeial standards.`,
    cover_image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2070&auto=format&fit=crop",
    category: "Indigenous Manufacturing",
    author: "Emsurg Medical Team",
    published: true,
    featured: true,
    created_at: new Date(Date.now() - 300000000).toISOString(),
  }
];

export const FALLBACK_ARTICLE_IMAGE = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800';

const LOCAL_STORAGE_KEY = "emsurg_articles_posts";

export function normalizePostImage(post: Post): Post {
  const rawImg = post.cover_image ? formatDriveImageUrl(post.cover_image.trim()) : "";
  return {
    ...post,
    cover_image: rawImg || FALLBACK_ARTICLE_IMAGE,
  };
}

export function getLocalPosts(): Post[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS.map(normalizePostImage);
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(normalizePostImage);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
    return INITIAL_POSTS.map(normalizePostImage);
  } catch (err) {
    console.warn("Could not read posts from localStorage:", err);
    return INITIAL_POSTS.map(normalizePostImage);
  }
}

export function saveLocalPost(postData: Partial<Post>, existingId?: string): Post {
  const current = getLocalPosts();
  let updatedPost: Post;

  const rawCover = postData.cover_image?.trim()
    ? formatDriveImageUrl(postData.cover_image.trim())
    : "";
  const sanitizedData = {
    ...postData,
    cover_image: rawCover || FALLBACK_ARTICLE_IMAGE,
  };

  if (existingId) {
    const index = current.findIndex(p => p.id === existingId);
    if (index !== -1) {
      updatedPost = {
        ...current[index],
        ...sanitizedData,
        cover_image: rawCover || current[index].cover_image || FALLBACK_ARTICLE_IMAGE,
        id: existingId,
      } as Post;
      current[index] = updatedPost;
    } else {
      updatedPost = {
        id: existingId,
        created_at: new Date().toISOString(),
        author: "Emsurg Medical Team",
        published: true,
        featured: false,
        ...sanitizedData,
      } as Post;
      current.unshift(updatedPost);
    }
  } else {
    updatedPost = {
      id: "post-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      author: "Emsurg Medical Team",
      published: true,
      featured: false,
      ...sanitizedData,
    } as Post;
    current.unshift(updatedPost);
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event("emsurg_posts_updated"));
  } catch (err) {
    console.warn("Could not save to localStorage:", err);
  }

  return updatedPost;
}

export function deleteLocalPost(id: string): void {
  const current = getLocalPosts();
  const filtered = current.filter(p => p.id !== id);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("emsurg_posts_updated"));
  } catch (err) {
    console.warn("Could not delete from localStorage:", err);
  }
}

export async function deleteArticle(id: string): Promise<boolean> {
  deleteLocalPost(id);
  try {
    if (!id.startsWith("post-")) {
      await withTimeout(Promise.resolve(supabase.from("posts").delete().eq("id", id)), 3000);
    }
    return true;
  } catch (err) {
    console.warn("Could not delete from Supabase, local deleted:", err);
    return true;
  }
}

export function toggleLocalFeatured(id: string): Post | null {
  const current = getLocalPosts();
  const post = current.find(p => p.id === id);
  if (!post) return null;
  post.featured = !post.featured;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event("emsurg_posts_updated"));
  } catch (err) {
    console.warn("Could not toggle featured in localStorage:", err);
  }
  return post;
}

export function getLocalPostBySlug(slug: string): Post | undefined {
  const current = getLocalPosts();
  return current.find(p => p.slug === slug);
}

// Timeout wrapper for Supabase requests to prevent freezing
export async function withTimeout<T = any>(promise: PromiseLike<T> | Promise<T>, timeoutMs = 3500): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    ),
  ]);
}

export async function fetchPublishedPosts(): Promise<Post[]> {
  const local = getLocalPosts().filter(p => p.published);
  try {
    const res = (await withTimeout(
      Promise.resolve(
        supabase
          .from("posts")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false })
      ),
      3500
    )) as any;

    if (res?.error) {
      // Gracefully handle missing table (PGRST205) or permissions
      console.info("Using local fallback posts:", res.error.message || res.error.code);
      return local;
    }

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      const map = new Map<string, Post>();
      local.forEach(p => map.set(p.slug, normalizePostImage(p)));
      res.data.forEach((p: Post) => {
        const existingLocal = map.get(p.slug);
        const mergedCover =
          (p.cover_image && p.cover_image.trim()) ||
          (existingLocal?.cover_image && existingLocal.cover_image.trim()) ||
          FALLBACK_ARTICLE_IMAGE;
        map.set(p.slug, normalizePostImage({ ...existingLocal, ...p, cover_image: mergedCover }));
      });
      return Array.from(map.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return local;
  } catch (err: any) {
    console.info("Using local fallback posts:", err?.message || err);
    return local;
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const local = getLocalPostBySlug(slug);
  try {
    const res = (await withTimeout(
      Promise.resolve(
        supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .maybeSingle()
      ),
      3500
    )) as any;

    if (!res?.error && res?.data) {
      const remotePost = res.data as Post;
      const mergedCover =
        (remotePost.cover_image && remotePost.cover_image.trim()) ||
        (local?.cover_image && local.cover_image.trim()) ||
        FALLBACK_ARTICLE_IMAGE;
      return normalizePostImage({ ...local, ...remotePost, cover_image: mergedCover });
    }
    return local ? normalizePostImage(local) : null;
  } catch {
    return local ? normalizePostImage(local) : null;
  }
}

export async function fetchFeaturedPosts(): Promise<Post[]> {
  const local = getLocalPosts().filter(p => p.published && p.featured);
  try {
    const res = (await withTimeout(
      Promise.resolve(
        supabase
          .from("posts")
          .select("*")
          .eq("published", true)
          .eq("featured", true)
          .order("created_at", { ascending: false })
          .limit(3)
      ),
      3500
    )) as any;

    if (!res?.error && res?.data && res.data.length > 0) {
      return (res.data as Post[]).map((p) => {
        const matchingLocal = local.find((lp) => lp.slug === p.slug);
        const mergedCover =
          (p.cover_image && p.cover_image.trim()) ||
          (matchingLocal?.cover_image && matchingLocal.cover_image.trim()) ||
          FALLBACK_ARTICLE_IMAGE;
        return normalizePostImage({ ...matchingLocal, ...p, cover_image: mergedCover });
      });
    }
    return local.length > 0 ? local.slice(0, 3) : getLocalPosts().filter(p => p.published).slice(0, 3);
  } catch {
    return local.length > 0 ? local.slice(0, 3) : getLocalPosts().filter(p => p.published).slice(0, 3);
  }
}
