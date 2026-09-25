import Hero from "../components/home/Hero";
import TrustStrip from "../components/home/TrustStrip";
import MetricsStrip from "../components/home/MetricsStrip";
import SwissProductShowcase from "../components/home/SwissProductShowcase";
import SwissExpertiseSpotlight from "../components/home/SwissExpertiseSpotlight";
import SwissNewsSection from "../components/home/SwissNewsSection";
import FeaturedGallerySection from "../components/home/FeaturedGallerySection";
import { useNavigate } from "react-router-dom";
import { LiquidButton } from "../components/ui/liquid-glass-button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <Hero />
      <TrustStrip />
      
      {/* Swiss Clean Metrics */}
      <div className="pt-6 pb-2 relative z-30">
        <MetricsStrip />
      </div>

      {/* Teknimed-Style "Our Products" 4-Quadrant Showcase */}
      <SwissProductShowcase />

      {/* Teknimed-Style "Our Expertise" Centerpiece with Interactive Technical Specs */}
      <SwissExpertiseSpotlight />

      {/* Teknimed-Style Minimal 3-Card News & Clinical Insights Grid */}
      <SwissNewsSection />

      {/* Featured Clinical Facilities & Operations Gallery */}
      <FeaturedGallerySection />

      {/* Why Healthcare Partners Choose Emsurg */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-slate-800 mb-3 sm:mb-4">
            Why Healthcare Partners Choose Emsurg
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-10 sm:mb-14 max-w-xl mx-auto font-normal px-2">
            Where indigenous biomedical manufacturing, global technology partnerships, and clinical excellence converge.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { label: "INDIGENOUS MANUFACTURING", desc: "CDSCO Class C approved facility in Kolkata" },
              { label: "GLOBAL PARTNERSHIPS", desc: "Exclusive alliance with Teknimed (France) & MDL (Italy)" },
              { label: "RESEARCH & CLINICAL R&D", desc: "Nanocrystalline bioresorbable polymers & scaffolds" },
              { label: "WHO-GMP COMPLIANCE", desc: "Pharmacopeial purity with sub-micron filtration" },
              { label: "SURGEON EDUCATION", desc: "Procedural training & operating theater support" },
              { label: "NATIONWIDE LOGISTICS", desc: "Unbroken supply chains to leading hospital networks" },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center p-5 sm:p-8 bg-sky-50/40 rounded-2xl border border-sky-100 hover:border-sky-300 hover:bg-sky-50/80 transition-all text-center group"
              >
                <span className="text-xs font-semibold tracking-[0.15em] text-slate-700 uppercase mb-2 group-hover:text-sky-600 transition-colors">
                  {item.label}
                </span>
                <span className="text-xs text-slate-500 font-normal leading-relaxed">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Luminous Airy Surgical Theme */}
      <section className="py-16 sm:py-28 bg-gradient-to-b from-sky-50/80 via-white to-sky-100/60 border-t border-sky-100 text-center relative overflow-hidden">
        {/* Soft cyan radial ambient light */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[80%] h-[120%] translate-y-1/4 translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12)_0%,rgba(6,182,212,0)_50%)] blur-[90px]" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)] blur-[80px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200/70 text-sky-700 text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            PARTNERSHIP & PROCUREMENT
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-900 tracking-tight mb-4 sm:mb-6">
            Advancing Healthcare Together
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-8 sm:mb-10 font-normal max-w-xl mx-auto px-2 leading-relaxed">
            Connect with Emsurg for medical technology specifications, distribution partnerships, and hospital procurement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <LiquidButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto"
            >
              Talk to Emsurg
            </LiquidButton>
            <LiquidButton
              variant="outline"
              size="lg"
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto"
            >
              Explore Products
            </LiquidButton>
          </div>
        </div>
      </section>
    </div>
  );
}
