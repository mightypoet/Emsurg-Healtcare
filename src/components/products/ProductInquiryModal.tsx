import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Building2, User, Phone, Mail, MapPin, Package, FileText } from "lucide-react";
import { Product, submitProductInquiry } from "../../lib/productsStore";

interface ProductInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccess?: () => void;
}

export default function ProductInquiryModal({
  isOpen,
  onClose,
  product,
  onSuccess
}: ProductInquiryModalProps) {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError("");
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill in your name, contact phone, and email address.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitProductInquiry({
        product_id: product?.id,
        product_name: product?.title || "General Product Inquiry",
        name: name.trim(),
        institution: institution.trim() || "Independent Practice / Hospital",
        city: city.trim() || "India",
        phone: phone.trim(),
        email: email.trim(),
        quantity_requirement: quantity.trim(),
      });

      setSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      setError("Unable to submit inquiry at this moment. Please reach out via WhatsApp or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800 px-3 py-1 rounded-full mb-3">
            Institutional & Clinical Procurement
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            Request Quotation & Product Dossier
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Receive technical specifications, regulatory certificates, and institutional hospital pricing.
          </p>

          {product && (
            <div className="mt-4 p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-700 overflow-hidden shrink-0 border border-slate-600">
                <img 
                  src={product.images[0] || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=300&auto=format&fit=crop"} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">{product.category}</span>
                <span className="text-sm font-bold text-white leading-tight block">{product.title}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Successfully Dispatched</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
                Thank you, <strong>{name}</strong>. Our clinical products specialist and regional distributor will connect with you shortly with the quotation and technical dossiers.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 mb-6 text-left space-y-1.5">
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span className="font-semibold text-slate-800">{product?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="font-semibold text-slate-800">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Institution:</span>
                  <span className="font-semibold text-slate-800">{institution || "Independent"}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-md shadow-blue-500/20"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. / Mr. / Ms." 
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hospital / Clinic Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Apollo, Fortis, etc." 
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210" 
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@hospital.org" 
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    City / State
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Kolkata, Mumbai" 
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Procurement Requirement
                  </label>
                  <div className="relative">
                    <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 50 kits / monthly tender" 
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl"
                >
                  {submitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Product Inquiry & Quotation Request
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2.5">
                  Your inquiries are handled directly by certified Emsurg biomedical specialists.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
