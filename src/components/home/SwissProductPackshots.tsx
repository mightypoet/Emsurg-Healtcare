import React from "react";

// ==========================================
// 1. ORTHOBIOLOGICS PACKSHOT (BoneSurg HA / BoneSurg CR)
// Amber pharmaceutical ampoule in pure white crystalline powder mound
// ==========================================
export function OrthobiologicsPackshot() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center select-none">
      {/* Ground cast shadow - soft elliptical blur */}
      <div 
        className="absolute bottom-4 w-56 h-8 rounded-[100%] bg-slate-900/10 blur-md transform -translate-y-1/2 scale-y-60 pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-4 w-36 h-4 rounded-[100%] bg-slate-950/20 blur-xs transform -translate-y-1/2 scale-y-50 pointer-events-none" 
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 320 260"
        className="h-64 w-auto drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Orthobiologics synthetic bone graft substitute and liquid ampoule"
      >
        <defs>
          {/* Amber Glass Gradient */}
          <linearGradient id="amberGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A4500" />
            <stop offset="18%" stopColor="#C9751A" />
            <stop offset="45%" stopColor="#E59934" />
            <stop offset="65%" stopColor="#B35F0C" />
            <stop offset="85%" stopColor="#823F00" />
            <stop offset="100%" stopColor="#5E2C00" />
          </linearGradient>

          {/* Glass Highlight */}
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>

          {/* Liquid Inside Ampoule */}
          <linearGradient id="amberLiquid" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#753500" />
            <stop offset="80%" stopColor="#BA6614" />
            <stop offset="100%" stopColor="#D98226" />
          </linearGradient>

          {/* Crystalline Powder Mound Shading */}
          <radialGradient id="powderMound" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="80%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>

          {/* Granule Specular Sparks */}
          <filter id="granuleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- AMPOULE STANDING UPRIGHT --- */}
        <g transform="translate(142, 28)">
          {/* Ampoule Sealed Tip */}
          <path
            d="M 17 0 C 14 0 13 4 14 8 L 14 14 C 14 18 11 22 11 26 L 11 36 C 11 40 18 45 18 50 L 18 160 C 18 164 15 166 10 166 L 26 166 C 21 166 18 164 18 160 Z"
            fill="url(#amberGlass)"
          />

          {/* Ampoule Full Body */}
          <path
            d="M 18 52 C 14 47 10 42 10 36 L 10 26 C 10 20 14 17 14 12 L 14 6 C 14 2 19 2 20 6 L 20 12 C 20 17 24 20 24 26 L 24 36 C 24 42 20 47 18 52 Z"
            fill="url(#amberGlass)"
          />
          <rect x="7" y="52" width="22" height="110" rx="4" fill="url(#amberGlass)" />

          {/* Liquid level */}
          <rect x="8.5" y="75" width="19" height="85" rx="3" fill="url(#amberLiquid)" opacity="0.9" />

          {/* Measurement graduation markings */}
          <line x1="12" y1="85" x2="16" y2="85" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" />
          <line x1="12" y1="95" x2="18" y2="95" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
          <line x1="12" y1="105" x2="16" y2="105" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" />
          <line x1="12" y1="115" x2="18" y2="115" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
          <line x1="12" y1="125" x2="16" y2="125" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" />
          <line x1="12" y1="135" x2="18" y2="135" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />

          {/* White neck ceramic break ring */}
          <line x1="10" y1="26" x2="24" y2="26" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />

          {/* Glass Vertical Specular Reflection */}
          <path
            d="M 10 54 L 12 54 L 12 160 L 10 160 Z"
            fill="url(#glassReflection)"
            opacity="0.8"
          />
          <path
            d="M 23 54 L 24.5 54 L 24.5 160 L 23 160 Z"
            fill="rgba(255,255,255,0.4)"
          />
        </g>

        {/* --- CONICAL MOUND OF PURE WHITE BONE GRAFT POWDER --- */}
        {/* Powder base spread */}
        <ellipse cx="160" cy="208" rx="88" ry="24" fill="#E2E8F0" opacity="0.7" />
        
        {/* Main Cone Mound */}
        <path
          d="M 68 214 C 95 212 120 188 152 165 C 156 162 164 162 168 165 C 200 188 225 212 252 214 C 230 226 90 226 68 214 Z"
          fill="url(#powderMound)"
        />

        {/* Foreground Mound Crest with micro-facets */}
        <path
          d="M 85 212 C 115 210 135 192 160 178 C 185 192 205 210 235 212 C 200 222 120 222 85 212 Z"
          fill="#FFFFFF"
          opacity="0.95"
        />

        {/* Micro-granules / crystalline sparkles scattered around mound */}
        <g fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.4" filter="url(#granuleGlow)">
          <circle cx="152" cy="180" r="1.6" />
          <circle cx="168" cy="184" r="1.4" />
          <circle cx="140" cy="192" r="1.8" />
          <circle cx="178" cy="190" r="1.5" />
          <circle cx="120" cy="202" r="2.0" />
          <circle cx="198" cy="200" r="1.7" />
          <circle cx="102" cy="208" r="1.5" />
          <circle cx="218" cy="206" r="1.8" />
          <circle cx="132" cy="211" r="1.3" />
          <circle cx="186" cy="210" r="1.5" />
          <circle cx="158" cy="214" r="1.6" />
          <circle cx="80" cy="216" r="1.2" />
          <circle cx="240" cy="214" r="1.3" />
          <circle cx="65" cy="218" r="1.0" />
          <circle cx="255" cy="217" r="1.1" />
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 2. WOUND MANAGEMENT PACKSHOT (EM-VAC NPWT System)
// Digital therapy unit + sterile foam dressing + suction tubing
// ==========================================
export function WoundManagementPackshot() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center select-none">
      {/* Ground cast shadow */}
      <div 
        className="absolute bottom-4 w-60 h-8 rounded-[100%] bg-slate-900/10 blur-md transform -translate-y-1/2 scale-y-60 pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-4 w-40 h-4 rounded-[100%] bg-slate-950/20 blur-xs transform -translate-y-1/2 scale-y-50 pointer-events-none" 
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 320 260"
        className="h-64 w-auto drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="EM-VAC negative pressure wound therapy digital unit and dressing"
      >
        <defs>
          {/* Metallic / Clinical Console Plastic */}
          <linearGradient id="consoleBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* LCD Screen Display */}
          <linearGradient id="lcdScreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Polyurethane Foam Texture */}
          <linearGradient id="foamBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* --- STERILE NPWT FOAM DRESSING BLOCK (Left Foreground) --- */}
        <g transform="translate(48, 155)">
          {/* Foam 3D Block */}
          {/* Top Face */}
          <polygon points="20,0 80,0 65,22 5,22" fill="#475569" stroke="#64748B" strokeWidth="0.5" />
          {/* Front Face */}
          <polygon points="5,22 65,22 65,48 5,48" fill="url(#foamBlack)" />
          {/* Right Face */}
          <polygon points="65,22 80,0 80,26 65,48" fill="#1E293B" />
          
          {/* Reticulated Porosity Stipples */}
          <g fill="#94A3B8" opacity="0.4">
            <circle cx="20" cy="10" r="1.0" />
            <circle cx="35" cy="8" r="0.8" />
            <circle cx="50" cy="12" r="1.1" />
            <circle cx="65" cy="7" r="0.9" />
            <circle cx="25" cy="30" r="0.9" />
            <circle cx="45" cy="35" r="1.0" />
            <circle cx="35" cy="42" r="0.8" />
            <circle cx="15" cy="36" r="0.9" />
            <circle cx="55" cy="28" r="1.1" />
          </g>

          {/* Transparent Drape Border overlay */}
          <path
            d="M -4 20 L 74 20 L 74 54 L -4 54 Z"
            fill="rgba(56, 189, 248, 0.12)"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
        </g>

        {/* --- SUCTION TUBING CONNECTING FOAM TO UNIT --- */}
        <path
          d="M 85 168 C 110 145 125 185 155 160 C 175 145 180 135 182 115"
          stroke="rgba(203, 213, 225, 0.85)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 85 168 C 110 145 125 185 155 160 C 175 145 180 135 182 115"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Luer connector bell */}
        <circle cx="85" cy="168" r="6" fill="#0284C7" />
        <circle cx="85" cy="168" r="3" fill="#FFFFFF" />

        {/* --- EM-VAC DIGITAL THERAPY UNIT CONSOLE (Center-Right) --- */}
        <g transform="translate(160, 42)">
          {/* Main Enclosure (curved ergonomic medical grade) */}
          <rect x="0" y="0" width="105" height="152" rx="16" fill="url(#consoleBody)" stroke="#CBD5E1" strokeWidth="1.5" />
          
          {/* Upper Handle Arch */}
          <path
            d="M 28 0 C 28 -12 77 -12 77 0"
            stroke="#94A3B8"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* LCD Screen Display Housing */}
          <rect x="14" y="18" width="77" height="52" rx="8" fill="url(#lcdScreen)" stroke="#334155" strokeWidth="1" />
          
          {/* Screen Readout: -125 mmHg */}
          <text x="52" y="44" fill="#38BDF8" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            -125
          </text>
          <text x="52" y="55" fill="#94A3B8" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">
            mmHg · CONTINUOUS
          </text>
          
          {/* Green Status LED indicator */}
          <circle cx="78" cy="28" r="2.5" fill="#10B981" />
          <circle cx="78" cy="28" r="1.2" fill="#D1FAE5" />

          {/* Touch membrane buttons */}
          <g transform="translate(24, 80)">
            <circle cx="12" cy="10" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
            <polygon points="10,7 16,10 10,13" fill="#0284C7" />

            <circle cx="34" cy="10" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
            <text x="34" y="13.5" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">⚙</text>

            {/* Power button */}
            <circle cx="56" cy="10" r="7" fill="#0284C7" stroke="#0369A1" strokeWidth="0.8" />
            <path d="M 56 6 L 56 10 M 53.5 7.5 A 3.5 3.5 0 1 0 58.5 7.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
          </g>

          {/* Canister Section Divider */}
          <line x1="8" y1="106" x2="97" y2="106" stroke="#CBD5E1" strokeWidth="1" />

          {/* Integrated 500ml Exudate Canister with measurement ticks */}
          <rect x="14" y="112" width="77" height="30" rx="4" fill="rgba(241, 245, 249, 0.8)" stroke="#CBD5E1" strokeWidth="0.8" />
          <line x1="18" y1="120" x2="30" y2="120" stroke="#0284C7" strokeWidth="0.8" />
          <text x="34" y="122" fill="#64748B" fontSize="6" fontFamily="sans-serif">300ml</text>
          <line x1="18" y1="128" x2="26" y2="128" stroke="#94A3B8" strokeWidth="0.8" />
          <text x="30" y="130" fill="#64748B" fontSize="6" fontFamily="sans-serif">200ml</text>
          <line x1="18" y1="135" x2="22" y2="135" stroke="#94A3B8" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 3. NEPHRO CARE PACKSHOT (Hemodialysis Concentrates)
