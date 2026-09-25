import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Award, Factory, Microscope } from "lucide-react";
import { ScrollRollVideo } from "../ui/scroll-roll-video";
import { LiquidButton } from "../ui/liquid-glass-button";

export default function SwissExpertiseSpotlight() {
  const navigate = useNavigate();

  return (
    <section
      id="our-expertise"
      className="relative bg-gradient-to-b from-sky-50/70 via-white to-sky-50/40 text-slate-900 py-20 sm:py-28 md:py-32 border-t border-sky-100/80 select-none overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.08), transparent 70%), linear-gradient(to bottom, rgba(240, 249, 255, 0.7), #ffffff, rgba(240, 249, 255, 0.4))",
      }}
    >
      {/* Subtle surgical grid & glow ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-40 -z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-200/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Swiss Clean Minimal Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200/70 text-sky-700 text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            SURGICAL MASTERY & PRECISION FORMULATION
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-4 sm:mb-5">
            Our Expertise in Motion
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Experience the rigorous engineering behind India's premier indigenous bioresorbable grafts,
            renal solutions, and negative pressure systems.
          </p>
        </div>

        {/* 21st.dev-Inspired "Scroll & Roll" Animated Video Centerpiece */}
        <ScrollRollVideo videoSrc="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/emsurgvideo-opshot.mp4" />

        {/* 4 Core Pillars Strip - Frosted Translucent Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-8 border-t border-sky-100">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-sky-100 shadow-[0_8px_30px_rgba(2,132,199,0.06)] hover:border-sky-200 transition-all hover:shadow-[0_12px_36px_rgba(2,132,199,0.1)]">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/60 text-sky-600 flex items-center justify-center mb-3">
              <Factory className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800">ISO 14644 Cleanrooms</div>
            <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">Class 10,000 / ISO-7 validated air cascades</div>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-sky-100 shadow-[0_8px_30px_rgba(2,132,199,0.06)] hover:border-sky-200 transition-all hover:shadow-[0_12px_36px_rgba(2,132,199,0.1)]">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/60 text-sky-600 flex items-center justify-center mb-3">
              <Microscope className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800">XRD & SEM Quality</div>
            <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">Sub-micron crystal stoichiometry verification</div>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-sky-100 shadow-[0_8px_30px_rgba(2,132,199,0.06)] hover:border-sky-200 transition-all hover:shadow-[0_12px_36px_rgba(2,132,199,0.1)]">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/60 text-sky-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800">CDSCO Class C</div>
            <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">Indigenous implant approvals & CE conformity</div>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-sky-100 shadow-[0_8px_30px_rgba(2,132,199,0.06)] hover:border-sky-200 transition-all hover:shadow-[0_12px_36px_rgba(2,132,199,0.1)]">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/60 text-sky-600 flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800">Global Alliances</div>
            <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">Teknimed (France) & MDL S.r.l. (Italy)</div>
          </div>
        </div>

        {/* Direct CTA Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 sm:mt-16 text-center">
          <LiquidButton
            variant="primary"
            size="lg"
            onClick={() => navigate("/about")}
            className="gap-2"
          >
            <span>Explore Clinical Capabilities</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </LiquidButton>

          <LiquidButton
            variant="outline"
            size="lg"
            asChild
          >
            <Link to="/contact">
              Request Facility Audit or CME
            </Link>
          </LiquidButton>
        </div>
      </div>
    </section>
  );
}
