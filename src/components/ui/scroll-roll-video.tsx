import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Plus,
  X,
  Volume2,
  VolumeX,
  Layers,
  Activity,
  Droplets,
  Bone,
} from "lucide-react";

export interface Chapter {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  certifications: string;
  categoryLink: string;
  categoryName: string;
  hotspot: { x: number; y: number };
  icon: typeof Bone;
}

const CHAPTERS: Chapter[] = [
  {
    id: "bonesurg",
    number: "01",
    title: "BONE GRAFT SYNTHESIS",
    tagline: "BoneSurg HA / CR Nanocrystalline Synthesis",
    description:
      "Precision synthetic nanocrystalline hydroxyapatite and bio-resorbable calcium sulphate matrices engineered for physician-directed antibiotic delivery and osteoconductive bone defect regeneration.",
    specs: [
      "100% Synthetic Biphasic Crystal Matrix",
      "Controlled Resorption Curve (4–12 Weeks)",
      "Room-Temperature Injectable Compounding",
    ],
    certifications: "CDSCO Class C Approved · ISO 13485:2016",
    categoryLink: "/products?category=Orthobiologics",
    categoryName: "Explore Orthobiologics",
    hotspot: { x: 28, y: 38 },
    icon: Bone,
  },
  {
    id: "emvac",
    number: "02",
    title: "STERILE NPWT AUTOMATION",
    tagline: "EM-VAC Digital Pressure Regulation",
    description:
      "Microprocessor-controlled negative pressure wound therapy systems with reticulated medical-grade polyurethane foam dressings for enhanced micro-deformation and accelerated granulation tissue formation.",
    specs: [
      "Wide Dynamic Vacuum (-20 to -200 mmHg)",
      "Dual Continuous Pressure Monitoring Transducers",
      "Hydrophobic Sterile Exudate Canister System",
    ],
    certifications: "CE Certified · Class IIb Medical Device",
    categoryLink: "/products?category=Wound%20Management",
    categoryName: "Explore Wound Care",
    hotspot: { x: 50, y: 64 },
    icon: Activity,
  },
  {
    id: "dialysis",
    number: "03",
    title: "HIGH-PURITY RENAL FLUIDS",
    tagline: "Sub-Micron RO Filtration & Automated Formulation",
    description:
      "Pharmaceutical-grade hemodialysis acid and dry sodium bicarbonate concentrate systems manufactured inside automated Class 10,000 cleanrooms under strict stoichiometry controls.",
    specs: [
      "Double-Pass CEDI Ultra-Pure Water Loop",
      "Dry Bicarbonate Hermetic Cartridge Sealing",
      "Non-Pyrogenic Endotoxin Release Validation",
    ],
    certifications: "BP & IP Pharmacopeial Compliance · CDSCO Approved",
    categoryLink: "/products?category=Nephro%20Care",
    categoryName: "Explore Nephrology",
    hotspot: { x: 74, y: 40 },
    icon: Droplets,
  },
];

interface ScrollRollVideoProps {
  videoSrc?: string;
}

