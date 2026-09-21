import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { 
  getLocalPosts, 
  saveLocalPost, 
  deleteLocalPost, 
  deleteArticle,
  toggleLocalFeatured, 
  withTimeout,
  Post 
} from "../../lib/postsStore";
import {
  Product,
  ProductInquiry,
  fetchProducts,
  getLocalProducts,
  saveLocalProduct,
  deleteLocalProduct,
  deleteProduct,
  toggleLocalProductFeatured,
  getLocalInquiries
} from "../../lib/productsStore";
import { 
  LogOut, 
  Plus, 
  Edit2, 
  Pencil,
  Trash2, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Image as ImageIcon, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  RefreshCw,
  Package,
  FileText,
  MessageSquare,
  ExternalLink,
  PlusCircle,
  Sparkles,
  Phone,
  Mail,
  Building,
  MapPin
} from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prodFileInputRef = useRef<HTMLInputElement>(null);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<"products" | "articles" | "inquiries">("products");

  // Feedback Toast State
  const [toast, setToast] = useState<{ type: "success" | "warning" | "error"; message: string } | null>(null);

  // In-App Delete Confirmation Modal State (safe inside sandboxed iframes)
  const [deleteModal, setDeleteModal] = useState<{
    type: "product" | "article";
    id: string;
    title: string;
  } | null>(null);

  const showToast = (type: "success" | "warning" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  /* ---------------- ARTICLES STATE ---------------- */
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Orthobiologics");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const ARTICLE_CATEGORIES = ["Orthobiologics", "Wound Care", "Dialysis", "Indigenous Manufacturing"];

  /* ---------------- PRODUCTS STATE ---------------- */
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [prodTitle, setProdTitle] = useState("");
  const [prodSlug, setProdSlug] = useState("");
  const [prodCategory, setProdCategory] = useState("Orthobiologics");
  const [prodShortDesc, setProdShortDesc] = useState("");
  const [prodFullDesc, setProdFullDesc] = useState("");
  const [prodFeatures, setProdFeatures] = useState<string[]>([]);
  const [newFeatureInput, setNewFeatureInput] = useState("");
  const [prodSpecs, setProdSpecs] = useState<Record<string, string>>({});
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [prodImages, setProdImages] = useState<string[]>([]);
  const [newImageInput, setNewImageInput] = useState("");
  const [prodIsFeatured, setProdIsFeatured] = useState(true);
  const [prodBrochureUrl, setProdBrochureUrl] = useState("");
  const [savingProduct, setSavingProduct] = useState(false);
  const [uploadingProdImage, setUploadingProdImage] = useState(false);

  const PRODUCT_CATEGORIES = [
    "Orthobiologics",
    "Wound Management",
    "Nephro Care",
    "Biopsy Devices",
    "Bone Cements",
    "Sports Medicine"
  ];

  /* ---------------- INQUIRIES STATE ---------------- */
  const [inquiries, setInquiries] = useState<ProductInquiry[]>([]);

  useEffect(() => {
    checkAuth();
    loadAllData();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const isMockAuth = sessionStorage.getItem("admin_auth") === "true";
      if (!data.session && !isMockAuth) {
        navigate("/admin/login");
      }
    } catch {
      const isMockAuth = sessionStorage.getItem("admin_auth") === "true";
      if (!isMockAuth) {
        navigate("/admin/login");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    sessionStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  const loadAllData = async () => {
    await Promise.all([fetchPosts(), loadProducts(), loadInquiries()]);
  };

  /* ---------------- POSTS LOGIC ---------------- */
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const timeoutPromise = new Promise<{ data: any; error: any }>((resolve) => {
        setTimeout(() => resolve({ data: null, error: { message: "timeout" } }), 3000);
      });
      const fetchPromise = supabase.from("posts").select("*").order("created_at", { ascending: false });
      const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

      if (error || !data || data.length === 0) {
        setPosts(getLocalPosts());
      } else {
        const local = getLocalPosts();
        const map = new Map<string, Post>();
        local.forEach((p) => map.set(p.slug, p));
        data.forEach((p: Post) => map.set(p.slug, p));
        setPosts(Array.from(map.values()));
      }
    } catch {
      setPosts(getLocalPosts());
    } finally {
      setLoadingPosts(false);
    }
  };

  const openPostEditor = (post?: Post) => {
    if (post) {
      setCurrentPost(post);
      setTitle(post.title || "");
      setSlug(post.slug || "");
      setCategory(post.category || "Orthobiologics");
      setExcerpt(post.excerpt || "");
      setContent(post.content || "");
      setCoverImage(post.cover_image || "");
      setPublished(post.published ?? true);
      setFeatured(post.featured ?? false);
    } else {
      setCurrentPost(null);
      setTitle("");
      setSlug("");
      setCategory("Orthobiologics");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setPublished(true);
      setFeatured(false);
    }
    setIsEditingPost(true);
  };

  const handlePostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!currentPost) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-")
      );
    }
  };

  const handlePostImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("error", "Please upload an image file (JPG, PNG, WebP).");
      return;
    }

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setCoverImage(base64);
        setUploadingImage(false);
        showToast("success", "Cover image attached.");
      };
      reader.onerror = () => {
        setUploadingImage(false);
        showToast("error", "Failed to read image file.");
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingImage(false);
      showToast("error", "Error uploading file.");
    }
  };

  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim()) {
      showToast("warning", "Please fill in Title, Slug, Excerpt, and Content.");
      return;
    }

    setSavingPost(true);
    const postData = {
      title: title.trim(),
      slug: slug.trim(),
      category,
      excerpt: excerpt.trim(),
      content: content.trim(),
      cover_image: coverImage.trim(),
      published,
      featured,
    };

    try {
      if (currentPost && !currentPost.id.startsWith("post-")) {
        await withTimeout(Promise.resolve(supabase.from("posts").update(postData).eq("id", currentPost.id)), 3000);
      } else {
        await withTimeout(Promise.resolve(supabase.from("posts").insert([postData])), 3000);
      }
    } catch (err) {
      console.info("Supabase post fallback to local:", err);
    }

    saveLocalPost(postData, currentPost?.id);
    await fetchPosts();
    setIsEditingPost(false);
    setSavingPost(false);
    showToast("success", "Article saved successfully!");
  };

  const executeDeleteArticle = async (id: string) => {
    deleteLocalPost(id);
    setPosts((prev) => prev.filter((a) => a.id !== id));
    showToast("success", "Article deleted successfully");

    try {
      if (!id.startsWith("post-")) {
        await withTimeout(Promise.resolve(supabase.from("posts").delete().eq("id", id)), 3000);
      }
    } catch (err) {
      console.info("Supabase post delete bypass:", err);
    }
  };

  const handleDeleteArticle = (id: string, title?: string) => {
    const post = posts.find((p) => p.id === id);
    setDeleteModal({
      type: "article",
      id,
      title: title || post?.title || "this article",
    });
  };

  const handleDeletePost = handleDeleteArticle;

  const handleTogglePostFeatured = async (post: Post) => {
    try {
      if (!post.id.startsWith("post-")) {
        await withTimeout(Promise.resolve(supabase.from("posts").update({ featured: !post.featured }).eq("id", post.id)), 3000);
      }
    } catch (err) {
      console.info("Supabase toggle bypass:", err);
    }
    toggleLocalFeatured(post.id);
    await fetchPosts();
    showToast("success", `Article ${!post.featured ? "marked as featured" : "unfeatured"}.`);
  };

  /* ---------------- PRODUCTS LOGIC ---------------- */
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setProducts(getLocalProducts());
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadInquiries = () => {
    setInquiries(getLocalInquiries());
  };

  const openProductEditor = (prod?: Product) => {
    if (prod) {
      setCurrentProduct(prod);
      setProdTitle(prod.title || "");
      setProdSlug(prod.slug || "");
      setProdCategory(prod.category || "Orthobiologics");
      setProdShortDesc(prod.short_description || "");
      setProdFullDesc(prod.full_description || "");
      setProdFeatures(prod.features || []);
      setProdSpecs(prod.specifications || {});
      setProdImages(prod.images || []);
      setProdIsFeatured(prod.is_featured ?? true);
      setProdBrochureUrl(prod.brochure_url || "");
    } else {
      setCurrentProduct(null);
      setProdTitle("");
      setProdSlug("");
      setProdCategory("Orthobiologics");
      setProdShortDesc("");
      setProdFullDesc("");
      setProdFeatures([]);
      setProdSpecs({
        "Sterilization": "Gamma Irradiation (25 kGy)",
        "Regulatory Standard": "CDSCO Class C / ISO 13485:2016",
        "Packaging": "Sterile Single-Use Kit"
      });
      setProdImages([
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
      ]);
      setProdIsFeatured(true);
      setProdBrochureUrl("");
    }
    setNewFeatureInput("");
    setNewSpecKey("");
    setNewSpecValue("");
    setNewImageInput("");
    setIsEditingProduct(true);
  };

  const handleProdTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setProdTitle(val);
    if (!currentProduct) {
      setProdSlug(
        val
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-")
      );
    }
  };

  const handleProdImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("error", "Please upload an image file (JPG, PNG, WebP).");
      return;
    }

    setUploadingProdImage(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setProdImages((prev) => [base64, ...prev]);
        setUploadingProdImage(false);
        showToast("success", "Product image attached.");
      };
      reader.onerror = () => {
        setUploadingProdImage(false);
        showToast("error", "Failed to read image file.");
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingProdImage(false);
      showToast("error", "Error uploading product image.");
    }
  };

  const addFeature = () => {
    if (!newFeatureInput.trim()) return;
    setProdFeatures((prev) => [...prev, newFeatureInput.trim()]);
    setNewFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setProdFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const addSpec = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setProdSpecs((prev) => ({
      ...prev,
      [newSpecKey.trim()]: newSpecValue.trim()
    }));
    setNewSpecKey("");
    setNewSpecValue("");
  };

  const removeSpec = (key: string) => {
    setProdSpecs((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const addImageFromUrl = () => {
    if (!newImageInput.trim()) return;
    setProdImages((prev) => [...prev, newImageInput.trim()]);
    setNewImageInput("");
  };

  const removeImage = (index: number) => {
    setProdImages((prev) => prev.filter((_, i) => i !== index));
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim() || !prodSlug.trim() || !prodShortDesc.trim()) {
      showToast("warning", "Please provide Title, Slug, and Short Summary.");
      return;
    }

    setSavingProduct(true);
    const productPayload: Partial<Product> = {
      title: prodTitle.trim(),
      slug: prodSlug.trim(),
      category: prodCategory,
      short_description: prodShortDesc.trim(),
      full_description: prodFullDesc.trim() || prodShortDesc.trim(),
      features: prodFeatures,
      specifications: prodSpecs,
      images: prodImages.length > 0 ? prodImages : ["https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"],
      is_featured: prodIsFeatured,
      brochure_url: prodBrochureUrl.trim() || "#"
    };

    // Save locally
    saveLocalProduct(productPayload, currentProduct?.id);

    // Optional Supabase sync with timeout
    try {
      if (currentProduct && !currentProduct.id.startsWith("prod-")) {
        await withTimeout(
          Promise.resolve(supabase.from("products").update(productPayload).eq("id", currentProduct.id)),
          3000
        );
      } else {
        await withTimeout(
          Promise.resolve(supabase.from("products").insert([productPayload])),
          3000
        );
      }
    } catch (err) {
      console.info("Supabase products sync skipped:", err);
    }

    await loadProducts();
    setIsEditingProduct(false);
    setSavingProduct(false);
    showToast("success", "Product details saved successfully!");
  };

  const executeDeleteProduct = async (id: string) => {
    deleteLocalProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("success", "Product removed successfully");

    try {
      if (!id.startsWith("prod-")) {
        await withTimeout(Promise.resolve(supabase.from("products").delete().eq("id", id)), 3000);
      }
    } catch (err) {
      console.info("Supabase delete bypassed:", err);
    }
  };

  const handleDeleteProduct = (id: string, title?: string) => {
    const prod = products.find((p) => p.id === id);
    setDeleteModal({
      type: "product",
      id,
      title: title || prod?.title || "this product",
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal) return;
    const { type, id } = deleteModal;
    setDeleteModal(null);

    if (type === "product") {
      await executeDeleteProduct(id);
    } else {
      await executeDeleteArticle(id);
    }
  };

  const handleToggleProductFeatured = async (product: Product) => {
    try {
      if (!product.id.startsWith("prod-")) {
        await withTimeout(
          Promise.resolve(supabase.from("products").update({ is_featured: !product.is_featured }).eq("id", product.id)),
          3000
        );
      }
    } catch (err) {
      console.info("Supabase update featured bypassed:", err);
    }
    toggleLocalProductFeatured(product.id);
    await loadProducts();
    showToast("success", `Product ${!product.is_featured ? "marked as Flagship" : "unflagged"}.`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 max-w-md rounded-2xl p-4 shadow-xl border flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : toast.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />}
          {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />}
          {toast.type === "error" && <XCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />}
          <div className="flex-1 text-sm font-medium pr-2">{toast.message}</div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal (In-App Dialog, safe in sandboxed iframes) */}
      {deleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setDeleteModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">
                  Delete {deleteModal.type === "product" ? "Product" : "Article"}?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Are you sure you want to delete this {deleteModal.type}?
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {deleteModal.type === "product" ? "Product" : "Article"}
              </span>
              <p className="text-sm font-bold text-slate-900 line-clamp-2">
                {deleteModal.title}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-200 flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                  E
                </span>
                <span className="text-lg font-bold text-slate-900 tracking-tight">Emsurg Admin</span>
              </div>

              {/* Navigation Tabs */}
              <div className="hidden md:flex items-center space-x-1 border-l border-slate-200 pl-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("products");
                    setIsEditingProduct(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === "products"
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Package className="w-4 h-4" /> Products ({products.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("articles");
                    setIsEditingPost(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === "articles"
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4" /> Articles ({posts.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("inquiries");
                    loadInquiries();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === "inquiries"
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" /> Inquiries ({inquiries.length})
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/products"
                target="_blank"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Globe className="w-3.5 h-3.5" /> View Products
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="md:hidden flex border-t border-slate-100 px-4 py-2 gap-2 overflow-x-auto bg-slate-50">
          <button
            onClick={() => {
              setActiveTab("products");
              setIsEditingProduct(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
              activeTab === "products" ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-slate-200"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("articles");
              setIsEditingPost(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
              activeTab === "articles" ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-slate-200"
            }`}
          >
            Articles ({posts.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("inquiries");
              loadInquiries();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
              activeTab === "inquiries" ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-slate-200"
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ======================================================== */}
        {/* SECTION 1: PRODUCTS TAB                                  */}
        {/* ======================================================== */}
        {activeTab === "products" && (
          <>
            {!isEditingProduct ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Medical Products Catalog</h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage indigenous medical devices, French PMMA cements, Italian biopsy lines, and surgical solutions.
                    </p>
                  </div>
                  <button
                    onClick={() => openProductEditor()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm shadow-blue-500/20 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" /> New Product
                  </button>
                </div>

                <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-left">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {loadingProducts ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                              Loading products catalog...
                            </td>
                          </tr>
                        ) : products.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-500">
                              No products found. Click "New Product" to add your first device.
                            </td>
                          </tr>
                        ) : (
                          products.map((p) => {
                            const thumb = p.images?.[0] || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=200&auto=format&fit=crop";
                            return (
                              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={thumb}
                                      alt={p.title}
                                      className="w-12 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                                    />
                                    <div>
                                      <div className="text-sm font-bold text-slate-900 line-clamp-1">{p.title}</div>
                                      <div className="text-xs text-slate-400 font-mono">/products/{p.slug}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-700">
                                  <span className="px-2.5 py-1 bg-slate-100 rounded-full border border-slate-200">
                                    {p.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {p.is_featured ? (
                                    <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                      Flagship
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-600">
                                      Standard
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                                  <div className="flex justify-end items-center gap-2">
                                    <Link
                                      to={`/products/${p.slug}`}
                                      target="_blank"
                                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                      title="View Live Product Page"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => handleToggleProductFeatured(p)}
                                      className={`p-1.5 rounded-lg border transition-colors ${
                                        p.is_featured
                                          ? "bg-amber-50 border-amber-200 text-amber-600"
                                          : "border-slate-200 text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                                      }`}
                                      title={p.is_featured ? "Flagship product (Click to unflag)" : "Click to mark as Flagship"}
                                    >
                                      <Sparkles className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openProductEditor(p);
                                      }}
                                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4 text-slate-500 hover:text-blue-600" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (e.shiftKey) {
                                          executeDeleteProduct(p.id);
                                        } else {
                                          handleDeleteProduct(p.id, p.title);
                                        }
                                      }}
                                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              /* PRODUCT EDITOR FORM */
              <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {currentProduct ? "Edit Product" : "New Medical Product"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure specifications, features, imagery, and regulatory dossier details.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={saveProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Product Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BoneSurg CR"
                        value={prodTitle}
                        onChange={handleProdTitleChange}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={prodSlug}
                        onChange={(e) => setProdSlug(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 text-sm font-medium bg-white"
                      >
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Short Summary (E-Commerce & Card Summary) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={prodShortDesc}
                        onChange={(e) => setProdShortDesc(e.target.value)}
                        placeholder="Concise 1-2 sentence description highlighting clinical utility and formulation..."
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Clinical Description & Mechanisms (Markdown Supported)
                      </label>
                      <textarea
                        rows={6}
                        value={prodFullDesc}
                        onChange={(e) => setProdFullDesc(e.target.value)}
                        placeholder="Detailed clinical mechanism, indications, antibiotic elution profiles, and surgical steps..."
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 text-sm font-mono"
                      />
                    </div>

                    {/* IMAGERY SECTION */}
                    <div className="md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-blue-600" /> Product Images
                        </label>
                        <div>
                          <input
                            type="file"
                            ref={prodFileInputRef}
                            onChange={handleProdImageUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => prodFileInputRef.current?.click()}
                            disabled={uploadingProdImage}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                          >
                            <Upload className="w-3.5 h-3.5" /> Upload File
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-3">
                        <input
                          type="url"
                          placeholder="Or paste image URL (e.g. Unsplash or Cloud Storage)..."
                          value={newImageInput}
                          onChange={(e) => setNewImageInput(e.target.value)}
                          className="flex-1 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 bg-white"
                        />
                        <button
                          type="button"
                          onClick={addImageFromUrl}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs"
                        >
                          Add URL
                        </button>
                      </div>

                      {prodImages.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {prodImages.map((img, idx) => (
                            <div key={idx} className="relative w-24 h-20 rounded-xl overflow-hidden border border-slate-300 group bg-white">
                              <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity"
                                title="Remove image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* KEY FEATURES SECTION */}
                    <div className="md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Key Features & Advantages
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="e.g. Compatible with Heat-Stable Antibiotics"
                          value={newFeatureInput}
                          onChange={(e) => setNewFeatureInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addFeature();
                            }
                          }}
                          className="flex-1 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 bg-white"
                        />
                        <button
                          type="button"
                          onClick={addFeature}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs"
                        >
                          Add Feature
                        </button>
                      </div>

                      {prodFeatures.length > 0 ? (
                        <ul className="space-y-2">
                          {prodFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800">
                              <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                {feat}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFeature(idx)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No features added yet.</p>
                      )}
                    </div>

                    {/* TECHNICAL SPECIFICATIONS */}
                    <div className="md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Technical Specifications (Key & Value)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Spec Name (e.g. Resorption Rate)"
                          value={newSpecKey}
                          onChange={(e) => setNewSpecKey(e.target.value)}
                          className="sm:col-span-2 border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white text-slate-900"
                        />
                        <input
                          type="text"
                          placeholder="Specification Value (e.g. 30–60 Days)"
                          value={newSpecValue}
                          onChange={(e) => setNewSpecValue(e.target.value)}
                          className="sm:col-span-2 border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white text-slate-900"
                        />
                        <button
                          type="button"
                          onClick={addSpec}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs"
                        >
                          Add Spec
                        </button>
                      </div>

                      {Object.keys(prodSpecs).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {Object.entries(prodSpecs).map(([key, val]) => (
                            <div key={key} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                              <div>
                                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">{key}</span>
                                <span className="font-semibold text-slate-900 block">{val}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeSpec(key)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No specifications added yet.</p>
                      )}
                    </div>

                    {/* FLAGSHIP TOGGLE */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="prodIsFeatured"
                        checked={prodIsFeatured}
                        onChange={(e) => setProdIsFeatured(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                      />
                      <label htmlFor="prodIsFeatured" className="ml-2 block text-xs font-bold text-slate-700">
                        Mark as Flagship Product (Highlighted in Catalog)
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsEditingProduct(false)}
                      className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingProduct || uploadingProdImage}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-bold text-white transition-colors disabled:opacity-50 shadow-sm"
                    >
                      {savingProduct ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving Product...</span>
                        </>
                      ) : (
                        <span>Save Product</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* SECTION 2: ARTICLES TAB (CLINICAL INSIGHTS)              */}
        {/* ======================================================== */}
        {activeTab === "articles" && (
          <>
            {!isEditingPost ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Clinical Articles & Research</h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage clinical insights, case studies, and research publications.
                    </p>
                  </div>
                  <button
                    onClick={() => openPostEditor()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm shadow-blue-500/20 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" /> New Article
                  </button>
                </div>

                <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-left">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Article</th>
                          <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {loadingPosts ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                              Loading articles...
                            </td>
                          </tr>
                        ) : posts.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                              No articles found. Click "New Article" to create your first post.
                            </td>
                          </tr>
                        ) : (
                          posts.map((post) => (
                            <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  {post.cover_image && (
                                    <img
                                      src={post.cover_image}
                                      alt={post.title}
                                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                                    />
                                  )}
                                  <div>
                                    <div className="text-sm font-bold text-slate-900 line-clamp-1">{post.title}</div>
                                    <div className="text-xs text-slate-500">/{post.slug}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {post.published ? "Published" : "Draft"}
                                </span>
                                {post.featured && (
                                  <span className="ml-2 px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    Featured
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-medium">{post.category}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                                {post.created_at ? format(new Date(post.created_at), "MMM d, yyyy") : "Recent"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                                <div className="flex justify-end items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleTogglePostFeatured(post)}
                                    className={`p-1.5 rounded-lg border transition-colors ${
                                      post.featured
                                        ? "bg-blue-50 border-blue-200 text-blue-600"
                                        : "border-transparent text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                                    }`}
                                    title={post.featured ? "Featured (Click to unfeature)" : "Click to feature"}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openPostEditor(post);
                                    }}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                    title="Edit"
                                  >
                                    <Pencil className="w-4 h-4 text-slate-500 hover:text-blue-600" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (e.shiftKey) {
                                        executeDeleteArticle(post.id);
                                      } else {
                                        handleDeleteArticle(post.id, post.title);
                                      }
                                    }}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              /* ARTICLE EDITOR FORM */
              <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{currentPost ? "Edit Article" : "New Article"}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Author medical insights and research updates.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingPost(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={savePost} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Advancements in Nanocrystalline Hydroxyapatite"
                        value={title}
                        onChange={handlePostTitleChange}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 text-sm font-medium bg-white"
                      >
                        {ARTICLE_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Cover Image</label>
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePostImageUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" /> Upload File
                          </button>
                        </div>
                      </div>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Excerpt <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Content (Markdown) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={8}
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono"
                      />
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="published"
                          checked={published}
                          onChange={(e) => setPublished(e.target.checked)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="published" className="ml-2 text-xs font-bold text-slate-700">
                          Published
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 text-xs font-bold text-slate-700">
                          Featured
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsEditingPost(false)}
                      className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingPost || uploadingImage}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                    >
                      {savingPost ? "Saving Article..." : "Save Article"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* SECTION 3: INQUIRIES TAB (HOSPITAL / CLINICAL LEADS)     */}
        {/* ======================================================== */}
        {activeTab === "inquiries" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Hospital & Clinical Procurement Inquiries</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Leads and quotation requests submitted through product pages and the online catalog.
                </p>
              </div>
              <button
                type="button"
                onClick={loadInquiries}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh List
              </button>
            </div>

            <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor / Contact</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Institution & City</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Requested</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity / Notes</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500">
                          No inquiries recorded yet. When clinicians or hospital procurement submit inquiries on any product page, they will appear here.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-slate-900">{inq.name}</div>
                            <div className="text-xs text-slate-500">{inq.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                              <Building className="w-3.5 h-3.5 text-slate-400" /> {inq.institution}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> {inq.city}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                              {inq.product_name}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-600 max-w-xs truncate">
                            {inq.quantity_requirement || "Standard quotation dossier"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                            {format(new Date(inq.created_at), "MMM d, yyyy h:mm a")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`tel:${inq.phone}`}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                                title={`Call ${inq.phone}`}
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`mailto:${inq.email}?subject=Emsurg Healthcare Quotation: ${encodeURIComponent(inq.product_name)}`}
                                className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                                title={`Email ${inq.email}`}
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
