import { useState, useMemo } from "react";
import { X, Cloud, Check, Loader2, Sparkles, AlertCircle, ExternalLink } from "lucide-react";
import { formatDriveImageUrl } from "../../lib/utils";

interface DriveImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (items: Array<{
    title: string;
    description: string;
    image_url: string;
    category: string;
    col_span: "col-span-1" | "md:col-span-2";
    is_featured: boolean;
  }>) => Promise<void>;
  categories: string[];
}

export default function DriveImporterModal({
  isOpen,
  onClose,
  onImport,
  categories,
}: DriveImporterModalProps) {
  const [linksText, setLinksText] = useState("");
  const [category, setCategory] = useState(categories[0] || "Cleanrooms & Sterile Processing");
  const [colSpan, setColSpan] = useState<"col-span-1" | "md:col-span-2">("col-span-1");
  const [isFeatured, setIsFeatured] = useState(true);
  const [isImporting, setIsImporting] = useState(false);

  // Parse links and convert to direct Drive URLs
  const parsedLinks = useMemo(() => {
    const raw = linksText
      .split(/[\n,]+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    return raw.map((originalUrl, idx) => {
      const convertedUrl = formatDriveImageUrl(originalUrl);
      const isDrive = originalUrl.includes("drive.google.com") || originalUrl.includes("googleusercontent.com");
      return {
        id: idx,
        originalUrl,
        convertedUrl,
        isDrive,
        title: `Facility Image ${idx + 1}`,
      };
    });
  }, [linksText]);

  if (!isOpen) return null;

  const handleImport = async () => {
    if (parsedLinks.length === 0) return;
    setIsImporting(true);
    try {
      const items = parsedLinks.map((p) => ({
        title: p.title,
        description: "Clinical facility, cleanroom infrastructure, and biomedical manufacturing operations at Emsurg.",
        image_url: p.convertedUrl,
        category,
        col_span: colSpan,
        is_featured: isFeatured,
      }));
      await onImport(items);
      setLinksText("");
      onClose();
    } finally {
      setIsImporting(false);
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
        className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Google Drive Link Importer
              </h2>
              <p className="text-xs text-slate-500">
                Paste shareable Google Drive links. Direct CDN URLs will be generated automatically.
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

        {/* Instructions banner */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 my-4 text-xs text-emerald-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            Supported link formats:
          </div>
          <p className="text-emerald-800">
            • <code className="bg-emerald-100/80 px-1 py-0.5 rounded font-mono text-[11px]">https://drive.google.com/file/d/FILE_ID/view?usp=sharing</code>
          </p>
          <p className="text-emerald-800">
            • <code className="bg-emerald-100/80 px-1 py-0.5 rounded font-mono text-[11px]">https://drive.google.com/open?id=FILE_ID</code>
          </p>
          <p className="text-emerald-700 text-[11px] pt-1">
            *Ensure file access in Google Drive is set to <strong>"Anyone with the link can view"</strong> so images can load publicly.
          </p>
        </div>

        {/* Textarea for links */}
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Paste Links (One URL per line or separated by commas)
            </label>
            <textarea
              rows={4}
              value={linksText}
              onChange={(e) => setLinksText(e.target.value)}
              placeholder="https://drive.google.com/file/d/1a2b3c4d5e/view?usp=sharing&#10;https://drive.google.com/file/d/6f7g8h9i0j/view?usp=sharing"
              className="w-full border border-slate-300 rounded-xl p-3.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          {/* Batch Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Grid Span
              </label>
              <select
                value={colSpan}
                onChange={(e) => setColSpan(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 bg-white"
              >
                <option value="col-span-1">Standard (1 Col)</option>
                <option value="md:col-span-2">Wide Featured (2 Col)</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Feature on Homepage
              </label>
            </div>
          </div>

          {/* Live Preview List */}
          {parsedLinks.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                <span>Detected Images ({parsedLinks.length})</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Live Converted Previews</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {parsedLinks.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-xl p-2 bg-slate-50 flex flex-col gap-1.5"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-200 border border-slate-300/60">
                      <img
                        src={item.convertedUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.display = "none";
                          const fallback = target.parentElement?.querySelector(".fallback-note");
                          if (fallback) (fallback as HTMLElement).style.display = "flex";
                        }}
                      />
                      <div className="fallback-note hidden absolute inset-0 items-center justify-center p-2 text-center text-[10px] text-slate-500 bg-slate-100">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 mr-1" /> Viewable once imported
                      </div>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-800 truncate" title={item.originalUrl}>
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {item.isDrive ? "Google Drive Direct" : "Direct Image"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {parsedLinks.length} image{parsedLinks.length !== 1 ? "s" : ""} will be added.
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
              disabled={isImporting || parsedLinks.length === 0}
              onClick={handleImport}
              className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm shadow-emerald-200 flex items-center gap-2"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Import All ({parsedLinks.length}) to Gallery
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
