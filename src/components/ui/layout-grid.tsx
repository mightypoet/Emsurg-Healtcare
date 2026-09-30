import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { X, ZoomIn } from "lucide-react";

export type Card = {
  id: string | number;
  content?: React.ReactNode;
  className?: string;
  thumbnail: string;
  title?: string;
  category?: string;
};

export const LayoutGrid = ({ 
  cards,
  className 
}: { 
  cards: Card[];
  className?: string;
}) => {
  const [selected, setSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setSelected(card);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <>
      {/* Bento Board Masonry Grid - Preserving Original Aspect Ratios */}
      <div
        className={cn(
          "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full",
          cards.length <= 2 && "sm:columns-2 lg:columns-2 max-w-4xl",
          cards.length === 3 && "sm:columns-2 lg:columns-3 max-w-6xl",
          className
        )}
      >
        {cards.map((card, i) => {
          return (
            <div
              key={card.id || i}
              className="break-inside-avoid relative rounded-2xl overflow-hidden bg-white border border-sky-100 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 cursor-pointer group"
              onClick={() => handleClick(card)}
            >
              <div className="relative overflow-hidden w-full bg-slate-50 flex items-center justify-center">
                <img
                  src={card.thumbnail}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  alt={card.title || `Emsurg Facility & Operations ${i + 1}`}
                  className="w-full h-auto object-contain block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (!img.src.includes("unsplash.com")) {
                      img.src =
                        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1000&q=80";
                    }
                  }}
                />

                {/* Subtle Hover Lens Icon Indicator */}
                <div className="absolute inset-0 bg-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-sky-700 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Image Modal - Original Aspect Ratio Full View */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-6 md:p-10 transition-opacity"
            onClick={closeModal}
          >
            {/* Modal Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col items-center justify-center max-w-[94vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full cursor-pointer z-20 backdrop-blur-sm transition-colors"
                aria-label="Close image modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Responsive Image in True Original Aspect Ratio */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-2xl flex items-center justify-center">
                <img
                  src={selected.thumbnail}
                  alt={selected.title || "Expanded view"}
                  referrerPolicy="no-referrer"
                  className="w-auto h-auto max-w-[92vw] max-h-[86vh] object-contain rounded-2xl block"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (!img.src.includes("unsplash.com")) {
                      img.src =
                        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80";
                    }
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
