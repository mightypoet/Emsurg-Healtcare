import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowRight, CheckCircle2, SlidersHorizontal, Download } from "lucide-react";
import { Product, fetchProducts, getLocalProducts } from "../lib/productsStore";
import ProductInquiryModal from "../components/products/ProductInquiryModal";

const CATEGORIES = [
  "All",
  "Orthobiologics",
  "Wound Management",
  "Nephro Care",
  "Biopsy Devices",
  "Bone Cements",
  "Sports Medicine"
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState<Product[]>(() => getLocalProducts());
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Inquiry Modal State
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchProducts();
        if (isMounted && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.info("Using local product catalog fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category.toLowerCase() === activeCategory.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.short_description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.features?.some(f => f.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const openInquiry = (product: Product) => {
    setInquiryProduct(product);
    setIsInquiryOpen(true);
  };

  const handleInquirySuccess = () => {
    setToastMessage("Your inquiry has been submitted. Our clinical representative will reach out shortly.");
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[130] bg-emerald-700 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Catalog Hero Section */}
      <div className="pt-36 pb-20 bg-[#0B1120] text-white relative overflow-hidden border-b border-slate-800">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/15532408-sd_426_240_30fps.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Overlay for High Contrast */}
        <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            Emsurg Products Catalog
          </h1>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by clinical name, formulation, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Product Count Indicator */}
            <div className="text-xs font-semibold text-slate-500 flex items-center gap-2 self-end md:self-center">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              Showing <strong>{filteredProducts.length}</strong> of {products.length} Products
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0">
              Filter By:
            </span>
            {CATEGORIES.map((cat) => {
              const active = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    active
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No matching products found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any devices matching "{searchQuery}" in category "{activeCategory}". Try clearing your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const thumbnail = product.images?.[0] || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop";
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Aspect-Ratio Thumbnail Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block text-[11px] font-bold tracking-wider text-blue-700 uppercase bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-slate-200/60">
                        {product.category}
                      </span>
                    </div>
                    {product.is_featured && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-block text-[10px] font-bold text-amber-800 uppercase bg-amber-50/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-amber-200">
                          Flagship
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                    <div>
                      <Link to={`/products/${product.slug}`} className="group-hover:text-blue-600 transition-colors">
                        <h2 className="text-xl font-extrabold text-slate-900 leading-snug tracking-tight mb-2">
                          {product.title}
                        </h2>
                      </Link>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {product.short_description}
                      </p>

                      {/* Key Technical Spec Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> CDSCO Approved
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" /> Sterile Single-Use
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          ISO 13485
                        </span>
                      </div>
                    </div>

                    {/* Features Preview List */}
                    {product.features && product.features.length > 0 && (
                      <div className="border-t border-slate-100 pt-4 mb-6">
                        <ul className="space-y-1.5">
                          {product.features.slice(0, 2).map((feat, i) => (
                            <li key={i} className="text-xs text-slate-600 flex items-start line-clamp-1">
                              <span className="text-blue-500 font-bold mr-2">•</span>
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Dock */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                      <Link
                        to={`/products/${product.slug}`}
                        className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openInquiry(product)}
                        className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center transition-colors shadow-sm shadow-blue-500/20"
                      >
                        Inquire Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <ProductInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={inquiryProduct}
        onSuccess={handleInquirySuccess}
      />
    </div>
  );
}
