import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText } from "lucide-react";
import ProductInquiryModal from "./modals/ProductInquiryModal";
import { Product } from "../lib/productsStore";
import { LiquidButton } from "./ui/liquid-glass-button";

export default function FloatingActionBar() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);

  // Global event listener to allow any button to open the unified inquiry modal
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<Product | null>;
      setInquiryProduct(customEvent.detail || null);
      setIsInquiryOpen(true);
    };

    window.addEventListener("open-inquiry-modal", handleOpen);
    return () => {
      window.removeEventListener("open-inquiry-modal", handleOpen);
    };
  }, []);

  return (
    <>
      {/* Desktop Floating Pill Dock */}
      <div className="hidden lg:flex fixed right-6 bottom-8 flex-col space-y-3 z-40 items-end">
        {/* Unified Action Pill: Inquire (Navbar Style) */}
        <LiquidButton
          variant="primary"
          size="default"
          onClick={() => {
            setInquiryProduct(null);
            setIsInquiryOpen(true);
          }}
          className="gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg"
        >
          <span>Inquire</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </LiquidButton>

        {/* Secondary Pill: Browse Products Catalog */}
        <Link 
          to="/products" 
          className="flex items-center space-x-3 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-lg shadow-sky-100 border border-sky-100 hover:border-sky-200 hover:bg-sky-50/70 text-slate-700 hover:text-sky-700 transition-all duration-300 group"
        >
          <span className="text-xs font-bold tracking-wide">Catalog Specs</span>
          <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-100 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Mobile Bottom Bar (Thumb-Zone Ergonomics & Safe Area) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-sky-100 shadow-[0_-4px_16px_rgba(2,132,199,0.06)] z-40 flex items-center h-16 pb-safe">
        {/* Consolidated Unified Mobile Button (Navbar Style) */}
        <button 
          type="button"
          onClick={() => {
            setInquiryProduct(null);
            setIsInquiryOpen(true);
          }}
          className="flex-[1.4] h-full min-h-[44px] text-center text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 active:from-sky-500 active:to-sky-700 flex items-center justify-center gap-1.5 transition-all shadow-xs px-2 cursor-pointer border-r border-sky-400/40"
        >
          <span>Inquire</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* Products Catalog Tab */}
        <Link 
          to="/products" 
          className="flex-1 h-full min-h-[44px] text-center text-[11px] font-semibold text-slate-800 bg-slate-50 active:bg-slate-100 border-l border-slate-200/80 flex flex-col items-center justify-center transition-colors hover:text-sky-700"
        >
          <FileText className="w-4 h-4 mb-0.5 text-sky-600 shrink-0" />
          <span>Products</span>
        </Link>
      </div>

      {/* Global Product Inquiry Modal Mounted Here */}
      <ProductInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={inquiryProduct}
      />
    </>
  );
}
