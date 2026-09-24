import React from "react";

export default function MetricsStrip() {
  const metrics = [
    {
      value: "15+",
      label: "Years of Clinical Excellence",
      subtext: "Pioneering medtech since 2011",
    },
    {
      value: "25+",
      label: "Strategic Partnerships",
      subtext: "Global & national collaborations",
    },
    {
      value: "10+",
      label: "Industry Awards",
      subtext: "Recognized for innovation & R&D",
    },
    {
      value: "100%",
      label: "Indigenous Production",
      subtext: "Kolkata-based CDSCO facility",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
        {metrics.map((metric, idx) => (
          <div 
            key={idx}
            className="text-center flex flex-col items-center justify-center p-2 sm:p-4 group"
          >
            <div className="text-2xl sm:text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">
              {metric.value}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-slate-600 mb-1">
              {metric.label}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400">
              {metric.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
