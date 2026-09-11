import { Building2 } from "lucide-react";

const hospitals = [
  { name: "Apollo Hospitals", scale: "scale-150", logo: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/Apollo_Hospitals_Logo.png" },
  { name: "Fortis Hospitals", scale: "scale-100", logo: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/FORTIS.png" },
  { name: "Narayana Health", scale: "scale-100", logo: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/Narayana_Health.png" },
  { name: "Manipal Hospitals", scale: "scale-100", logo: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/MANIPAL-HOSPITAL.png" },
  { name: "Woodlands", scale: "scale-100", logo: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/WOODLANDS.png" },
];

export default function TrustStrip() {
  return (
    <div className="bg-slate-50 border-y border-slate-200/80 pt-10 pb-16 mb-16 md:mb-24 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center mb-10">
          Trusted by leading hospitals, including
        </h3>
        
        <div className="relative flex overflow-hidden w-full group">
          {/* Left Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          {/* Right Fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

          {/* First Track */}
          <div className="flex shrink-0 items-center gap-16 animate-marquee group-hover:[animation-play-state:paused] pr-16">
            {hospitals.map((hospital, idx) => (
              <div key={`set1-${idx}`} className="flex items-center justify-center shrink-0 min-w-[150px]">
                <img src={hospital.logo} alt={hospital.name} className={`h-10 md:h-12 w-auto max-w-[180px] object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply ${hospital.scale || 'scale-100'}`} />
              </div>
            ))}
          </div>

          {/* Second Track for seamless loop */}
          <div className="flex shrink-0 items-center gap-16 animate-marquee group-hover:[animation-play-state:paused] pr-16" aria-hidden="true">
            {hospitals.map((hospital, idx) => (
              <div key={`set2-${idx}`} className="flex items-center justify-center shrink-0 min-w-[150px]">
                <img src={hospital.logo} alt={hospital.name} className={`h-10 md:h-12 w-auto max-w-[180px] object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply ${hospital.scale || 'scale-100'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
