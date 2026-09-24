import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Award, Factory, Microscope } from "lucide-react";
import { ScrollRollVideo } from "../ui/scroll-roll-video";
import { LiquidButton } from "../ui/liquid-glass-button";

export default function SwissExpertiseSpotlight() {
  const navigate = useNavigate();

  return (
    <section
      id="our-expertise"
      className="relative bg-[#030712] text-white py-20 sm:py-28 md:py-32 border-t border-slate-900 select-none overflow-hidden"
    >
      {/* Subtle surgical grid & glow ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Swiss Clean Minimal Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            SURGICAL MASTERY & PRECISION FORMULATION
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4 sm:mb-5">
            Our Expertise in Motion
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Experience the rigorous engineering behind India's premier indigenous bioresorbable grafts,
            renal solutions, and negative pressure systems.
          </p>
        </div>

        {/* 21st.dev-Inspired "Scroll & Roll" Animated Video Centerpiece */}
        <ScrollRollVideo videoSrc="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/emsurgvideo-opshot.mp4" />

        {/* 4 Core Pillars Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2.5">
              <Factory className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">ISO 14644 Cleanrooms</div>
            <div className="text-[11px] text-slate-400 mt-1">Class 10,000 / ISO-7 validated air cascades</div>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2.5">
              <Microscope className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">XRD & SEM Quality</div>
            <div className="text-[11px] text-slate-400 mt-1">Sub-micron crystal stoichiometry verification</div>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">CDSCO Class C</div>
            <div className="text-[11px] text-slate-400 mt-1">Indigenous implant approvals & CE conformity</div>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2.5">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">Global Alliances</div>
            <div className="text-[11px] text-slate-400 mt-1">Teknimed (France) & MDL S.r.l. (Italy)</div>
          </div>
        </div>

        {/* Direct CTA Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 sm:mt-16 text-center">
          <LiquidButton
            size="lg"
            className="shadow-xl shadow-sky-950/50"
            onClick={() => navigate("/about")}
          >
            Explore Clinical Capabilities <ArrowRight className="w-4 h-4 ml-2" />
          </LiquidButton>

          <Link
            to="/contact"
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors border border-transparent hover:border-slate-800 rounded-xl"
          >
            Request Facility Audit or CME
          </Link>
        </div>
      </div>
    </section>
  );
}
