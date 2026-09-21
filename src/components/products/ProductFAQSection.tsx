import React, { useState, useMemo } from "react";
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ShieldCheck, 
  Cpu, 
  PackageCheck, 
  MessageSquare, 
  PhoneCall, 
  FileCheck2, 
  Check, 
  ThumbsUp, 
  ThumbsDown,
  Layers,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { Product, ProductFAQ, getProductFAQs } from "../../lib/productsStore";

interface ProductFAQSectionProps {
  product: Product;
  onOpenInquiry?: () => void;
}

type CategoryFilter = "all" | "compatibility" | "safety" | "handling";

export function ProductFAQSection({ product, onOpenInquiry }: ProductFAQSectionProps) {
  const faqs: ProductFAQ[] = useMemo(() => {
    return getProductFAQs(product);
  }, [product]);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  // Track open accordion indices or IDs
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    // Open the first 2 questions by default for instant readability
    const initial: Record<string, boolean> = {};
    if (faqs.length > 0 && faqs[0].id) initial[faqs[0].id] = true;
    if (faqs.length > 1 && faqs[1].id) initial[faqs[1].id] = true;
    return initial;
  });

  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, "yes" | "no">>({});

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        (faq.badge && faq.badge.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [faqs, activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((faq, index) => {
      const key = faq.id || `faq-${index}`;
      allOpen[key] = true;
    });
    setOpenIds(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenIds({});
  };

  // Counts for tabs
  const compatibilityCount = faqs.filter((f) => f.category === "compatibility").length;
  const safetyCount = faqs.filter((f) => f.category === "safety").length;
  const handlingCount = faqs.filter((f) => f.category === "handling").length;

  const getCategoryMeta = (cat: ProductFAQ["category"]) => {
    switch (cat) {
      case "compatibility":
        return {
          label: "Compatibility & Integration",
          badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Cpu,
        };
      case "safety":
        return {
          label: "Safety & Biocompatibility",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: ShieldCheck,
        };
      case "handling":
      default:
        return {
          label: "Sterility & Handling",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: PackageCheck,
        };
    }
  };

  const whatsappInquiryUrl = `https://wa.me/917439757452?text=${encodeURIComponent(
    `Hello Emsurg, I have a technical compatibility & safety question regarding: ${product.title}`
  )}`;

  return (
    <section id="technical-faqs" className="mt-16 pt-12 border-t border-slate-200">
      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> Technical FAQ & Safety Assurance
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Technical Questions
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Essential clinical compatibility data, biocompatibility ratings, and material safety profiles for{" "}
            <span className="font-semibold text-slate-800">{product.title}</span>.
          </p>
        </div>

        {/* Global Expand/Collapse Actions */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <button
            type="button"
            onClick={handleExpandAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Layers className="w-3 h-3" /> All Questions ({faqs.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("compatibility")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === "compatibility"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Cpu className="w-3 h-3" /> Compatibility & Integration ({compatibilityCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("safety")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === "safety"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <ShieldCheck className="w-3 h-3" /> Safety & Biocompatibility ({safetyCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("handling")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === "handling"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <PackageCheck className="w-3 h-3" /> Sterility & Handling ({handlingCount})
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[240px] sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g., MRI, antibiotics)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800 mb-1">No matching technical questions found</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Try adjusting your search terms or view all categories to see the complete safety and compatibility data.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const id = faq.id || `faq-${index}`;
            const isOpen = Boolean(openIds[id]);
            const meta = getCategoryMeta(faq.category);
            const CategoryIcon = meta.icon;
            const feedback = helpfulFeedback[id];

            return (
              <div
                key={id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                  isOpen
                    ? "border-blue-300 ring-2 ring-blue-500/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 transition-colors focus:outline-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${meta.badgeBg}`}
                      >
                        <CategoryIcon className="w-3 h-3" />
                        {meta.label}
                      </span>
                      {faq.badge && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                          {faq.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`mt-1 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 shrink-0 ${
                      isOpen ? "bg-blue-600 text-white rotate-180" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content Body */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    <div className="pt-2">{faq.answer}</div>

                    {/* Compatibility/Safety Highlighting Alert Box */}
                    {faq.category === "safety" && (
                      <div className="mt-3.5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-[11px] sm:text-xs text-emerald-900 flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Emsurg Safety Compliance:</strong> Batch-tested and manufactured under ISO 13485:2016 quality standards with full traceable Certificate of Analysis (CoA) documentation.
                        </div>
                      </div>
                    )}

                    {faq.category === "compatibility" && (
                      <div className="mt-3.5 p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11px] sm:text-xs text-blue-900 flex items-start gap-2.5">
                        <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Clinical Protocol Advisory:</strong> Always review the accompanying Instructions for Use (IFU) before mixing pharmacological additives or connecting auxiliary lines.
                        </div>
                      </div>
                    )}

                    {/* Feedback Rating Dock */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                      <span className="text-[11px]">Was this technical answer clear and helpful?</span>
                      <div className="flex items-center gap-1.5">
                        {feedback ? (
                          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Thank you for your feedback!
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => setHelpfulFeedback((prev) => ({ ...prev, [id]: "yes" }))}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                            >
                              <ThumbsUp className="w-3 h-3 text-slate-500" /> Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setHelpfulFeedback((prev) => ({ ...prev, [id]: "no" }))}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                            >
                              <ThumbsDown className="w-3 h-3 text-slate-500" /> No
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Clinical Support Callout Banner */}
      <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
              <MessageSquare className="w-3.5 h-3.5" /> Clinical & Regulatory Support Desk
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Have an institutional protocol or specific compatibility question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Our biomedical engineering team and clinical application specialists provide customized compatibility audits, Certificate of Analysis (CoA), hospital tender dossiers, and scrub-in assistance.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            {onOpenInquiry && (
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" /> Ask a Question / Request Quote
              </button>
            )}
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> WhatsApp Specialist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
