import { companyInfo, locations } from "../data/content";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";
import { LiquidButton } from "../components/ui/liquid-glass-button";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-blue-600 py-24 sm:py-32 md:py-44 text-center relative overflow-hidden text-white">
        {/* Vibrant Gradient Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[120%] h-[120%] -translate-y-1/4 translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.5)_0%,rgba(139,92,246,0.5)_25%,rgba(37,99,235,0)_60%)] blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[100%] h-[100%] translate-y-1/4 -translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.6)_0%,rgba(37,99,235,0)_50%)] blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-8 text-white leading-[1.12]">
            Let's Connect Healthcare Innovation to Clinical Need
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto px-2">
            Contact our team for product information, distribution partnerships, or clinical inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Product Information Request</h2>
            <p className="text-slate-500 text-xs sm:text-sm mb-8 sm:mb-10">Fill out the form below and our clinical team will get back to you promptly.</p>
            
            <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Organization</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Phone</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" required />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Product / Category Interest</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors">
                  <option>Orthobiologics</option>
                  <option>Wound Management</option>
                  <option>Nephro Care</option>
                  <option>Biopsy Devices</option>
                  <option>Bone Cements</option>
                  <option>Sports Medicine</option>
                  <option>Other / General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Message</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-none" required></textarea>
              </div>

              <LiquidButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Submit Request
              </LiquidButton>
            </form>
          </div>
        </div>

        {/* Contact Info & Locations */}
        <div className="lg:col-span-5">
          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 mb-10">
            <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-8 flex items-center"><MessageSquare className="w-4 h-4 mr-2 text-blue-600" /> Direct Contact</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mr-4 text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">Phone</div>
                  <div className="text-lg font-bold text-slate-900">{companyInfo.phone}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mr-4 text-slate-400">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">WhatsApp</div>
                  <div className="text-lg font-bold text-slate-900">{companyInfo.whatsapp}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mr-4 text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">Official Email</div>
                  <div className="text-base font-bold text-blue-700">{companyInfo.email}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mr-4 text-slate-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">Hours</div>
                  <div className="text-base font-medium text-slate-700">{companyInfo.hours}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-8">Our Locations</h3>
            <div className="space-y-8">
              {locations.map((loc, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600"></div>
                  <div className="text-sm font-bold text-slate-900 mb-1 tracking-tight">{loc.type}</div>
                  {loc.company && <div className="text-[11px] font-bold tracking-wider uppercase text-blue-700 mb-2">{loc.company}</div>}
                  <div className="text-sm text-slate-600 leading-relaxed font-medium">{loc.address}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
