import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per browser session
    const hasSeen = sessionStorage.getItem("emsurg_preloader_shown");
    if (hasSeen) {
      return;
    }

    setIsVisible(true);
    // Lock document scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress timer over 1.8s
    const startTime = Date.now();
    const duration = 1800; // 1.8s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Small pause at 100% before exit transition
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = originalOverflow || "";
          sessionStorage.setItem("emsurg_preloader_shown", "true");
          if (onComplete) onComplete();
        }, 250);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow || "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="emsurg-preloader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] select-none pointer-events-auto overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at center, rgba(14, 165, 233, 0.12) 0%, rgba(3, 7, 18, 0.95) 55%, #030712 100%)",
          }}
        >
          {/* Subtle Ambient Surgical Grid / Glow Accents */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[60px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Emsurg Logo Container with Glow & Light Reflection */}
            <div className="relative mb-6">
              {/* Outer soft aura */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.6, 0.4],
                  scale: [0.85, 1.05, 1],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 -m-4 bg-sky-400/20 rounded-full blur-xl pointer-events-none"
              />

              {/* Logo with scale, blur, and opacity animation */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0, filter: "blur(10px)" }}
                animate={{
                  scale: [0.85, 1, 1.02, 1],
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.4,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.6, 0.85, 1],
                }}
                className="relative overflow-hidden rounded-2xl p-2"
              >
                <img
                  src="/emsurg-logo.png"
                  alt="Emsurg Healthcare"
                  className="h-16 sm:h-20 w-auto object-contain brightness-0 invert drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                  onError={(e) => {
                    // Fallback to remote blob asset
                    (e.target as HTMLImageElement).src =
                      "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/logo%20%282%29.png";
                  }}
                />

                {/* Sweeping light sheen across the logo */}
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    delay: 0.3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Brand Typography */}
            <motion.div
              initial={{ opacity: 0, y: 8, letterSpacing: "0.2em" }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "0.32em",
              }}
              transition={{
                duration: 1.1,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-white font-bold text-lg sm:text-xl uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] ml-[0.32em]"
            >
              EMSURG
            </motion.div>

            {/* Medical Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.45,
                ease: "easeOut",
              }}
              className="mt-2 text-sky-400/80 text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase ml-[0.3em]"
            >
              Advancing Healthcare with Innovation
            </motion.div>

            {/* Minimal Clean Precision Medical Progress Bar */}
            <div className="w-48 sm:w-56 h-[2px] bg-slate-800/80 rounded-full overflow-hidden mt-6 relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
