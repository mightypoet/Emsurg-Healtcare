import React from "react";
import { Link } from "react-router-dom";
import {
  OrthobiologicsPackshot,
  WoundManagementPackshot,
  NephroCarePackshot,
  BoneCementsBiopsyPackshot,
} from "./SwissProductPackshots";

interface ShowcaseItem {
  id: string;
  category: string;
  subheading?: string;
  packshot: React.ReactNode;
  link: string;
  ariaLabel: string;
}

export default function SwissProductShowcase() {
  const quadrants: ShowcaseItem[] = [
    {
      id: "orthobiologics",
      category: "ORTHOBIOLOGICS",
      subheading: "BoneSurg HA / BoneSurg CR Synthetic Substitutes",
      packshot: <OrthobiologicsPackshot />,
      link: "/products?category=Orthobiologics",
      ariaLabel: "Discover Orthobiologics bone graft substitutes",
    },
    {
      id: "wound-management",
      category: "WOUND MANAGEMENT",
      subheading: "EM-VAC Digital NPWT System & Sterile Dressing Kits",
      packshot: <WoundManagementPackshot />,
      link: "/products?category=Wound%20Management",
      ariaLabel: "Discover EM-VAC negative pressure wound management",
    },
    {
      id: "nephro-care",
      category: "NEPHRO CARE",
      subheading: "Hemodialysis Acid Concentrates & Dry Bicarbonate Canisters",
      packshot: <NephroCarePackshot />,
      link: "/products?category=Nephro%20Care",
      ariaLabel: "Discover Nephro Care hemodialysis solutions",
    },
    {
      id: "bone-cements-biopsy",
      category: "BONE CEMENTS & BIOPSY",
      subheading: "Teknimed OPACITY+ PMMA Cements & MDL Precision Needles",
      packshot: <BoneCementsBiopsyPackshot />,
      link: "/products?category=Bone%20Cements",
      ariaLabel: "Discover Teknimed bone cements and MDL precision biopsy devices",
    },
  ];

  return (
    <section id="our-products" className="bg-white py-20 md:py-28 select-none">
      <div className="max-w-6xl mx-auto px-4">
        {/* Minimal Swiss Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight">
            Our products
          </h2>
        </div>

        {/* 2x2 Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {quadrants.map((quadrant) => (
            <div
              key={quadrant.id}
              className="group flex flex-col items-center justify-between text-center transition-all duration-300"
            >
              {/* Category Title in Lightweight Crisp Uppercase */}
              <h3 className="text-xs md:text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase text-center mb-6">
                {quadrant.category}
              </h3>

              {/* High-Resolution Isolated Product Packshot */}
              <Link
                to={quadrant.link}
                aria-label={quadrant.ariaLabel}
                className="w-full flex items-center justify-center my-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-2xl"
              >
                {quadrant.packshot}
              </Link>

              {/* Minimalist Swiss Pill Button */}
              <div className="mt-6">
                <Link
                  to={quadrant.link}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-2 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200 group/btn shadow-2xs"
                >
                  <span>Discover</span>
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white group-hover/btn:bg-white group-hover/btn:text-slate-900 flex items-center justify-center text-[10px] transition-colors">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
