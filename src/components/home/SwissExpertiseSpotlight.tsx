import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, CheckCircle2, ChevronRight, X } from "lucide-react";

interface Hotspot {
  id: string;
  xPercent: number; // percentage from left
  yPercent: number; // percentage from top
  title: string;
  badge: string;
  description: string;
  link: string;
}

export default function SwissExpertiseSpotlight() {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: "bonesurg",
      xPercent: 54,
      yPercent: 62,
      title: "BoneSurg HA / CR Orthobiologics",
      badge: "CDSCO Class C Certified",
      description:
        "100% synthetic nanocrystalline hydroxyapatite and resorbable calcium sulphate for local antibiotic delivery and natural bone regeneration.",
      link: "/products?category=Orthobiologics",
    },
    {
      id: "teknimed-pmma",
      xPercent: 32,
      yPercent: 42,
      title: "Teknimed OPACITY+® PMMA",
      badge: "Exclusive French Partnership",
      description:
        "French low-viscosity radiopaque vertebral acrylic cement formulated with 50% radiopacifiers (ZrO2 + HA) for Kyphoplasty & Vertebroplasty.",
      link: "/products?category=Bone%20Cements",
    },
    {
      id: "mdl-biopsy",
      xPercent: 78,
      yPercent: 66,
      title: "MDL Precision Biopsy Systems",
      badge: "Italian Engineering (MDL S.r.l.)",
      description:
        "Ultra-sharp echogenic coated trocar needles for bone marrow aspiration and soft tissue oncology diagnosis with zero crush artifact.",
      link: "/products?category=Biopsy%20Devices",
    },
    {
      id: "emvac-npwt",
      xPercent: 22,
      yPercent: 75,
      title: "EM-VAC Digital NPWT System",
      badge: "Active Exudate Evacuation",
      description:
        "Precision microprocessor digital pump (-20 to -200 mmHg) with reticulated hydrophobic polyurethane foam dressing kits for fast wound closure.",
      link: "/products?category=Wound%20Management",
    },
    {
      id: "dialysis-cleanroom",
      xPercent: 49,
      yPercent: 32,
      title: "High-Purity Hemodialysis Concentrates",
      badge: "WHO-GMP Indigenous Cleanroom",
      description:
        "Automated stoichiometric formulation with sub-micron endotoxin filtration conforming to British and Indian Pharmacopeia standards.",
      link: "/products?category=Nephro%20Care",
    },
  ];

  return (
    <section id="our-expertise" className="bg-white py-20 md:py-28 border-t border-slate-100 select-none">
      <div className="max-w-6xl mx-auto px-4">
        {/* Minimal Swiss Section Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-light text-slate-800 tracking-tight">
            Our expertise
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-normal tracking-wide mt-2 max-w-xl mx-auto">
            Comprehensive surgical and clinical solutions engineered for precision in operating theaters and nephrology centers.
          </p>
        </div>

        {/* Centerpiece Container with panoramic setup and interactive hotspots */}
        <div className="relative w-full max-w-5xl mx-auto mb-12">
          {/* Ground cast shadow */}
          <div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-[100%] bg-slate-900/10 blur-xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Panoramic Surgical Arrangement SVG */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] flex items-center justify-center">
            <svg
              viewBox="0 0 960 400"
              className="w-full h-full object-contain drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Emsurg complete clinical surgical setup arrangement"
            >
              <defs>
                {/* Stainless steel gradients */}
                <linearGradient id="expSteel" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="30%" stopColor="#E2E8F0" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>

                {/* Amber Glass */}
                <linearGradient id="expAmber" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#78350F" />
                  <stop offset="35%" stopColor="#D97706" />
                  <stop offset="70%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>

                {/* Translucent Interference Screw polymer */}
                <linearGradient id="expPLLA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="40%" stopColor="rgba(241,245,249,0.8)" />
                  <stop offset="80%" stopColor="rgba(203,213,225,0.7)" />
                  <stop offset="100%" stopColor="rgba(148,163,184,0.85)" />
                </linearGradient>

                {/* Powder Mound radial */}
                <radialGradient id="expPowder" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </radialGradient>
              </defs>

              {/* === SURGICAL STILL-LIFE SETUP ELEMENTS === */}

              {/* 1. STERILE SURGICAL DRAPE / MESH BASE (Foreground Center) */}
              <ellipse cx="500" cy="345" rx="140" ry="18" fill="rgba(224, 242, 254, 0.45)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* 2. TEKNIMED BONE CEMENT INJECTION GUN (Standing on Left) */}
              <g transform="translate(260, 90)">
                {/* Plunger handle arch */}
                <path d="M 0 40 C -18 40 -26 50 -26 62 C -26 74 -18 84 0 84 L 14 84 L 14 40 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                {/* Threaded screw shaft */}
                <rect x="14" y="58" width="55" height="10" fill="url(#expSteel)" />
                <line x1="22" y1="58" x2="22" y2="68" stroke="#475569" strokeWidth="1" />
                <line x1="32" y1="58" x2="32" y2="68" stroke="#475569" strokeWidth="1" />
                <line x1="42" y1="58" x2="42" y2="68" stroke="#475569" strokeWidth="1" />
                <line x1="52" y1="58" x2="52" y2="68" stroke="#475569" strokeWidth="1" />
                <line x1="62" y1="58" x2="62" y2="68" stroke="#475569" strokeWidth="1" />
                {/* Finger Collar */}
                <rect x="68" y="24" width="16" height="80" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
                {/* Syringe Polycarbonate Cylinder Barrel */}
                <rect x="84" y="44" width="120" height="42" rx="4" fill="rgba(241, 245, 249, 0.75)" stroke="#94A3B8" strokeWidth="1.5" />
                {/* Low viscosity PMMA paste inside */}
                <rect x="100" y="50" width="85" height="30" rx="2" fill="#FFFFFF" />
                {/* Graduations */}
                <line x1="110" y1="46" x2="110" y2="56" stroke="#0F172A" strokeWidth="1" />
                <line x1="130" y1="46" x2="130" y2="60" stroke="#0F172A" strokeWidth="1.2" />
                <line x1="150" y1="46" x2="150" y2="56" stroke="#0F172A" strokeWidth="1" />
                <line x1="170" y1="46" x2="170" y2="60" stroke="#0F172A" strokeWidth="1.2" />
                {/* Luer nozzle & cannula */}
                <polygon points="204,50 230,59 230,71 204,80" fill="url(#expSteel)" />
                <rect x="230" y="62" width="70" height="6" fill="url(#expSteel)" />
              </g>

              {/* 3. AMBER LIQUID AMPOULE (Center Upright) */}
              <g transform="translate(485, 120)">
                <rect x="0" y="50" width="26" height="150" rx="4" fill="url(#expAmber)" stroke="#78350F" strokeWidth="0.8" />
                <path d="M 13 0 C 10 0 9 4 9 12 L 9 26 C 9 34 14 40 14 50 L 0 50 C 0 40 5 34 5 26 L 5 12 C 5 4 6 0 13 0 Z" fill="url(#expAmber)" />
                {/* Ceramic break ring */}
                <line x1="5" y1="26" x2="21" y2="26" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.95" />
                {/* Liquid fill */}
                <rect x="2" y="80" width="22" height="116" rx="2" fill="#BA6614" opacity="0.9" />
                {/* Specular glass sheen */}
                <rect x="3" y="52" width="3" height="142" rx="1" fill="rgba(255,255,255,0.7)" />
              </g>

              {/* 4. BIOABSORBABLE INTERFERENCE BONE SCREWS (Center Left Foreground) */}
              <g transform="translate(390, 240) rotate(-22)">
                <rect x="0" y="0" width="16" height="52" rx="3" fill="url(#expPLLA)" stroke="#94A3B8" strokeWidth="0.8" />
                {/* Continuous Helical Threads */}
                <path d="M 0 10 L 16 14 M 0 18 L 16 22 M 0 26 L 16 30 M 0 34 L 16 38 M 0 42 L 16 46" stroke="#64748B" strokeWidth="1.2" />
                <circle cx="8" cy="4" r="3.5" fill="#CBD5E1" />
              </g>
              <g transform="translate(425, 245) rotate(-14)">
                <rect x="0" y="0" width="15" height="48" rx="3" fill="url(#expPLLA)" stroke="#94A3B8" strokeWidth="0.8" />
                <path d="M 0 10 L 15 14 M 0 18 L 15 22 M 0 26 L 15 30 M 0 34 L 15 38 M 0 42 L 15 46" stroke="#64748B" strokeWidth="1.2" />
                <circle cx="7.5" cy="4" r="3" fill="#CBD5E1" />
              </g>

              {/* 5. PURE SYNTHETIC BONE GRAFT POWDER MOUND (Center Base) */}
              <g transform="translate(450, 220)">
                <ellipse cx="60" cy="95" rx="72" ry="20" fill="#E2E8F0" opacity="0.6" />
                <path d="M 0 100 C 25 98 45 76 60 55 C 75 76 95 98 120 100 Z" fill="url(#expPowder)" />
                <path d="M 15 98 C 35 96 50 78 60 62 C 70 78 85 96 105 98 Z" fill="#FFFFFF" />
                {/* Granule particles */}
                <circle cx="56" cy="65" r="1.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
                <circle cx="68" cy="72" r="1.3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
                <circle cx="48" cy="82" r="1.6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
                <circle cx="78" cy="85" r="1.4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
                <circle cx="35" cy="94" r="1.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
                <circle cx="90" cy="92" r="1.7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
              </g>

              {/* 6. HORIZONTAL CALIBRATED ASPIRATING SYRINGE (Foreground Left) */}
              <g transform="translate(190, 275) rotate(14)">
                {/* Flange */}
                <rect x="0" y="4" width="6" height="34" rx="2" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
                {/* Barrel */}
                <rect x="6" y="10" width="110" height="22" rx="3" fill="rgba(241, 245, 249, 0.85)" stroke="#94A3B8" strokeWidth="1" />
                {/* Plunger shaft */}
                <rect x="-35" y="18" width="40" height="6" fill="#E2E8F0" />
                <circle cx="-35" cy="21" r="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
                {/* Rubber seal */}
                <rect x="25" y="11" width="10" height="20" fill="#0284C7" />
                {/* Scale markings */}
                <line x1="45" y1="12" x2="45" y2="18" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="12" x2="60" y2="22" stroke="#334155" strokeWidth="1.2" />
                <line x1="75" y1="12" x2="75" y2="18" stroke="#334155" strokeWidth="1" />
                <line x1="90" y1="12" x2="90" y2="22" stroke="#334155" strokeWidth="1.2" />
                <line x1="105" y1="12" x2="105" y2="18" stroke="#334155" strokeWidth="1" />
                {/* Nozzle and needle */}
                <rect x="116" y="18" width="14" height="6" fill="url(#expSteel)" />
                <line x1="130" y1="21" x2="190" y2="21" stroke="#94A3B8" strokeWidth="1.5" />
              </g>

              {/* 7. MDL COAXIAL BIOPSY NEEDLE & TROCAR (Right Wing Angle) */}
              <g transform="translate(560, 220) rotate(16)">
                {/* Handle */}
                <path d="M 0 0 C 0 -12 36 -12 36 0 C 36 8 28 14 18 16 C 8 14 0 8 0 0 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1.2" />
                {/* Cannula needle */}
                <rect x="16" y="16" width="4" height="150" fill="url(#expSteel)" />
                {/* Depth graduations */}
                <line x1="16" y1="40" x2="20" y2="40" stroke="#0F172A" strokeWidth="0.8" />
                <line x1="16" y1="65" x2="20" y2="65" stroke="#0F172A" strokeWidth="0.8" />
                <line x1="16" y1="90" x2="20" y2="90" stroke="#0F172A" strokeWidth="0.8" />
                <line x1="16" y1="115" x2="20" y2="115" stroke="#0F172A" strokeWidth="0.8" />
                {/* Diamond trocar tip */}
                <polygon points="16,166 18,178 20,166" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.6" />
              </g>

              {/* 8. SECONDARY AMPOULE & ACCESSORIES (Right Background) */}
              <g transform="translate(680, 180) rotate(-18)">
                <rect x="0" y="24" width="18" height="85" rx="3" fill="url(#expAmber)" stroke="#78350F" strokeWidth="0.8" />
                <line x1="0" y1="42" x2="18" y2="42" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
                <rect x="2" y="26" width="2" height="80" rx="1" fill="rgba(255,255,255,0.7)" />
              </g>
            </svg>

            {/* --- INTERACTIVE HOTSPOT PINS --- */}
            {hotspots.map((spot) => {
              const isActive = activeHotspotId === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{
                    left: `${spot.xPercent}%`,
                    top: `${spot.yPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Pin Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setActiveHotspotId(isActive ? null : spot.id)}
                    onMouseEnter={() => setActiveHotspotId(spot.id)}
                    aria-label={`View clinical specification for ${spot.title}`}
                    className="relative group p-2 focus:outline-none"
                  >
                    {/* Pulsing radar ring */}
                    <span className="absolute inset-0 rounded-full bg-blue-500/25 animate-ping opacity-75" />
                    
                    {/* Center Core Dot */}
                    <span
                      className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all shadow-md ${
                        isActive
                          ? "bg-slate-900 border-white text-white scale-125"
                          : "bg-white border-slate-900 text-slate-900 group-hover:bg-slate-900 group-hover:text-white"
                      }`}
                    >
                      <span className="text-[11px] font-bold leading-none">+</span>
                    </span>
                  </button>

                  {/* Popover Card */}
                  {isActive && (
                    <div
                      onMouseLeave={() => setActiveHotspotId(null)}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 sm:w-80 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl text-left z-30 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          <Sparkles className="w-2.5 h-2.5" />
                          {spot.badge}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveHotspotId(null)}
                          className="text-slate-400 hover:text-slate-700 p-0.5"
                          aria-label="Close specification tooltip"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                        {spot.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {spot.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Clinical Standard
                        </span>
                        <Link
                          to={spot.link}
                          className="text-xs font-bold text-slate-900 hover:text-blue-600 inline-flex items-center gap-0.5 group/link"
                        >
                          Details{" "}
                          <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Pill Trigger */}
        <div className="text-center">
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200 group/btn shadow-2xs"
          >
            <span>Explore Clinical Capabilities</span>
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white group-hover/btn:bg-white group-hover/btn:text-slate-900 flex items-center justify-center text-[10px] transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
