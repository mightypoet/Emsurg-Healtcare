import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LayoutGrid, Card } from "../components/ui/layout-grid";
import { getGalleryItems, GalleryItem } from "../lib/galleryStore";
import { formatDriveImageUrl } from "../lib/utils";
import { Sparkles, Layers, RefreshCw } from "lucide-react";

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  const loadGallery = async () => {
    try {
      const data = await getGalleryItems();
      setItems(data);
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
    const handleUpdate = () => loadGallery();
    window.addEventListener("emsurg_gallery_updated", handleUpdate);
    return () => window.removeEventListener("emsurg_gallery_updated", handleUpdate);
  }, []);

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category || "General")))];

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter((i) => i.category === selectedCategory);

  const cards: Card[] = filteredItems.map((item, idx) => ({
    id: item.id || idx,
    className: item.col_span || (idx % 3 === 0 ? "md:col-span-2" : "col-span-1"),
    thumbnail: formatDriveImageUrl(item.image_url),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
            {item.category || "Facility"}
          </span>
          {item.is_featured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Featured
            </span>
          )}
        </div>
        <p className="font-bold md:text-3xl text-xl text-white">
          {item.title}
        </p>
        <p className="font-normal text-sm md:text-base my-3 max-w-xl text-neutral-200 leading-relaxed">
          {item.description}
        </p>
      </div>
    ),
  }));

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <div className="pt-36 pb-16 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-blue-300 bg-blue-950/60 border border-blue-800/60 mb-4">
            <Layers className="w-3.5 h-3.5 text-blue-400" /> Clinical Infrastructure & Operations
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Facilities & Operations</h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            A glimpse into the cleanrooms, biomaterials R&D suites, and advanced manufacturing lines driving Emsurg's clinical innovation.
          </p>

          {/* Category Tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 w-full flex-grow">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No images in this category</h3>
            <p className="text-sm text-slate-500">Select another filter or check back soon.</p>
          </div>
        ) : (
          <div className="min-h-[600px] py-4 w-full">
            <LayoutGrid cards={cards} />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
