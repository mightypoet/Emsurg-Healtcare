import Hero from "../components/home/Hero";
import TrustStrip from "../components/home/TrustStrip";
import CTACards from "../components/home/CTACards";
import CategoryExplorer from "../components/home/CategoryExplorer";
import ManufacturingSection from "../components/home/ManufacturingSection";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LiquidButton } from "../components/ui/liquid-glass-button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <Hero />
      <TrustStrip />
      <CTACards />
      <CategoryExplorer />
      <ManufacturingSection />
      
      {/* Featured Solutions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Featured Solutions
            </h2>
            <p className="text-lg text-slate-600">
              Discover our most advanced clinical technologies engineered for precision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* BoneSurg CR */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-slate-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-[10px] font-bold tracking-widest text-blue-600 mb-4 uppercase bg-blue-50 inline-block px-3 py-1 rounded-full">Orthobiologics</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">BoneSurg CR</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">The Rapid, Resorbable Calcium Sulphate System for Local Antibiotic Delivery and Bone Preservation.</p>
              <a href="/products" className="inline-flex items-center text-slate-900 font-bold text-sm hover:text-blue-600 transition-colors">
                Explore BoneSurg CR <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
            {/* BoneSurg HA */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-slate-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-[10px] font-bold tracking-widest text-blue-600 mb-4 uppercase bg-blue-50 inline-block px-3 py-1 rounded-full">Orthobiologics</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">BoneSurg HA</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">Nanocrystalline Hydroxyapatite for Effortless Bone Defect Filling and True Bone Regeneration.</p>
              <a href="/products" className="inline-flex items-center text-slate-900 font-bold text-sm hover:text-blue-600 transition-colors">
                Explore BoneSurg HA <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
            {/* EM-VAC */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-slate-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-[10px] font-bold tracking-widest text-teal-600 mb-4 uppercase bg-teal-50 inline-block px-3 py-1 rounded-full">Wound Management</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">EM-VAC</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">Advanced Negative Pressure Wound Therapy driving macro and micro-deformation for angiogenesis.</p>
              <a href="/products" className="inline-flex items-center text-slate-900 font-bold text-sm hover:text-teal-600 transition-colors">
                Explore EM-VAC <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Emsurg (Simplified) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Why Healthcare Partners Choose Emsurg
          </h2>
          <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto font-normal">
            Where innovation, expertise and responsible healthcare technology come together.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["INDIGENOUS MANUFACTURING", "GLOBAL COLLABORATIONS", "RESEARCH & INNOVATION", "ETHICAL EXCELLENCE", "EDUCATION & TRAINING", "CUSTOMER-CENTRIC APPROACH"].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <span className="text-xs md:text-sm font-bold tracking-wider text-slate-800 text-center">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#0F172A] text-center relative overflow-hidden">
        {/* Abstract vibrant mesh in the background for final CTA */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[80%] h-[120%] translate-y-1/4 translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2)_0%,rgba(37,99,235,0)_50%)] blur-[80px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8">
            Let's Advance Healthcare Together.
          </h2>
          <p className="text-xl text-slate-300 mb-12 font-medium max-w-2xl mx-auto">
            Connect with Emsurg for medical technology, product information, partnerships and healthcare solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <LiquidButton size="lg" className="w-full sm:w-auto" onClick={() => navigate('/contact')}>
              Talk to Emsurg
            </LiquidButton>
            <LiquidButton size="lg" className="w-full sm:w-auto" onClick={() => navigate('/products')}>
              Explore Solutions
            </LiquidButton>
          </div>
        </div>
      </section>
    </div>
  );
}
