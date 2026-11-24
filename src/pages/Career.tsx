import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Briefcase,
  MapPin,
  Clock,
  Award,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Rocket,
  Users,
  TrendingUp,
  FlaskConical,
  Globe2,
  Trophy,
  Upload,
  FileText,
  CheckCircle2,
  X,
  AlertCircle,
  Loader2,
  Building2,
  Mail,
  Phone,
  Linkedin,
  User,
  Layers,
  Send,
} from "lucide-react";
import {
  JobOpening,
  fetchJobOpenings,
  uploadResumeFile,
  submitJobApplication,
  subscribeToJobOpenings,
} from "../lib/careersStore";

const VALUE_PILLARS = [
  {
    icon: Rocket,
    title: "Build, Not Just Sell",
    description:
      "Pioneer new territories, launch indigenous MedTech breakthroughs, and build lasting clinical ecosystems rather than executing routine sales checklists.",
  },
  {
    icon: Users,
    title: "Work Closely with Leadership",
    description:
      "Collaborate directly with executive leadership and clinical founders in an agile, zero-bureaucracy culture where your insights shape strategy.",
  },
  {
    icon: TrendingUp,
    title: "Grow Beyond Your Territory",
    description:
      "Step into high-ownership roles with clear progression from regional market leadership into national business and portfolio management.",
  },
  {
    icon: FlaskConical,
    title: "Experience Innovation Firsthand",
    description:
      "Represent India-manufactured Orthobiologics, NPWT medical devices, and high-purity Nephrology solutions engineered in our Kolkata R&D hubs.",
  },
  {
    icon: Globe2,
    title: "Be Part of a Global Ambition",
    description:
      "Help scale a 500M+ INR indigenous MedTech enterprise toward its 1,000M INR 2028 milestone and international healthcare expansion.",
  },
  {
    icon: Trophy,
    title: "Get Rewarded for Performance",
    description:
      "Thrive in a true meritocracy that recognizes entrepreneurial ownership, ethical execution, and measurable clinical market impact.",
  },
];

