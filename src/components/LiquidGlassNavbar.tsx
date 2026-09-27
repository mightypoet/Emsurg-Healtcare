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
  Layers,
  Building,
  Globe2,
  Sparkles,
  Award
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[660px] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-white/95 backdrop-blur-2xl rounded-2xl border border-sky-100 p-5 shadow-2xl shadow-sky-900/10 text-left">
                    <div className="grid grid-cols-2 gap-5">
                      {/* Left: Division 1 - Indigenous Manufacturing */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 px-2 pb-1.5 border-b border-sky-100">
                          <Building className="w-3.5 h-3.5 text-sky-600" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700">
                            Indigenous Manufacturing
                          </span>
                        </div>

                        <Link
                          to="/products?division=Manufacturing&category=Nephrology"
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-sky-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-xl bg-cyan-50 border border-cyan-200/70 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Droplets className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover/item:text-sky-600 transition-colors">
                              Nephrology Solutions
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Dialysis Fluids, Drycitrate & NaCl Tablets
                            </div>
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Manufacturing&category=Orthobiologics"
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-sky-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-xl bg-sky-50 border border-sky-200/70 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Bone className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover/item:text-sky-600 transition-colors">
                              Orthobiologics
                            </div>
                            <div className="text-[11px] text-slate-500">
                              BoneSurg CR & BoneSurg HA
                            </div>
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Manufacturing&category=Wound%20Management"
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-sky-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Activity className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover/item:text-sky-600 transition-colors">
                              Wound Management
                            </div>
                            <div className="text-[11px] text-slate-500">
                              NPWT Systems & Cellsurg Collagen
                            </div>
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Manufacturing&category=Launching%20Soon"
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover/item:text-amber-700 transition-colors">
                              Launching Soon
                            </div>
                            <div className="text-[11px] text-slate-500">
                              BoneSurg Regen (Biphasic HA/TCP)
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Right: Division 2 - Channel Partner Alliances */}
                      <div className="space-y-1.5 border-l border-sky-100 pl-5">
                        <div className="flex items-center gap-1.5 px-2 pb-1.5 border-b border-sky-100">
                          <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700">
                            Channel Partner Alliances
                          </span>
                        </div>

                        <Link
                          to="/products?division=Channel%20Partner&category=Sports%20Medicine"
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Award className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover/item:text-indigo-600 transition-colors">
                              Sports Medicine
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Smith & Nephew Joint Repair
                            </div>
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Channel%20Partner&category=Bone%20Cement"
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Layers className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover/item:text-indigo-600 transition-colors">
                              Bone Cements
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Demetra Cemex HV / LV / ID Green
                            </div>
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Channel%20Partner&category=Spine%20Solutions"
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover/item:text-indigo-600 transition-colors">
                              Spine Solutions
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Teknimed Opacity+ & Tecres Mendec
                            </div>
                          </div>
                        </Link>

                        <Link
                          to="/products?division=Channel%20Partner&category=Biopsy%20Needles"
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Activity className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover/item:text-indigo-600 transition-colors">
                              Biopsy Devices
                            </div>
                            <div className="text-[11px] text-slate-500">
                              MDL S.r.l. Italy Core & Marrow
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-3.5 mt-3 border-t border-sky-100 flex items-center justify-between text-xs font-bold">
                      <Link
                        to="/products?division=Manufacturing"
                        className="text-sky-700 hover:text-sky-800 hover:underline px-2 py-1 flex items-center gap-1"
                      >
                        <Building className="w-3.5 h-3.5 text-sky-600" />
                        <span>View Indigenous Line</span>
                      </Link>

                      <Link
                        to="/products?division=Channel%20Partner"
                        className="text-indigo-700 hover:text-indigo-800 hover:underline px-2 py-1 flex items-center gap-1"
                      >
                        <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>View Partner Alliances</span>
                      </Link>

                      <Link
                        to="/products"
                        className="inline-flex items-center gap-1 text-slate-700 hover:text-sky-600 px-2 py-1"
                      >
                        <span>Full Catalog</span>
                        <ArrowUpRight className="w-3 h-3" />
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
            <LiquidButton
              variant="primary"
              size="sm"
              asChild
              className="gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-semibold uppercase tracking-wider"
            >
              <Link to="/contact">
                <span className="hidden sm:inline">Inquire / Procurement</span>
                <span className="sm:hidden">Inquire</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </LiquidButton>

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
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-sky-100/60 text-xs font-semibold text-sky-800 transition-colors pl-4"
                  >
                    <span className="flex items-center gap-1.5">
                      <Building className="w-3 h-3 text-sky-600" />
                      Indigenous Manufacturing
                    </span>
                    <span className="text-[10px] bg-sky-200/70 text-sky-800 px-1.5 py-0.5 rounded-full font-bold">12</span>
                  </Link>

                  <Link
                    to="/products?division=Channel%20Partner"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-indigo-100/60 text-xs font-semibold text-indigo-800 transition-colors pl-4"
                  >
                    <span className="flex items-center gap-1.5">
                      <Globe2 className="w-3 h-3 text-indigo-600" />
                      Channel Partner Alliances
                    </span>
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
                  <span>Research & Insights</span>
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

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-4 border-t border-sky-100 space-y-2.5">
              <LiquidButton
                variant="primary"
                size="default"
                asChild
                className="w-full py-3 h-auto rounded-2xl"
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Inquire / Procurement</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </LiquidButton>

              <a
                href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100/80 font-medium text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct WhatsApp Clinical Support</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
