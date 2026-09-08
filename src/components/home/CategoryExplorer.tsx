import { ArrowRight, Activity, Droplets, Bone, ShieldPlus, HeartPulse, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CategoryExplorer() {
  const [activeLetter, setActiveLetter] = useState('ALL');
  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const categories = [
    {
      id: "ortho",
      title: "Orthobiologics",
      desc: "BoneSurg CR & BoneSurg HA Systems",
      icon: <Bone className="w-8 h-8 text-blue-700" />,
      color: "blue"
    },
    {
      id: "wound",
      title: "Wound Management",
      desc: "EM-VAC NPWT Systems & Consumables",
      icon: <Activity className="w-8 h-8 text-teal-700" />,
      color: "teal"
    },
    {
      id: "nephro",
      title: "Nephro Care",
      desc: "Hemodialysis Fluids & High-purity Powders",
      icon: <Droplets className="w-8 h-8 text-sky-700" />,
      color: "sky"
    },
    {
      id: "biopsy",
      title: "Biopsy Devices",
      desc: "MDL Soft Tissue & Bone Marrow Portfolio",
      icon: <MicroscopeIcon className="w-8 h-8 text-indigo-700" />,
      color: "indigo"
    },
    {
      id: "cement",
      title: "Bone Cements",
      desc: "OPACITY+® PMMA Radiopaque Cements",
      icon: <ShieldPlus className="w-8 h-8 text-blue-700" />,
      color: "blue"
    },
    {
      id: "sports",
      title: "Sports Medicine",
      desc: "Smith & Nephew Joint Repair Solutions",
      icon: <HeartPulse className="w-8 h-8 text-rose-700" />,
      color: "rose"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Centres of Excellence
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Explore medical devices, biomaterials and healthcare solutions across our specialized clinical portfolios.
            </p>
          </div>
          <Link to="/products" className="mt-6 md:mt-0 text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center shrink-0">
            View All Portfolios <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Categories Grid (Centres of Excellence style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to="/products"
              className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-start relative overflow-hidden"
            >
              {/* Subtle hover accent line at top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-blue-600 transition-colors" />
              
              <div className={`w-16 h-16 rounded-2xl bg-${cat.color}-50 flex items-center justify-center mb-6`}>
                {cat.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                {cat.title}
              </h3>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed flex-grow">
                {cat.desc}
              </p>
              
              <div className="w-full flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
                <span className="text-sm font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">Explore</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* A-Z Device & Procedure Index */}
        <div className="bg-slate-900 rounded-[2rem] border border-slate-800 p-8 shadow-xl text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.15)_0%,rgba(0,0,0,0)_50%)]" />
          <div className="relative z-10 text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">A–Z Device & Product Index</h3>
            <p className="text-slate-400 text-sm">Filter our extensive catalog of devices, materials, and therapies.</p>
          </div>
          
          <div className="relative z-10 flex flex-wrap justify-center gap-1.5 md:gap-2">
            {alphabet.map((letter) => (
              <button 
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`min-w-[2rem] h-8 md:min-w-[2.5rem] md:h-10 px-2 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all ${
                  activeLetter === letter 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function MicroscopeIcon(props: any) {
  return <Settings {...props} />; // Placeholder for Microscope until imported correctly if missing
}
