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
  variant?: "dark" | "light";
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
      variant = "dark",
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

    const isLight = variant === "light";

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
            "relative h-[420px] w-full rounded-3xl p-3 select-none transition-shadow duration-300",
            isLight
              ? "bg-gradient-to-b from-white via-slate-50 to-slate-100/90 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(14,165,233,0.16)] hover:border-sky-300/80"
              : "bg-gradient-to-b from-slate-900/95 via-slate-900/98 to-slate-950 border border-white/10 backdrop-blur-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(14,165,233,0.25)] hover:border-white/20",
            className
          )}
          {...props}
        >
          {/* Dynamic Interactive Cursor Glow */}
          <motion.div
            className={cn(
              "pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-transform",
              isLight ? "mix-blend-multiply" : ""
            )}
            style={{
              background: glowBackground,
            }}
          />

          {/* Ambient Top Light Line */}
          <div
            className={cn(
              "absolute top-0 inset-x-8 h-[1px] pointer-events-none",
              isLight
                ? "bg-gradient-to-r from-transparent via-white to-transparent"
                : "bg-gradient-to-r from-transparent via-white/25 to-transparent"
            )}
          />

          {/* Inner 3D Container with Elevated Depth */}
          <div
            style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
            className={cn(
              "relative h-full w-full rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-inner backdrop-blur-md",
              isLight
                ? "bg-white/80 border border-slate-200/60"
                : "bg-white/[0.03] border border-white/10"
            )}
          >
            {/* Top Row: Category Badge & Icon */}
            <div
              style={{ transform: "translateZ(30px)" }}
              className="flex items-center justify-between gap-2 z-10"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shadow-xs backdrop-blur-md",
                    isLight
                      ? "bg-sky-50 border border-sky-100 text-sky-600"
                      : "bg-white/10 border border-white/15 text-sky-400"
                  )}
                >
                  {categoryIcon}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-widest",
                    isLight ? "text-slate-500" : "text-slate-300"
                  )}
                >
                  {category}
                </span>
              </div>
              {badge && (
                <span
                  className={cn(
                    "text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                    isLight
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                  )}
                >
                  {badge}
                </span>
              )}
            </div>

            {/* Middle: Floating Product Image with 3D Pop */}
            <div
              style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
              className={cn(
                "relative w-full h-[175px] my-2 flex items-center justify-center overflow-hidden rounded-xl group/img",
                isLight
                  ? "bg-slate-50 border border-slate-100"
                  : "bg-gradient-to-b from-white/5 to-transparent border border-white/5"
              )}
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
              <div
                className={cn(
                  "absolute inset-0 pointer-events-none",
                  isLight
                    ? "bg-gradient-to-t from-black/10 via-transparent to-transparent"
                    : "bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
                )}
              />
            </div>

            {/* Bottom Row: Product Title, Description & Action */}
            <div
              style={{ transform: "translateZ(35px)" }}
              className="z-10 flex flex-col gap-1.5"
            >
              <h3
                className={cn(
                  "text-base sm:text-lg font-bold tracking-tight leading-snug line-clamp-1 transition-colors",
                  isLight
                    ? "text-slate-900 group-hover:text-sky-600"
                    : "text-white group-hover:text-sky-300"
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "text-xs line-clamp-2 leading-relaxed",
                  isLight ? "text-slate-600" : "text-slate-400"
                )}
              >
                {description}
              </p>

              <div
                className={cn(
                  "pt-3 mt-1 border-t flex items-center justify-between",
                  isLight ? "border-slate-100" : "border-white/10"
                )}
              >
                <Link
                  to={productHref}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider group/link transition-colors",
                    isLight
                      ? "text-sky-600 hover:text-sky-700"
                      : "text-sky-400 hover:text-sky-300"
                  )}
                >
                  <span>Clinical Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>

                <Link
                  to={productHref}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-95",
                    isLight
                      ? "bg-slate-100 hover:bg-sky-50 hover:text-sky-600 border border-slate-200 text-slate-600"
                      : "bg-white/10 hover:bg-sky-500/20 hover:text-sky-300 border border-white/15 text-slate-300"
                  )}
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
