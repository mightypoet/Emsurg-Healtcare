import React, { useState, useEffect } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  Briefcase, 
  FileText,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { Product, submitProductInquiry } from "../../lib/productsStore";

export interface ProductInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSuccess?: (message?: string) => void;
}

const DESIGNATION_ROLES = [
  "Surgeon / Consultant",
  "Hospital Procurement / Purchase Manager",
  "Distributor / Channel Partner",
  "Biomedical Engineer",
  "Operating Theatre In-Charge",
  "Other Healthcare Professional"
];

export default function ProductInquiryModal({
  isOpen,
  onClose,
  product,
  onSuccess
}: ProductInquiryModalProps) {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [cityState, setCityState] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(DESIGNATION_ROLES[0]);
  const [notes, setNotes] = useState("");
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

  const productName = product?.title || "General Clinical & Institutional Inquiry";
  const categoryText = product 
    ? `${product.division ? `${product.division} · ` : ""}${product.category || "Medical Devices"}` 
    : "Biomedical & Surgical Solutions";
  const certText = product?.certifications || (product?.division === "Manufacturing" ? "CDSCO Class C · ISO 13485" : "CE Certified · Indian Distribution");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !institution.trim() || !cityState.trim() || !phone.trim()) {
      setError("Please fill in all required fields marked with *.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // 1. Save lead to Admin Panel (localStorage & Supabase)
      await submitProductInquiry({
        product_id: product?.id,
        product_name: productName,
        category: product?.category,
        division: product?.division,
        name: name.trim(),
        institution: institution.trim(),
        city: cityState.trim(),
        phone: phone.trim(),
        role: role,
        quantity_requirement: notes.trim() || "Quote & specs requested",
        notes: notes.trim(),
      });

      // 2. Format WhatsApp Dispatch
      const formattedMessage = [
        "*New Product Inquiry - Emsurg Healthcare*",
        "----------------------------------------",
        `*Product:* ${productName}`,
        `*Category:* ${categoryText}`,
        "",
        `*Name:* ${name.trim()}`,
        `*Role:* ${role}`,
        `*Hospital/Institution:* ${institution.trim()}`,
        `*Location:* ${cityState.trim()}`,
        `*Phone:* ${phone.trim()}`,
        "",
        "*Requirement / Notes:*",
        notes.trim() || "Immediate hospital quotation, evaluation samples and technical dossier requested.",
        "----------------------------------------",
        "_Generated via emsurg.com official portal_"
      ].join("\n");

      // Official Emsurg Clinical Desk WhatsApp Number (+91 7439757452)
      const targetPhone = "917439757452";
      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(formattedMessage)}`;

      // Safe dispatch to WhatsApp in new tab
      try {
        const opened = window.open(waUrl, "_blank", "noopener,noreferrer");
        if (!opened) {
          window.location.href = waUrl;
        }
      } catch {
        window.location.href = waUrl;
      }

      setSubmitted(true);
      if (onSuccess) {
        onSuccess("Inquiry logged! Redirecting to Emsurg WhatsApp Clinical Desk...");
      }

      // Close modal smoothly after brief feedback
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Unable to log inquiry right now. Please message our desk directly on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
      {/* Frosted Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Frosted Liquid Glass Card Container */}
      <div className="relative bg-white/95 backdrop-blur-2xl border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
          aria-label="Close procurement modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Product Context */}
        <div className="border-b border-sky-100 pb-5 mb-5 pr-8">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700 bg-sky-50 border border-sky-200/80 px-2.5 py-0.5 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Clinical & Institutional Procurement</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug">
            {productName}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 font-medium">
            <span className="text-sky-700 font-semibold">{categoryText}</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">{certText}</span>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-1.5">Inquiry Logged Successfully</h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed mb-4">
              Routing your request to the Emsurg Clinical Desk on WhatsApp. Our representative will respond with pricing, dossiers, and dispatch timeline.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
              <span>Redirecting to WhatsApp...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* 2. Hospital / Institution */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Hospital / Institution / Clinic <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* 3. City & State and 4. Phone/WhatsApp in 2 Cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  City & State <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    required
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 5. Designation / Role */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Designation / Role
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium appearance-none cursor-pointer"
                >
                  {DESIGNATION_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 6. Requirement / Quantity / Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Requirement / Quantity / Notes
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea 
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium resize-none"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
              >
                {submitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center mt-2.5">
                ⚡ Direct link to Emsurg WhatsApp Clinical Desk (+91 7439757452) with lead tracking.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
