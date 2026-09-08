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

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-40 flex">
        <Link to="/contact" className="flex-1 py-4 text-center text-xs font-bold text-white bg-blue-900 flex flex-col items-center justify-center">
          <MessageSquare className="w-4 h-4 mb-1" />
          Inquire
        </Link>
        <a 
          href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
          className="flex-1 py-4 text-center text-xs font-bold text-blue-900 bg-blue-50 border-x border-slate-200 flex flex-col items-center justify-center"
        >
          <Phone className="w-4 h-4 mb-1" />
          WhatsApp
        </a>
        <Link to="/contact" className="flex-1 py-4 text-center text-xs font-bold text-slate-700 bg-slate-50 flex flex-col items-center justify-center">
          <FileText className="w-4 h-4 mb-1" />
          Specs
        </Link>
      </div>
    </>
  );
}
