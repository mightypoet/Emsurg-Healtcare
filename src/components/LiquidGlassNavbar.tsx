import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ChevronDown, 
  Activity, 
  Phone, 
  ShieldCheck, 
  Bone, 
  Droplets, 
  Layers 
} from "lucide-react";
import { companyInfo } from "../data/content";

export default function LiquidGlassNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsHovered, setSolutionsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsHovered(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleExpertiseClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("our-expertise");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/about#expertise");
    }
  };

  return (
    <>
      {/* Floating Liquid Glass Navbar Container */}
      <header
        role="banner"
        className={`fixed top-4 inset-x-0 mx-auto z-50 w-[92%] max-w-6xl transition-all duration-300 ${
          isScrolled ? "top-3" : "top-4"
        }`}
      >
        <div
          className={`relative w-full rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/25 backdrop-blur-3xl border border-white/40 shadow-xl"
              : "bg-white/15 hover:bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg"
          } before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3`}
        >
          {/* 1. Brand (Left) */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded-full pr-1 sm:pr-2"
            aria-label="Emsurg Healthcare Home"
          >
            <div className="relative flex items-center">
              <img
                src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/logo%20%282%29.png"
                alt="Emsurg Healthcare"
                className="h-7 sm:h-8 md:h-8.5 w-auto object-contain brightness-0 invert drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden xl:flex flex-col text-left border-l border-white/30 pl-2.5">
              <span className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] font-semibold tracking-tight text-xs leading-tight">
                Emsurg Biomedical
              </span>
              <span className="text-white/80 text-[10px] tracking-wider uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] font-medium">
                Precision & Care
              </span>
            </div>
          </Link>

          {/* 2. Clean Minimal Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {/* Products Dropdown Link */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsHovered(true)}
              onMouseLeave={() => setSolutionsHovered(false)}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 group"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 group-hover:opacity-100 ${
                    solutionsHovered ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {/* Liquid Glass Dropdown Menu */}
              {solutionsHovered && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[580px] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-slate-950/90 backdrop-blur-3xl rounded-3xl border border-white/20 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] grid grid-cols-2 gap-4 text-left">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 px-2 block">
                        Indigenous Manufacturing
                      </span>
                      <Link
                        to="/products?category=Orthobiologics"
                        className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/10 transition-colors group/item"
                      >
                        <div className="w-7 h-7 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                          <Bone className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-sky-300 transition-colors">
                            Orthobiologics
                          </div>
                          <div className="text-[11px] text-slate-300">
                            BoneSurg CR & BoneSurg HA
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/products?category=Wound%20Management"
                        className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/10 transition-colors group/item"
                      >
                        <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-purple-300 transition-colors">
                            Wound Management
                          </div>
                          <div className="text-[11px] text-slate-300">
                            EM-VAC Digital NPWT System
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/products?category=Nephro%20Care"
                        className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/10 transition-colors group/item"
                      >
                        <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                          <Droplets className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-cyan-300 transition-colors">
                            Nephro Care
                          </div>
                          <div className="text-[11px] text-slate-300">
                            Dialysis Concentrates & Powders
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="space-y-2 border-l border-white/10 pl-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 block">
                        European Partnerships
                      </span>
                      <Link
                        to="/products?category=Bone%20Cements"
                        className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/10 transition-colors group/item"
                      >
                        <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-emerald-300 transition-colors">
                            Bone Cements
                          </div>
                          <div className="text-[11px] text-slate-300">
                            Teknimed OPACITY+® PMMA
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/products?category=Biopsy%20Devices"
                        className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/10 transition-colors group/item"
                      >
                        <div className="w-7 h-7 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-indigo-300 transition-colors">
                            Biopsy Devices
                          </div>
                          <div className="text-[11px] text-slate-300">
                            MDL Precision Trocar Needles
                          </div>
                        </div>
                      </Link>

                      <div className="pt-2 mt-2 border-t border-white/10">
                        <Link
                          to="/products"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline px-2 py-1"
                        >
                          <span>Explore Complete Catalog</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Expertise Anchor */}
            <a
              href="#our-expertise"
              onClick={handleExpertiseClick}
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 cursor-pointer"
            >
              Expertise
            </a>

            {/* Research & Insights */}
            <Link
              to="/blogs"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
            >
              Research & Insights
            </Link>

            {/* Infrastructure / Gallery */}
            <Link
              to="/gallery"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
            >
              Infrastructure
            </Link>

            {/* About Link */}
            <Link
              to="/about"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
            >
              About
            </Link>
          </nav>

          {/* 3. Call-to-Action (Right) - Admin Removed, Clean CTA Retained */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/contact"
              className="bg-white/90 hover:bg-white text-slate-950 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="hidden sm:inline">Inquire / Procurement</span>
              <span className="sm:hidden">Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[36px] min-h-[36px] w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 flex items-center justify-center text-white transition-all shadow-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Liquid Glass Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Subtle Backdrop Blur */}
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-md z-45 lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Frosted Floating Mobile Drawer */}
          <div
            className="fixed inset-x-4 top-20 z-50 max-h-[82vh] overflow-y-auto bg-slate-950/85 backdrop-blur-2xl border border-white/20 text-white rounded-3xl p-6 shadow-2xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-200 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                  Navigation
                </span>
                <span className="text-[10px] font-semibold text-white bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full">
                  Emsurg Healthcare
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <Link
                  to="/products"
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-white/10 text-base font-bold text-white transition-colors"
                >
                  <span>Products Catalog</span>
                  <ArrowUpRight className="w-4 h-4 text-white/50" />
                </Link>

                <a
                  href="#our-expertise"
                  onClick={(e) => {
                    handleExpertiseClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-white/10 text-base font-bold text-white transition-colors"
                >
                  <span>Clinical Expertise</span>
                  <ArrowUpRight className="w-4 h-4 text-white/50" />
                </a>

                <Link
                  to="/blogs"
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-white/10 text-base font-bold text-white transition-colors"
                >
                  <span>Research & Insights</span>
                  <ArrowUpRight className="w-4 h-4 text-white/50" />
                </Link>

                <Link
                  to="/gallery"
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-white/10 text-base font-bold text-white transition-colors"
                >
                  <span>Infrastructure & Facilities</span>
                  <ArrowUpRight className="w-4 h-4 text-white/50" />
                </Link>

                <Link
                  to="/partners"
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-white/10 text-base font-bold text-white transition-colors"
                >
                  <span>Global Partnerships</span>
                  <ArrowUpRight className="w-4 h-4 text-white/50" />
                </Link>

                <Link
                  to="/about"
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-white/10 text-base font-bold text-white transition-colors"
                >
                  <span>About Emsurg</span>
                  <ArrowUpRight className="w-4 h-4 text-white/50" />
                </Link>
              </div>
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white hover:bg-white/90 text-slate-950 font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all"
              >
                <span>Inquire / Procurement</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct WhatsApp Clinical Support</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
