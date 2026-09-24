import React from "react";
import { Link } from "react-router-dom";
import { GalleryItem } from "../../lib/galleryStore";
import { formatDriveImageUrl } from "../../lib/utils";
import {
  Upload,
  Cloud,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  Pencil,
  Copy,
  Check,
  Building2,
  Eye,
  Globe,
  ImageIcon,
} from "lucide-react";

interface GalleryTabProps {
  galleryItems: GalleryItem[];
  loadingGallery: boolean;
  gallerySearch: string;
  setGallerySearch: (val: string) => void;
  galleryCategoryFilter: string;
  setGalleryCategoryFilter: (val: string) => void;
  onRefresh: () => void;
  onOpenEditor: (item?: GalleryItem) => void;
  onDelete: (id: string, title?: string) => void;
  onToggleFeatured: (item: GalleryItem) => void;
  onCopyUrl: (id: string, url: string) => void;
  copiedUrlId: string | null;
  onOpenBulkUpload: () => void;
  onOpenDriveImporter: () => void;
  categories: string[];
}

export default function GalleryTab({
  galleryItems,
  loadingGallery,
  gallerySearch,
  setGallerySearch,
  galleryCategoryFilter,
  setGalleryCategoryFilter,
  onRefresh,
  onOpenEditor,
  onDelete,
  onToggleFeatured,
  onCopyUrl,
  copiedUrlId,
  onOpenBulkUpload,
  onOpenDriveImporter,
  categories,
}: GalleryTabProps) {
  // Filter logic
  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.description?.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.category?.toLowerCase().includes(gallerySearch.toLowerCase());

    const matchesCategory =
      galleryCategoryFilter === "All" || item.category === galleryCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  const featuredCount = galleryItems.filter((i) => i.is_featured).length;
  const cleanroomCount = galleryItems.filter(
    (i) => i.category?.includes("Cleanroom") || i.category?.includes("R&D")
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Metric Counters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 mb-2">
            <Building2 className="w-3.5 h-3.5" /> Media Library & Facilities
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Facility Gallery & Media Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Upload cleanroom photography, R&D laboratories, and operations media. Supports bulk file uploads and Google Drive link conversion. Feeds into the Gallery and Homepage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenDriveImporter}
            className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            title="Import images by pasting Google Drive links"
          >
            <Cloud className="w-4 h-4 text-emerald-600" /> Google Drive Link
          </button>

          <button
            type="button"
            onClick={onOpenBulkUpload}
            className="px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            title="Select multiple images from your computer"
          >
            <Upload className="w-4 h-4 text-blue-600" /> Bulk Upload Files
          </button>

          <button
            type="button"
            onClick={() => onOpenEditor()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-blue-200"
          >
            <Plus className="w-4 h-4" /> Add Single Image
          </button>

          <button
            type="button"
            onClick={onRefresh}
            className="p-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition-colors shadow-sm"
            title="Refresh gallery list"
          >
            <RefreshCw className={`w-4 h-4 ${loadingGallery ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Photos
          </span>
          <div className="text-2xl font-black text-slate-900">{galleryItems.length}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Live in catalog</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 block mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Homepage Featured
          </span>
          <div className="text-2xl font-black text-slate-900">{featuredCount}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Displayed on front page</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500 block mb-1">
            Cleanrooms & Labs
          </span>
          <div className="text-2xl font-black text-slate-900">{cleanroomCount}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Sterile production</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Public View
          </span>
          <Link
            to="/gallery"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors w-fit"
          >
            <Globe className="w-3.5 h-3.5" /> Open /gallery page
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search facility photos by title, category, or description..."
            value={gallerySearch}
            onChange={(e) => setGallerySearch(e.target.value)}
            className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 shrink-0">Category:</span>
          <select
            value={galleryCategoryFilter}
            onChange={(e) => setGalleryCategoryFilter(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
          >
            <option value="All">All Categories ({galleryItems.length})</option>
            {categories.map((cat) => {
              const count = galleryItems.filter((i) => i.category === cat).length;
              return (
                <option key={cat} value={cat}>
                  {cat} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No facility images found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            {gallerySearch || galleryCategoryFilter !== "All"
              ? "Try changing your search keywords or resetting the category filter."
              : "Start by uploading facility photography using Bulk Upload or paste Google Drive links."}
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={onOpenDriveImporter}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Paste Google Drive Links
            </button>
            <button
              type="button"
              onClick={onOpenBulkUpload}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Bulk Upload Files
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col"
            >
              {/* Image Thumbnail with Overlay Badges */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={formatDriveImageUrl(item.image_url)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1000&q=80";
                  }}
                />

                {/* Category & Column badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-blue-200 border border-slate-700/60">
                    {item.category || "General"}
                  </span>
                  {item.col_span === "md:col-span-2" && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-900/80 backdrop-blur-sm text-indigo-200 border border-indigo-700/60">
                      2-Col Wide
                    </span>
                  )}
                </div>

                {/* Homepage Featured Clickable Toggle */}
                <button
                  type="button"
                  onClick={() => onToggleFeatured(item)}
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border flex items-center gap-1 transition-all z-10 ${
                    item.is_featured
                      ? "bg-amber-500/90 text-white border-amber-400 shadow-sm"
                      : "bg-slate-900/70 text-slate-300 border-slate-700/60 hover:text-white"
                  }`}
                  title={item.is_featured ? "Featured on Homepage (Click to disable)" : "Click to feature on Homepage"}
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {item.is_featured ? "Featured" : "Feature"}
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description || "Clinical facility documentation."}
                  </p>
                </div>

                {/* Card Actions Toolbar */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onCopyUrl(item.id, item.image_url)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                    title="Copy direct CDN image URL"
                  >
                    {copiedUrlId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenEditor(item)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit photo metadata"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
