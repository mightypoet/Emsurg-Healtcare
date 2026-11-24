import React, { useState, useMemo, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Briefcase,
  Users,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Download,
  Search,
  MapPin,
  Clock,
  Layers,
  CheckCircle2,
  PauseCircle,
  Sparkles,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Building2,
  Linkedin,
  Calendar,
  AlertTriangle,
  X,
  Eye,
  Pencil,
  Loader2,
  Award,
} from "lucide-react";
import { format } from "date-fns";
import {
  JobOpening,
  JobApplication,
  ApplicationStatus,
  APPLICATION_STATUSES,
  DEFAULT_SEED_JOB,
  saveJobOpening,
  toggleJobOpeningActive,
  deleteJobOpening,
  seedDefaultJobOpening,
  fetchJobApplications,
  updateApplicationStatus,
  deleteJobApplication,
} from "../../lib/careersStore";

interface CareersTabProps {
  jobs: JobOpening[];
  applications: JobApplication[];
  loadingJobs: boolean;
  loadingApplications: boolean;
  onRefresh: () => Promise<void> | void;
  showToast: (type: "success" | "warning" | "error", message: string) => void;
}

const STATUS_BADGE_STYLES: Record<ApplicationStatus, string> = {
  New: "bg-sky-50 text-sky-800 border-sky-200",
  Reviewing: "bg-indigo-50 text-indigo-800 border-indigo-200",
  Shortlisted: "bg-amber-50 text-amber-800 border-amber-200",
  Interviewing: "bg-purple-50 text-purple-800 border-purple-200",
  Hired: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Rejected: "bg-rose-50 text-rose-800 border-rose-200",
};

const DIVISION_SUGGESTIONS = [
  "Orthobiologics & Advanced Wound Management",
  "Orthobiologics",
  "Advanced Wound Management",
  "Nephrology & Dialysis",
  "Surgical & Biopsy Devices",
  "R&D / Quality Assurance",
  "Operations & Manufacturing",
  "Corporate & Leadership",
];

