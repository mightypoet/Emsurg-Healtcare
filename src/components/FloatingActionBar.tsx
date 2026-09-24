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
          className="flex items-center space-x-3 bg-white px-5 py-3 rounded-full shadow-lg shadow-slate-200 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-700 hover:text-blue-800 transition-all duration-300 group"
        >
          <span className="text-xs font-bold tracking-wide">Request Specs</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
        </Link>
        <Link 
          to="/contact" 
          className="flex items-center space-x-3 bg-white px-5 py-3 rounded-full shadow-lg shadow-slate-200 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-700 hover:text-blue-800 transition-all duration-300 group"
        >
          <span className="text-xs font-bold tracking-wide">Inquiry Form</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <MessageSquare className="w-4 h-4" />
          </div>
        </Link>
        <a 
          href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 bg-blue-900 px-5 py-3 rounded-full shadow-lg shadow-blue-900/20 hover:bg-blue-800 text-white transition-all duration-300 group"
        >
          <span className="text-xs font-bold tracking-wide">WhatsApp Support</span>
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center transition-colors">
            <Phone className="w-4 h-4" />
          </div>
        </a>
      </div>

      {/* Mobile Bottom Bar (Thumb-Zone Ergonomics & Safe Area) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-40 flex items-center h-16 pb-safe">
        <Link 
          to="/contact" 
          className="flex-1 h-full min-h-[44px] text-center text-[11px] font-semibold text-white bg-blue-600 active:bg-blue-700 flex flex-col items-center justify-center transition-colors"
        >
          <MessageSquare className="w-4 h-4 mb-1 shrink-0" />
          <span>Inquire</span>
        </Link>
        <a 
          href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-full min-h-[44px] text-center text-[11px] font-semibold text-slate-800 bg-slate-50 active:bg-slate-100 border-x border-slate-200/80 flex flex-col items-center justify-center transition-colors"
        >
          <Phone className="w-4 h-4 mb-1 text-emerald-600 shrink-0" />
          <span>WhatsApp</span>
        </a>
        <Link 
          to="/products" 
          className="flex-1 h-full min-h-[44px] text-center text-[11px] font-semibold text-slate-800 bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-center transition-colors"
        >
          <FileText className="w-4 h-4 mb-1 text-blue-600 shrink-0" />
          <span>Products</span>
        </Link>
      </div>
    </>
  );
}
