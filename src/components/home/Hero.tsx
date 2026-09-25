import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LiquidButton } from "../ui/liquid-glass-button";

export default function Hero() {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center text-white pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden bg-slate-950">
      {/* Background Video with Smooth Fade-In */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-700 ease-out ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source
          src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/emsurgvideo-opshot.mp4"
          type="video/mp4"
        />
      </video>

      {/* Airy Surgical Ambient Gradient & Radials */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-sky-950/30 to-slate-950/75 pointer-events-none z-10" />
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.2), transparent 70%)"
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto mt-4 sm:mt-12">
          {/* Luminous Surgical Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-semibold uppercase tracking-[0.25em] mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            INDIGENOUS MEDTECH & SURGICAL INNOVATION
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] text-white mb-4 sm:mb-6">
            Advance reliable and<br className="hidden sm:inline" /> trustworthy healthcare.
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium leading-relaxed px-2">
            Engineering better outcomes through medical innovation, indigenous manufacturing, and global partnerships.
          </p>

          <div className="flex justify-center mb-6 sm:mb-16">
            <LiquidButton
              variant="primary"
              size="lg"
              onClick={() => navigate("/contact")}
              className="gap-2.5 shadow-xl shadow-sky-500/30"
            >
              <span>Schedule A Call</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}
