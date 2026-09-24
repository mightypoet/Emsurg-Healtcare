import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronUp, ChevronDown, Play, Pause, ExternalLink } from "lucide-react";

export interface ArgentProduct {
  id: string;
  name: string;
  category: string;
  subheading: string;
  description: string;
  image: string;
  link: string;
  specs: { label: string; value: string }[];
}

export const DEFAULT_ARGENT_PRODUCTS: ArgentProduct[] = [
  {
    id: "bonesurg",
    name: "BoneSurg HA / CR",
    category: "Orthobiologics",
    subheading: "Biphasic Synthetic Bone Graft Substitute",
    description: "Engineered with 60% Hydroxyapatite and 40% Beta-TCP, featuring 70% interconnected microporosity for accelerated osteogenesis.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2000&q=80",
    link: "/products?category=Orthobiologics",
    specs: [
      { label: "Composition", value: "60% HA / 40% β-TCP" },
      { label: "Porosity", value: "70% Interconnected" },
      { label: "Resorption", value: "Controlled 6-12 mos" },
    ],
  },
  {
    id: "emvac",
    name: "EM-VAC NPWT System",
    category: "Wound Management",
    subheading: "Micro-Precision Negative Pressure Therapy",
    description: "Active exudate evacuation from -20 to -200 mmHg with digital micro-leak detection and sterile hydro-retentive dressings.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=2000&q=80",
    link: "/products?category=Wound%20Management",
    specs: [
      { label: "Pressure Range", value: "-20 to -200 mmHg" },
      { label: "Safety Alert", value: "Digital Micro-Leak Detection" },
      { label: "Autonomy", value: "48h Continuous Battery" },
    ],
  },
  {
    id: "puredial",
    name: "PureDial Solutions",
    category: "Nephro Care",
    subheading: "High-Purity Hemodialysis Concentrates",
    description: "Ultra-pure pyrogen-free hemodialysis liquid concentrates and dry cartridge formulations certified to European Pharmacopoeia standards.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80",
    link: "/products?category=Nephro%20Care",
    specs: [
      { label: "Quality Grade", value: "Ph. Eur. / USP Compliant" },
      { label: "Cleanroom", value: "ISO Class 5 Sterile Processing" },
      { label: "Configurations", value: "Liquid & Dry Cartridges" },
    ],
  },
  {
    id: "opacity",
    name: "OPACITY+ PMMA",
    category: "Bone Cements & Biopsy",
    subheading: "High-Radiopacity Acrylic Bone Cement",
    description: "Optimized monomer viscosity and high barium sulfate formulation providing outstanding surgical handling and verified mechanical fatigue strength.",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=2000&q=80",
    link: "/products?category=Bone%20Cements",
    specs: [
      { label: "Radiopacity", value: "High-Contrast Barium Sulfate" },
      { label: "Setting Kinetics", value: "Controlled Surgical Window" },
      { label: "Standard", value: "ISO 5833 Certified" },
    ],
  },
  {
    id: "mdl",
    name: "MDL Biopsy Systems",
    category: "Interventional Devices",
    subheading: "Echogenic Coaxial Bone & Soft Tissue Needles",
    description: "Ultra-sharp cutting cannula engineered with calibrated depth markers and high-reflectivity echogenic tips for guided fluoroscopic biopsy.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80",
    link: "/products?category=Bone%20Cements",
    specs: [
      { label: "Cannula", value: "Medical Grade 304 Stainless" },
      { label: "Guidance", value: "Laser Echogenic Tip" },
      { label: "Ergonomics", value: "One-Hand Snap Mechanism" },
    ],
  },
];

interface ArgentLoopInfiniteSliderProps {
  products?: ArgentProduct[];
  autoPlayInterval?: number;
}

