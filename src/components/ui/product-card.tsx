import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, type HTMLMotionProps } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ProductHighlightCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  categoryIcon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  slug?: string;
  accentGlow?: string;
  badge?: string;
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  (
    {
      className,
      categoryIcon,
      category,
      title,
      description,
      imageSrc,
      imageAlt,
      slug,
      accentGlow = "rgba(14, 165, 233, 0.45)",
      badge,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(175);
    const mouseY = useMotionValue(200);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    // Responsive 3D tilt with heavy smooth spring
    const rotateX = useTransform(mouseY, [0, 420], [8, -8]);
    const rotateY = useTransform(mouseX, [0, 360], [-8, 8]);

    const springConfig = { stiffness: 280, damping: 22 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    // Dynamic radial glow tracking cursor
    const glowBackground = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, ${accentGlow}, transparent 75%)`;

    const productHref = slug
      ? slug.startsWith("/") || slug.startsWith("?")
        ? slug
        : `/products/${slug}`
      : "/products";

    return (
      <div className="relative group perspective-[1000px] w-full max-w-[360px] mx-auto">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            mouseX.set(175);
            mouseY.set(200);
          }}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          className={cn(
            "relative h-[420px] w-full rounded-3xl p-3 select-none",
            // Liquid Glass styling with frosted backdrop
            "bg-gradient-to-b from-slate-900/95 via-slate-900/98 to-slate-950",
            "border border-white/10 backdrop-blur-2xl shadow-2xl transition-shadow duration-300",
            "hover:shadow-[0_20px_50px_rgba(14,165,233,0.25)] hover:border-white/20",
            className
          )}
          {...props}
        >
          {/* Dynamic Interactive Cursor Glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-transform"
            style={{
              background: glowBackground,
            }}
          />

          {/* Ambient Top Light Line */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Inner 3D Container with Elevated Depth */}
          <div
            style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
            className="relative h-full w-full rounded-2xl bg-white/[0.03] border border-white/10 p-5 flex flex-col justify-between overflow-hidden shadow-inner backdrop-blur-md"
          >
            {/* Top Row: Category Badge & Icon */}
            <div
              style={{ transform: "translateZ(30px)" }}
              className="flex items-center justify-between gap-2 z-10"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-sky-400 shadow-sm backdrop-blur-md">
                  {categoryIcon}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                  {category}
                </span>
              </div>
              {badge && (
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>

            {/* Middle: Floating Product Image with 3D Pop */}
            <div
              style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
              className="relative w-full h-[175px] my-2 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 group/img"
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Row: Product Title, Description & Action */}
            <div
              style={{ transform: "translateZ(35px)" }}
              className="z-10 flex flex-col gap-1.5"
            >
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-sky-300 transition-colors line-clamp-1">
                {title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {description}
              </p>

              <div className="pt-3 mt-1 border-t border-white/10 flex items-center justify-between">
                <Link
                  to={productHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 uppercase tracking-wider group/link transition-colors"
                >
                  <span>Clinical Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>

                <Link
                  to={productHref}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-sky-500/20 hover:text-sky-300 border border-white/15 flex items-center justify-center text-slate-300 transition-all active:scale-95"
                  aria-label={`View details for ${title}`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
