import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronUp, ChevronDown, Play, Pause } from "lucide-react";

export interface SliderArticle {
  id: string | number;
  slug: string;
  title: string;
  image: string;
  category: string;
  year?: string;
  description: string;
}

interface ArgentLoopSliderProps {
  articles: SliderArticle[];
  title?: string;
  subtitle?: string;
}

export function ArgentLoopInfiniteSlider({
  articles,
  title = "Clinical Insights & Research",
  subtitle = "Original clinical trials, surgical protocols, and regulatory advancements.",
}: ArgentLoopSliderProps) {
  // Strictly bound to latest 5 articles
  const boundedArticles = React.useMemo(() => {
    return (articles || []).slice(0, 5);
  }, [articles]);

  const count = boundedArticles.length;
  const maxIndex = Math.max(0, Math.min(count - 1, 4));
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAutoPlayActive, setIsAutoPlayActive] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastStepTime = React.useRef(0);
  const touchStartY = React.useRef<number | null>(null);

  // If no articles provided, guard return
  if (count === 0) return null;

  // Safe navigation handlers
  const goToNext = React.useCallback(() => {
    setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const goToPrev = React.useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const goToIndex = (index: number) => {
    if (index >= 0 && index <= maxIndex) {
      setActiveIndex(index);
    }
  };

  // Autoplay timer that cleanly pauses on hover
  React.useEffect(() => {
    if (!isAutoPlayActive || isHovered || count <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [maxIndex, count, isHovered, isAutoPlayActive]);

  // Controlled Wheel & Touch Boundary Lock:
  // While scrolling over the slider, advance through blogs 1 to 5 exclusively without moving the rest of the homepage.
  // Once the boundaries are reached, let normal page scrolling resume smoothly!
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Check if we are within the lock range:
      // If scrolling down and we haven't reached the 5th blog (last index) -> lock page and advance blog
      // If scrolling up and we haven't reached the 1st blog (index 0) -> lock page and go to previous blog
      const canAdvance = isScrollingDown && activeIndex < maxIndex;
      const canGoBack = isScrollingUp && activeIndex > 0;

      if (canAdvance || canGoBack) {
        // Prevent the outer webpage from scrolling while cycling through blogs
        e.preventDefault();

        // Throttle step transitions by 420ms to avoid skipping multiple blogs in a single flick
        const now = Date.now();
        if (now - lastStepTime.current > 420) {
          lastStepTime.current = now;
          if (canAdvance) {
            setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
          } else if (canGoBack) {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }
        }
      }
      // If user is at blog 5 and continues scrolling down, do NOT call e.preventDefault() -> the page will naturally scroll down to the Facilities section.
      // If user is at blog 1 and scrolls up, do NOT call e.preventDefault() -> the page will naturally scroll up to Our Expertise.
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY; // positive = swipe up (scrolling down content)

      const isSwipingUp = deltaY > 30; // user wants to see next blog
      const isSwipingDown = deltaY < -30; // user wants to see previous blog

      const canAdvance = isSwipingUp && activeIndex < maxIndex;
      const canGoBack = isSwipingDown && activeIndex > 0;

      if (canAdvance || canGoBack) {
        if (e.cancelable) {
          e.preventDefault();
        }
        const now = Date.now();
        if (now - lastStepTime.current > 420) {
          lastStepTime.current = now;
          touchStartY.current = currentY;
          if (canAdvance) {
            setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
          } else if (canGoBack) {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }
        }
      }
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
    };

    // Use passive: false so e.preventDefault() reliably halts outer page scroll within boundary
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeIndex, maxIndex]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[580px] md:h-[680px] overflow-hidden select-none bg-[#090e17]"
    >
      {/* Top Header & Tag */}
      <div className="absolute top-6 sm:top-8 left-4 sm:left-8 z-30 pointer-events-none flex flex-col gap-1 max-w-sm sm:max-w-lg">
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-blue-400 uppercase drop-shadow-sm">
          CLINICAL PERSPECTIVES & RESEARCH
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight drop-shadow-md">
          {title}
        </h2>
        <p className="text-white/80 text-xs sm:text-sm font-normal line-clamp-2 mt-0.5 sm:mt-1 drop-shadow">
          {subtitle}
        </p>
      </div>

      {/* Top Right "All Articles" Link */}
      <div className="absolute top-6 sm:top-8 right-4 sm:right-8 z-30">
        <Link
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider transition-all shadow-lg active:scale-95"
          to="/blogs"
        >
          All Articles <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Background Bounded Slides with Smooth Heavy-Easing Transform */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {boundedArticles.map((article, idx) => {
          const isCurrent = idx === activeIndex;
          const offset = idx - activeIndex;

          return (
            <div
              key={article.id || idx}
              className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
              style={{
                transform: `translateY(${offset * 100}%)`,
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                style={{
                  transform: isCurrent ? "scale(1)" : "scale(1.15)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1800&q=85";
                }}
              />
              {/* High-Contrast Silver & Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e17] via-[#090e17]/50 to-[#090e17]/60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.18)_0%,transparent_60%)]" />
            </div>
          );
        })}
      </div>

      {/* Elegant Slide Indicators (Left Edge) */}
      <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
        {boundedArticles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className="group flex items-center gap-2 text-left transition-all py-1"
            title={`Go to slide ${idx + 1}`}
          >
            <div
              className={`h-6 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-1.5 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                  : "w-1 bg-white/20 group-hover:bg-white/50"
              }`}
            />
            <span
              className={`text-[10px] font-mono tracking-wider transition-colors ${
                idx === activeIndex
                  ? "text-blue-300 font-bold opacity-100"
                  : "text-white/40 group-hover:text-white/70 opacity-0 group-hover:opacity-100"
              }`}
            >
              {(idx + 1).toString().padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {/* Floating Interactive Minimap Card with Step Controls */}
      {/* Positioned on desktop to lg:right-60 / xl:right-64 so it never collides with fixed floating pill dock (right-6) */}
      <div className="absolute bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 lg:right-64 xl:right-72 z-25 max-w-sm sm:max-w-md lg:max-w-xl w-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 overflow-hidden flex flex-row h-[230px] sm:h-[250px]">
          {/* Thumbnail Preview Column */}
          <div className="w-28 sm:w-44 h-full relative overflow-hidden bg-slate-900 border-r border-slate-100 shrink-0">
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
              style={{
                transform: `translateY(-${activeIndex * 100}%)`,
              }}
            >
              {boundedArticles.map((article, idx) => (
                <div key={idx} className="w-full h-[230px] sm:h-[250px] relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <span className="absolute bottom-2.5 left-2.5 text-[9px] font-mono font-bold tracking-widest text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Info & Step Control Column */}
          <div className="flex-1 h-full p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative">
            {/* Top Bar: Category Pill & Step Navigation Buttons */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 truncate">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2 sm:px-2.5 py-0.5 rounded-full truncate">
                  {boundedArticles[activeIndex]?.category || boundedArticles[0]?.category || "Clinical Insights"}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold hidden sm:inline">
                  {boundedArticles[activeIndex]?.year || boundedArticles[0]?.year || "2025"}
                </span>
              </div>

              {/* Step Controls: Previous (↑) / Next (↓) & Counter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-mono font-bold text-slate-600 tracking-tight mr-1">
                  {(activeIndex + 1).toString().padStart(2, "0")}{" "}
                  <span className="text-slate-300 font-normal">/</span>{" "}
                  {(maxIndex + 1).toString().padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={activeIndex === 0}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all border border-slate-200/80 active:scale-95"
                  aria-label="Previous clinical insight"
                  title="Previous insight"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  disabled={activeIndex === maxIndex}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all border border-slate-200/80 active:scale-95"
                  aria-label="Next clinical insight"
                  title="Next insight"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sliding Article Title & Excerpt */}
            <div className="relative flex-1 overflow-hidden my-1">
              <div
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-full flex flex-col justify-center"
                style={{
                  transform: `translateY(-${activeIndex * 100}%)`,
                }}
              >
                {boundedArticles.map((article, idx) => (
                  <div key={idx} className="h-full flex flex-col justify-center shrink-0 py-1">
                    <h3
                      className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-blue-700 transition-colors"
                      title={article.title}
                    >
                      {article.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 mt-1 font-normal leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Action Link & Autoplay Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                to={boundedArticles[activeIndex]?.slug ? `/blogs/${boundedArticles[activeIndex]?.slug}` : "/blogs"}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider group transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Subtle Autoplay Indicator / Pause Toggle */}
              <button
                type="button"
                onClick={() => setIsAutoPlayActive((prev) => !prev)}
                className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-100"
                title={isAutoPlayActive ? "Pause autoplay" : "Resume autoplay"}
              >
                {isAutoPlayActive ? (
                  <>
                    <Pause className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>
            </div>

            {/* Subtle Autoplay Progress Line at bottom */}
            {isAutoPlayActive && !isHovered && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-100 overflow-hidden">
                <div
                  key={activeIndex}
                  className="h-full bg-blue-600 animate-[progress_6s_linear]"
                  style={{
                    animationDuration: "6000ms",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Hint / Safe Area Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 z-30 pointer-events-none text-white/60 text-[10px] sm:text-[11px] tracking-wider uppercase flex items-center gap-2 drop-shadow">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        Scroll to step through insights • Continues page scroll at boundaries
      </div>
    </div>
  );
}
