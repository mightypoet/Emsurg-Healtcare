import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  TrendingUp,
  ShieldCheck,
  Microscope,
  Building2,
  Users,
  ArrowRight,
  Sparkles,
  Quote,
  CheckCircle2,
  HeartHandshake,
  Landmark,
  Factory,
  UserCheck
} from "lucide-react";
import { timeline, locations } from "../data/content";
import { Team02, type TeamMember } from "@/components/ui/team-02";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const leadershipTeam: TeamMember[] = [
  {
    name: "Mr. Kunal Mukherjee",
    role: "Managing Director & CEO",
    category: "Executive Board",
    department: "Emsurg Healthcare & Bioscience",
    image: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/SHU07130.jpg",
    bio: "Pioneering indigenous medical device self-reliance in India. Directing synthesis of BoneSurg bioresorbable grafts, EM-VAC digital NPWT, and nephrology concentrates, targeting 1,000M INR by 2028.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "kunal@emsurghealthcare.com"
    }
  },
  {
    name: "Priyanka Acharyya",
    role: "CFO & Director",
    category: "Executive Board",
    department: "Corporate Finance & Treasury",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Directing financial strategy, capital allocation, audit integrity, and institutional banking partnerships with State Bank of India and Axis Bank.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "priyanka@emsurghealthcare.com"
    }
  },
  {
    name: "Ritobroto Mukherjee",
    role: "Director",
    category: "Executive Board",
    department: "Corporate Development",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Spearheading pan-India institutional distribution alliances, corporate governance, and multi-state medical supply chain infrastructure.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "ritobroto@emsurghealthcare.com"
    }
  },
  {
    name: "Dr. Suman Saha",
    role: "Director - Clinical Affairs",
    category: "Executive Board",
    department: "Clinical Advisory",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    bio: "Leading clinical trial evaluations, physician advisory boards, biomaterial biocompatibility protocols, and surgical efficacy standards.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "dr.saha@emsurghealthcare.com"
    }
  },
  {
    name: "Partha Dasgupta",
    role: "Director - Manufacturing",
    category: "Operations Leadership",
    department: "Cleanroom Units 1 & 2",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Overseeing automated hemodialysis bottling, Class 10,000 / ISO 7 cleanroom biomaterial synthesis, and CDSCO regulatory audits.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "partha@emsurghealthcare.com"
    }
  },
  {
    name: "Avijit Jana",
    role: "Business Leader - Sports Medicine",
    category: "Clinical Division",
    department: "Sports Medicine",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    bio: "Heading national surgeon engagement, arthroscopy implant distribution, and our premier partnership with Smith & Nephew.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "avijit@emsurghealthcare.com"
    }
  },
  {
    name: "Subhro Kamal Bhattacharyya",
    role: "Business Leader - Oncology Devices & Biologics",
    category: "Clinical Division",
    department: "Oncology & Biologics",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    bio: "Managing BoneSurg HA/CR bioresorbable granules, bone cements, and exclusive Italian MDL biopsy instrumentation portfolios.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "subhro@emsurghealthcare.com"
    }
  },
  {
    name: "Swarnali Dey",
    role: "GM Admin & HR",
    category: "Operations Leadership",
    department: "Human Capital & Administration",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Directing talent development, cleanroom operational staffing, organizational compliance, and multi-hub administrative workflow.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "swarnali@emsurghealthcare.com"
    }
  }
];

