import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, MapPin, Search, Menu, X, ChevronDown, Activity, ArrowRight } from "lucide-react";
import { companyInfo } from "../data/content";
import { LiquidButton } from "./ui/liquid-glass-button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-[100] bg-transparent text-white">
      {/* Main Header */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-[100]">
            <img 
              src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/logo%20%282%29.png" 
              alt="Emsurg Logo" 
              className="h-10 w-auto brightness-0 invert" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <div className="group relative">
              <button className="flex items-center text-sm font-medium transition-colors py-2 text-white/90 hover:text-white">
                Solutions <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
              </button>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white border border-slate-100 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-8 grid grid-cols-3 gap-8 pointer-events-none group-hover:pointer-events-auto text-slate-900">
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">Indigenous Manufacturing</h4>
                  <ul className="space-y-4">
                    <li>
                      <Link to="/products" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Orthobiologics</Link>
                      <div className="text-xs text-slate-500 mt-1 font-medium">BoneSurg CR, BoneSurg HA</div>
                    </li>
                    <li>
                      <Link to="/products" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Nephro Care</Link>
                      <div className="text-xs text-slate-500 mt-1 font-medium">Hemodialysis Fluids & Powder</div>
                    </li>
                    <li>
                      <Link to="/products" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Wound Management</Link>
                      <div className="text-xs text-slate-500 mt-1 font-medium">EM-VAC</div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">Trading & Distribution</h4>
                  <ul className="space-y-4">
                    <li>
                      <Link to="/products" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Biopsy Devices</Link>
                      <div className="text-xs text-slate-500 mt-1 font-medium">MDL Portfolio</div>
                    </li>
                    <li>
                      <Link to="/products" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Bone Cements</Link>
                      <div className="text-xs text-slate-500 mt-1 font-medium">OPACITY+®</div>
                    </li>
                    <li>
                      <Link to="/products" className="block text-sm font-bold text-slate-800 hover:text-blue-600">Sports Medicine</Link>
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
                    Explore All &rarr;
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

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/contact" className="text-sm font-medium transition-colors text-white/90 hover:text-white">
              Sign In
            </Link>
            <LiquidButton size="default" onClick={() => navigate('/contact')}>
              Schedule A Call <ArrowRight className="w-4 h-4 ml-2" />
            </LiquidButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 z-[100] ${mobileMenuOpen ? "text-slate-900" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-32 px-6 overflow-y-auto lg:hidden flex flex-col">
          <nav className="flex flex-col space-y-6 text-xl font-bold text-slate-900 mb-8">
            <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link to="/blogs" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
            <Link to="/partners" onClick={() => setMobileMenuOpen(false)}>Partners</Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          </nav>
          <div className="mt-auto pb-8 border-t border-slate-100 pt-6">
            <LiquidButton 
              size="xl" 
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
            >
              <div className="flex justify-center items-center w-full">
                Schedule A Call <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </LiquidButton>
          </div>
        </div>
      )}
    </header>
  );
}
