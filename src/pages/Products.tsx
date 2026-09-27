import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal, 
  Building, 
  Globe2, 
  ShieldCheck, 
  Award,
  Layers,
  Factory,
  Send
} from "lucide-react";
import { Product, fetchProducts, getLocalProducts } from "../lib/productsStore";
import { 
  MANUFACTURING_CATEGORIES, 
  CHANNEL_PARTNER_CATEGORIES, 
  ALL_CATEGORIES 
} from "../lib/productsData";
import ProductInquiryModal from "../components/products/ProductInquiryModal";

type DivisionFilter = "All" | "Manufacturing" | "Channel Partner";

export default function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialDivision = (searchParams.get("division") as DivisionFilter) || "All";
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState<Product[]>(() => getLocalProducts());
  const [activeDivision, setActiveDivision] = useState<DivisionFilter>(initialDivision);
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

  // Sync state with search params if updated from external links
  useEffect(() => {
    const divParam = searchParams.get("division") as DivisionFilter;
    const catParam = searchParams.get("category");
    if (divParam && (divParam === "All" || divParam === "Manufacturing" || divParam === "Channel Partner")) {
      setActiveDivision(divParam);
    }
    if (catParam) {
      setActiveCategory(catParam);
    }
  }, [searchParams]);

  // Handle Division Selection
  const handleDivisionChange = (division: DivisionFilter) => {
    setActiveDivision(division);
    setActiveCategory("All"); // Reset category on division change

    const newParams = new URLSearchParams(searchParams);
    if (division === "All") {
      newParams.delete("division");
    } else {
      newParams.set("division", division);
    }
    newParams.delete("category");
    setSearchParams(newParams);
  };

  // Handle Category Selection
  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  // Available categories based on selected division
  const availableCategories = useMemo(() => {
    if (activeDivision === "Manufacturing") {
      return MANUFACTURING_CATEGORIES;
    }
    if (activeDivision === "Channel Partner") {
      return CHANNEL_PARTNER_CATEGORIES;
    }
    return ALL_CATEGORIES;
  }, [activeDivision]);

  // Counts for division tabs
  const manufacturingCount = useMemo(
    () => products.filter((p) => p.division === "Manufacturing").length,
    [products]
  );
  const partnerCount = useMemo(
    () => products.filter((p) => p.division === "Channel Partner").length,
    [products]
  );

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Division filter
      const matchesDivision =
        activeDivision === "All" || p.division === activeDivision;

      // Category filter
      const matchesCategory =
        activeCategory === "All" ||
        p.category.toLowerCase() === activeCategory.toLowerCase();

      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.short_description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.partnerBrand && p.partnerBrand.toLowerCase().includes(query)) ||
        (p.certifications && p.certifications.toLowerCase().includes(query)) ||
        p.features?.some((f) => f.toLowerCase().includes(query));

      return matchesDivision && matchesCategory && matchesSearch;
    });
  }, [products, activeDivision, activeCategory, searchQuery]);

  const openInquiry = (product: Product) => {
    setInquiryProduct(product);
    setIsInquiryOpen(true);
  };

  const handleInquirySuccess = () => {
    setToastMessage(
      "Your inquiry has been submitted. Our clinical representative will reach out shortly."
    );
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
      <div className="pt-32 sm:pt-36 pb-16 sm:pb-20 bg-[#0B1120] text-white relative overflow-hidden border-b border-slate-800">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40"
        >
          <source src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/15532408-sd_426_240_30fps.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Overlay for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-[#0B1120] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Two-Tier Clinical Hierarchy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md max-w-4xl mx-auto leading-[1.15]">
            Emsurg Products & Clinical Solutions
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Bridging advanced indigenous cleanroom manufacturing with premier global surgical alliances for hospitals and clinicians across India.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <Factory className="w-3.5 h-3.5 text-sky-400" />
              <span><strong>{manufacturingCount}</strong> Indigenous Formulations</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
              <span><strong>{partnerCount}</strong> Global Alliances</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CDSCO Class C & WHO-GMP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* ============================================================== */}
        {/* TWO-TIER DIVISION SWITCHER TABS */}
        {/* ============================================================== */}
        <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Tab 1: All Products */}
            <button
              type="button"
              onClick={() => handleDivisionChange("All")}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeDivision === "All"
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>All Products</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                activeDivision === "All" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {products.length}
              </span>
            </button>

            {/* Tab 2: Indigenous Manufacturing */}
            <button
              type="button"
              onClick={() => handleDivisionChange("Manufacturing")}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeDivision === "Manufacturing"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-2 ring-sky-500/20"
                  : "text-slate-600 hover:text-sky-700 hover:bg-sky-50/70"
              }`}
            >
              <Building className="w-4 h-4 shrink-0" />
              <span>Indigenous Manufacturing</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                activeDivision === "Manufacturing" ? "bg-white/20 text-white" : "bg-sky-100 text-sky-800"
              }`}>
                {manufacturingCount}
              </span>
            </button>

            {/* Tab 3: Channel Partner Alliances */}
            <button
              type="button"
              onClick={() => handleDivisionChange("Channel Partner")}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeDivision === "Channel Partner"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500/20"
                  : "text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/70"
              }`}
            >
              <Globe2 className="w-4 h-4 shrink-0" />
              <span>Channel Partner Alliances</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                activeDivision === "Channel Partner" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-800"
              }`}>
                {partnerCount}
              </span>
            </button>
          </div>

          {/* Division Focus Callout Banner */}
          {activeDivision === "Manufacturing" && (
            <div className="mt-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-sky-50/70 border border-sky-200/80 text-sky-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Factory className="w-4 h-4 text-sky-600 shrink-0" />
                <span>
                  <strong>Emsurg Dedicated Facilities:</strong> Formulated & packaged in ISO 13485 cleanrooms across Kolkata (Panihati R&D and Talbanda units).
                </span>
              </div>
              <span className="font-semibold text-sky-700 bg-sky-100/80 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-auto">
                CDSCO Approved · 100% Indigenous
              </span>
            </div>
          )}

          {activeDivision === "Channel Partner" && (
            <div className="mt-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>Authorized Global Alliances:</strong> Exclusive and direct Indian healthcare distribution for Smith & Nephew, Demetra, Tecres, Teknimed & MDL Italy.
                </span>
              </div>
              <span className="font-semibold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-auto">
                CE Certified & US FDA Cleared
              </span>
            </div>
          )}
        </div>

        {/* Search & Category Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by device title, category, partner brand (e.g. Demetra, Smith & Nephew), or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
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
              Category:
            </span>
            {availableCategories.map((cat) => {
              const active = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    active
                      ? activeDivision === "Channel Partner"
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/25"
                        : "bg-sky-600 text-white shadow-sm shadow-sky-500/25"
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
              We couldn't find any devices matching "{searchQuery}" in category "{activeCategory}" under "{activeDivision}". Try resetting your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setActiveDivision("All");
              }}
              className="px-5 py-2.5 bg-sky-600 text-white font-bold rounded-xl text-sm hover:bg-sky-700 transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const thumbnail =
                product.images?.[0] ||
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80";

              const isManufacturing = product.division === "Manufacturing";

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                >
                  {/* Aspect-Ratio Thumbnail Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for Top Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Left: Division Tag */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                      {isManufacturing ? (
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-900 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs border border-sky-200/80">
                          Indigenous Manufacturing
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-900 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs border border-indigo-200/80">
                          Partner: {product.partnerBrand || "Global Alliance"}
                        </span>
                      )}
                    </div>

                    {/* Top Right: Status / Upcoming Badge */}
                    <div className="absolute top-3.5 right-3.5">
                      {product.isUpcoming ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-amber-300/80">
                          Launching Soon
                        </span>
                      ) : product.is_featured ? (
                        <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider bg-sky-50/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-sky-200/80">
                          Flagship
                        </span>
                      ) : null}
                    </div>

                    {/* Bottom Left on image: Category pill */}
                    <div className="absolute bottom-3 left-3.5">
                      <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-white uppercase bg-slate-900/85 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/20 shadow-xs">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <Link
                        to={`/products/${product.slug}`}
                        className="group-hover:text-sky-600 transition-colors block"
                      >
                        <h2 className="text-xl font-extrabold text-slate-900 leading-snug tracking-tight mb-2">
                          {product.title}
                        </h2>
                      </Link>

                      {/* Short Description */}
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {product.short_description}
                      </p>

                      {/* Certifications or Specs Pill */}
                      {product.certifications && (
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{product.certifications}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features Preview List */}
                    <div>
                      {product.features && product.features.length > 0 && (
                        <div className="border-t border-slate-100 pt-3.5 mb-5">
                          <ul className="space-y-1.5">
                            {product.features.slice(0, 2).map((feat, i) => (
                              <li
                                key={i}
                                className="text-xs text-slate-600 flex items-start line-clamp-1"
                              >
                                <span className="text-sky-500 font-bold mr-2">•</span>
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
                          className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openInquiry(product);
                          }}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-colors shadow-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Inquire</span>
                        </button>
                      </div>
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