export function ScrollRollVideo({
  videoSrc = "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/emsurgvideo-opshot.mp4",
}: ScrollRollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState<string>("bonesurg");
  const [isMuted, setIsMuted] = useState(true);
  const [showDetailCard, setShowDetailCard] = useState(true);

  // Scroll tracking across container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Dynamic transforms: scale, tilt, curvature, and ambient glow
  const scale = useTransform(scrollYProgress, [0.1, 0.45, 0.8], [0.84, 0.96, 1]);
  const rotateX = useTransform(scrollYProgress, [0.1, 0.45, 0.75], [10, 3, 0]);
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.45, 0.75], [44, 32, 22]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0.2, 0.5, 0.8]);
  const glowScale = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0.85, 1.1, 1.25]);

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 my-8 sm:my-14 perspective-[1200px]"
    >
      {/* Dynamic Radial Ambient Back-Glow */}
      <motion.div
        style={{
          opacity: glowOpacity,
          scale: glowScale,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-[80%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.35),rgba(2,132,199,0.12)_45%,transparent_70%)] blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Chapter Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-xl border border-sky-100 shadow-[0_8px_30px_rgba(2,132,199,0.06)] rounded-2xl p-2 sm:p-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {CHAPTERS.map((chap) => {
            const Icon = chap.icon;
            const isActive = activeChapterId === chap.id;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => {
                  setActiveChapterId(chap.id);
                  setShowDetailCard(true);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "text-slate-600 hover:text-sky-700 hover:bg-sky-50/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-sky-500"}`} />
                <span>CH {chap.number}</span>
                <span className="hidden md:inline text-[11px] opacity-90">· {chap.title}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-sky-700 font-mono pr-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>CDSCO & ISO 13485 CERTIFIED</span>
        </div>
      </div>

      {/* Animated Central Capsule / Pill Video Window */}
      <motion.div
        style={{
          scale,
          rotateX,
          borderRadius,
        }}
        className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden bg-slate-950 border border-sky-200/80 shadow-2xl shadow-sky-100 select-none group transform-gpu will-change-transform"
      >
        {/* Background Surgical Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Cinematic Film Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50 pointer-events-none" />

        {/* Audio Toggle Control */}
        <button
          type="button"
          onClick={toggleSound}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-md border border-sky-100 transition-all shadow-md hover:scale-105"
          aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
        </button>

        {/* Top-Left Live Indicator */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-sky-100 text-slate-800 text-[11px] font-semibold tracking-wider uppercase shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
          <span className="text-sky-700">Cleanroom Operations</span>
        </div>

        {/* Interactive Hotspot Pins Overlaid on the Video */}
        {CHAPTERS.map((chap) => {
          const isActive = activeChapterId === chap.id;
          return (
            <div
              key={chap.id}
              style={{
                left: `${chap.hotspot.x}%`,
                top: `${chap.hotspot.y}%`,
              }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveChapterId(chap.id);
                  setShowDetailCard(true);
                }}
                className={`group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "bg-sky-500 text-white scale-110 shadow-[0_0_20px_rgba(14,165,233,0.8)]"
                    : "bg-white/90 text-sky-600 border border-sky-300 hover:bg-sky-500 hover:text-white hover:scale-105 shadow-md"
                }`}
                aria-label={`View clinical specification for ${chap.title}`}
              >
                {/* Radar pulse ring */}
                <span
                  className={`absolute inset-0 rounded-full animate-ping pointer-events-none opacity-60 ${
                    isActive ? "bg-sky-400" : "bg-sky-400/30"
                  }`}
                />
                <Plus className={`w-4 h-4 transition-transform duration-200 ${isActive ? "rotate-45" : "group-hover:rotate-90"}`} />
              </button>

              {/* Pin Tag Label */}
              <div
                className={`hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase whitespace-nowrap backdrop-blur-md border transition-all pointer-events-none ${
                  isActive
                    ? "bg-white/95 text-sky-700 border-sky-300 shadow-md font-bold"
                    : "bg-slate-900/80 text-white border-white/10 opacity-70 group-hover:opacity-100"
                }`}
              >
                {chap.title}
              </div>
            </div>
          );
        })}

        {/* Floating Clinical Telemetry Glass Card Overlay */}
        <AnimatePresence mode="wait">
          {showDetailCard && activeChapter && (
            <motion.div
              key={activeChapter.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-white/95 backdrop-blur-2xl border border-sky-100 rounded-2xl p-4 sm:p-5 text-slate-900 shadow-2xl shadow-sky-950/15"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-700 border border-sky-200/70">
                    Chapter {activeChapter.number}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {activeChapter.certifications.split("·")[0]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDetailCard(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
                  aria-label="Dismiss detail card"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-1">
                {activeChapter.tagline}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3">
                {activeChapter.description}
              </p>

              {/* Technical Specs List */}
              <div className="space-y-1 mb-4 hidden sm:block">
                {activeChapter.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                <div className="text-[10px] font-mono text-slate-400">
                  {activeChapter.certifications}
                </div>
                <Link
                  to={activeChapter.categoryLink}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  {activeChapter.categoryName}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
