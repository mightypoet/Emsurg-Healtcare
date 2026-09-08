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
        <h3 className="text-center text-white/90 text-sm font-bold tracking-wide mb-10">
          Trusting by leading hospitals, including:
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {indicators.map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 hover:bg-slate-800 transition-colors rounded-xl px-6 py-4 flex items-center justify-center min-w-[120px] border border-slate-700/50">
              <span className="text-sm md:text-base font-extrabold text-slate-400 tracking-tight flex items-center gap-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
