import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { fetchGallery, GalleryItem } from "../../lib/galleryStore";
import { formatDriveImageUrl } from "../../lib/utils";
import { LayoutGrid, Card } from "../ui/layout-grid";
import { ArrowRight, Building2, Sparkles, ShieldCheck, ExternalLink, RefreshCw } from "lucide-react";

export default function FeaturedGallerySection() {
  const [featuredImages, setFeaturedImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeaturedGallery = async () => {
    try {
      setIsLoading(true);

      // Query Supabase specifically for featured items
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("is_featured", true)
        .order("order_index", { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        setFeaturedImages(data);
        return;
      }

      // Fallback query checking for 'featured' column name or full store
      const all = await fetchGallery();
      const featured = all.filter((item) => item.is_featured);
      setFeaturedImages(featured.length > 0 ? featured : all);
    } catch (error) {
      console.error("Error fetching featured gallery:", error);
      const all = await fetchGallery();
      const featured = all.filter((item) => item.is_featured);
      setFeaturedImages(featured.length > 0 ? featured : all);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Fetch on initial load
    fetchFeaturedGallery();

    // 2. Listen for Admin Panel live-sync events
    const handleUpdate = () => {
      fetchFeaturedGallery();
    };

    window.addEventListener("emsurg-gallery-changed", handleUpdate);
    window.addEventListener("emsurg_gallery_updated", handleUpdate);

    // 3. Supabase Realtime channel subscription
    const channel = supabase
      .channel("public:home-featured-gallery")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gallery_items" },
        () => {
          fetchFeaturedGallery();
        }
      )
      .subscribe();

    // 4. Cleanup on unmount
    return () => {
      window.removeEventListener("emsurg-gallery-changed", handleUpdate);
      window.removeEventListener("emsurg_gallery_updated", handleUpdate);
      supabase.removeChannel(channel);
    };
  }, []);

  if (!isLoading && featuredImages.length === 0) return null;

  // Convert to Aceternity LayoutGrid Cards
  const cards: Card[] = featuredImages.map((item, idx) => {
    const total = featuredImages.length;
    let spanClass = "col-span-1";

    if (total === 1) {
      spanClass = "md:col-span-3";
    } else if (total === 4) {
      spanClass = idx === 0 || idx === 3 ? "md:col-span-2" : "col-span-1";
    } else {
      spanClass = "col-span-1";
    }

    return {
      id: item.id || `facility-${idx}`,
      className: spanClass,
      thumbnail: formatDriveImageUrl(item.image_url),
      content: null,
    };
  });

  return (
    <section className="py-20 md:py-28 bg-slate-50/60 border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Clinical Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 mb-3 shadow-xs">
              <Building2 className="w-3.5 h-3.5" /> Clinical Infrastructure & Operations
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
              State-of-the-Art <span className="font-semibold text-blue-600">Facilities</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl font-normal leading-relaxed">
              Photographic documentation of our ISO Class 7 cleanrooms, biomaterials R&D laboratories, and high-purity medical manufacturing lines.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50/80 border border-slate-200 hover:border-blue-200 px-5 py-2.5 rounded-full transition-all shadow-xs group self-start md:self-auto"
          >
            <span>Explore Complete Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Aceternity UI LayoutGrid */}
        <div className="w-full min-h-[300px]">
          {isLoading && featuredImages.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <LayoutGrid cards={cards} />
          )}
        </div>
      </div>
    </section>
  );
}
