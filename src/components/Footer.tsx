import { Link } from "react-router-dom";
import { companyInfo } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/logo%20%282%29.png" 
                alt="Emsurg Logo" 
                className="h-10 w-auto brightness-0 invert" 
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Advancing healthcare with innovation, integrity and expertise.
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="font-semibold text-slate-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/leaders" className="font-semibold text-slate-300 hover:text-white transition-colors">Leadership</Link></li>
              <li><Link to="/innovation" className="font-semibold text-slate-300 hover:text-white transition-colors">Innovation</Link></li>
              <li><Link to="/careers" className="font-semibold text-slate-300 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-6">Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="font-semibold text-slate-300 hover:text-white transition-colors">BoneSurg</Link></li>
              <li><Link to="/products" className="font-semibold text-slate-300 hover:text-white transition-colors">Nephro Care</Link></li>
              <li><Link to="/products" className="font-semibold text-slate-300 hover:text-white transition-colors">Wound Management</Link></li>
              <li><Link to="/products" className="font-semibold text-slate-300 hover:text-white transition-colors">Biopsy Devices</Link></li>
              <li><Link to="/products" className="font-semibold text-slate-300 hover:text-white transition-colors">Bone Cements</Link></li>
              <li><Link to="/products" className="font-semibold text-slate-300 hover:text-white transition-colors">Sports Medicine</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-6">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/insights" className="font-semibold text-slate-300 hover:text-white transition-colors">Insights</Link></li>
              <li><Link to="/gallery" className="font-semibold text-slate-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/faq" className="font-semibold text-slate-300 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="font-semibold text-slate-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-6">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="font-semibold text-slate-300">{companyInfo.phone}</li>
              <li className="font-semibold text-slate-300">{companyInfo.whatsapp}</li>
              <li className="font-semibold text-slate-300">{companyInfo.email}</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 font-semibold">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