// High-purity acid concentrate jerrycan & sodium bicarbonate cartridge
// ==========================================
export function NephroCarePackshot() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center select-none">
      {/* Ground cast shadow */}
      <div 
        className="absolute bottom-4 w-60 h-8 rounded-[100%] bg-slate-900/10 blur-md transform -translate-y-1/2 scale-y-60 pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-4 w-36 h-4 rounded-[100%] bg-slate-950/20 blur-xs transform -translate-y-1/2 scale-y-50 pointer-events-none" 
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 320 260"
        className="h-64 w-auto drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="High-purity hemodialysis fluid concentrate and dry bicarbonate cartridge"
      >
        <defs>
          {/* Translucent HDPE Jerrycan Plastic */}
          <linearGradient id="hdpeBottle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Nephro Blue Cap & Accents */}
          <linearGradient id="nephroBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Liquid Dialysate Level */}
          <linearGradient id="dialysateLiquid" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(224, 242, 254, 0.9)" />
            <stop offset="100%" stopColor="rgba(240, 249, 255, 0.4)" />
          </linearGradient>
        </defs>

        {/* --- 10L / 20L ACID CONCENTRATE JERRYCAN (Left) --- */}
        <g transform="translate(68, 55)">
          {/* Integrated Molded Handle */}
          <path
            d="M 28 20 C 28 4 68 4 68 20"
            stroke="#CBD5E1"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 28 20 C 28 4 68 4 68 20"
            stroke="#FFFFFF"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />

          {/* Main Jerrycan Body with Molded Ribs */}
          <rect x="0" y="24" width="96" height="136" rx="14" fill="url(#hdpeBottle)" stroke="#CBD5E1" strokeWidth="1.2" />
          
          {/* Liquid fill volume */}
          <path
            d="M 2 54 L 94 54 L 94 150 C 94 156 88 158 84 158 L 12 158 C 6 158 2 156 2 150 Z"
            fill="url(#dialysateLiquid)"
          />

          {/* Indented Reinforcement Grip Ribs */}
          <rect x="10" y="70" width="76" height="6" rx="3" fill="#E2E8F0" opacity="0.7" />
          <rect x="10" y="86" width="76" height="6" rx="3" fill="#E2E8F0" opacity="0.7" />
          <rect x="10" y="102" width="76" height="6" rx="3" fill="#E2E8F0" opacity="0.7" />

          {/* Clinical Label */}
          <rect x="14" y="118" width="68" height="32" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <rect x="14" y="118" width="68" height="6" fill="#0284C7" />
          <text x="48" y="133" fill="#0F172A" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            ACID CONCENTRATE
          </text>
          <text x="48" y="142" fill="#64748B" fontSize="5" fontFamily="sans-serif" textAnchor="middle">
            PART A · 1:34 DILUTION
          </text>

          {/* Threaded Spout Neck & Tamper-Evident Induction Cap */}
          <rect x="68" y="10" width="22" height="16" rx="3" fill="url(#nephroBlue)" stroke="#0369A1" strokeWidth="0.8" />
          {/* Knurled grip lines on cap */}
          <line x1="72" y1="12" x2="72" y2="24" stroke="#38BDF8" strokeWidth="0.8" />
          <line x1="76" y1="12" x2="76" y2="24" stroke="#38BDF8" strokeWidth="0.8" />
          <line x1="80" y1="12" x2="80" y2="24" stroke="#38BDF8" strokeWidth="0.8" />
          <line x1="84" y1="12" x2="84" y2="24" stroke="#38BDF8" strokeWidth="0.8" />
        </g>

        {/* --- DRY SODIUM BICARBONATE CARTRIDGE CANISTER (Right) --- */}
        <g transform="translate(182, 70)">
          {/* Top Quick-Connect Machine Spigot Port */}
          <rect x="26" y="0" width="16" height="18" rx="2" fill="url(#nephroBlue)" />
          <ellipse cx="34" cy="2" rx="5" ry="2" fill="#38BDF8" />

          {/* Cartridge Cylinder Body */}
          <rect x="4" y="18" width="60" height="122" rx="8" fill="url(#hdpeBottle)" stroke="#CBD5E1" strokeWidth="1" />
          
          {/* Inner Dry Bicarbonate Powder Bed */}
          <rect x="6" y="32" width="56" height="104" rx="4" fill="#FFFFFF" />
          {/* Stipple of dry micropowder */}
          <g fill="#94A3B8" opacity="0.35">
            <circle cx="16" cy="45" r="0.8" />
            <circle cx="32" cy="48" r="0.9" />
            <circle cx="48" cy="44" r="0.8" />
            <circle cx="22" cy="65" r="1.0" />
            <circle cx="42" cy="68" r="0.9" />
            <circle cx="28" cy="85" r="0.8" />
            <circle cx="50" cy="88" r="1.1" />
            <circle cx="18" cy="110" r="0.8" />
            <circle cx="36" cy="115" r="0.9" />
          </g>

          {/* Pharmaceutical Cartridge Label */}
          <rect x="8" y="70" width="52" height="34" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <rect x="8" y="70" width="52" height="5" fill="#0D9488" />
          <text x="34" y="85" fill="#0F172A" fontSize="6" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            BiCart® 650g
          </text>
          <text x="34" y="94" fill="#64748B" fontSize="4.5" fontFamily="sans-serif" textAnchor="middle">
            DRY BICARBONATE
          </text>

          {/* Bottom Machine Luer Port */}
          <rect x="26" y="140" width="16" height="8" rx="2" fill="#0284C7" />
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 4. BONE CEMENTS & BIOPSY PACKSHOT (Teknimed OPACITY+ & MDL)
// Precision PMMA syringe injector gun + amber ampoule + MDL biopsy needle
// ==========================================
export function BoneCementsBiopsyPackshot() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center select-none">
      {/* Ground cast shadow */}
      <div 
        className="absolute bottom-4 w-60 h-8 rounded-[100%] bg-slate-900/10 blur-md transform -translate-y-1/2 scale-y-60 pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-4 w-40 h-4 rounded-[100%] bg-slate-950/20 blur-xs transform -translate-y-1/2 scale-y-50 pointer-events-none" 
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 320 260"
        className="h-64 w-auto drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Teknimed OPACITY+ PMMA bone cement applicator and precision MDL biopsy needle"
      >
        <defs>
          {/* Medical Stainless Steel Metallic Gradient */}
          <linearGradient id="surgicalSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Polycarbonate Clear Barrel */}
          <linearGradient id="clearBarrel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="30%" stopColor="rgba(241,245,249,0.7)" />
            <stop offset="70%" stopColor="rgba(203,213,225,0.6)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.8)" />
          </linearGradient>

          {/* White Radiopaque Cement Paste */}
          <linearGradient id="cementPaste" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Amber Monomer Ampoule */}
          <linearGradient id="amberAmpouleSmall" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="35%" stopColor="#D97706" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>

        {/* --- TEKNIMED OPACITY+ VERTEBROPLASTY HIGH-PRESSURE CEMENT GUN --- */}
        <g transform="translate(100, 36)">
          {/* Ergonomic T-Bar Plunger Handle */}
          <path
            d="M -18 36 C -28 36 -32 46 -32 54 C -32 62 -28 72 -18 72 L -6 72 C -2 72 0 68 0 64 L 0 44 C 0 40 -2 36 -6 36 Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          {/* Threaded High-Pressure Lead Screw Piston */}
          <rect x="-4" y="50" width="36" height="8" fill="url(#surgicalSteel)" />
          <line x1="2" y1="50" x2="2" y2="58" stroke="#475569" strokeWidth="0.8" />
          <line x1="8" y1="50" x2="8" y2="58" stroke="#475569" strokeWidth="0.8" />
          <line x1="14" y1="50" x2="14" y2="58" stroke="#475569" strokeWidth="0.8" />
          <line x1="20" y1="50" x2="20" y2="58" stroke="#475569" strokeWidth="0.8" />
          <line x1="26" y1="50" x2="26" y2="58" stroke="#475569" strokeWidth="0.8" />

          {/* Ergonomic Finger Flange Ring Collar */}
          <rect x="28" y="24" width="14" height="60" rx="7" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.2" />

          {/* Polycarbonate Syringe Barrel */}
          <rect x="38" y="38" width="82" height="32" rx="4" fill="url(#clearBarrel)" stroke="#94A3B8" strokeWidth="1" />
          
          {/* High-Radiopacity PMMA Cement Inside */}
          <rect x="52" y="42" width="62" height="24" rx="2" fill="url(#cementPaste)" />
          
          {/* Volume Markings: 1cc, 2cc, 5cc, 10cc */}
          <line x1="56" y1="40" x2="56" y2="48" stroke="#0F172A" strokeWidth="0.8" />
          <line x1="68" y1="40" x2="68" y2="52" stroke="#0F172A" strokeWidth="1" />
          <line x1="80" y1="40" x2="80" y2="48" stroke="#0F172A" strokeWidth="0.8" />
          <line x1="92" y1="40" x2="92" y2="52" stroke="#0F172A" strokeWidth="1" />
          <line x1="104" y1="40" x2="104" y2="48" stroke="#0F172A" strokeWidth="0.8" />

          {/* Luer-Lock High-Pressure Nozzle Cone */}
          <polygon points="120,44 140,51 140,57 120,64" fill="url(#surgicalSteel)" />
          
          {/* Vertebroplasty Cannula Needle / Delivery Tube Extension */}
          <rect x="140" y="52" width="55" height="4" fill="url(#surgicalSteel)" />
          <polygon points="195,52 204,54 195,56" fill="#CBD5E1" />
        </g>

        {/* --- STANDING AMBER MONOMER LIQUID AMPOULE (Right) --- */}
        <g transform="translate(230, 92)">
          {/* Ampoule Body */}
          <rect x="0" y="32" width="18" height="74" rx="4" fill="url(#amberAmpouleSmall)" stroke="#78350F" strokeWidth="0.6" />
          {/* Stem & Break Ring */}
          <path d="M 9 0 C 7 0 6 3 6 8 L 6 16 C 6 22 9 26 9 32 L 0 32 C 0 26 3 22 3 16 L 3 8 C 3 3 7 0 9 0 Z" fill="url(#amberAmpouleSmall)" />
          <line x1="4" y1="18" x2="14" y2="18" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
          {/* Specular glass reflection */}
          <rect x="2" y="34" width="2" height="68" rx="1" fill="rgba(255,255,255,0.7)" />
        </g>

        {/* --- MDL PRECISION BONE MARROW BIOPSY NEEDLE (Foreground Cross) --- */}
        <g transform="translate(36, 175) rotate(-12)">
          {/* Ergonomic Molded MDL Handle */}
          <path
            d="M 0 0 C 0 -10 32 -10 32 0 C 32 6 26 12 16 14 C 6 12 0 6 0 0 Z"
            fill="#0284C7"
            stroke="#0369A1"
            strokeWidth="1"
          />
          {/* Handle Comfort Grooves */}
          <circle cx="8" cy="-2" r="3" fill="#0369A1" opacity="0.6" />
          <circle cx="16" cy="-4" r="3" fill="#0369A1" opacity="0.6" />
          <circle cx="24" cy="-2" r="3" fill="#0369A1" opacity="0.6" />

          {/* Stainless Steel Needle Cannula */}
          <rect x="14" y="14" width="4.5" height="110" fill="url(#surgicalSteel)" />

          {/* Echogenic Diamond Bevel Trocar Tip */}
          <polygon points="14,124 16.25,134 18.5,124" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="0.5" />
          
          {/* Millimeter Depth Markings on needle shaft */}
          <line x1="14" y1="40" x2="18.5" y2="40" stroke="#0F172A" strokeWidth="0.6" />
          <line x1="14" y1="60" x2="18.5" y2="60" stroke="#0F172A" strokeWidth="0.6" />
          <line x1="14" y1="80" x2="18.5" y2="80" stroke="#0F172A" strokeWidth="0.6" />
          <line x1="14" y1="100" x2="18.5" y2="100" stroke="#0F172A" strokeWidth="0.6" />
        </g>
      </svg>
    </div>
  );
}
