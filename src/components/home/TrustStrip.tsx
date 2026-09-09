import { clients } from "../../data/content";

export default function TrustStrip() {
  const indicators = [
    { label: "CDSCO", sub: "Approved" },
    { label: "ISO", sub: "Certified" },
    { label: "WHO GMP", sub: "Compliant" },
    { label: "CE", sub: "Marked" },
    { label: "R&D", sub: "Focused" },
    { label: "GLOBAL", sub: "Partners" },
  ];

  return (
    <div className="bg-[#111827] py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-center text-white/90 text-sm font-bold tracking-widest mb-8 uppercase">
          Accreditations & Certifications
        </h3>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {indicators.map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 hover:bg-slate-800 transition-colors rounded-xl px-6 py-4 flex flex-col items-center justify-center min-w-[140px] border border-slate-700/50">
              <span className="text-sm md:text-base font-extrabold text-slate-300 tracking-tight">
                {item.label}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">
                {item.sub}
              </span>
            </div>
          ))}
        </div>

        <h3 className="text-center text-white/90 text-sm font-bold tracking-widest mb-10 uppercase">
          Trusted by leading hospitals, including
        </h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
          {clients.map((client, idx) => (
             <div key={idx} className="text-slate-400 font-bold tracking-tight text-lg md:text-xl text-center">
               {client}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
