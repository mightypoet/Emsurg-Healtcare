import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  ShieldCheck, 
  Building2, 
  Award,
  Sparkles,
  Users
} from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  category: string;
  image: string;
  bio: string;
  credentials?: string;
  department?: string;
  socials?: {
    linkedin?: string;
    email?: string;
  };
}

interface Team02Props {
  badge?: string;
  title?: string;
  description?: string;
  members: TeamMember[];
}

export function Team02({
  badge = "LEADERSHIP & GOVERNANCE",
  title = "Board of Directors & Unit Leaders",
  description = "A multidisciplinary team of clinicians, researchers, and operational directors advancing indigenous medical technology across India.",
  members
}: Team02Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const categories = ["All", ...Array.from(new Set(members.map(m => m.category)))];

  const filteredMembers = activeCategory === "All" 
    ? members 
    : members.filter(m => m.category === activeCategory);

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  const getInitials = (name: string) => {
    return name
      .replace(/^(Mr\.|Dr\.|Ms\.|Mrs\.)\s*/, "")
      .split(" ")
      .map(part => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section className="bg-sky-50/40 py-20 px-4 md:px-8 border-b border-sky-100 relative overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4 px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-sky-200 bg-sky-100/80 text-sky-700">
            <Sparkles className="w-3 h-3 mr-1.5 text-sky-600 inline" />
            {badge}
          </Badge>
          
          <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          
          <p className="mt-4 text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105"
                    : "bg-white text-slate-600 border border-sky-100 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredMembers.map((member, idx) => {
            const hasError = imageErrors[member.name];
            const initials = getInitials(member.name);

            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-white/95 backdrop-blur-sm border border-sky-100/90 p-4 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Portrait / Avatar Container */}
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-sky-100/60">
                    {!hasError && member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        onError={() => handleImageError(member.name)}
                        className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      /* Monogram Fallback Avatar */
                      <div className="w-full h-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-sky-500/10 border-2 border-sky-300 flex items-center justify-center text-2xl font-bold text-sky-700 mb-3 shadow-inner">
                          {initials}
                        </div>
                        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                          Emsurg Executive
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay for Hover Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Category Floating Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-sky-700 border border-sky-200/80 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {member.category}
                      </Badge>
                    </div>

                    {/* Hover Revealed Action Icons */}
                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-white/95 text-slate-800 hover:text-sky-600 hover:scale-110 flex items-center justify-center shadow-lg transition-transform"
                          aria-label={`${member.name} LinkedIn Profile`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.socials?.email && (
                        <a
                          href={`mailto:${member.socials.email}`}
                          className="w-8 h-8 rounded-full bg-sky-500 text-white hover:bg-sky-600 hover:scale-110 flex items-center justify-center shadow-lg transition-transform"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Member Identity & Bio */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <div className="text-sky-600 font-semibold text-xs uppercase tracking-wider mt-1 mb-2.5">
                      {member.role}
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Card Footer / Institutional Anchor */}
                <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium text-slate-600">
                    {member.department || "Emsurg Healthcare"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Governance Trust Note */}
        <div className="mt-14 p-6 rounded-3xl bg-white border border-sky-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Ethical Governance & CDSCO Compliance
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Our board and unit leaders adhere strictly to ISO 13485 cleanroom manufacturing standards and ethical clinical advisory protocols.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <Badge variant="outline" className="text-sky-700 bg-sky-50 border-sky-200 text-xs px-3 py-1">
              ISO 13485:2016
            </Badge>
            <Badge variant="outline" className="text-sky-700 bg-sky-50 border-sky-200 text-xs px-3 py-1">
              CDSCO Licensed
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
