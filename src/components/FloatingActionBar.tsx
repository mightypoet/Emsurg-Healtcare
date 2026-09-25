import { Link } from "react-router-dom";
import { MessageSquare, Phone, FileText } from "lucide-react";
import { companyInfo } from "../data/content";

export default function FloatingActionBar() {
  return (
    <>
      {/* Desktop Floating Pill Dock */}
      <div className="hidden lg:flex fixed right-6 bottom-8 flex-col space-y-3 z-40 items-end">
        <Link 
          to="/contact" 
          className="flex items-center space-x-3 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-lg shadow-sky-100 border border-sky-100 hover:border-sky-200 hover:bg-sky-50/70 text-slate-700 hover:text-sky-700 transition-all duration-300 group"
        >
          <span className="text-xs font-bold tracking-wide">Request Specs</span>
          <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-100 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
        </Link>
        <Link 
          to="/contact" 
          className="flex items-center space-x-3 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-lg shadow-sky-100 border border-sky-100 hover:border-sky-200 hover:bg-sky-50/70 text-slate-700 hover:text-sky-700 transition-all duration-300 group"
        >
          <span className="text-xs font-bold tracking-wide">Inquiry Form</span>
          <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-100 transition-colors">
            <MessageSquare className="w-4 h-4" />
          </div>
        </Link>
        <a 
          href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 bg-sky-500 px-5 py-3 rounded-full shadow-lg shadow-sky-500/25 hover:bg-sky-600 text-white transition-all duration-300 group"
        >
          <span className="text-xs font-bold tracking-wide">WhatsApp Support</span>
          <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center transition-colors">
            <Phone className="w-4 h-4" />
          </div>
        </a>
      </div>

      {/* Mobile Bottom Bar (Thumb-Zone Ergonomics & Safe Area) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-sky-100 shadow-[0_-4px_16px_rgba(2,132,199,0.06)] z-40 flex items-center h-16 pb-safe">
        <Link 
          to="/contact" 
          className="flex-1 h-full min-h-[44px] text-center text-[11px] font-semibold text-white bg-sky-500 active:bg-sky-600 flex flex-col items-center justify-center transition-colors shadow-xs"
        >
          <MessageSquare className="w-4 h-4 mb-1 shrink-0" />
          <span>Inquire</span>
        </Link>
        <a 
          href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-full min-h-[44px] text-center text-[11px] font-semibold text-slate-800 bg-slate-50 active:bg-slate-100 border-x border-slate-200/80 flex flex-col items-center justify-center transition-colors hover:text-sky-700"
        >
          <Phone className="w-4 h-4 mb-1 text-emerald-600 shrink-0" />
          <span>WhatsApp</span>
        </a>
        <Link 
          to="/products" 
          className="flex-1 h-full min-h-[44px] text-center text-[11px] font-semibold text-slate-800 bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-center transition-colors hover:text-sky-700"
        >
          <FileText className="w-4 h-4 mb-1 text-sky-600 shrink-0" />
          <span>Products</span>
        </Link>
      </div>
    </>
  );
}
