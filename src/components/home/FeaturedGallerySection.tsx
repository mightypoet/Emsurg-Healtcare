import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGalleryItems, GalleryItem } from "../../lib/galleryStore";
import { formatDriveImageUrl } from "../../lib/utils";
import { LayoutGrid, Card } from "../ui/layout-grid";
import { ArrowRight, Building2, Sparkles, ShieldCheck, ExternalLink, Eye } from "lucide-react";

export default function FeaturedGallerySection() {
  const [featuredItems, setFeaturedItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      const all = await getGalleryItems();
      const featured = all.filter((item) => item.is_featured);
      // Select up to 6 featured items for a clean 3-column bento grid
      setFeaturedItems(featured.length > 0 ? featured.slice(0, 6) : all.slice(0, 6));
    } catch (err) {
      console.error("Failed to load featured gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    const handleUpdate = () => loadItems();
    window.addEventListener("emsurg_gallery_updated", handleUpdate);
    return () => window.removeEventListener("emsurg_gallery_updated", handleUpdate);
  }, []);

  if (!loading && featuredItems.length === 0) return null;

  // Convert to Aceternity LayoutGrid Cards
  const cards: Card[] = featuredItems.map((item, idx) => {
    const spanClass =
      item.col_span === "md:col-span-2"
        ? "md:col-span-2"
        : idx === 0 || idx === 3
        ? "md:col-span-2"
        : "col-span-1";

    return {
      id: item.id || `facility-${idx}`,
      className: spanClass,
      thumbnail: formatDriveImageUrl(item.image_url),
      title: item.title,
      category: item.category,
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/40 backdrop-blur-md">
              {item.category || "Clinical Facility"}
            </span>
            {item.is_featured && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Featured Facility
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-slate-200 border border-white/20 backdrop-blur-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> ISO 13485 Validated
            </span>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-slate-200 font-normal leading-relaxed mt-2 max-w-2xl">
              {item.description ||
                "State-of-the-art medical production and cleanroom operations adhering to CDSCO and WHO-GMP standards."}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-900/30"
            >
              <span>Explore In Full Gallery</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <span className="text-xs text-slate-300 font-medium">
              Emsurg Biomedical Operations • Kolkata, India
            </span>
          </div>
        </div>
      ),
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
        <div className="w-full">
          <LayoutGrid cards={cards} />
        </div>

        {/* Clinical Note Footer */}
        <div className="flex items-center justify-center gap-2 mt-8 text-xs text-slate-400 font-medium">
          <Eye className="w-3.5 h-3.5 text-blue-500" />
          <span>Click any facility card to expand clinical specifications and high-resolution imaging.</span>
        </div>
      </div>
    </section>
  );
}
