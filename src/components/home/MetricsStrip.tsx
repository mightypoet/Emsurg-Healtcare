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
    <div className="max-w-7xl mx-auto px-4 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-[#0D2F62] tracking-tight mb-1">
              {metric.value}
            </div>
            <div className="text-sm font-bold text-slate-800">
              {metric.label}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {metric.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
