import React, { useState } from "react";
import { X, Trash2, Sparkles, FolderUp, CheckCircle, Loader2 } from "lucide-react";
import { GalleryItem } from "../../lib/galleryStore";

interface BulkFileItem {
  id: string;
  file: File;
  preview: string;
  title: string;
  category: string;
  col_span: "col-span-1" | "md:col-span-2";
  is_featured: boolean;
}

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: BulkFileItem[];
  setFiles: React.Dispatch<React.SetStateAction<BulkFileItem[]>>;
  onUploadAll: () => Promise<void>;
  isUploading: boolean;
  categories: string[];
}

export default function BulkUploadModal({
  isOpen,
  onClose,
  files,
  setFiles,
  onUploadAll,
  isUploading,
  categories,
}: BulkUploadModalProps) {
  const [globalCategory, setGlobalCategory] = useState(categories[0] || "Cleanrooms & Sterile Processing");

  if (!isOpen) return null;

  const handleApplyGlobalCategory = () => {
    setFiles((prev) => prev.map((f) => ({ ...f, category: globalCategory })));
  };

  const handleUpdateItem = (id: string, updates: Partial<BulkFileItem>) => {
    setFiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
    if (files.length <= 1) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FolderUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Bulk Image Upload ({files.length} selected)
              </h2>
              <p className="text-xs text-slate-500">
                Configure metadata for all selected facility images before uploading.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Batch Controls */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 my-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Set all to category:</span>
            <select
              value={globalCategory}
              onChange={(e) => setGlobalCategory(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleApplyGlobalCategory}
              className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
            >
              Apply to All
            </button>
          </div>

          <div className="text-xs text-slate-500">
            {files.filter((f) => f.is_featured).length} of {files.length} marked for Homepage
          </div>
        </div>

        {/* Scrollable File List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {files.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-blue-300 transition-colors"
            >
              {/* Preview Thumbnail */}
              <div className="relative w-24 h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img
                  src={item.preview}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 text-[10px] font-bold bg-slate-900/80 text-white px-1.5 py-0.5 rounded">
                  #{idx + 1}
                </span>
              </div>

              {/* Title & Metadata inputs */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                    placeholder="Facility name"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Category
                  </label>
                  <select
                    value={item.category}
                    onChange={(e) => handleUpdateItem(item.id, { category: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-1 flex items-center justify-between sm:justify-start gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Grid Span
                    </label>
                    <select
                      value={item.col_span}
                      onChange={(e) =>
                        handleUpdateItem(item.id, {
                          col_span: e.target.value as "col-span-1" | "md:col-span-2",
                        })
                      }
                      className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800 bg-white"
                    >
                      <option value="col-span-1">1 Col</option>
                      <option value="md:col-span-2">2 Col Wide</option>
                    </select>
                  </div>

                  <div className="pt-3">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={item.is_featured}
                        onChange={(e) =>
                          handleUpdateItem(item.id, { is_featured: e.target.checked })
                        }
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Featured
                    </label>
                  </div>
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                title="Remove image from queue"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Total of {files.length} images ready for publishing.
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isUploading || files.length === 0}
              onClick={onUploadAll}
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-200 flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading {files.length} Images...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Upload All ({files.length}) to Gallery
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
