import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Bone, 
  Activity, 
  Droplets, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Building, 
  Globe2, 
  Sparkles,
  Award
} from "lucide-react";
import { ProductHighlightCard } from "../ui/product-card";
import { getLocalProducts, Product } from "../../lib/productsStore";

function getCategoryIcon(category: string = "", division: string = ""): React.ReactNode {
  const cat = category.toLowerCase();
  if (cat.includes("orthobiologic") || cat.includes("bone")) return <Bone className="w-4 h-4" />;
  if (cat.includes("wound") || cat.includes("npwt")) return <Activity className="w-4 h-4" />;
  if (cat.includes("nephro") || cat.includes("dialysis") || cat.includes("fluid")) return <Droplets className="w-4 h-4" />;
  if (cat.includes("sport")) return <Award className="w-4 h-4" />;
  if (cat.includes("cement") || cat.includes("spine")) return <Layers className="w-4 h-4" />;
  if (cat.includes("biopsy") || cat.includes("needle")) return <ShieldCheck className="w-4 h-4" />;
  if (division === "Manufacturing") return <Building className="w-4 h-4" />;
  return <Globe2 className="w-4 h-4" />;
}

function getAccentGlow(category: string = "", division: string = ""): string {
  const cat = category.toLowerCase();
  if (cat.includes("ortho") || cat.includes("bone")) return "rgba(56, 189, 248, 0.35)"; // sky
  if (cat.includes("wound")) return "rgba(168, 85, 247, 0.35)"; // purple
  if (cat.includes("nephro") || cat.includes("dialysis")) return "rgba(14, 165, 233, 0.35)"; // cyan
  if (cat.includes("sport")) return "rgba(59, 130, 246, 0.35)"; // blue
  if (cat.includes("cement")) return "rgba(16, 185, 129, 0.35)"; // emerald
  if (cat.includes("spine")) return "rgba(139, 92, 246, 0.35)"; // violet
  if (division === "Manufacturing") return "rgba(14, 165, 233, 0.35)";
  return "rgba(99, 102, 241, 0.35)";
}

function getBadge(product: Product): string {
  if (product.partnerBrand) {
    if (product.partnerBrand === "Smith & Nephew") return "Smith & Nephew";
    if (product.partnerBrand === "Demetra") return "Demetra (Italy)";
    if (product.partnerBrand === "Teknimed") return "Teknimed (France)";
    if (product.partnerBrand === "MDL") return "MDL (Italy)";
    return product.partnerBrand;
  }
  if (product.certifications) {
    if (product.certifications.includes("WHO-GMP")) return "WHO-GMP Certified";
    if (product.certifications.includes("ISO 13485")) return "ISO 13485 Certified";
    if (product.certifications.includes("Cleanroom")) return "Cleanroom Made";
    if (product.certifications.includes("Clinical")) return "Clinical Grade";
    return product.certifications.split("·")[0].trim();
  }
  if (product.division === "Manufacturing") return "Indigenous R&D";
  return "Authorized Partner";
}

export default function SwissProductShowcase() {
  const [selectedTier, setSelectedTier] = useState<"All" | "Manufacturing" | "Channel Partner">("All");
  const [allProducts, setAllProducts] = useState<Product[]>(() => getLocalProducts());

  useEffect(() => {
    const update = () => {
      setAllProducts(getLocalProducts());
    };

    window.addEventListener("products-updated", update);
    window.addEventListener("storage", update);
    update();

    return () => {
      window.removeEventListener("products-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  // Filter for products marked as featured and sorted by orderIndex
  const featuredOnly = allProducts
    .filter((p) => p.featured === true || p.is_featured === true)
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  // Fallback: If no products are explicitly featured, take the top 6 products sorted by orderIndex
  const activeProducts = featuredOnly.length > 0
    ? featuredOnly
    : [...allProducts].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)).slice(0, 6);

  const displayedProducts = selectedTier === "All"
    ? activeProducts
    : activeProducts.filter((p) => p.division === selectedTier);

  const countAll = activeProducts.length;
  const countManufacturing = activeProducts.filter((p) => p.division === "Manufacturing").length;
  const countChannelPartner = activeProducts.filter((p) => p.division === "Channel Partner").length;

  return (
    <section
      id="our-products"
      className="relative bg-white py-20 sm:py-28 text-slate-900 overflow-hidden select-none border-t border-b border-slate-100"
    >
      {/* Subtle ambient light accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.06)_0%,rgba(255,255,255,0)_75%)] blur-[100px]" />
        <div className="absolute -bottom-24 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Two-Tier Clinical Hierarchy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 leading-[1.15]">
              Precision-Engineered{" "}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                Surgical Technologies
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              A balanced clinical portfolio: indigenously manufactured orthobiologics, dialysis formulations, and digital wound care paired with authorized distribution for global medical leaders.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-md shadow-sky-500/25 active:scale-95 group"
            >
              <span>Explore Complete Catalog</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Tier Switcher Controls */}
        <div className="flex items-center justify-start sm:justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-100 border border-slate-200/80 shadow-xs">
            <button
              type="button"
              onClick={() => setSelectedTier("All")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all ${
                selectedTier === "All"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Pillars ({countAll} Flagships)
            </button>
            <button
              type="button"
              onClick={() => setSelectedTier("Manufacturing")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTier === "Manufacturing"
                  ? "bg-sky-600 text-white shadow-sm shadow-sky-600/20"
                  : "text-slate-600 hover:text-sky-700"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Indigenous Manufacturing ({countManufacturing})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedTier("Channel Partner")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTier === "Channel Partner"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20"
                  : "text-slate-600 hover:text-indigo-700"
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Channel Partner Alliances ({countChannelPartner})</span>
            </button>
          </div>
        </div>

        {/* 3D Tilt Cards Grid in Light Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 items-stretch">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => {
              const thumb = product.images?.[0] || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop";
              return (
                <ProductHighlightCard
                  key={product.id}
                  variant="light"
                  categoryIcon={getCategoryIcon(product.category, product.division)}
                  category={product.category}
                  badge={getBadge(product)}
                  title={product.title}
                  description={product.short_description}
                  imageSrc={thumb}
                  imageAlt={product.title}
                  slug={product.slug}
                  accentGlow={getAccentGlow(product.category, product.division)}
                />
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">No featured products in this division yet.</p>
              <p className="text-xs text-slate-400 mt-1">
                Use the Admin Dashboard &gt; Medical Products Catalog to toggle "★ Featured on Home" on products.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Hospital Procurement Strip */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-sky-50/50 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 items-center justify-center text-sky-600 shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                Hospital Procurement & Institutional Tenders
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Technical dossiers, CDSCO Form MD-9 / Class C certifications, and evaluation samples available upon clinical verification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/products?division=Manufacturing"
              className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-sky-600/20 active:scale-95"
            >
              Indigenous Line
            </Link>
            <Link
              to="/products?division=Channel%20Partner"
              className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-full bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 hover:text-indigo-800 text-xs font-bold tracking-wide uppercase transition-all shadow-xs active:scale-95"
            >
              Partner Alliances
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
