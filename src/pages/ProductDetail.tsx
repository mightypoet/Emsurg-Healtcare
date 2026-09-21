import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  Download, 
  MessageSquare, 
  Building, 
  Award, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Sparkles, 
  Info,
  HelpCircle
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Product, fetchProductBySlug, fetchProducts, getLocalProductBySlug } from "../lib/productsStore";
import ProductInquiryModal from "../components/products/ProductInquiryModal";
import { ProductFAQSection } from "../components/products/ProductFAQSection";
import { companyInfo } from "../data/content";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(() => (slug ? getLocalProductBySlug(slug) || null : null));
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    indications: true,
    specifications: true,
    storage: false,
  });

  // Inquiry Modal State
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!slug) return;
      try {
        const found = await fetchProductBySlug(slug);
        if (isMounted && found) {
          setProduct(found);
        }

        const all = await fetchProducts();
        if (isMounted) {
          const others = all.filter((p) => p.slug !== slug).slice(0, 3);
          setRelatedProducts(others);
        }
      } catch (err) {
        console.info("Using local product details:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInquirySuccess = () => {
    setToastMessage("Your inquiry has been submitted! Our clinical specialist will contact you promptly.");
    setTimeout(() => setToastMessage(null), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm font-medium">Loading product specifications...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <Info className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">
            The requested medical device or solution may have been updated or moved.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products Catalog
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"];

  const currentImage = images[selectedImageIndex] || images[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Emsurg Healthcare, I am inquiring regarding the procurement and technical specs for: ${product.title}`
  );
  const whatsappUrl = `https://wa.me/917439757452?text=${whatsappMessage}`;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[130] bg-emerald-700 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb Header */}
      <div className="pt-32 pb-6 bg-[#0B1120] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center text-xs font-medium text-slate-400 gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link to="/products" className="hover:text-white transition-colors">Products Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="text-blue-400 hover:text-blue-300 transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-slate-200 truncate max-w-xs">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT COLUMN: Interactive Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm overflow-hidden relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="inline-block text-[11px] font-bold tracking-wider text-blue-700 uppercase bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-slate-200">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? "border-blue-600 ring-2 ring-blue-500/30 scale-95"
                          : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality & Manufacturing Assurance Badge Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-1.5" />
                <span className="text-xs font-bold text-slate-800">CDSCO Certified</span>
                <span className="text-[10px] text-slate-500">Class C / Form MD-9</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-100 px-2">
                <Award className="w-6 h-6 text-blue-600 mb-1.5" />
                <span className="text-xs font-bold text-slate-800">ISO 13485:2016</span>
                <span className="text-[10px] text-slate-500">Quality Management</span>
              </div>
              <div className="flex flex-col items-center">
                <Building className="w-6 h-6 text-amber-600 mb-1.5" />
                <span className="text-xs font-bold text-slate-800">Indigenous & Global</span>
                <span className="text-[10px] text-slate-500">Hospital Direct</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details & Action Dock */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Regulatory Approved
                </span>
                {product.is_featured && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    Flagship System
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Short Description */}
              <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
                {product.short_description}
              </p>

              {/* Action Dock (Primary CTAs) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setIsInquiryOpen(true)}
                    className="flex-1 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-4 h-4" /> Request Quotation / Inquiry
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <PhoneCall className="w-4 h-4" /> WhatsApp Direct
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 gap-2">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fast Response from Clinical Specialists
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="#technical-faqs"
                      className="inline-flex items-center gap-1 font-bold text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-600" /> Technical FAQs &darr;
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setToastMessage("Technical product brochure has been requested. We will email you the PDF.");
                        setTimeout(() => setToastMessage(null), 4000);
                      }}
                      className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Technical Brochure (PDF)
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Features Bullet List */}
              {product.features && product.features.length > 0 && (
                <div className="bg-slate-100/70 p-5 rounded-2xl border border-slate-200 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Core Technical & Clinical Highlights
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2.5 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion Tabs */}
            <div className="space-y-3">
              {/* Accordion 1: Clinical Indications & Description */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("indications")}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" /> Clinical Indications & Mechanisms
                  </span>
                  {openAccordions.indications ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {openAccordions.indications && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
                    <ReactMarkdown>{product.full_description || product.short_description}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Accordion 2: Technical Specifications & Variants */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("specifications")}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Technical Specifications & Variants
                    </span>
                    {openAccordions.specifications ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  {openAccordions.specifications && (
                    <div className="p-5 border-t border-slate-100">
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="border-b border-slate-100 pb-2">
                            <dt className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">{key}</dt>
                            <dd className="font-semibold text-slate-900 mt-0.5 text-xs">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>
              )}

              {/* Accordion 3: Storage, Sterility & Handling */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("storage")}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" /> Storage, Sterility & Institutional Supply
                  </span>
                  {openAccordions.storage ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {openAccordions.storage && (
                  <div className="p-5 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
                    <p>
                      <strong>Storage Conditions:</strong> Store in a cool, dry place between 15°C and 25°C away from direct sunlight and excessive humidity.
                    </p>
                    <p>
                      <strong>Sterility Assurance Level (SAL):</strong> Delivered sterile in validated tamper-evident medical blister packaging. Single-use only; do not re-sterilize.
                    </p>
                    <p>
                      <strong>Hospital Tenders:</strong> Emsurg maintains dedicated buffer stocks for accredited hospitals (Apollo, Fortis, Narayana Health, Manipal) to ensure 24/48-hour delivery across India.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical FAQ & Safety Accordion Section */}
        <ProductFAQSection
          product={product}
          onOpenInquiry={() => setIsInquiryOpen(true)}
        />

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Complementary Portfolio</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Explore Other Clinical Solutions</h3>
              </div>
              <Link to="/products" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                View Entire Catalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-2">{rel.category}</span>
                    <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">{rel.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{rel.short_description}</p>
                  </div>
                  <Link
                    to={`/products/${rel.slug}`}
                    className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    View Specifications &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <ProductInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={product}
        onSuccess={handleInquirySuccess}
      />
    </div>
  );
}
