import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LiquidButton } from "../ui/liquid-glass-button";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-center text-white pt-36 pb-20 overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/10661569-uhd_3840_2160_30fps-compressed%20%281%29.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
            Advance reliable and<br/>trustworthy healthcare.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Engineering better outcomes through medical innovation, indigenous manufacturing, and global partnerships.
          </p>
          
          <div className="flex justify-center mb-16">
            <LiquidButton size="lg" className="shadow-xl" onClick={() => navigate('/contact')}>
              Schedule A Call <ArrowRight className="w-4 h-4 ml-2" />
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}
