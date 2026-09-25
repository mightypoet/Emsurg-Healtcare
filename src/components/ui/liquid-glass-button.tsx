"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidbuttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 outline-none select-none relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-white/95 via-sky-50/90 to-sky-100/70 text-sky-900 border border-sky-200/80 shadow-[0_2px_10px_rgba(2,132,199,0.1),inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-xl hover:shadow-[0_6px_22px_rgba(2,132,199,0.2)] hover:border-sky-300/90 active:scale-95",
        primary:
          "bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 text-white font-bold border border-sky-300/80 shadow-[0_0_8px_rgba(2,132,199,0.25),0_6px_20px_rgba(2,132,199,0.35),inset_1.5px_1.5px_1px_rgba(255,255,255,0.7)] backdrop-blur-xl hover:shadow-[0_8px_25px_rgba(2,132,199,0.45)] hover:from-sky-400 hover:to-sky-500 active:scale-95",
        outline:
          "border border-sky-200/90 bg-white/75 hover:bg-sky-50/90 text-sky-800 shadow-[0_2px_8px_rgba(2,132,199,0.08),inset_1px_1px_1px_rgba(255,255,255,0.85)] backdrop-blur-xl hover:border-sky-300 hover:shadow-[0_4px_12px_rgba(2,132,199,0.15)] active:scale-95",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-[11px]",
        lg: "h-11 px-7 text-xs",
        xl: "h-12 px-8 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function GlassFilter() {
  return (
    <svg className="hidden pointer-events-none absolute" aria-hidden="true">
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  asChild?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    // When asChild is true, Slot MUST receive exactly one single React element child.
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(liquidbuttonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    // Standard button element with specular highlights and glass filter
    return (
      <button
        ref={ref}
        className={cn(liquidbuttonVariants({ variant, size }), className)}
        {...props}
      >
        {/* Specular Edge Highlights */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300
          bg-white/20 hover:bg-white/35
          border border-white/40
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(2,132,199,0.06)]"
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        <GlassFilter />
      </button>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

// Backward compatibility alias exports
const Button = LiquidButton;
const buttonVariants = liquidbuttonVariants;
export { Button, buttonVariants, liquidbuttonVariants };
