import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ChevronDown, 
  Phone
} from "lucide-react";
import { companyInfo } from "../data/content";
import { LiquidButton } from "./ui/liquid-glass-button";

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

  // Determine if current route has a light surface background requiring dark text & dark logo
  const isLightPage = location.pathname.startsWith("/products/") && location.pathname !== "/products";

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
            isLightPage
              ? isScrolled
                ? "bg-white/90 backdrop-blur-3xl border border-sky-200/80 shadow-[0_12px_36px_rgba(2,132,199,0.12)]"
                : "bg-white/80 hover:bg-white/90 backdrop-blur-2xl border border-sky-100 shadow-[0_8px_30px_rgba(2,132,199,0.08)]"
              : isScrolled
                ? "bg-white/25 backdrop-blur-3xl border border-white/40 shadow-xl"
                : "bg-white/15 hover:bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg"
          } before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3`}
        >
          {/* 1. Brand (Left) */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/60 rounded-full pr-1 sm:pr-2"
            aria-label="Emsurg Healthcare Home"
          >
            <div className="relative flex items-center">
              <img
                src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/logo%20%282%29.png"
                alt="Emsurg Healthcare"
                className={`h-7 sm:h-8 md:h-8.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                  isLightPage 
                    ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" 
                    : "brightness-0 invert drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                }`}
              />
            </div>
            <div className={`hidden xl:flex flex-col text-left border-l pl-2.5 ${
              isLightPage ? "border-slate-300" : "border-white/30"
            }`}>
              <span className={`font-semibold tracking-tight text-xs leading-tight ${
                isLightPage ? "text-slate-900" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`}>
                Emsurg Biomedical
              </span>
              <span className={`text-[10px] tracking-wider uppercase font-medium ${
                isLightPage ? "text-slate-500" : "text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
              }`}>
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
                className={`inline-flex items-center gap-1 transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/50 group ${
                  isLightPage 
                    ? "text-slate-700 hover:text-sky-600" 
                    : "text-white/80 hover:text-white"
                }`}
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[660px] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-white/95 backdrop-blur-2xl rounded-2xl border border-sky-100 p-5 shadow-2xl shadow-sky-900/10 text-left">
                    <div className="grid grid-cols-2 gap-5">
                      {/* Left: Division 1 - Indigenous Manufacturing */}
                      <div className="space-y-1">
                        <div className="px-2.5 pb-2 border-b border-sky-100">
                          <span className="text-[11px] font-bold tracking-[0.2em] text-sky-700 uppercase">
                            Indigenous Manufacturing
                          </span>
                        </div>

                        <Link
                          to="/products?division=Manufacturing&category=Nephrology"
                          className="block hover:bg-slate-50/70 p-2.5 rounded-xl transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            Nephrology Solutions
                          </div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                            Dialysis Fluids, Drycitrate &amp; NaCl Tablets
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Manufacturing&category=Orthobiologics"
                          className="block hover:bg-slate-50/70 p-2.5 rounded-xl transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            Orthobiologics
                          </div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                            BoneSurg CR &amp; BoneSurg HA
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Manufacturing&category=Wound%20Management"
                          className="block hover:bg-slate-50/70 p-2.5 rounded-xl transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            Wound Management
                          </div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                            NPWT Systems &amp; Cellsurg Collagen
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Manufacturing&category=Launching%20Soon"
                          className="block hover:bg-slate-50/70 p-2.5 rounded-xl transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            Launching Soon
                          </div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                            BoneSurg Regen (Biphasic HA/TCP)
                          </div>
                        </Link>
                      </div>

                      {/* Right: Division 2 - Channel Partner Alliances */}
                      <div className="space-y-1 border-l border-sky-100 pl-5">
                        <div className="px-2.5 pb-2 border-b border-sky-100">
                          <span className="text-[11px] font-bold tracking-[0.2em] text-indigo-700 uppercase">
                            Channel Partner Alliances
                          </span>
                        </div>

                        <Link
                          to="/products?division=Channel%20Partner&category=Sports%20Medicine"
                          className="block hover:bg-slate-50/70 p-2.5 rounded-xl transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            Sports Medicine
                          </div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                            Smith &amp; Nephew Joint Repair
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Channel%20Partner&category=Bone%20Cement"
                          className="block hover:bg-slate-50/70 p-2.5 rounded-xl transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            Bone Cements
                          </div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                            Demetra Cemex HV / LV / ID Green
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Channel%20Partner&category=Spine%20Solutions"
                          className="block hover:bg-slate-50/70 p-2.5 rounded-xl transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            Spine Solutions
                          </div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                            Teknimed Opacity+ &amp; Tecres Mendec
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Channel%20Partner&category=Biopsy%20Needles"
                          className="block hover:bg-slate-50/70 p-2.5 rounded-xl transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            Biopsy Devices
                          </div>
                          <div className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                            MDL S.r.l. Italy Core &amp; Marrow
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-3.5 mt-2 border-t border-sky-100 flex items-center justify-between text-xs font-semibold">
                      <Link
                        to="/products?division=Manufacturing"
                        className="text-sky-700 hover:text-sky-800 transition-colors px-2 py-1 inline-flex items-center gap-1.5 hover:underline"
                      >
                        <span>View Indigenous Line</span>
                        <span aria-hidden="true" className="text-sky-500">→</span>
                      </Link>

                      <Link
                        to="/products?division=Channel%20Partner"
                        className="text-indigo-700 hover:text-indigo-800 transition-colors px-2 py-1 inline-flex items-center gap-1.5 hover:underline"
                      >
                        <span>View Partner Alliances</span>
                        <span aria-hidden="true" className="text-indigo-500">→</span>
                      </Link>

                      <Link
                        to="/products"
                        className="inline-flex items-center gap-1.5 text-slate-600 hover:text-sky-600 px-2 py-1 transition-colors hover:underline"
                      >
                        <span>Full Catalog</span>
                        <span aria-hidden="true" className="text-slate-400">↗</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Expertise Anchor */}
            <a
              href="#our-expertise"
              onClick={handleExpertiseClick}
              className={`inline-flex items-center transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/50 cursor-pointer ${
                isLightPage 
                  ? "text-slate-700 hover:text-sky-600" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              Expertise
            </a>

            {/* Blogs */}
            <Link
              to="/blogs"
              className={`inline-flex items-center transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/50 ${
                isLightPage 
                  ? "text-slate-700 hover:text-sky-600" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              Blogs
            </Link>

            {/* Infrastructure / Gallery */}
            <Link
              to="/gallery"
              className={`inline-flex items-center transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/50 ${
                isLightPage 
                  ? "text-slate-700 hover:text-sky-600" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              Infrastructure
            </Link>

            {/* About Link */}
            <Link
              to="/about"
              className={`inline-flex items-center transition-colors text-xs font-medium uppercase tracking-wider px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/50 ${
                isLightPage 
                  ? "text-slate-700 hover:text-sky-600" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              About
            </Link>
          </nav>

          {/* 3. Call-to-Action (Right) - Consolidated Unified Action Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LiquidButton
              variant="primary"
              size="sm"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-inquiry-modal", { detail: null }));
              }}
              className="gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </LiquidButton>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden min-w-[36px] min-h-[36px] w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 ${
                isLightPage
                  ? "bg-sky-50 text-slate-700 hover:bg-sky-100 border border-sky-200/60"
                  : "bg-white/15 hover:bg-white/25 border border-white/30 text-white"
              }`}
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
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-45 lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Frosted Floating Mobile Drawer */}
          <div
            className="fixed inset-x-4 top-20 z-50 max-h-[82vh] overflow-y-auto bg-white/85 backdrop-blur-2xl border border-sky-100/90 shadow-[0_20px_50px_rgba(2,132,199,0.12)] text-slate-800 rounded-3xl p-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                  Navigation
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200/70 px-2.5 py-0.5 rounded-full">
                    Emsurg Healthcare
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-7 h-7 rounded-full bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-sky-800 border border-sky-200/60 flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    aria-label="Close navigation drawer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                {/* Two-Tier Products Group */}
                <div className="bg-sky-50/60 rounded-2xl p-2 border border-sky-100/90 space-y-1">
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-sky-100/70 text-sm font-bold text-slate-900 hover:text-sky-700 transition-colors group"
                  >
                    <span>All Products & Solutions</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                  </Link>

                  <Link
                    to="/products?division=Manufacturing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-sky-100/60 text-xs font-semibold text-sky-800 transition-colors pl-3"
                  >
                    <span>Indigenous Manufacturing</span>
                    <span className="text-[10px] bg-sky-200/70 text-sky-800 px-1.5 py-0.5 rounded-full font-bold">12</span>
                  </Link>

                  <Link
                    to="/products?division=Channel%20Partner"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-indigo-100/60 text-xs font-semibold text-indigo-800 transition-colors pl-3"
                  >
                    <span>Channel Partner Alliances</span>
                    <span className="text-[10px] bg-indigo-200/70 text-indigo-800 px-1.5 py-0.5 rounded-full font-bold">9</span>
                  </Link>
                </div>

                <a
                  href="#our-expertise"
                  onClick={(e) => {
                    handleExpertiseClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-sky-50/70 text-base font-semibold tracking-wide text-slate-800 hover:text-sky-600 transition-colors group"
                >
                  <span>Clinical Expertise</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </a>

                <Link
                  to="/blogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-sky-50/70 text-base font-semibold tracking-wide text-slate-800 hover:text-sky-600 transition-colors group"
                >
                  <span>Blogs</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </Link>

                <Link
                  to="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-sky-50/70 text-base font-semibold tracking-wide text-slate-800 hover:text-sky-600 transition-colors group"
                >
                  <span>Infrastructure & Facilities</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </Link>

                <Link
                  to="/partners"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-sky-50/70 text-base font-semibold tracking-wide text-slate-800 hover:text-sky-600 transition-colors group"
                >
                  <span>Global Partnerships</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-sky-50/70 text-base font-semibold tracking-wide text-slate-800 hover:text-sky-600 transition-colors group"
                >
                  <span>About Emsurg</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </Link>
              </div>
            </div>

            {/* Quick Actions in Mobile Drawer - Consolidated Action */}
            <div className="pt-4 border-t border-sky-100">
              <LiquidButton
                variant="primary"
                size="default"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-inquiry-modal", { detail: null }));
                }}
                className="w-full py-3 h-auto rounded-2xl text-xs font-bold uppercase tracking-wider justify-center gap-2"
              >
                <span>Inquire</span>
                <ArrowUpRight className="w-4 h-4" />
              </LiquidButton>
            </div>
          </div>
        </>
      )}
    </>
  );
}
