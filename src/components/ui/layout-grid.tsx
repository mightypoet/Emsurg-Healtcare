import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export type Card = {
  id: number | string;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
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
        <div key={i} className={cn(card.className, "min-h-[280px] md:min-h-[340px]")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden cursor-pointer",
              selected?.id === card.id
                ? "rounded-2xl cursor-pointer fixed inset-4 md:inset-20 z-50 flex justify-center items-center flex-wrap flex-col shadow-2xl"
                : lastSelected?.id === card.id
                ? "z-40 bg-slate-900 rounded-2xl h-full w-full shadow-md"
                : "bg-slate-900 rounded-2xl h-full w-full shadow-md hover:shadow-lg transition-shadow"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity",
          selected?.id ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      className="object-cover object-center absolute inset-0 h-full w-full transition duration-300 group-hover:scale-105"
      alt="Emsurg facility & clinical operations"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent h-full w-full flex flex-col justify-end rounded-2xl p-6 md:p-10 relative z-[60]">
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