export const ArgentLoopInfiniteSlider: React.FC<ArgentLoopInfiniteSliderProps> = ({
  products = DEFAULT_ARGENT_PRODUCTS,
  autoPlayInterval = 5500,
}) => {
  const count = products.length;
  const [targetProgress, setTargetProgress] = useState<number>(0);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [itemHeight, setItemHeight] = useState<number>(250);

  useEffect(() => {
    const updateSize = () => {
      setItemHeight(window.innerWidth <= 768 ? 200 : 250);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTouchYRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const autoPlayTimerRef = useRef<number | null>(null);

  // Smooth lerp physics for progressive scroll
  useEffect(() => {
    let active = true;
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const animate = () => {
      if (!active) return;
      setCurrentProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.0005) {
          return targetProgress;
        }
        return lerp(prev, targetProgress, 0.09);
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetProgress]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || isHovered) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = window.setInterval(() => {
      setTargetProgress((prev) => prev + 1);
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, isHovered, autoPlayInterval]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setTargetProgress((prev) => Math.round(prev) + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setTargetProgress((prev) => Math.round(prev) - 1);
  }, []);

  const handleJumpToIndex = (index: number) => {
    const activeMod = ((Math.round(targetProgress) % count) + count) % count;
    let diff = index - activeMod;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    setTargetProgress((prev) => Math.round(prev) + diff);
  };

  // Wheel interaction with boundary dampening
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) < 10) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    setTargetProgress((prev) => Math.round(prev) + delta);
  };

  // Touch and drag interactions
  const handleTouchStart = (e: React.TouchEvent) => {
    lastTouchYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (lastTouchYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = lastTouchYRef.current - currentY;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      lastTouchYRef.current = currentY;
    }
  };

  const handleTouchEnd = () => {
    lastTouchYRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastTouchYRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || lastTouchYRef.current === null) return;
    const diff = lastTouchYRef.current - e.clientY;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      lastTouchYRef.current = e.clientY;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    lastTouchYRef.current = null;
  };

  // Active product index for details overlay
  const activeNormalizedIndex = ((Math.round(currentProgress) % count) + count) % count;
  const activeProduct = products[activeNormalizedIndex] || products[0];

  return (
    <div
      ref={containerRef}
      className="parallax-container relative"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDraggingRef.current = false;
      }}
      aria-label="Flagship medical devices and pharmaceutical systems interactive slider"
    >
      {/* 1. Main Parallax Project Slides */}
      <ul className="project-list" aria-hidden="true">
        {products.map((product, i) => {
          // Wrapped continuous offset
          const offset = ((((i - (currentProgress % count) + count + count / 2) % count) - count / 2));
          // Slide translateY (-100% to +100%)
          const slideY = offset * 100;
          // Inner image parallax (moves in opposite direction to create depth)
          const imgY = -offset * 32;

          return (
            <li
              key={product.id}
              className="project"
              style={{
                transform: `translate3d(0, ${slideY}%, 0)`,
                visibility: Math.abs(offset) > 1.8 ? "hidden" : "visible",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  transform: `translate3d(0, ${imgY}%, 0) scale(1.15)`,
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=2000&q=80";
                }}
              />
              {/* Subtle dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-slate-950/70 pointer-events-none" />
            </li>
          );
        })}
      </ul>

      {/* 2. Left Side Foreground Hero & Technical Specifications */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-16 max-w-4xl pointer-events-none">
        {/* Top Header Tag */}
        <div className="pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            FLAGSHIP CLINICAL PORTFOLIO
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 tracking-wide">
            Next-generation orthobiologics, negative pressure wound therapy, and dialysis solutions.
          </p>
        </div>

        {/* Center Details of Active Item */}
        <div className="my-auto pt-8 pb-12 pointer-events-auto transition-all duration-300">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-3 block">
            {activeProduct.category}
          </span>
          <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight mb-3">
            {activeProduct.name}
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-medium max-w-xl mb-4">
            {activeProduct.subheading}
          </p>
          <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed mb-8 hidden sm:block">
            {activeProduct.description}
          </p>

          {/* Technical Spec Pills */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8">
            {activeProduct.specs.map((spec, sIdx) => (
              <div
                key={sIdx}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900/70 backdrop-blur-md border border-white/10 text-white text-xs flex items-center gap-2"
              >
                <span className="text-slate-400 font-normal">{spec.label}:</span>
                <span className="font-semibold text-sky-300">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Action CTA Link */}
          <div className="flex items-center gap-4">
            <Link
              to={activeProduct.link}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-sky-50 text-slate-900 font-semibold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl hover:translate-x-0.5"
            >
              <span>Explore Product</span>
              <ArrowRight className="w-4 h-4 text-sky-600" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-medium tracking-wide uppercase transition-colors"
            >
              <span>All Products</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </Link>
          </div>
        </div>

        {/* Bottom Controls Strip */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-6">
            {/* Slide Index Counter */}
            <div className="text-white font-mono text-sm tracking-widest flex items-baseline gap-1">
              <span className="text-sky-400 font-bold text-lg">
                {String(activeNormalizedIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400 text-xs">
                {String(count).padStart(2, "0")}
              </span>
            </div>

            {/* Quick Dot Indicators */}
            <div className="flex items-center gap-1.5">
              {products.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleJumpToIndex(dotIdx)}
                  aria-label={`Jump to product ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIdx === activeNormalizedIndex
                      ? "w-8 bg-sky-400"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Slider Play/Pause & Direction Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
              aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
              aria-label="Previous product"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
              aria-label="Next product"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Floating Interactive Minimap Index */}
      <aside
        className="minimap"
        aria-label="Product minimap navigation"
        role="region"
      >
        <div className="minimap-wrapper">
          {/* Left 55%: Info list translating with scroll progress */}
          <div className="minimap-info-list">
            {products.map((item, i) => {
              const offset = ((((i - (currentProgress % count) + count + count / 2) % count) - count / 2));
              const translateY = offset * itemHeight;

              return (
                <div
                  key={item.id}
                  className="minimap-item-info cursor-pointer"
                  onClick={() => handleJumpToIndex(i)}
                  style={{
                    transform: `translate3d(0, ${translateY}px, 0)`,
                    visibility: Math.abs(offset) > 1.2 ? "hidden" : "visible",
                  }}
                >
                  <div className="minimap-item-info-row">
                    <p>{String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</p>
                    <p>{item.name}</p>
                  </div>
                  <div className="minimap-item-info-row">
                    <p>{item.category}</p>
                  </div>
                  <div className="minimap-item-info-row">
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 45%: Image preview translating in sync */}
          <div className="minimap-img-preview">
            {products.map((item, i) => {
              const offset = ((((i - (currentProgress % count) + count + count / 2) % count) - count / 2));
              const translateY = offset * itemHeight;

              return (
                <div
                  key={item.id}
                  className="minimap-img-item cursor-pointer"
                  onClick={() => handleJumpToIndex(i)}
                  style={{
                    transform: `translate3d(0, ${translateY}px, 0)`,
                    visibility: Math.abs(offset) > 1.2 ? "hidden" : "visible",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ArgentLoopInfiniteSlider;