export default function Career() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [expandedJobIds, setExpandedJobIds] = useState<Record<string, boolean>>({});
  const [divisionFilter, setDivisionFilter] = useState("All");

  // Application Modal State
  const [applyingJob, setApplyingJob] = useState<JobOpening | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingJobs(true);
      try {
        const { jobs: activeJobs } = await fetchJobOpenings(true);
        if (mounted) {
          setJobs(activeJobs);
          if (activeJobs.length === 1) {
            setExpandedJobIds({ [activeJobs[0].id]: true });
          }
        }
      } finally {
        if (mounted) setLoadingJobs(false);
      }
    };

    load();
    const unsub = subscribeToJobOpenings((updated) => {
      if (mounted) setJobs(updated);
    }, true);

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  const toggleJobDescription = (id: string) => {
    setExpandedJobIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openApplyModal = (job: JobOpening) => {
    setApplyingJob(job);
    setSubmittedSuccess(false);
    setFormError("");
  };

  const closeApplyModal = () => {
    if (submitting) return;
    setApplyingJob(null);
    setSubmittedSuccess(false);
    setFormError("");
  };

  const resetFormFields = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCurrentLocation("");
    setYearsOfExperience("");
    setCurrentCompany("");
    setLinkedinUrl("");
    setCoverNote("");
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExt = [".pdf", ".doc", ".docx"];
    const lowerName = file.name.toLowerCase();
    const isValidType = allowedExt.some((ext) => lowerName.endsWith(ext));

    if (!isValidType) {
      setFormError("Please upload your Resume/CV in PDF, DOC, or DOCX format.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFormError("Resume file size must be under 10 MB.");
      e.target.value = "";
      return;
    }

    setFormError("");
    setResumeFile(file);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !currentLocation.trim() ||
      !yearsOfExperience.trim()
    ) {
      setFormError("Please fill in all required fields marked with *.");
      return;
    }

    if (!resumeFile) {
      setFormError("Please upload your Resume / CV (PDF, DOC, or DOCX).");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const { url } = await uploadResumeFile(resumeFile);

      await submitJobApplication({
        job_id: applyingJob.id,
        job_title: applyingJob.title,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        current_location: currentLocation.trim(),
        experience_years: yearsOfExperience.trim(),
        current_company: currentCompany.trim() || null,
        linkedin_url: linkedinUrl.trim() || null,
        cover_note: coverNote.trim() || null,
        resume_url: url,
      });

      setSubmittedSuccess(true);
      setToastMsg(`Application submitted for ${applyingJob.title}!`);
      resetFormFields();

      setTimeout(() => {
        setToastMsg(null);
      }, 5000);
    } catch (err: any) {
      console.error("Application submission failed:", err);
      setFormError(
        err?.message || "Unable to submit your application right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const divisions = [
    "All",
    ...Array.from(new Set(jobs.map((j) => j.division).filter(Boolean))),
  ];

  const filteredJobs =
    divisionFilter === "All"
      ? jobs
      : jobs.filter((j) => j.division === divisionFilter);

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Success Toast */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-[130] max-w-md rounded-2xl p-4 shadow-xl border bg-emerald-50 border-emerald-200 text-emerald-900 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{toastMsg}</span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-emerald-700/60 hover:text-emerald-900 p-1"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-sky-50/90 via-white to-white pt-32 pb-16 sm:pt-36 sm:pb-20 px-4 sm:px-6 border-b border-sky-100 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-200/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 border border-sky-200/80 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            WE ARE HIRING
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 mb-6 leading-[1.15]">
            Build Markets. Drive Innovation.{" "}
            <span className="font-semibold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Grow with Emsurg.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Innovating in India. Building for the World. Join an indigenous MedTech growth story shaping the future of Orthobiologics, Nephrology, and Advanced Wound Management.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-sm font-bold tracking-wide shadow-lg shadow-sky-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Open Positions</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-sky-200/80 text-slate-700 text-sm font-semibold shadow-xs">
              <Briefcase className="w-4 h-4 text-sky-600" />
              <span>
                {jobs.length} Active {jobs.length === 1 ? "Opening" : "Openings"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY BUILD YOUR CAREER WITH EMSURG? (6-CARD VALUE GRID) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50/60 border-b border-sky-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/80 border border-sky-200 text-xs font-bold tracking-[0.2em] px-3.5 py-1 rounded-full uppercase mb-4">
              <span>LIFE AT EMSURG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight mb-4">
              Why Build Your Career{" "}
              <span className="font-semibold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                with Emsurg?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We value ambition, ownership, integrity, and the willingness to learn over conventional corporate hierarchies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {VALUE_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-sky-100/90 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-5 group-hover:bg-sky-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS SECTION */}
      <section id="open-positions" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/80 border border-sky-200 text-xs font-bold tracking-[0.2em] px-3.5 py-1 rounded-full uppercase mb-3">
                <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                <span>CURRENT OPPORTUNITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
                Open{" "}
                <span className="font-semibold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Positions
                </span>
              </h2>
            </div>

            {divisions.length > 2 && (
              <div className="flex items-center gap-2 flex-wrap">
                {divisions.map((div) => (
                  <button
                    key={div}
                    type="button"
                    onClick={() => setDivisionFilter(div)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      divisionFilter === div
                        ? "bg-sky-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-700"
                    }`}
                  >
                    {div}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loadingJobs ? (
            <div className="bg-slate-50 border border-sky-100 rounded-3xl p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-sky-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600">
                Loading open positions...
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-slate-50 border border-sky-100 rounded-3xl p-12 text-center">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                No active openings in this filter
              </h3>
              <p className="text-sm text-slate-500">
                Check back soon or reach out to our HR team with your profile.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => {
                const isExpanded = Boolean(expandedJobIds[job.id]);

                return (
                  <div
                    key={job.id}
                    className="rounded-3xl border border-sky-100 bg-white shadow-lg shadow-sky-900/5 hover:border-sky-300 transition-all duration-300 overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200/80">
                              <Layers className="w-3.5 h-3.5 text-sky-600" />
                              {job.division}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                              <Clock className="w-3.5 h-3.5 text-emerald-600" />
                              {job.employment_type || "Full-time"}
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                            {job.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-slate-600 mb-4">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                              <span>{job.location}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-sky-600 shrink-0" />
                              <span>Experience: {job.experience}</span>
                            </span>
                          </div>

                          {job.summary && (
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                              {job.summary}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[200px]">
                          <button
                            type="button"
                            onClick={() => openApplyModal(job)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md shadow-sky-600/20 transition-all cursor-pointer active:scale-98"
                          >
                            <span>Apply Now</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleJobDescription(job.id)}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-50/80 hover:bg-sky-100 text-sky-800 border border-sky-200/80 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                          >
                            <span>
                              {isExpanded ? "Hide Description" : "View Full Description"}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Full Markdown Description */}
                    {isExpanded && (
                      <div className="border-t border-sky-100 bg-slate-50/70 p-6 sm:p-8 lg:px-10 animate-in fade-in duration-200">
                        <div className="max-w-none text-slate-700">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-2xl font-bold text-slate-900 mt-6 mb-3">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-7 mb-3 pb-1.5 border-b border-sky-100">
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="my-3.5 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                                  {children}
                                </p>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-bold text-slate-900">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic text-slate-800">{children}</em>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-5 my-3 space-y-2 text-sm sm:text-[15px] text-slate-700">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-5 my-3 space-y-2 text-sm sm:text-[15px] text-slate-700">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="leading-relaxed">{children}</li>
                              ),
                            }}
                          >
                            {job.description_markdown}
                          </ReactMarkdown>
                        </div>

                        <div className="mt-8 pt-6 border-t border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="text-xs sm:text-sm text-slate-600">
                            Ready to take ownership of{" "}
                            <span className="font-bold text-slate-900">{job.title}</span>{" "}
                            ({job.location})?
                          </div>
                          <button
                            type="button"
                            onClick={() => openApplyModal(job)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                          >
                            <span>Apply for this Role</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. JOB APPLICATION MODAL */}
      {applyingJob && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={closeApplyModal}
          />

          {/* Modal Card */}
          <div className="relative bg-white/98 backdrop-blur-2xl border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={closeApplyModal}
              disabled={submitting}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close application modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-sky-100 pb-5 mb-6 pr-8">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700 bg-sky-50 border border-sky-200/80 px-3 py-0.5 rounded-full mb-2">
                <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                <span>Career Application</span>
              </div>
              <h3
                id="apply-modal-title"
                className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
              >
                Apply for {applyingJob.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1 text-sky-700 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {applyingJob.location}
                </span>
                <span>•</span>
                <span>{applyingJob.division}</span>
                <span>•</span>
                <span>{applyingJob.experience}</span>
              </div>
            </div>

            {submittedSuccess ? (
              <div className="py-10 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">
                  Application Received!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
                  Thank you for applying for{" "}
                  <strong className="text-slate-900">{applyingJob.title}</strong> at Emsurg Healthcare. Our Talent & Leadership team will review your resume and reach out shortly.
                </p>
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold transition-colors shadow-md cursor-pointer"
                >
                  Back to Careers
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-xl font-medium flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone & Current Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Current Location <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bangalore, Karnataka"
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Years of Experience & Current Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Years of Experience <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5 Years"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Current Company
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Current organization (optional)"
                        value={currentCompany}
                        onChange={(e) => setCurrentCompany(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* LinkedIn URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    LinkedIn Profile URL (Optional)
                  </label>
                  <div className="relative">
                    <Linkedin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Resume / CV Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Resume / CV (PDF, DOC, DOCX) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeChange}
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900 truncate">
                            {resumeFile.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setResumeFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-sky-200 hover:border-sky-400 bg-sky-50/40 hover:bg-sky-50 rounded-2xl p-5 text-center transition-all cursor-pointer group"
                    >
                      <Upload className="w-6 h-6 text-sky-600 mx-auto mb-2 group-hover:-translate-y-0.5 transition-transform" />
                      <div className="text-sm font-bold text-slate-800">
                        Click to upload Resume / CV
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Supports PDF, DOC, DOCX (Max 10 MB)
                      </div>
                    </button>
                  )}
                </div>

                {/* Cover Note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Cover Note (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <textarea
                      rows={3}
                      placeholder="Briefly share your relevant MedTech experience, surgeon/distributor network, or territory highlights..."
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-600/25 disabled:opacity-60 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading Resume &amp; Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
