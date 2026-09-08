import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function ManufacturingSection() {
  const steps = [
    { num: 1, title: "Indigenous Research", desc: "Work is changing faster than at any other time in history." },
    { num: 2, title: "Clinical Validation", desc: "Work is changing faster than at any other time in history." },
    { num: 3, title: "Precision Manufacturing", desc: "Work is changing faster than at any other time in history." },
    { num: 4, title: "Global Distribution", desc: "Work is changing faster than at any other time in history." }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            We support leading hospitals and clinical tech giants.
          </h2>
        </div>

        {/* Video Placeholder / Image */}
        <div className="w-full max-w-4xl bg-slate-100 aspect-[16/9] md:aspect-[21/9] rounded-2xl relative flex items-center justify-center overflow-hidden mb-16 shadow-sm border border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-transparent"></div>
          {/* Abstract green scribble placeholder matching the image style */}
          <div className="absolute -top-4 right-8 w-24 h-24 border-[3px] border-emerald-400 rounded-full rotate-45 scale-y-50"></div>
          
          <button className="relative z-10 bg-white text-slate-900 font-bold px-6 py-3 rounded-full flex items-center shadow-lg hover:scale-105 transition-transform text-sm">
            <Play className="w-4 h-4 mr-2 text-blue-600 fill-current" /> Quick Explainer
          </button>
        </div>

        {/* Horizontal Steps */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center px-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-4">
                {step.num}
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
