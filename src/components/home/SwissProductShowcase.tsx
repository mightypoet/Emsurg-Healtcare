import React from "react";
import { Link } from "react-router-dom";
import { Bone, Activity, Droplets, Layers, ArrowUpRight, ShieldCheck } from "lucide-react";
import { ProductHighlightCard } from "../ui/product-card";

interface ShowcaseProductItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  slug: string;
  categoryIcon: React.ReactNode;
  accentGlow: string;
  badge: string;
}

export default function SwissProductShowcase() {
  const showcaseProducts: ShowcaseProductItem[] = [
    {
      id: "orthobiologics",
      category: "Orthobiologics",
      title: "BoneSurg CR & HA",
      description:
        "100% synthetic bio-absorbable calcium sulphate hemihydrate matrix and nanocrystalline hydroxyapatite bone graft substitutes.",
      imageSrc:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
      imageAlt: "BoneSurg Orthobiologics synthetic bone graft substitute",
      slug: "bonesurg-cr",
      categoryIcon: <Bone className="w-4 h-4" />,
      accentGlow: "rgba(56, 189, 248, 0.35)",
      badge: "CDSCO Class C",
    },
    {
      id: "wound-care",
      category: "Wound Care",
      title: "EM-VAC Digital NPWT",
      description:
        "Microprocessor-regulated negative pressure wound therapy unit with dual pressure monitoring and sterile reticulated foam dressing kits.",
      imageSrc:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
      imageAlt: "EM-VAC Digital Negative Pressure Wound Therapy System",
      slug: "em-vac-npwt",
      categoryIcon: <Activity className="w-4 h-4" />,
      accentGlow: "rgba(168, 85, 247, 0.35)",
      badge: "Smart NPWT",
    },
    {
      id: "nephro-care",
      category: "Nephro Care",
      title: "Hemodialysis Fluids",
      description:
        "Ultra-pure pharmacopeial liquid acid concentrates and dry sodium bicarbonate cartridges produced with automated multi-stage RO filtration.",
      imageSrc:
        "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Hemodialysis acid concentrates and dry bicarbonate cartridges",
      slug: "hemodialysis-fluids-dry-powders",
      categoryIcon: <Droplets className="w-4 h-4" />,
      accentGlow: "rgba(14, 165, 233, 0.35)",
      badge: "WHO-GMP Certified",
    },
    {
      id: "bone-cements",
      category: "Bone Cements",
      title: "Teknimed OPACITY+",
      description:
        "High-radiopacity vertebroplasty PMMA cements, pre-mixed antibiotic cements, and MDL precision soft-tissue & bone marrow biopsy needles.",
      imageSrc:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Teknimed OPACITY+ PMMA Bone Cements and MDL Biopsy Devices",
      slug: "teknimed-opacity-plus-bone-cement",
      categoryIcon: <Layers className="w-4 h-4" />,
      accentGlow: "rgba(16, 185, 129, 0.35)",
      badge: "CE Certified",
    },
  ];

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Flagship Clinical Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 leading-[1.15]">
              Precision-Engineered{" "}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                Surgical Technologies
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Explore our core medical specializations spanning bio-absorbable orthobiologics, digital NPWT wound systems, WHO-GMP dialysis consumables, and European PMMA bone cements.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-md shadow-sky-500/25 active:scale-95 group"
            >
              <span>View All Products</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* 3D Liquid Glass Tilt Cards Grid in Light Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6 items-stretch">
          {showcaseProducts.map((product) => (
            <ProductHighlightCard
              key={product.id}
              variant="light"
              categoryIcon={product.categoryIcon}
              category={product.category}
              badge={product.badge}
              title={product.title}
              description={product.description}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              slug={product.slug}
              accentGlow={product.accentGlow}
            />
          ))}
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
                Full technical documentation, CDSCO/CE certifications, and sample evaluation kits available upon verified clinical request.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/contact"
              className="flex-1 sm:flex-none text-center px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-sky-500/25 active:scale-95"
            >
              Request Specs
            </Link>
            <Link
              to="/products"
              className="flex-1 sm:flex-none text-center px-6 py-2.5 rounded-full bg-white hover:bg-sky-50 border border-sky-200 text-slate-700 hover:text-sky-700 text-xs font-bold tracking-wide uppercase transition-all shadow-xs active:scale-95"
            >
              All Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
