import { Link } from "react-router-dom";
import { Phone, Mail, MessageSquare, Linkedin, Facebook } from "lucide-react";
import { companyInfo } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-sky-50/50 to-sky-100/40 border-t border-sky-100 text-slate-700 relative pt-16 pb-8 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-sky-300/60 before:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block group mb-2" aria-label="Emsurg Healthcare Home">
              <img 
                src="/emsurg-logo.png" 
                alt="Emsurg Logo" 
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/logo%20%282%29.png";
                }}
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm font-normal mt-3">
              Advancing healthcare with innovation, integrity and expertise. Pioneering indigenously manufactured orthobiologics, advanced wound care, and hemodialysis solutions.
            </p>
            <div className="bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mt-4">
              CDSCO Approved · ISO 13485:2016 Certified
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-sky-700 text-xs font-bold tracking-[0.2em] uppercase mb-4">Company</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  Products & Solutions
                </Link>
              </li>
              <li>
                <Link to="/leaders" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-sky-700 text-xs font-bold tracking-[0.2em] uppercase mb-4">Products</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/products/bonesurg-cr" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  BoneSurg CR
                </Link>
              </li>
              <li>
                <Link to="/products/bonesurg-ha" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  BoneSurg HA
                </Link>
              </li>
              <li>
                <Link to="/products/em-vac-npwt" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  EM-VAC NPWT
                </Link>
              </li>
              <li>
                <Link to="/products/hemodialysis-fluids-dry-powders" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  Hemodialysis Fluids
                </Link>
              </li>
              <li>
                <Link to="/products/teknimed-opacity-plus-bone-cement" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  Teknimed Cements
                </Link>
              </li>
              <li>
                <Link to="/products/mdl-biopsy-devices" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  MDL Biopsy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-sky-700 text-xs font-bold tracking-[0.2em] uppercase mb-4">Resources</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/insights" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-sky-600 text-sm transition-colors block py-1 font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="text-sky-700 text-xs font-bold tracking-[0.2em] uppercase mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`tel:${companyInfo.phone}`} 
                  className="text-slate-700 hover:text-sky-600 text-sm font-medium flex items-center gap-2.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{companyInfo.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, "")}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-700 hover:text-sky-600 text-sm font-medium flex items-center gap-2.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{companyInfo.whatsapp}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${companyInfo.email}`} 
                  className="text-slate-700 hover:text-sky-600 text-sm font-medium flex items-center gap-2.5 transition-colors"
                >
                  <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                  <span className="truncate">{companyInfo.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar & Socials */}
        <div className="border-t border-sky-200/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-xs font-normal order-2 md:order-1 text-center md:text-left">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 order-3 md:order-2">
            <Link to="/privacy" className="text-slate-500 hover:text-sky-600 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-500 hover:text-sky-600 text-xs transition-colors">
              Terms
            </Link>
            <Link to="/cookie-policy" className="text-slate-500 hover:text-sky-600 text-xs transition-colors">
              Cookie Policy
            </Link>
          </div>

          <div className="flex items-center gap-3 order-1 md:order-3">
            <a 
              href="https://www.linkedin.com/company/emsurg-healthcare" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-white border border-sky-200/80 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="X (formerly Twitter)"
              className="w-8 h-8 rounded-full bg-white border border-sky-200/80 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white border border-sky-200/80 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all shadow-sm"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
