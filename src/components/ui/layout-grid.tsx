import React, { useState } from "react";
import { motion } from "framer-motion";
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
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={card.id || i} className={cn(card.className, "min-h-[260px] md:min-h-[320px]")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden cursor-pointer rounded-2xl group transition-all duration-300",
              selected?.id === card.id
                ? "rounded-2xl cursor-pointer fixed inset-4 md:inset-16 z-50 flex justify-center items-center flex-wrap flex-col shadow-2xl bg-white dark:bg-slate-900"
                : lastSelected?.id === card.id
                ? "z-40 bg-slate-100 rounded-2xl h-full w-full shadow-sm"
                : "bg-slate-100 rounded-2xl h-full w-full shadow-sm hover:shadow-md"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && (
              <SelectedCard selected={selected} onClose={handleOutsideClick} />
            )}
            {selected?.id !== card.id && (card.title || card.category) && (
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-2px]">
                {card.category && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-blue-300 border border-slate-700/60 mb-1.5 shadow-sm">
                    {card.category}
                  </span>
                )}
                {card.title && (
                  <h4 className="text-sm sm:text-base font-bold text-white drop-shadow-sm line-clamp-1">
                    {card.title}
                  </h4>
                )}
              </div>
            )}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity",
          selected?.id ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <>
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        className="object-cover object-center absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105"
        alt="Emsurg Healthcare operations"
        onError={(e) => {
          // Fallback placeholder if drive links or remote URLs fail
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1000&q=80";
        }}
      />
      {/* Subtle bottom vignette to ensure clinical cards have depth on light layouts */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-slate-950/80" />
    </>
  );
};

const SelectedCard = ({
  selected,
  onClose,
}: {
  selected: Card | null;
  onClose?: () => void;
}) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-2xl shadow-2xl relative z-[60] overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.75,
        }}
        className="absolute inset-0 h-full w-full bg-slate-950/80 z-10"
      />
      {onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-[80] w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          title="Close details"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 60,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 60,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-6 py-6 md:px-10 md:py-8 z-[70] max-w-3xl"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
