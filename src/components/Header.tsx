import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Phone, MapPin, Search, Menu, X, ChevronDown, ChevronRight, Activity, ArrowRight } from "lucide-react";
import { companyInfo } from "../data/content";
import { LiquidButton } from "./ui/liquid-glass-button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSolutionsOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is active
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3.5" 
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-[110]">
          <img 
            src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/logo%20%282%29.png" 
            alt="Emsurg Healthcare" 
            className={`h-9 sm:h-10 w-auto transition-all duration-200 ${
              mobileMenuOpen ? "brightness-100" : "brightness-0 invert"
            }`} 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <div className="group relative">
            <button className="flex items-center text-sm font-medium transition-colors py-2 text-white/90 hover:text-white cursor-pointer">
              Solutions <ChevronDown className="w-4 h-4 ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white border border-slate-100 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-8 grid grid-cols-3 gap-8 pointer-events-none group-hover:pointer-events-auto text-slate-900">
              <div>
                <h4 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">Indigenous Manufacturing</h4>
                <ul className="space-y-4">
                  <li>
                    <Link to="/products?category=Orthobiologics" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Orthobiologics</Link>
                    <div className="text-xs text-slate-500 mt-1 font-medium">BoneSurg CR, BoneSurg HA</div>
                  </li>
                  <li>
                    <Link to="/products?category=Nephro%20Care" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Nephro Care</Link>
                    <div className="text-xs text-slate-500 mt-1 font-medium">Hemodialysis Fluids & Powder</div>
                  </li>
                  <li>
                    <Link to="/products?category=Wound%20Management" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Wound Management</Link>
                    <div className="text-xs text-slate-500 mt-1 font-medium">EM-VAC NPWT System</div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">Trading & Distribution</h4>
                <ul className="space-y-4">
                  <li>
                    <Link to="/products?category=Biopsy%20Devices" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Biopsy Devices</Link>
                    <div className="text-xs text-slate-500 mt-1 font-medium">MDL Portfolio</div>
                  </li>
                  <li>
                    <Link to="/products?category=Bone%20Cements" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Bone Cements</Link>
                    <div className="text-xs text-slate-500 mt-1 font-medium">Teknimed OPACITY+®</div>
                  </li>
                  <li>
                    <Link to="/products?category=Sports%20Medicine" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Sports Medicine</Link>
                    <div className="text-xs text-slate-500 mt-1 font-medium">Smith & Nephew Portfolio</div>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Featured</h4>
                  <p className="text-base font-bold text-slate-900 leading-tight">Made in India.<br/>Connected to Global Healthcare.</p>
                </div>
                <Link to="/products" className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center mt-4 self-start px-5 py-2.5 rounded-full transition-colors">
                  Explore Catalog &rarr;
                </Link>
              </div>
            </div>
          </div>

          <Link to="/products" className="text-sm font-medium transition-colors text-white/90 hover:text-white">Products</Link>
          <Link to="/blogs" className="text-sm font-medium transition-colors text-white/90 hover:text-white">Blogs</Link>
          <Link to="/partners" className="text-sm font-medium transition-colors text-white/90 hover:text-white">Partners</Link>
          <Link to="/gallery" className="text-sm font-medium transition-colors text-white/90 hover:text-white">Gallery</Link>
          <Link to="/about" className="text-sm font-medium transition-colors text-white/90 hover:text-white">About</Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/admin/login" className="text-sm font-medium transition-colors text-white/90 hover:text-white">
            Admin
          </Link>
          <LiquidButton size="default" onClick={() => navigate('/contact')}>
            Schedule A Call <ArrowRight className="w-4 h-4 ml-2" />
          </LiquidButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl z-[110] flex items-center justify-center transition-colors ${
            mobileMenuOpen ? "text-slate-900 bg-slate-100" : "text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Fullscreen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[105] pt-24 pb-8 px-6 overflow-y-auto lg:hidden flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col divide-y divide-slate-100">
            {/* Expandable Solutions Accordion for Mobile */}
            <div className="py-2">
              <button 
                type="button"
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="w-full min-h-[48px] flex items-center justify-between text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSolutionsOpen && (
                <div className="pl-4 pb-3 pt-1 space-y-2.5 bg-slate-50/70 rounded-xl p-3 mt-1">
                  <Link 
                    to="/products?category=Orthobiologics" 
                    className="block text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                  >
                    Orthobiologics (BoneSurg)
                  </Link>
                  <Link 
                    to="/products?category=Nephro%20Care" 
                    className="block text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                  >
                    Nephro Care (Dialysis Solutions)
                  </Link>
                  <Link 
                    to="/products?category=Wound%20Management" 
                    className="block text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                  >
                    Wound Management (EM-VAC NPWT)
                  </Link>
                  <Link 
                    to="/products?category=Bone%20Cements" 
                    className="block text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                  >
                    Bone Cements (Teknimed OPACITY+)
                  </Link>
                  <Link 
                    to="/products?category=Biopsy%20Devices" 
                    className="block text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                  >
                    Biopsy Devices (MDL Portfolio)
                  </Link>
                  <Link 
                    to="/products" 
                    className="block text-xs font-bold text-blue-600 pt-2 uppercase tracking-wider"
                  >
                    View All Products &rarr;
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/products" 
              className="min-h-[48px] flex items-center justify-between text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors py-2"
            >
              <span>Products Catalog</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/blogs" 
              className="min-h-[48px] flex items-center justify-between text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors py-2"
            >
              <span>Clinical Insights & News</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/gallery" 
              className="min-h-[48px] flex items-center justify-between text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors py-2"
            >
              <span>Facilities & Gallery</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/partners" 
              className="min-h-[48px] flex items-center justify-between text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors py-2"
            >
              <span>Global Partners</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/about" 
              className="min-h-[48px] flex items-center justify-between text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors py-2"
            >
              <span>About Emsurg</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/contact" 
              className="min-h-[48px] flex items-center justify-between text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors py-2"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </nav>

          {/* Quick Action Footer in Drawer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col gap-3 mt-6">
            <LiquidButton 
              size="lg" 
              className="w-full justify-center shadow-md"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
            >
              <span className="flex items-center justify-center font-bold">
                Schedule A Call <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </LiquidButton>
            
            <div className="flex items-center justify-center gap-6 pt-3 text-xs font-semibold text-slate-500">
              <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-1.5 hover:text-blue-600">
                <Phone className="w-3.5 h-3.5 text-blue-600" /> {companyInfo.phone}
              </a>
              <Link to="/admin/login" className="hover:text-slate-800">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
