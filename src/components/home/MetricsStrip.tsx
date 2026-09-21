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
    <div className="max-w-6xl mx-auto px-4 py-8 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {metrics.map((metric, idx) => (
          <div 
            key={idx}
            className="text-center flex flex-col items-center justify-center p-4 group"
          >
            <div className="text-3xl md:text-5xl font-light text-slate-800 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
              {metric.value}
            </div>
            <div className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-1">
              {metric.label}
            </div>
            <div className="text-xs text-slate-400">
              {metric.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
