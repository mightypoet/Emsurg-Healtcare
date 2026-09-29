import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

export type Card = {
  id: string | number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
  title?: string;
  category?: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setSelected(card);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={cn(
          "w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6 relative justify-center",
          cards.length === 2 && "max-w-4xl md:grid-cols-2 lg:grid-cols-2",
          cards.length === 4 && "max-w-5xl md:grid-cols-2 lg:grid-cols-2"
        )}
      >
        {cards.map((card, i) => {
          // If total is 5, center the last two items (index 3 and 4) in the 3-column desktop layout
          const is5Cards = cards.length === 5;
          const isLastTwoOf5 = is5Cards && (i === 3 || i === 4);

          return (
            <div
              key={card.id || i}
              className={cn(
                card.className,
                "w-full min-h-[260px] md:min-h-[320px] flex justify-center",
                isLastTwoOf5 && i === 3 && "lg:col-start-1 lg:translate-x-[50%]",
                isLastTwoOf5 && i === 4 && "lg:col-start-2 lg:translate-x-[50%]"
              )}
            >
              <div
                onClick={() => handleClick(card)}
                className="relative overflow-hidden cursor-pointer rounded-2xl group transition-all duration-300 h-full w-full bg-slate-900 shadow-sm hover:shadow-xl hover:scale-[1.01]"
              >
                {(card.title || card.category) && (
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-2px] flex flex-col items-center justify-center text-center">
                    {card.category && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/85 backdrop-blur-md text-sky-300 border border-slate-700/60 mb-1.5 shadow-sm text-center">
                        {card.category}
                      </span>
                    )}
                    {card.title && (
                      <h4 className="text-sm sm:text-base font-bold text-white drop-shadow-sm line-clamp-1 text-center">
                        {card.title}
                      </h4>
                    )}
                  </div>
                )}
                <ImageComponent card={card} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Image Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 sm:p-6 md:p-12 transition-opacity"
            onClick={closeModal}
          >
            {/* Modal Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col items-center justify-center w-full max-w-5xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute -top-12 right-0 md:-right-12 md:-top-4 text-white hover:text-sky-400 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full cursor-pointer z-10"
                aria-label="Close image modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Responsive Image and Details Frame */}
              <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-950/90 border border-slate-700/50 shadow-2xl max-w-full">
                <img
                  src={selected.thumbnail}
                  alt={selected.title || "Expanded view"}
                  referrerPolicy="no-referrer"
                  className="w-auto h-auto max-w-full max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] object-contain rounded-t-xl"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (!img.src.includes("unsplash.com")) {
                      img.src =
                        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80";
                    }
                  }}
                />

                {selected.content && (
                  <div className="w-full bg-slate-900/95 border-t border-slate-800/80 p-4 sm:p-5 text-left">
                    {selected.content}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <>
      <img
        src={card.thumbnail}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="object-cover object-center absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105"
        alt={card.title || "Emsurg Healthcare operations"}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          if (!img.src.includes("unsplash.com")) {
            img.src =
              "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1000&q=80";
          }
        }}
      />
      {/* Subtle bottom vignette for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-slate-950/90" />
    </>
  );
};
