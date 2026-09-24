import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LiquidButton } from "../ui/liquid-glass-button";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center text-white pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden bg-slate-950">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        poster="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/emsurg-video-oshot.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80 pointer-events-none z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto mt-4 sm:mt-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] text-white mb-4 sm:mb-6">
            Advance reliable and<br className="hidden sm:inline" /> trustworthy healthcare.
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium leading-relaxed px-2">
            Engineering better outcomes through medical innovation, indigenous manufacturing, and global partnerships.
          </p>
          
          <div className="flex justify-center mb-6 sm:mb-16">
            <LiquidButton size="lg" className="shadow-xl" onClick={() => navigate('/contact')}>
              Schedule A Call <ArrowRight className="w-4 h-4 ml-2" />
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}
