import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Building, 
  Award, 
  Info,
  ArrowRight
} from "lucide-react";
import { Product, fetchProductBySlug, fetchProducts, getLocalProductBySlug, subscribeToProducts, formatDriveImageUrl, getWhatsAppNumberForProduct } from "../lib/productsStore";
import ProductInquiryModal from "../components/products/ProductInquiryModal";
import { LiquidButton } from "../components/ui/liquid-glass-button";
import { companyInfo } from "../data/content";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(() => (slug ? getLocalProductBySlug(slug) || null : null));
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  // Inquiry Modal State
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isDownloadModal, setIsDownloadModal] = useState(false);
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

    const unsub = subscribeToProducts((updated) => {
      if (isMounted && updated && updated.length > 0) {
        const target = updated.find((p) => p.slug === slug);
        if (target) setProduct(target);
        const others = updated.filter((p) => p.slug !== slug).slice(0, 3);
        setRelatedProducts(others);
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, [slug]);

  // Update active image when product changes
  useEffect(() => {
    if (product) {
      const initialImg = (product.images && product.images.length > 0)
        ? formatDriveImageUrl(product.images[0])
        : formatDriveImageUrl((product as any).image || "");
      setActiveImage(initialImg || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop");
    }
  }, [product]);

  const handleInquirySuccess = () => {
    setToastMessage("Your inquiry has been submitted! Our clinical specialist will contact you promptly.");
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/products");
    }
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

  const rawImages = product.images && product.images.length > 0
    ? product.images
    : [(product as any).image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"];

  const images = Array.from(new Set(rawImages.map(formatDriveImageUrl).filter(Boolean)));
  const currentImage = activeImage || images[0] || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop";
  const currentIndex = Math.max(0, images.indexOf(currentImage));

  const handlePrevImage = () => {
    if (images.length <= 1) return;
    const nextIdx = (currentIndex - 1 + images.length) % images.length;
    setActiveImage(images[nextIdx]);
  };

  const handleNextImage = () => {
    if (images.length <= 1) return;
    const nextIdx = (currentIndex + 1) % images.length;
    setActiveImage(images[nextIdx]);
  };

  const targetWhatsApp = getWhatsAppNumberForProduct(product);
  const whatsappMessage = encodeURIComponent(
    `Hello Emsurg Healthcare, I am inquiring regarding the procurement and technical specs for: ${product.title}`
  );
  const whatsappUrl = `https://wa.me/${targetWhatsApp}?text=${whatsappMessage}`;

  return (
    <div className="bg-gradient-to-b from-sky-50/70 via-white to-white min-h-screen">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[130] bg-emerald-700 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb Header - Light Medical Liquid Glass Aesthetic */}
      <div className="pt-24 sm:pt-32 pb-4 sm:pb-6 bg-white/80 backdrop-blur-2xl border-b border-sky-100 shadow-[0_4px_20px_rgba(2,132,199,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center text-xs font-medium text-slate-500 gap-1.5 sm:gap-2">
            <Link to="/" className="hover:text-sky-600 transition-colors py-1">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/products" className="hover:text-sky-600 transition-colors py-1">Products</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link 
              to={`/products?category=${encodeURIComponent(product.category)}`} 
              className="text-sky-600 hover:text-sky-700 transition-colors py-1 truncate max-w-[140px] sm:max-w-none font-semibold"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-sky-900 font-semibold truncate max-w-[150px] sm:max-w-xs py-1">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <div className="mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-sky-700 bg-white hover:bg-sky-50/60 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-sky-200 shadow-xs transition-all cursor-pointer active:scale-95 select-none group"
            aria-label="Back to Products Catalog"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-600 transition-colors" />
            <span>Back to Products</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT COLUMN: Interactive E-Commerce Style Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm overflow-hidden relative">
              {/* Main Image Viewport */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-6 group">
                {currentImage ? (
                  <img
                    key={currentImage}
                    src={currentImage}
                    alt={product.title}
                    className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="text-slate-300 text-sm">No image available</div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                  <span className="inline-block text-[11px] font-bold tracking-wider text-sky-700 uppercase bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-sky-100">
                    {product.category}
                  </span>
                </div>

                {/* Counter Badge */}
                {images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-slate-900/75 text-white backdrop-blur-md text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous Image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 hover:scale-105"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next Image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 hover:scale-105"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Clickable Thumbnail Strip */}
              {images.length > 1 && (
                <div className="mt-4">
                  <div className="flex flex-row gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    {images.map((imgUrl, idx) => {
                      const isActive = currentImage === imgUrl;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImage(imgUrl)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all snap-start ${
                            isActive
                              ? "border-sky-500 ring-2 ring-sky-200 ring-offset-1 opacity-100 shadow-sm"
                              : "border-slate-100 opacity-60 hover:opacity-100 hover:border-sky-300"
                          }`}
                        >
                          <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover bg-white" />
                        </button>
                      );
                    })}
                  </div>
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
                {product.division === "Manufacturing" ? (
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-sky-600" />
                    Indigenous Manufacturing
                  </span>
                ) : product.division === "Channel Partner" ? (
                  <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    Channel Partner{product.partnerBrand ? ` · ${product.partnerBrand}` : ""}
                  </span>
                ) : null}
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.certifications ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    {product.certifications}
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    Regulatory Approved
                  </span>
                )}
                {product.isUpcoming && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    Launching Soon
                  </span>
                )}
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
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <LiquidButton
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      setIsDownloadModal(false);
                      setIsInquiryOpen(true);
                    }}
                    className="w-full sm:w-auto text-sm font-bold uppercase tracking-wider py-3.5 px-7 justify-center gap-2 shadow-md shadow-sky-600/20"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </LiquidButton>

                  <LiquidButton
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setIsDownloadModal(true);
                      setIsInquiryOpen(true);
                    }}
                    className="w-full sm:w-auto text-sm font-bold uppercase tracking-wider py-3.5 px-6 justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-sky-600" />
                    <span>Technical Brochure (PDF)</span>
                  </LiquidButton>
                </div>
              </div>

              {/* Key Features Bullet List */}
              {product.features && product.features.length > 0 && (
                <div className="bg-slate-100/70 p-5 rounded-2xl border border-slate-200">
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
          </div>
        </div>

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

      {/* Inquiry / Gated Download Modal */}
      <ProductInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => {
          setIsInquiryOpen(false);
          setIsDownloadModal(false);
        }}
        product={product}
        onSuccess={handleInquirySuccess}
        isDownload={isDownloadModal}
        downloadUrl={
          (product?.brochure_url && product.brochure_url !== "#") 
            ? product.brochure_url 
            : "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/Hemodialysis%20Product%20Brochure.pdf"
        }
      />
    </div>
  );
}
