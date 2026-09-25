import React, { useState, useEffect } from "react";
import { GalleryItem } from "../../lib/galleryStore";
import { formatDriveImageUrl } from "../../lib/utils";
import { X, Upload, Check, Sparkles, Image as ImageIcon, Link2 } from "lucide-react";

interface GalleryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: Partial<GalleryItem>, id?: string) => Promise<void>;
  item: GalleryItem | null;
  categories: string[];
}

export default function GalleryItemModal({
  isOpen,
  onClose,
  onSave,
  item,
  categories,
}: GalleryItemModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState(categories[0] || "Cleanrooms & Sterile Processing");
  const [colSpan, setColSpan] = useState<"col-span-1" | "md:col-span-2">("col-span-1");
  const [isFeatured, setIsFeatured] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDriveDetected, setIsDriveDetected] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setImageUrl(item.image_url);
      setCategory(item.category || categories[0]);
      setColSpan(item.col_span || "col-span-1");
      setIsFeatured(item.is_featured ?? true);
      setIsDriveDetected(Boolean(item.image_url?.includes("drive.google.com") || item.image_url?.includes("googleusercontent.com")));
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setCategory(categories[0] || "Cleanrooms & Sterile Processing");
      setColSpan("col-span-1");
      setIsFeatured(true);
      setIsDriveDetected(false);
    }
  }, [item, isOpen, categories]);

  if (!isOpen) return null;

  const handleUrlChange = (val: string) => {
    const isDrive = val.includes("drive.google.com") || val.includes("googleusercontent.com");
    setIsDriveDetected(isDrive);
    const formatted = formatDriveImageUrl(val);
    setImageUrl(formatted);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
      setIsDriveDetected(false);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    setSaving(true);
    try {
      await onSave(
        {
          title: title.trim(),
          description: description.trim(),
          image_url: formatDriveImageUrl(imageUrl.trim()),
          category,
          col_span: colSpan,
          is_featured: isFeatured,
        },
        item?.id
      );
      onClose();
    } finally {
      setSaving(false);
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
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {item ? "Edit Facility Image" : "Add Facility Image"}
              </h2>
              <p className="text-xs text-slate-500">
                Updates live in the Clinical Facilities Gallery and Homepage.
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Image Title / Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Class 10,000 ISO-7 Cleanroom Complex"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Caption / Clinical Description
            </label>
            <textarea
              rows={2}
              placeholder="Explain the facility, technology, or sterilization standards shown in this image..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Category & Layout Span */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Gallery Grid Span
              </label>
              <select
                value={colSpan}
                onChange={(e) => setColSpan(e.target.value as any)}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                <option value="col-span-1">Standard (1 Column)</option>
                <option value="md:col-span-2">Wide Featured (2 Columns)</option>
              </select>
            </div>
          </div>

          {/* Image URL & Google Drive Integration */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Image Source (URL or Drive Link) <span className="text-red-500">*</span>
              </label>
              <label className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Upload File Instead
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                required
                placeholder="https://drive.google.com/file/d/... or any direct image URL"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Google Drive Converted Notice */}
            {isDriveDetected && (
              <div className="mt-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Google Drive share link automatically converted into direct viewable image stream.</span>
              </div>
            )}

            {/* Preview */}
            {imageUrl && (
              <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-44 flex items-center justify-center">
                <img
                  src={formatDriveImageUrl(imageUrl)}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes("unsplash.com")) {
                      target.src = "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80";
                    }
                  }}
                />
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] text-white flex items-center justify-between pointer-events-none">
                  <span className="truncate">{formatDriveImageUrl(imageUrl)}</span>
                  <span className="text-emerald-400 font-bold text-[10px] shrink-0 ml-2">CDN Formatted</span>
                </div>
              </div>
            )}
          </div>

          {/* Feature on Homepage Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Feature on Homepage
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Display this photo in the high-visibility "State-of-the-Art Facilities" section on the front page.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-200"
            >
              {saving ? "Saving..." : item ? "Update Image" : "Add to Gallery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
