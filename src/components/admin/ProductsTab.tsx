import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../lib/productsStore";
import { 
  GripVertical, 
  Star, 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink,
  Layers,
  Building,
  Globe2
} from "lucide-react";

interface ProductsTabProps {
  products: Product[];
  loadingProducts: boolean;
  onOpenEditor: (product?: Product) => void;
  onToggleFeatured: (product: Product) => void;
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onDeleteProduct: (id: string, title?: string) => void;
  onQuickDelete?: (id: string) => void;
}

export default function ProductsTab({
  products,
  loadingProducts,
  onOpenEditor,
  onToggleFeatured,
  onReorder,
  onDeleteProduct,
  onQuickDelete
}: ProductsTabProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dropTargetIndex !== index) {
      setDropTargetIndex(index);
    }
  };

  const handleDragLeave = () => {
    // Handled at row boundary
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      onReorder(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Medical Products Catalog</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              {products.length} Products
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage indigenous medical devices, French PMMA cements, Italian biopsy lines, and surgical solutions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenEditor()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm shadow-blue-500/20 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> New Product
        </button>
      </div>

      {/* Helpful Order & Feature guidance bar */}
      <div className="mb-4 px-4 py-3 bg-sky-50/70 border border-sky-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-800">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-sky-600 shrink-0" />
          <span>
            <strong>Reorder Catalog:</strong> Click and drag the vertical grip icon on any row to change the display sequence across the website.
          </span>
        </div>
        <div className="flex items-center gap-2 text-amber-800">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
          <span>Click <strong>★ Featured on Home</strong> to instantly showcase products on the flagship homepage showcase.</span>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="w-12 px-3 py-3.5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Division & Category
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Homepage Status
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {loadingProducts ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                    Loading products catalog...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                    No products found. Click "New Product" to add your first device.
                  </td>
                </tr>
              ) : (
                products.map((p, index) => {
                  const thumb = p.images?.[0] || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=200&auto=format&fit=crop";
                  const isFeatured = p.featured ?? p.is_featured ?? false;
                  const isDragging = draggedIndex === index;
                  const isTarget = dropTargetIndex === index;

                  return (
                    <tr
                      key={p.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`transition-all duration-150 ${
                        isDragging
                          ? "opacity-30 bg-sky-50 scale-[0.99] border-dashed border-2 border-sky-400"
                          : isTarget
                          ? "bg-sky-50/90 border-t-2 border-sky-500 shadow-xs"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Drag Handle Column */}
                      <td className="w-12 px-3 py-4 text-center cursor-grab active:cursor-grabbing text-slate-400 hover:text-sky-600 transition-colors select-none">
                        <div 
                          className="flex items-center justify-center p-1.5 rounded-lg hover:bg-slate-100 inline-flex group"
                          title="Click and drag to reorder product"
                        >
                          <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                        </div>
                      </td>

                      {/* Product Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={thumb}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-12 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-50"
                          />
                          <div>
                            <div className="text-sm font-bold text-slate-900 line-clamp-1">{p.title}</div>
                            <div className="text-xs text-slate-400 font-mono">/products/{p.slug}</div>
                          </div>
                        </div>
                      </td>

                      {/* Division & Category */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs">
                        <div className="flex flex-col items-start gap-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium text-[11px] ${
                            p.division === "Manufacturing"
                              ? "bg-sky-50 text-sky-700 border border-sky-200"
                              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          }`}>
                            {p.division === "Manufacturing" ? (
                              <Building className="w-3 h-3 text-sky-600" />
                            ) : (
                              <Globe2 className="w-3 h-3 text-indigo-600" />
                            )}
                            {p.division}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200 font-semibold text-[11px]">
                            {p.category}
                          </span>
                        </div>
                      </td>

                      {/* Homepage Featured Toggle Action Button */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {isFeatured ? (
                          <button
                            type="button"
                            onClick={() => onToggleFeatured(p)}
                            className="bg-amber-50 text-amber-700 border border-amber-200/80 hover:bg-amber-100 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                            title="Currently featured on the homepage flagship showcase. Click to unfeature."
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>★ Featured on Home</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onToggleFeatured(p)}
                            className="text-slate-400 hover:text-amber-600 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer active:scale-95"
                            title="Not featured on homepage. Click to showcase as Flagship."
                          >
                            <Star className="w-3.5 h-3.5" />
                            <span>☆ Feature</span>
                          </button>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 whitespace-nowrap text-right text-xs font-medium">
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
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenEditor(p);
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (e.shiftKey && onQuickDelete) {
                                onQuickDelete(p.id);
                              } else {
                                onDeleteProduct(p.id, p.title);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
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
  );
}
