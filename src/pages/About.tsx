import { timeline } from "../data/content";

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-blue-600 py-32 md:py-48 text-center relative overflow-hidden text-white">
        {/* Vibrant Gradient Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[120%] h-[120%] -translate-y-1/4 translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.5)_0%,rgba(139,92,246,0.5)_25%,rgba(37,99,235,0)_60%)] blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[100%] h-[100%] translate-y-1/4 -translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.6)_0%,rgba(37,99,235,0)_50%)] blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white leading-[1.1]">
            Engineering Better Outcomes
          </h1>
          <p className="text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto">
            Emsurg Healthcare is a leading Indian medical technology company focused on indigenous manufacturing and global partnerships.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">Our Mission</h2>
          <p className="text-2xl font-bold text-slate-900 leading-tight">
            Advancing healthcare with innovation, integrity and expertise.
          </p>
        </div>
        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-4">Our Vision</h2>
          <p className="text-2xl font-bold text-slate-900 leading-tight">
            Engineering better outcomes through medical innovation and care.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-16 text-center tracking-tight">Our Growth Story</h2>
          
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex mb-12 last:mb-0 relative group">
                {idx !== timeline.length - 1 && (
                  <div className="absolute left-6 top-10 bottom-[-3rem] w-px bg-slate-200 group-hover:bg-blue-200 transition-colors"></div>
                )}
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 z-10 shadow-sm text-blue-700 font-bold text-sm group-hover:border-blue-400 group-hover:bg-blue-50 transition-all duration-300">
                  {idx + 1}
                </div>
                <div className="ml-8 pt-1">
                  <div className="text-3xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{item.year}</div>
                  <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
