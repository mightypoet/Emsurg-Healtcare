import { useState, useMemo } from "react";
import { 
  Search, 
  RefreshCw, 
  Download, 
  Trash2, 
  Phone, 
  Mail, 
  Building, 
  MapPin, 
  Briefcase, 
  Calendar,
  MessageCircle,
  FileSpreadsheet,
  AlertTriangle,
  X
} from "lucide-react";
import { format } from "date-fns";
import { ProductInquiry } from "../../lib/productsStore";

interface InquiriesTabProps {
  inquiries: ProductInquiry[];
  onRefresh: () => void;
  onDeleteInquiry: (id: string) => void;
}

export default function InquiriesTab({
  inquiries,
  onRefresh,
  onDeleteInquiry
}: InquiriesTabProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [deletingInquiry, setDeletingInquiry] = useState<ProductInquiry | null>(null);

  // Available roles for filter dropdown
  const uniqueRoles = useMemo(() => {
    const roles = new Set<string>();
    inquiries.forEach((inq) => {
      if (inq.role) roles.add(inq.role);
    });
    return Array.from(roles);
  }, [inquiries]);

  // Filtered inquiries calculation
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return inquiries.filter((inq) => {
      const matchesSearch =
        !query ||
        (inq.name || inq.full_name || "").toLowerCase().includes(query) ||
        (inq.product_name || "").toLowerCase().includes(query) ||
        (inq.institution || "").toLowerCase().includes(query) ||
        (inq.city || inq.city_state || "").toLowerCase().includes(query) ||
        (inq.phone || "").includes(query) ||
        (inq.email && inq.email.toLowerCase().includes(query)) ||
        (inq.role && inq.role.toLowerCase().includes(query)) ||
        (inq.notes && inq.notes.toLowerCase().includes(query));

      const matchesRole = roleFilter === "All" || inq.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [inquiries, search, roleFilter]);

  // CSV Export utility
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;

    const headers = [
      "ID",
      "Date & Time",
      "Product Inquired",
      "Division/Category",
      "Doctor / Buyer Name",
      "Role / Designation",
      "Hospital / Institution",
      "City & State",
      "Phone / WhatsApp",
      "Email",
      "Requirement / Notes"
    ];

    const escapeCSV = (val: string = "") => {
      const stringVal = String(val ?? "").replace(/"/g, '""');
      return `"${stringVal}"`;
    };

    const rows = filtered.map((inq) => [
      escapeCSV(inq.id),
      escapeCSV(format(new Date(inq.created_at), "yyyy-MM-dd HH:mm:ss")),
      escapeCSV(inq.product_name),
      escapeCSV(inq.category || inq.division || "Medical"),
      escapeCSV(inq.name),
      escapeCSV(inq.role || "Healthcare Professional"),
      escapeCSV(inq.institution),
      escapeCSV(inq.city),
      escapeCSV(inq.phone),
      escapeCSV(inq.email || ""),
      escapeCSV(inq.notes || inq.quantity_requirement || "")
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `emsurg-hospital-leads-${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Tab Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Hospital &amp; Clinical Procurement Inquiries
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {inquiries.length} {inquiries.length === 1 ? "Lead" : "Leads"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time procurement leads captured from website visitors, product catalogs, and WhatsApp routing.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {/* Export CSV Button */}
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={inquiries.length === 0}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            title="Download hospital procurement leads as CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          {/* Refresh List Button */}
          <button
            type="button"
            onClick={onRefresh}
            className="bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by doctor, hospital, product, city, phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          />
        </div>

        {uniqueRoles.length > 0 && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer w-full sm:w-auto"
            >
              <option value="All">All Roles ({inquiries.length})</option>
              {uniqueRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Leads Table */}
      <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date &amp; Time
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Product Inquired
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Doctor / Buyer Name
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Hospital &amp; City
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Role / Designation
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Requirement / Notes
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-500">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <FileSpreadsheet className="w-10 h-10 text-slate-300 mb-2" />
                      <p className="font-semibold text-slate-700">No procurement inquiries found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {search || roleFilter !== "All"
                          ? "Try clearing the search filter to see all leads."
                          : "When hospital buyers or doctors click 'Inquire' on any product, leads will automatically sync here."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
                  const waReplyText = encodeURIComponent(
                    `Hello ${inq.name}, thank you for inquiring about ${inq.product_name} with Emsurg Healthcare. Our clinical specialist is following up on your requirement.`
                  );
                  const waReplyUrl = `https://wa.me/${cleanPhone}?text=${waReplyText}`;

                  return (
                    <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* 1. Date & Time */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-500">
                        <div className="flex items-center gap-1.5 font-medium text-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{format(new Date(inq.created_at), "MMM d, yyyy")}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 pl-5">
                          {format(new Date(inq.created_at), "h:mm a")}
                        </div>
                      </td>

                      {/* 2. Product Inquired */}
                      <td className="px-5 py-4">
                        <div className="text-xs font-bold text-sky-900 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200/80 inline-block max-w-xs truncate">
                          {inq.product_name}
                        </div>
                        {inq.category && (
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-semibold">
                            {inq.category}
                          </div>
                        )}
                      </td>

                      {/* 3. Doctor / Buyer Name */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{inq.name}</div>
                        {inq.email && (
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {inq.email}
                          </div>
                        )}
                      </td>

                      {/* 4. Hospital & City */}
                      <td className="px-5 py-4">
                        <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{inq.institution}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{inq.city}</span>
                        </div>
                      </td>

                      {/* 5. Role / Designation */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-800 bg-indigo-50 border border-indigo-200/70 px-2.5 py-0.5 rounded-full">
                          <Briefcase className="w-3 h-3 text-indigo-600" />
                          <span>{inq.role || "Healthcare Professional"}</span>
                        </span>
                      </td>

                      {/* 6. Requirement / Notes */}
                      <td className="px-5 py-4 text-xs text-slate-600 max-w-xs">
                        <div className="line-clamp-2" title={inq.notes || inq.quantity_requirement}>
                          {inq.notes || inq.quantity_requirement || "Standard quotation dossier requested"}
                        </div>
                      </td>

                      {/* 7. Action Buttons */}
                      <td className="px-5 py-4 whitespace-nowrap text-right text-xs">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Direct WhatsApp Reply Button */}
                          <a
                            href={waReplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 transition-all shadow-2xs"
                            title={`Reply to ${inq.name} on WhatsApp (${inq.phone})`}
                          >
                            <MessageCircle className="w-4 h-4 text-emerald-600" />
                          </a>

                          {/* Direct Phone Call Button */}
                          <a
                            href={`tel:${inq.phone}`}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title={`Call ${inq.phone}`}
                          >
                            <Phone className="w-4 h-4 text-slate-600" />
                          </a>

                          {/* Email Button (if email present) */}
                          {inq.email && (
                            <a
                              href={`mailto:${inq.email}?subject=Emsurg Healthcare Quotation: ${encodeURIComponent(inq.product_name)}`}
                              className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors"
                              title={`Email ${inq.email}`}
                            >
                              <Mail className="w-4 h-4 text-sky-600" />
                            </a>
                          )}

                          {/* Delete Lead Button */}
                          <button
                            type="button"
                            onClick={() => setDeletingInquiry(inq)}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete this inquiry record"
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

      {/* Delete Confirmation Modal */}
      {deletingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-900">
            <div className="flex items-center gap-3 mb-4 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-bold text-base">Delete Inquiry Record?</h4>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs mb-5 space-y-1">
              <div><strong>Lead:</strong> {deletingInquiry.name} ({deletingInquiry.institution})</div>
              <div><strong>Product:</strong> {deletingInquiry.product_name}</div>
              <div><strong>Phone:</strong> {deletingInquiry.phone}</div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingInquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteInquiry(deletingInquiry.id);
                  setDeletingInquiry(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
