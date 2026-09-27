import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Factory, 
  Microscope, 
  Facebook, 
  Instagram, 
  Linkedin, 
  ExternalLink,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";
import { companyInfo } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-sky-50/50 to-sky-100/40 border-t border-sky-100 text-slate-700 relative pt-16 pb-8 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-sky-300/60 before:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 3-Column Structured Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          
          {/* ========================================================= */}
          {/* COLUMN 1: The Emsurg Group & Follow Us (4 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Brand Identity with Winged Logo */}
              <Link to="/" className="inline-block group mb-3" aria-label="Emsurg Healthcare Home">
                <img 
                  src="/emsurg-logo.png" 
                  alt="Emsurg Healthcare Logo" 
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/logo%20%282%29.png";
                  }}
                />
              </Link>
              
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm font-normal mt-2">
                Advancing healthcare with innovation, integrity and clinical expertise. Pioneering indigenously manufactured orthobiologics, advanced wound care, and hemodialysis solutions.
              </p>

              {/* Regulatory Standards Badge */}
              <div className="bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 mt-3 mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>CDSCO Approved · ISO 13485:2016 Certified</span>
              </div>
            </div>

            {/* Follow Us Section with Social Badges */}
            <div className="mt-2">
              <h4 className="text-sky-700 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                Follow Us
              </h4>
              <div className="grid grid-cols-2 gap-2 max-w-sm">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Emsurg on Facebook"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/80 hover:bg-white border border-sky-100 hover:border-sky-300 transition-all text-xs group shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-slate-700 group-hover:text-blue-600 font-medium">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Facebook className="w-3.5 h-3.5" />
                    </div>
                    <span>Facebook</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-full">
                    Fans
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Emsurg on Instagram"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/80 hover:bg-white border border-sky-100 hover:border-sky-300 transition-all text-xs group shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-slate-700 group-hover:text-pink-600 font-medium">
                    <div className="w-6 h-6 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <span>Instagram</span>
                  </div>
                  <span className="text-[10px] font-bold text-pink-700 bg-pink-50 border border-pink-200/70 px-2 py-0.5 rounded-full">
                    Follower
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/emsurg-healthcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Emsurg on LinkedIn"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/80 hover:bg-white border border-sky-100 hover:border-sky-300 transition-all text-xs group shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-slate-700 group-hover:text-sky-700 font-medium">
                    <div className="w-6 h-6 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </div>
                    <span>LinkedIn</span>
                  </div>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200/70 px-2 py-0.5 rounded-full">
                    Connect
                  </span>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Emsurg on X"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/80 hover:bg-white border border-sky-100 hover:border-sky-300 transition-all text-xs group shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 font-medium">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span>X</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200/70 px-2 py-0.5 rounded-full">
                    Follow
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2: Contact Us & Facility Locations (4 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4">
            <h4 className="text-sky-700 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Contact Us
            </h4>

            {/* Click-to-call Phone and Mailto Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
              <a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 hover:bg-white border border-sky-100 hover:border-sky-300 text-xs font-semibold text-slate-800 transition-colors shadow-2xs group"
              >
                <div className="w-6 h-6 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-3 h-3" />
                </div>
                <span className="truncate">{companyInfo.phone}</span>
              </a>

              <a 
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 hover:bg-white border border-sky-100 hover:border-sky-300 text-xs font-semibold text-slate-800 transition-colors shadow-2xs group"
              >
                <div className="w-6 h-6 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-3 h-3" />
                </div>
                <span className="truncate">{companyInfo.email}</span>
              </a>
            </div>

            {/* 3 Operational Facility Location Cards in Kolkata */}
            <div className="space-y-3">
              {/* 1. Corporate Office (Dumdum) */}
              <div className="p-3.5 rounded-2xl bg-white/80 border border-sky-100/90 shadow-2xs text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                    Corporate Office
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal pl-5">
                  8/2/74/1B, Sachi Apartment, Aravinda Sarani, East Kamalapur, Dumdum, Kolkata 700028
                </p>
              </div>

              {/* 2. Manufacturing Unit (Talbanda) */}
              <div className="p-3.5 rounded-2xl bg-white/80 border border-sky-100/90 shadow-2xs text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Factory className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                    Manufacturing Unit
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-800 pl-5 mb-0.5">
                  Emsurg Healthcare (India) Pvt. Ltd
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal pl-5">
                  Board Ghar, Bilkanda, Talbanda, Kolkata 700110
                </p>
              </div>

              {/* 3. Manufacturing & R&D Unit 1 (Panihati) */}
              <div className="p-3.5 rounded-2xl bg-white/80 border border-sky-100/90 shadow-2xs text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Microscope className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                    Manufacturing & R&D Unit 1
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-800 pl-5 mb-0.5">
                  Emsurg Bioscience India Pvt. Ltd
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal pl-5">
                  Chand Dalal Ghat Road, Panihati, Kolkata 700114
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 3: Visit Us (Map) & Quick Links (4 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4">
            <h4 className="text-sky-700 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Visit Us
            </h4>

            {/* Embedded Google Map */}
            <div className="w-full h-40 rounded-2xl overflow-hidden border border-sky-200/80 shadow-sm mb-6 relative group bg-sky-50">
              <iframe
                title="Emsurg Healthcare Manufacturing Unit Location"
                src="https://maps.google.com/maps?q=Board+Ghar,+Bilkanda,+Talbanda,+Kolkata+700110&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com/?q=Board+Ghar,+Bilkanda,+Talbanda,+Kolkata+700110"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 hover:bg-white text-[11px] font-bold text-sky-800 shadow-md border border-sky-200 transition-all opacity-90 group-hover:opacity-100"
              >
                <MapPin className="w-3 h-3 text-sky-600" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
              </a>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="text-sky-700 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:text-sm">
                {/* Left Column Links */}
                <div className="space-y-1.5">
                  <Link 
                    to="/" 
                    className="text-slate-600 hover:text-sky-600 transition-colors block py-0.5 font-medium"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-slate-600 hover:text-sky-600 transition-colors block py-0.5 font-medium"
                  >
                    About
                  </Link>
                  <a 
                    href="/about#expertise" 
                    className="text-slate-600 hover:text-sky-600 transition-colors block py-0.5 font-medium"
                  >
                    Innovation
                  </a>
                  <Link 
                    to="/products" 
                    className="text-slate-600 hover:text-sky-600 transition-colors block py-0.5 font-medium"
                  >
                    Products
                  </Link>
                </div>

                {/* Right Column Links */}
                <div className="space-y-1.5">
                  <Link 
                    to="/gallery" 
                    className="text-slate-600 hover:text-sky-600 transition-colors block py-0.5 font-medium"
                  >
                    Gallery
                  </Link>
                  <Link 
                    to="/blogs" 
                    className="text-slate-600 hover:text-sky-600 transition-colors block py-0.5 font-medium"
                  >
                    Blogs
                  </Link>
                  <Link 
                    to="/careers" 
                    className="text-slate-600 hover:text-sky-600 transition-colors block py-0.5 font-medium"
                  >
                    Career
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-slate-600 hover:text-sky-600 transition-colors block py-0.5 font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM LEGAL & COPYRIGHT BAR */}
        {/* ========================================================= */}
        <div className="border-t border-sky-200/60 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-xs font-normal text-center md:text-left">
            &copy; 2026 Emsurg Healthcare (India) Pvt. Ltd. All rights reserved.
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link 
              to="/privacy" 
              className="text-slate-500 hover:text-sky-600 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-slate-500 hover:text-sky-600 text-xs transition-colors"
            >
              Terms of Use
            </Link>
            <Link 
              to="/quality-policy" 
              className="text-slate-500 hover:text-sky-600 text-xs transition-colors"
            >
              Quality Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
