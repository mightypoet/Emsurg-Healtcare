import { products } from "../data/content";
import { ArrowRight } from "lucide-react";

export default function Products() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-blue-600 pt-32 pb-24 md:pt-48 md:pb-32 text-center relative overflow-hidden text-white">
        {/* Vibrant Gradient Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[120%] h-[120%] -translate-y-1/4 translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.5)_0%,rgba(139,92,246,0.5)_25%,rgba(37,99,235,0)_60%)] blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[100%] h-[100%] translate-y-1/4 -translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.6)_0%,rgba(37,99,235,0)_50%)] blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white leading-[1.1]">
            Our Solutions Portfolio
          </h1>
          <p className="text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto">
            Explore our comprehensive range of indigenous medical devices and exclusively imported healthcare technologies.
          </p>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-slate-400 hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col group">
              <div className="p-8 flex-grow">
                <div className="inline-block text-[10px] font-bold tracking-widest text-blue-600 mb-4 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">{product.category}</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{product.name}</h2>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">{product.tagline}</p>
                
                {product.features && (
                  <ul className="space-y-3 mb-6">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="text-sm text-slate-500 flex items-start">
                        <span className="mr-3 text-blue-500 font-bold mt-0.5">•</span> 
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {product.partner && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{product.partnerType || "Partner"}</div>
                    <div className="text-sm font-bold text-slate-700">{product.partner}</div>
                  </div>
                )}
              </div>
              <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex justify-between items-center group-hover:bg-slate-100 transition-colors">
                <button className="text-sm font-bold text-slate-900 transition-colors">
                  Request Specifications
                </button>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