export default function CareersTab({
  jobs,
  applications,
  loadingJobs,
  loadingApplications,
  onRefresh,
  showToast,
}: CareersTabProps) {
  const [subTab, setSubTab] = useState<"openings" | "applications">("openings");
  const [localApplications, setLocalApplications] = useState<JobApplication[]>(applications);
  const [refreshingApps, setRefreshingApps] = useState(false);

  useEffect(() => {
    setLocalApplications(applications);
  }, [applications]);

  const loadLatestApplications = useCallback(async () => {
    setRefreshingApps(true);
    try {
      const rows = await fetchJobApplications();
      setLocalApplications(rows);
      await onRefresh();
    } catch (err: any) {
      console.error("Failed to fetch job applications:", err);
      showToast("error", err?.message || "Failed to fetch job applications from Supabase.");
    } finally {
      setRefreshingApps(false);
    }
  }, [onRefresh, showToast]);

  useEffect(() => {
    if (subTab === "applications") {
      loadLatestApplications();
    }
  }, [subTab]);

  // Job Modal State
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDivision, setJobDivision] = useState("Orthobiologics & Advanced Wound Management");
  const [jobEmploymentType, setJobEmploymentType] = useState("Full-time");
  const [jobExperience, setJobExperience] = useState("");
  const [jobSummary, setJobSummary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobIsActive, setJobIsActive] = useState(true);
  const [markdownMode, setMarkdownMode] = useState<"edit" | "preview">("edit");
  const [savingJob, setSavingJob] = useState(false);
  const [seedingDefault, setSeedingDefault] = useState(false);
  const [previewJob, setPreviewJob] = useState<JobOpening | null>(null);

  // Application Filters & Modals
  const [appSearch, setAppSearch] = useState("");
  const [appJobFilter, setAppJobFilter] = useState("All");
  const [appStatusFilter, setAppStatusFilter] = useState("All");
  const [viewingNoteApp, setViewingNoteApp] = useState<JobApplication | null>(null);
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);

  // In-App Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<
    | { type: "job"; item: JobOpening }
    | { type: "application"; item: JobApplication }
    | null
  >(null);
  const [deleting, setDeleting] = useState(false);

  const openJobEditor = (job?: JobOpening) => {
    if (job) {
      setEditingJob(job);
      setJobTitle(job.title || "");
      setJobLocation(job.location || "");
      setJobDivision(job.division || "Orthobiologics & Advanced Wound Management");
      setJobEmploymentType(job.employment_type || "Full-time");
      setJobExperience(job.experience || "");
      setJobSummary(job.summary || "");
      setJobDescription(job.description_markdown || "");
      setJobIsActive(job.is_active !== false);
    } else {
      setEditingJob(null);
      setJobTitle("");
      setJobLocation("");
      setJobDivision("Orthobiologics & Advanced Wound Management");
      setJobEmploymentType("Full-time");
      setJobExperience("");
      setJobSummary("");
      setJobDescription(
        `### The Opportunity\nDescribe the role, territory, and clinical impact.\n\n### Key Responsibilities\n* Drive market development and clinical adoption.\n* Build strong partnerships with surgeons, hospital procurement teams, and distributors.\n\n### Who Are We Looking For?\n* Relevant experience in Medical Devices or Healthcare segments.\n* Entrepreneurial mindset with strong communication skills.`
      );
      setJobIsActive(true);
    }
    setMarkdownMode("edit");
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobLocation.trim() || !jobExperience.trim() || !jobDescription.trim()) {
      showToast("warning", "Please complete Title, Location, Experience, and Full Description.");
      return;
    }

    setSavingJob(true);
    try {
      await saveJobOpening(
        {
          title: jobTitle.trim(),
          location: jobLocation.trim(),
          division: jobDivision.trim() || "Medical Devices",
          employment_type: jobEmploymentType.trim() || "Full-time",
          experience: jobExperience.trim(),
          summary: jobSummary.trim(),
          description_markdown: jobDescription.trim(),
          is_active: jobIsActive,
        },
        editingJob?.id
      );
      await onRefresh();
      setIsJobModalOpen(false);
      showToast(
        "success",
        `Job opening "${jobTitle.trim()}" ${editingJob ? "updated" : "published"} successfully.`
      );
    } catch (err: any) {
      console.error("Failed to save job opening:", err);
      showToast("error", err?.message || "Failed to save job opening.");
    } finally {
      setSavingJob(false);
    }
  };

  const handleSeedDefault = async () => {
    setSeedingDefault(true);
    try {
      await seedDefaultJobOpening();
      await onRefresh();
      showToast(
        "success",
        `Seeded "${DEFAULT_SEED_JOB.title} (${DEFAULT_SEED_JOB.location})" opening.`
      );
    } catch (err) {
      console.error("Seed default job failed:", err);
      showToast("error", "Could not seed default job opening.");
    } finally {
      setSeedingDefault(false);
    }
  };

  const handleToggleActive = async (job: JobOpening) => {
    try {
      const next = await toggleJobOpeningActive(job.id, job.is_active);
      await onRefresh();
      showToast(
        "success",
        `"${job.title}" is now ${next ? "Active & visible on /career" : "Paused (hidden from public)"}.`
      );
    } catch (err) {
      console.error("Toggle active error:", err);
      showToast("error", "Failed to update job status.");
    }
  };

  const handleStatusChange = async (app: JobApplication, nextStatus: ApplicationStatus) => {
    setUpdatingAppId(app.id);
    try {
      await updateApplicationStatus(app.id, nextStatus);
      setLocalApplications((prev) =>
        prev.map((a) => (a.id === app.id ? { ...a, status: nextStatus } : a))
      );
      await onRefresh();
      showToast("success", `${app.full_name}'s status updated to "${nextStatus}".`);
    } catch (err) {
      console.error("Failed to update application status:", err);
      showToast("error", "Failed to update candidate status.");
    } finally {
      setUpdatingAppId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.type === "job") {
        await deleteJobOpening(deleteTarget.item.id);
        showToast("success", `Removed "${deleteTarget.item.title}" job opening.`);
      } else {
        await deleteJobApplication(deleteTarget.item.id);
        setLocalApplications((prev) => prev.filter((a) => a.id !== deleteTarget.item.id));
        showToast("success", `Removed application from ${deleteTarget.item.full_name}.`);
      }
      await onRefresh();
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete failed:", err);
      showToast("error", "Delete operation failed.");
    } finally {
      setDeleting(false);
    }
  };

  // Count applications per job
  const getApplicantCountForJob = (job: JobOpening) =>
    localApplications.filter(
      (a) =>
        a.job_id === job.id ||
        a.job_title.trim().toLowerCase() === job.title.trim().toLowerCase()
    ).length;

  const uniqueAppJobTitles = useMemo(() => {
    const titles = new Set<string>();
    localApplications.forEach((a) => {
      if (a.job_title) titles.add(a.job_title);
    });
    return Array.from(titles);
  }, [localApplications]);

  const filteredApplications = useMemo(() => {
    const q = appSearch.trim().toLowerCase();
    return localApplications.filter((app) => {
      const matchesSearch =
        !q ||
        app.full_name.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.phone.toLowerCase().includes(q) ||
        app.current_location.toLowerCase().includes(q) ||
        (app.current_company || "").toLowerCase().includes(q) ||
        app.job_title.toLowerCase().includes(q);

      const matchesJob = appJobFilter === "All" || app.job_title === appJobFilter;
      const matchesStatus = appStatusFilter === "All" || app.status === appStatusFilter;

      return matchesSearch && matchesJob && matchesStatus;
    });
  }, [localApplications, appSearch, appJobFilter, appStatusFilter]);

  const handleExportApplicationsCSV = () => {
    if (filteredApplications.length === 0) return;

    const headers = [
      "Application ID",
      "Applied At",
      "Position",
      "Candidate Name",
      "Email",
      "Phone",
      "Current Location",
      "Experience",
      "Current Company",
      "LinkedIn URL",
      "Status",
      "Resume Filename",
      "Resume URL",
      "Cover Note",
    ];

    const escapeCSV = (val: string = "") =>
      `"${String(val ?? "").replace(/"/g, '""')}"`;

    const rows = filteredApplications.map((app) => [
      escapeCSV(app.id),
      escapeCSV(format(new Date(app.created_at), "yyyy-MM-dd HH:mm:ss")),
      escapeCSV(app.job_title),
      escapeCSV(app.full_name),
      escapeCSV(app.email),
      escapeCSV(app.phone),
      escapeCSV(app.current_location),
      escapeCSV(app.experience_years),
      escapeCSV(app.current_company || ""),
      escapeCSV(app.linkedin_url || ""),
      escapeCSV(app.status),
      escapeCSV(app.resume_filename || "resume"),
      escapeCSV(
        !app.resume_url
          ? "No Resume"
          : app.resume_url.startsWith("data:")
          ? "[Stored Base64 Resume]"
          : app.resume_url
      ),
      escapeCSV(app.cover_note || ""),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `emsurg-job-applications-${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const activeJobsCount = jobs.filter((j) => j.is_active).length;

  return (
    <>
      {/* Header & Sub-tab Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Careers &amp; Talent Acquisition
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              {activeJobsCount} Active {activeJobsCount === 1 ? "Role" : "Roles"}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {localApplications.length} {localApplications.length === 1 ? "Applicant" : "Applicants"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish open positions to <code className="text-sky-700 font-semibold">/career</code> and review candidate resumes stored in Supabase.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSeedDefault}
            disabled={seedingDefault}
            className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
            title="Insert or restore the default Area Business Manager (Bangalore / Chennai) opening"
          >
            {seedingDefault ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>Seed Default Opening</span>
          </button>

          <button
            type="button"
            onClick={() => (subTab === "applications" ? loadLatestApplications() : onRefresh())}
            disabled={refreshingApps}
            className="bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshingApps ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => openJobEditor()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Job Opening</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Switcher */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setSubTab("openings")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            subTab === "openings"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Job Openings ({jobs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("applications")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            subTab === "applications"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Applications ({localApplications.length})</span>
          {localApplications.filter((a) => a.status === "New").length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500 text-white">
              {localApplications.filter((a) => a.status === "New").length} New
            </span>
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: JOB OPENINGS                                  */}
      {/* ======================================================== */}
      {subTab === "openings" && (
        <div className="space-y-4">
          {loadingJobs ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>Loading job openings...</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No job openings yet</h3>
              <p className="text-xs text-slate-500 mt-1 mb-5 max-w-md mx-auto">
                Click "Seed Default Opening" to insert the Area Business Manager (Bangalore / Chennai) listing or create a custom opening.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleSeedDefault}
                  className="px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold hover:bg-amber-100 cursor-pointer"
                >
                  Seed Default Opening
                </button>
                <button
                  type="button"
                  onClick={() => openJobEditor()}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
                >
                  Create Opening
                </button>
              </div>
            </div>
          ) : (
            jobs.map((job) => {
              const applicantCount = getApplicantCountForJob(job);
              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-sm ${
                    job.is_active ? "border-slate-200" : "border-slate-200/80 bg-slate-50/70 opacity-85"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            job.is_active
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {job.is_active ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <PauseCircle className="w-3 h-3" />
                          )}
                          {job.is_active ? "Active" : "Paused"}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                          <Layers className="w-3 h-3" />
                          {job.division}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setAppJobFilter(job.title);
                            setSubTab("applications");
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 cursor-pointer"
                        >
                          <Users className="w-3 h-3" />
                          {applicantCount} {applicantCount === 1 ? "Applicant" : "Applicants"}
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-sky-600" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          {job.employment_type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <Award className="w-3.5 h-3.5 text-sky-600" />
                          {job.experience}
                        </span>
                      </div>

                      {job.summary && (
                        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                          {job.summary}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setPreviewJob(job)}
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleActive(job)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                          job.is_active
                            ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        {job.is_active ? (
                          <>
                            <PauseCircle className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => openJobEditor(job)}
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget({ type: "job", item: job })}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete job opening"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: CANDIDATE APPLICATIONS                        */}
      {/* ======================================================== */}
      {subTab === "applications" && (
        <>
          {/* Filter & Export Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                placeholder="Search candidates by name, email, phone, location, company, or role..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={appJobFilter}
                onChange={(e) => setAppJobFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="All">All Positions ({localApplications.length})</option>
                {uniqueAppJobTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>

              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={loadLatestApplications}
                disabled={refreshingApps}
                className="bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshingApps ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleExportApplicationsCSV}
                disabled={filteredApplications.length === 0}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Applied On
                    </th>
                    <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Role Applied For
                    </th>
                    <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Location &amp; Experience
                    </th>
                    <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Resume / CV
                    </th>
                    <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {loadingApplications ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-500">
                        <div className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          <span>Loading candidate applications...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-500">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <Users className="w-10 h-10 text-slate-300 mb-2" />
                          <p className="font-semibold text-slate-700">No applications found</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {appSearch || appJobFilter !== "All" || appStatusFilter !== "All"
                              ? "Clear filters to see all submitted applications."
                              : "Applications submitted on the public /career page will appear here with downloadable resumes."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => {
                      const isDataUrl = app.resume_url?.startsWith("data:");
                      return (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Applied Date */}
                          <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-500">
                            <div className="flex items-center gap-1.5 font-medium text-slate-800">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{format(new Date(app.created_at), "MMM d, yyyy")}</span>
                            </div>
                            <div className="text-[11px] text-slate-400 pl-5">
                              {format(new Date(app.created_at), "h:mm a")}
                            </div>
                          </td>

                          {/* Candidate Contact */}
                          <td className="px-5 py-4">
                            <div className="text-sm font-bold text-slate-900">{app.full_name}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                              <a
                                href={`mailto:${app.email}`}
                                className="hover:text-sky-700 hover:underline truncate max-w-[180px]"
                              >
                                {app.email}
                              </a>
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                              <a href={`tel:${app.phone}`} className="hover:text-sky-700">
                                {app.phone}
                              </a>
                            </div>
                          </td>

                          {/* Role Applied */}
                          <td className="px-5 py-4">
                            <span className="inline-block text-xs font-bold text-sky-900 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200/80">
                              {app.job_title}
                            </span>
                            {app.cover_note && (
                              <button
                                type="button"
                                onClick={() => setViewingNoteApp(app)}
                                className="block mt-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                              >
                                View Cover Note
                              </button>
                            )}
                          </td>

                          {/* Location & Experience */}
                          <td className="px-5 py-4">
                            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{app.current_location}</span>
                            </div>
                            <div className="text-[11px] text-slate-600 mt-0.5">
                              <strong>Exp:</strong> {app.experience_years}
                            </div>
                            {app.current_company && (
                              <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate max-w-[160px]">{app.current_company}</span>
                              </div>
                            )}
                          </td>

                          {/* Resume Download / View */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            {app.resume_url ? (
                              <a
                                href={app.resume_url}
                                target={isDataUrl ? undefined : "_blank"}
                                rel={isDataUrl ? undefined : "noopener noreferrer"}
                                download={isDataUrl ? app.resume_filename || "resume.pdf" : undefined}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-800 border border-slate-200 hover:border-sky-200 text-xs font-bold transition-colors"
                                title={app.resume_filename || "Download Resume"}
                              >
                                <FileText className="w-3.5 h-3.5 text-sky-600" />
                                <span className="max-w-[120px] truncate">
                                  {app.resume_filename || "Resume"}
                                </span>
                                {isDataUrl ? (
                                  <Download className="w-3 h-3 text-slate-500" />
                                ) : (
                                  <ExternalLink className="w-3 h-3 text-slate-500" />
                                )}
                              </a>
                            ) : (
                              <span className="text-xs text-slate-400">No file</span>
                            )}
                          </td>

                          {/* Status Selector */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <select
                              value={app.status}
                              disabled={updatingAppId === app.id}
                              onChange={(e) =>
                                handleStatusChange(app, e.target.value as ApplicationStatus)
                              }
                              className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                                STATUS_BADGE_STYLES[app.status] || STATUS_BADGE_STYLES.New
                              }`}
                            >
                              {APPLICATION_STATUSES.map((st) => (
                                <option key={st} value={st} className="bg-white text-slate-900">
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {app.linkedin_url && (
                                <a
                                  href={
                                    app.linkedin_url.startsWith("http")
                                      ? app.linkedin_url
                                      : `https://${app.linkedin_url}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors"
                                  title="Open LinkedIn Profile"
                                >
                                  <Linkedin className="w-4 h-4" />
                                </a>
                              )}
                              <a
                                href={`mailto:${app.email}?subject=${encodeURIComponent(
                                  `Emsurg Healthcare Application: ${app.job_title}`
                                )}`}
                                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                title={`Email ${app.email}`}
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                              <button
                                type="button"
                                onClick={() => setDeleteTarget({ type: "application", item: app })}
                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete application"
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
      )}

      {/* ======================================================== */}
      {/* CREATE / EDIT JOB OPENING MODAL                          */}
      {/* ======================================================== */}
      {isJobModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsJobModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingJob ? "Edit Job Opening" : "Create Job Opening"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Published active openings appear immediately on the public /career page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsJobModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Area Business Manager"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Location / Territory *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    placeholder="e.g., Bangalore / Chennai"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Division / Portfolio *
                  </label>
                  <input
                    type="text"
                    list="emsurg-divisions"
                    required
                    value={jobDivision}
                    onChange={(e) => setJobDivision(e.target.value)}
                    placeholder="Orthobiologics & Wound Care"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                  <datalist id="emsurg-divisions">
                    {DIVISION_SUGGESTIONS.map((div) => (
                      <option key={div} value={div} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Employment Type
                  </label>
                  <select
                    value={jobEmploymentType}
                    onChange={(e) => setJobEmploymentType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Experience Required *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                    placeholder="e.g., 3–7 Years"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  value={jobSummary}
                  onChange={(e) => setJobSummary(e.target.value)}
                  placeholder="Brief 1–2 sentence overview displayed on the Careers card..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Full Job Description (Markdown) *
                  </label>
                  <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                    <button
                      type="button"
                      onClick={() => setMarkdownMode("edit")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                        markdownMode === "edit"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600"
                      }`}
                    >
                      <Pencil className="w-3 h-3" />
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setMarkdownMode("preview")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                        markdownMode === "preview"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600"
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      Preview
                    </button>
                  </div>
                </div>

                {markdownMode === "edit" ? (
                  <textarea
                    rows={12}
                    required
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Use ### Headings, **bold**, and * bullets..."
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white leading-relaxed"
                  />
                ) : (
                  <div className="w-full min-h-[240px] max-h-[360px] overflow-y-auto px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 space-y-3 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-slate-900">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {jobDescription || "*Nothing to preview yet.*"}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="job-is-active"
                  checked={jobIsActive}
                  onChange={(e) => setJobIsActive(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-slate-300"
                />
                <label htmlFor="job-is-active" className="text-xs font-bold text-slate-700">
                  Active (visible for public applications on /career)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingJob}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-60"
                >
                  {savingJob && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingJob ? "Save Changes" : "Publish Opening"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PREVIEW JOB MARKDOWN MODAL                               */}
      {/* ======================================================== */}
      {previewJob && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setPreviewJob(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  {previewJob.division}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{previewJob.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {previewJob.location} • {previewJob.employment_type} • {previewJob.experience}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewJob(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm text-slate-700 leading-relaxed space-y-3 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-slate-900">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {previewJob.description_markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW COVER NOTE MODAL                                    */}
      {/* ======================================================== */}
      {viewingNoteApp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setViewingNoteApp(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Cover Note — {viewingNoteApp.full_name}
                </h3>
                <p className="text-xs text-slate-500">{viewingNoteApp.job_title}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewingNoteApp(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {viewingNoteApp.cover_note}
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DELETE CONFIRMATION MODAL                                */}
      {/* ======================================================== */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900">
                  {deleteTarget.type === "job" ? "Delete Job Opening?" : "Delete Application?"}
                </h4>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs mb-5 space-y-1 text-slate-700">
              {deleteTarget.type === "job" ? (
                <>
                  <div>
                    <strong>Role:</strong> {deleteTarget.item.title}
                  </div>
                  <div>
                    <strong>Location:</strong> {deleteTarget.item.location}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>Candidate:</strong> {deleteTarget.item.full_name}
                  </div>
                  <div>
                    <strong>Position:</strong> {deleteTarget.item.job_title}
                  </div>
                  <div>
                    <strong>Email:</strong> {deleteTarget.item.email}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