export default function About() {
  // Video Player State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Portrait image error fallback state
  const [imgError, setImgError] = useState(false);

  // Video Time Formatting
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((curr / dur) * 100);
      setCurrentTime(formatTime(curr));
      setDuration(formatTime(dur));
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newPercent = parseFloat(e.target.value);
    const dur = videoRef.current.duration;
    if (dur > 0) {
      videoRef.current.currentTime = (newPercent / 100) * dur;
      setProgress(newPercent);
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => console.error("Fullscreen error:", err));
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => console.error("Exit fullscreen error:", err));
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* 1. HERO HEADER: Surgical White & Sky-Cyan Aesthetic */}
      <section className="bg-gradient-to-b from-sky-50/80 via-white to-white text-slate-900 pt-28 pb-16 px-4 md:px-8 border-b border-sky-100 relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-100/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 border border-sky-200/80 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
            Indigenous Medical Innovation Since 2010
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.15]">
            Engineering Better Outcomes <br />
            <span className="font-semibold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Through Indigenous Rigor
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            Emsurg Healthcare (India) Pvt. Ltd. and Emsurg Bioscience pioneer homegrown bioresorbable 
            bone graft synthesis, advanced digital negative pressure systems, high-purity renal fluids, and 
            exclusive European surgical implants.
          </p>

          {/* 4 Stats Metrics Cards in the Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
            <div className="bg-white/80 backdrop-blur-md border border-sky-100 rounded-2xl p-5 shadow-sm shadow-sky-900/5 text-left hover:border-sky-200 transition-colors">
              <div className="text-sky-600 font-bold text-3xl md:text-4xl tracking-tight">14+</div>
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">Years of Innovation</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-sky-100 rounded-2xl p-5 shadow-sm shadow-sky-900/5 text-left hover:border-sky-200 transition-colors">
              <div className="text-sky-600 font-bold text-3xl md:text-4xl tracking-tight">360M+ INR</div>
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">Annual Turnover</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-sky-100 rounded-2xl p-5 shadow-sm shadow-sky-900/5 text-left hover:border-sky-200 transition-colors">
              <div className="text-sky-600 font-bold text-3xl md:text-4xl tracking-tight">4 Hubs</div>
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">Facilities in Kolkata</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-sky-100 rounded-2xl p-5 shadow-sm shadow-sky-900/5 text-left hover:border-sky-200 transition-colors">
              <div className="text-sky-600 font-bold text-3xl md:text-4xl tracking-tight">1,000M</div>
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">Target by 2028</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEADERSHIP SHOWCASE & FROM THE MD'S DESK */}
      <section id="md-desk" className="py-20 sm:py-24 bg-white border-b border-sky-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/80 border border-sky-200/80 text-xs font-bold tracking-[0.25em] px-3.5 py-1 rounded-full uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
              LEADERSHIP & INDIGENOUS RIGOR
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              From the Managing Director’s Desk
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              A personal address on pioneering medical device self-reliance in India, building resilient cleanroom infrastructure, and advancing patient care through relentless perseverance.
            </p>
          </div>

          {/* Two-Column Executive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
            {/* Left Column: Portrait & Profile (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="w-full max-w-md mx-auto lg:max-w-none">
                {/* Portrait Card */}
                <div className="rounded-3xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/40 p-3 shadow-xl shadow-sky-900/5 overflow-hidden group">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100">
                    {!imgError ? (
                      <img
                        src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/SHU07130.jpg"
                        alt="Mr. Kunal Mukherjee - Managing Director & CEO, Emsurg Healthcare"
                        onError={() => setImgError(true)}
                        className="w-full h-[480px] sm:h-[500px] object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-102"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-[480px] bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col items-center justify-center p-8 text-center text-slate-800">
                        <div className="w-24 h-24 rounded-full bg-sky-500/10 border-2 border-sky-300 flex items-center justify-center mb-6 text-3xl font-bold text-sky-700">
                          KM
                        </div>
                        <div className="text-2xl font-bold tracking-tight text-slate-900">Mr. Kunal Mukherjee</div>
                        <div className="text-sm text-sky-600 font-medium mt-1">Managing Director & CEO</div>
                        <div className="text-xs text-slate-500 mt-4 max-w-xs">
                          Emsurg Healthcare (India) Pvt. Ltd. & Emsurg Bioscience
                        </div>
                      </div>
                    )}

                    {/* Clean Frosted Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent text-white">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/80 text-white text-[11px] font-semibold uppercase tracking-wider mb-1 backdrop-blur-md">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Executive Leadership
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight text-white">Mr. Kunal Mukherjee</h3>
                      <p className="text-xs text-sky-100 font-medium">
                        Managing Director & CEO, Emsurg Healthcare (India) Pvt. Ltd.
                      </p>
                    </div>
                  </div>

                  {/* Caption Info & Trajectory Pill */}
                  <div className="pt-3 px-1">
                    <span className="bg-sky-50 text-sky-700 border border-sky-200/70 text-xs font-semibold px-3 py-1 rounded-full mt-2 inline-block">
                      Scalable Growth from Zero to 360M INR · Targeting 1,000M INR by 2028
                    </span>
                  </div>
                </div>

                {/* Key Roles / Entities Tag Group */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-lg bg-sky-50/70 border border-sky-100 text-sky-800 text-xs font-medium">
                    Managing Director · Emsurg Healthcare (India) Pvt. Ltd.
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-sky-50/70 border border-sky-100 text-sky-800 text-xs font-medium">
                    Managing Director · Emsurg Bioscience India Pvt. Ltd.
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-sky-50/70 border border-sky-100 text-sky-800 text-xs font-medium">
                    Bioresorbable Grafts & MedTech Pioneer
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Address & Philosophy (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* High-Impact Quote Box */}
              <div className="bg-sky-50/60 border-l-4 border-sky-500 rounded-r-2xl p-6 text-slate-900 shadow-sm relative overflow-hidden mb-8">
                <Quote className="absolute -top-3 -right-3 w-28 h-28 text-sky-900/[0.04] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-sky-600 text-xs font-bold tracking-widest uppercase mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Core Guiding Philosophy
                  </div>
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light italic leading-snug text-slate-900">
                    “We at Emsurg believe, <span className="font-semibold text-sky-700">never die before death</span>. 
                    If you try, you risk failure. If you don't, <span className="underline decoration-sky-400 decoration-2 underline-offset-4">you ensure it</span>.”
                  </blockquote>
                  <div className="mt-4 pt-4 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">— Mr. Kunal Mukherjee, Managing Director</span>
                    <span className="text-sky-600 font-semibold tracking-wider uppercase">Official Address</span>
                  </div>
                </div>
              </div>

              {/* Core Narrative */}
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  When we established <strong className="text-slate-900">Emsurg Healthcare</strong> in 2010 in Kolkata, the Indian healthcare 
                  landscape was overwhelmingly dependent on expensive imported biomaterials, orthopedic consumables, 
                  and renal formulations. Our ambition was never merely commercial; it was fundamentally patriotic 
                  and clinical—to prove that world-class bioresorbable implants, dialysis fluids, and precision surgical 
                  technologies could be engineered right here on Indian soil.
                </p>

                <p>
                  Over the past decade and a half, we have transformed into a diversified healthcare enterprise. Through 
                  our manufacturing and research entities—<strong className="text-slate-900">Emsurg Healthcare (India) Pvt. Ltd.</strong> and 
                  <strong className="text-slate-900"> Emsurg Bioscience India Pvt. Ltd.</strong>—we have pioneered indigenous formulation capabilities 
                  spanning:
                </p>

                {/* 4 Clinical Divisions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                  <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-sm hover:border-sky-300 transition-colors">
                    <div className="text-sky-700 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-500" />
                      Nephro-Care Formulations
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Automated hemodialysis fluids & dry citrate powder concentrates saving vital clinical beds.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-sm hover:border-sky-300 transition-colors">
                    <div className="text-sky-700 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-500" />
                      Orthobiologics & Bone Grafts
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      CDSCO-approved BoneSurg HA nanocrystalline hydroxyapatite and BoneSurg CR calcium sulphate beads.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-sm hover:border-sky-300 transition-colors">
                    <div className="text-sky-700 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-500" />
                      Sterile NPWT Wound Care
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      EM-VAC digital micro-deformation negative pressure wound therapy units & cleanroom dressing kits.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-sm hover:border-sky-300 transition-colors">
                    <div className="text-sky-700 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-500" />
                      Global Surgical Alliances
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Exclusive partnerships with Smith & Nephew, Teknimed France, MDL Italy, and Fresenius.
                    </div>
                  </div>
                </div>

                <p>
                  Today, with state-of-the-art ISO 14644 cleanrooms, in-house XRD & SEM analytical testing, and 
                  dedicated research scientists, we take immense pride in having scaled from zero to over 
                  <strong className="text-slate-900"> 360 Million INR in annual turnover</strong>, serving premier medical institutes including 
                  Apollo Hospitals, Narayana Health, Fortis, and Manipal Hospitals.
                </p>

                <p className="text-slate-600 text-base">
                  This journey belongs to our dedicated workforce, our clinical advisors, our banking partners—specifically 
                  State Bank of India and Axis Bank—and the thousands of surgeons who place their surgical trust in Emsurg 
                  every single day. As we march confidently toward our <strong className="text-slate-900">1,000 Million INR roadmap for 2028</strong>, 
                  our promise remains resolute: uncompromising clinical excellence and ethical care for every patient.
                </p>
              </div>

              {/* Signature Sign-Off */}
              <div className="mt-8 pt-6 border-t border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-serif italic text-2xl sm:text-3xl text-slate-900 tracking-wide font-medium select-none">
                    Kunal Mukherjee
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
                    Mr. Kunal Mukherjee
                  </div>
                  <div className="text-xs text-slate-400">
                    Managing Director & CEO, Emsurg Healthcare (India) Pvt. Ltd.
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>CDSCO Licensed · ISO 13485 Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. MD ADDRESS & OPERATIONAL VISION VIDEO PLAYER */}
          <div className="mt-12 sm:mt-16 pt-12 border-t border-sky-100">
            <div className="max-w-5xl mx-auto">
              {/* Video Header bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                    EXECUTIVE VIDEO ADDRESS & R&D SHOWCASE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-slate-900 tracking-tight mt-1">
                    Executive Vision & Indigenous Roadmap
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Official Address · Emsurg R&D & Operations
                </div>
              </div>

              {/* Video Container */}
              <div 
                ref={videoContainerRef}
                onMouseMove={handleMouseMove}
                className="w-full aspect-video rounded-3xl overflow-hidden border border-sky-200/80 shadow-[0_20px_60px_rgba(2,132,199,0.12)] relative bg-slate-900 group select-none"
              >
                {/* Main Video Element */}
                <video
                  ref={videoRef}
                  src="https://7nc4blpengmbdwii.public.blob.vercel-storage.com/0925.mp4"
                  preload="auto"
                  playsInline
                  muted={isMuted}
                  onLoadedData={() => setVideoLoaded(true)}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className={`w-full h-full object-cover transition-opacity duration-700 cursor-pointer ${
                    videoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Big Center Play / Pause Overlay Button */}
                <div 
                  onClick={togglePlay}
                  className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 cursor-pointer ${
                    !isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none group-hover:opacity-100"
                  }`}
                >
                  <div className="relative">
                    {!isPlaying && (
                      <div className="absolute -inset-4 rounded-full bg-sky-500/30 animate-ping pointer-events-none" />
                    )}
                    <button
                      type="button"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center border border-white hover:scale-105 active:scale-95 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-900 text-slate-900" />
                      ) : (
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-900 text-slate-900 ml-1" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Subtle Top Telemetry Overlay */}
                <div className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-6 flex items-center justify-between pointer-events-none z-20">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>EMSURG CLEANROOM & FACILITY FOOTAGE</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-[11px] font-mono">
                    <span>1080P · 60FPS</span>
                  </div>
                </div>

                {/* Bottom Custom Controls Bar */}
                <div 
                  className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6 transition-opacity duration-300 z-20 ${
                    showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Progress Scrubber */}
                  <div className="relative w-full mb-3 flex items-center group/scrubber cursor-pointer">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.1"
                      value={progress}
                      onChange={handleProgressChange}
                      aria-label="Video seek scrubber"
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-sky-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                    {/* Left: Play / Pause + Time */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5 text-sky-400" /> : <Volume2 className="w-5 h-5" />}
                      </button>

                      <div className="font-mono text-slate-300 text-xs hidden sm:block">
                        {currentTime} / {duration}
                      </div>
                    </div>

                    {/* Right: Fullscreen Button */}
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-slate-300 text-xs sm:hidden">
                        {currentTime}
                      </div>
                      <button
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
                        aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                      >
                        {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Light Frosted Video Caption Bar */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-sky-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2.5 text-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                  <span className="font-semibold text-slate-900">
                    Executive Vision & Indigenous Roadmap · Mr. Kunal Mukherjee
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-wider border border-sky-200/80">
                  Official Address · Emsurg R&D & Operations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP TEAM GRID: team-02 Component */}
      <Team02
        badge="GOVERNANCE & UNIT EXCELLENCE"
        title="Board of Directors & Unit Leaders"
        description="The multidisciplinary leadership team guiding cleanroom engineering, clinical trials, and international healthcare alliances."
        members={leadershipTeam}
      />

      {/* 4. MISSION & VISION SECTION */}
      <section className="py-20 sm:py-24 bg-white border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/80 border border-sky-200/80 text-xs font-bold tracking-[0.25em] px-3.5 py-1 rounded-full uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              FOUNDATIONAL PURPOSE
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Mission & Strategic Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-sky-100 shadow-md relative overflow-hidden group hover:border-sky-300 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-bl-full pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold text-sky-700 uppercase tracking-widest mb-3">Our Mission</h3>
              <p className="text-2xl sm:text-3xl font-light text-slate-900 leading-snug">
                “Advancing healthcare with innovation, integrity and clinical expertise.”
              </p>
              <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                Dedicated to developing accessible, high-standard healthcare consumables and surgical systems 
                that shorten recovery periods and empower surgeons across every tier of Indian healthcare.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-sky-100 shadow-md relative overflow-hidden group hover:border-sky-300 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold text-sky-700 uppercase tracking-widest mb-3">Our Vision</h3>
              <p className="text-2xl sm:text-3xl font-light text-slate-900 leading-snug">
                “Engineering better outcomes through medical innovation and care.”
              </p>
              <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                To stand as India's preeminent medical technology brand globally recognized for biomaterial 
                synthesis, cleanroom automation, and enduring physician partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INFRASTRUCTURE & SPECIALIZED UNITS (4 KOLKATA HUBS) */}
      <section className="py-20 sm:py-24 bg-sky-50/40 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/80 border border-sky-200/80 text-xs font-bold tracking-[0.25em] px-3.5 py-1 rounded-full uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              OPERATIONAL INFRASTRUCTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Four Specialized Hubs Across Kolkata
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Combining corporate governance, cleanroom biomaterial synthesis, and automated renal fluid production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-sky-100 text-slate-800 shadow-sm hover:border-sky-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-4">
                    {idx === 0 && <Landmark className="w-5 h-5" />}
                    {idx === 1 && <Building2 className="w-5 h-5" />}
                    {idx === 2 && <Factory className="w-5 h-5" />}
                    {idx === 3 && <Microscope className="w-5 h-5" />}
                  </div>
                  <div className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
                    {loc.type}
                  </div>
                  {loc.company && (
                    <div className="text-xs font-semibold text-slate-900 mb-2">
                      {loc.company}
                    </div>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {loc.address}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Facility {idx + 1}</span>
                  <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">Active Hub</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR GROWTH STORY / TIMELINE */}
      <section className="py-20 sm:py-28 bg-white border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/80 border border-sky-200/80 text-xs font-bold tracking-[0.25em] px-3.5 py-1 rounded-full uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              JOURNEY OF EXCELLENCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Our Growth Story
            </h2>
            <p className="text-slate-600 text-base mt-2">
              From an ambitious local venture in 2010 to a pan-India medical device manufacturer.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex mb-10 sm:mb-12 last:mb-0 relative group">
                {idx !== timeline.length - 1 && (
                  <div className="absolute left-5 sm:left-6 top-10 bottom-[-2.5rem] w-px bg-sky-200 group-hover:bg-sky-400 transition-colors" />
                )}
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white border-2 border-sky-400 flex items-center justify-center shrink-0 z-10 shadow-sm text-sky-700 font-bold text-xs sm:text-sm group-hover:border-sky-500 group-hover:bg-sky-50 group-hover:scale-110 transition-all duration-300">
                  {idx + 1}
                </div>
                <div className="ml-5 sm:ml-8 pt-0.5">
                  <div className="inline-block px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wider mb-2">
                    {item.year}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                    {item.year === "2010" && "Foundation in Kolkata"}
                    {item.year === "2012" && "Smith & Nephew Partnership"}
                    {item.year === "2020" && "Indigenous Manufacturing Launch"}
                    {item.year === "2023" && "Biologics & Wound Care Diversification"}
                    {item.year === "2024" && "Automated NPWT & Pan-India Scale"}
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            {/* 2028 Future Horizon Milestone */}
            <div className="flex relative group mt-10">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 z-10 shadow-md font-bold text-xs sm:text-sm">
                ★
              </div>
              <div className="ml-5 sm:ml-8 pt-0.5">
                <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider mb-2">
                  2028 VISION
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 text-emerald-700">
                  Targeting 1,000 Million INR Turnover
                </h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Expanding global regulatory approvals (CE MDR), augmenting cleanroom capacity, and 
                  broadening patient reach across Southeast Asia, the Middle East, and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA / CONTACT BANNER: Light Medical Gradient */}
      <section className="bg-gradient-to-b from-white via-sky-50/60 to-sky-100/50 py-16 sm:py-20 border-t border-sky-100 relative overflow-hidden text-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200/80 text-xs font-semibold uppercase tracking-widest mb-4">
            Connect With Our Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900 mb-4">
            Partner With India’s Premier MedTech Pioneer
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto mb-8">
            Whether you represent a hospital procurement board, clinical research team, or institutional distributor, 
            we welcome dialogue with our executive management.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <LiquidButton
              variant="primary"
              size="lg"
              asChild
            >
              <Link to="/products">
                <span>Explore Indigenous Products</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </LiquidButton>
            <LiquidButton
              variant="outline"
              size="lg"
              asChild
            >
              <Link to="/contact">
                Initiate Corporate Dialogue
              </Link>
            </LiquidButton>
          </div>
        </div>
      </section>
    </div>
  );
}
