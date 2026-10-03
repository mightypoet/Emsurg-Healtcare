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
  UserCheck,
  Target,
  Eye,
  Zap,
  Compass,
  Award,
  Sprout,
  Handshake,
  FileSignature,
  FlaskConical
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
    image: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/PRIYANKA-ACHARYYA.jpg",
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
    image: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/RITOBROTO-MUKHERJEE.jpg",
    bio: "Spearheading pan-India institutional distribution alliances, corporate governance, and multi-state medical supply chain infrastructure.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "ritobroto@emsurghealthcare.com"
    }
  },
  {
    name: "Dr. Suman Saha",
    role: "Director",
    category: "Executive Board",
    department: "Clinical Advisory",
    image: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/Dr.-SUMAN-SAHA-%28Ph.jpg",
    bio: "Leading clinical trial evaluations, physician advisory boards, biomaterial biocompatibility protocols, and surgical efficacy standards.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "dr.saha@emsurghealthcare.com"
    }
  },
  {
    name: "Subhro Kamal Bhattacharyya",
    role: "Business Leader - Oncology Devices & Biologics",
    category: "Clinical Division",
    department: "Oncology & Biologics",
    image: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/SUBHRO%20KAMAL%20BHATTACHARYYA.png",
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
    image: "https://7nc4blpengmbdwii.public.blob.vercel-storage.com/SWARNALI%20DEY.png",
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

  // Mission / Vision view tab toggle state (centered toggle)
  const [missionVisionView, setMissionVisionView] = useState<"mission" | "vision">("mission");

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2 mb-14">
            <div className="bg-white/80 backdrop-blur-md border border-sky-100 rounded-2xl p-5 shadow-sm shadow-sky-900/5 text-left hover:border-sky-200 transition-colors">
              <div className="text-sky-600 font-bold text-3xl md:text-4xl tracking-tight">14+</div>
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">Years of Innovation</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-sky-100 rounded-2xl p-5 shadow-sm shadow-sky-900/5 text-left hover:border-sky-200 transition-colors">
              <div className="text-sky-600 font-bold text-3xl md:text-4xl tracking-tight">500M+ INR</div>
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

          {/* OUR MISSION & OUR VISION INFOGRAPHIC SECTION */}
          <div className="max-w-7xl mx-auto pt-8">
            {/* Centered Heading */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
              <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/80 border border-sky-200 text-xs font-bold tracking-[0.25em] px-4 py-1.5 rounded-full uppercase shadow-xs">
                <Compass className="w-4 h-4 text-sky-600" />
                <span>STRATEGIC FOUNDATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight">
                Our Mission <span className="text-sky-600 font-semibold">&</span> Our Vision
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                Guiding our clinical research, indigenous biomedical production, and healthcare partnerships across India and global markets.
              </p>
            </div>

            {/* Modern Dual-Card Infographic Layout with Ambient Gradient Glow */}
            <div className="relative">
              {/* Background Ambient Glow Blobs */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-sky-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {/* 1. OUR MISSION CARD */}
                <div className="relative group bg-white/95 backdrop-blur-2xl border border-sky-100/90 rounded-3xl p-7 sm:p-10 shadow-lg shadow-sky-900/5 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  {/* Top Ambient Highlight */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-400" />

                  <div>
                    {/* Header Strip with Icons */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200/80 flex items-center justify-center text-sky-600 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Target className="w-7 h-7 text-sky-600" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-widest text-sky-600">
                            Core Purpose
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Our Mission
                          </h3>
                        </div>
                      </div>

                      <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                        Patient First
                      </span>
                    </div>

                    {/* Mission Paragraph */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                      To drive innovation and excellence in healthcare by delivering high-quality medical devices, implants, and equipment that improve patient outcomes. We are committed to maintaining the highest standards of safety, quality, and ethical practices, while continuously adapting to evolving clinical needs and empowering healthcare professionals in India and globally.
                    </p>

                    {/* Mission Bullet Points */}
                    <div className="pt-6 border-t border-slate-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4 text-sky-600" />
                        <span>Strategic Commitments</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "Provide innovative and life-saving medical devices",
                          "Continuous innovation in medical technology",
                          "Maintain highest standards of ethical practices",
                          "Deliver reliable and high-quality solutions",
                          "Focus on sustainable business practices",
                          "Support clinicians with training & knowledge"
                        ].map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/50 hover:bg-sky-50 border border-sky-100/70 hover:border-sky-200 transition-all duration-200"
                          >
                            <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                            </div>
                            <span className="text-xs font-medium text-slate-700 leading-snug">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-sky-800 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> CDSCO Form MD-9 / Class C
                    </span>
                    <span className="text-slate-400 font-normal">Emsurg Healthcare</span>
                  </div>
                </div>

                {/* 2. OUR VISION CARD */}
                <div className="relative group bg-white/95 backdrop-blur-2xl border border-indigo-100/90 rounded-3xl p-7 sm:p-10 shadow-lg shadow-indigo-900/5 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  {/* Top Ambient Highlight */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500" />

                  <div>
                    {/* Header Strip with Icons */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                          <Eye className="w-7 h-7 text-indigo-600" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
                            Future Horizon
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Our Vision
                          </h3>
                        </div>
                      </div>

                      <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                        2028 Milestone
                      </span>
                    </div>

                    {/* Vision Paragraph */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                      To become a globally recognized, professionally managed medical technology company that expands the possibilities of healthcare. We aim to lead through innovation, collaboration, and ethical business practices while fostering a culture of excellence, meritocracy, and sustainable growth, empowering medical professionals worldwide.
                    </p>

                    {/* Vision Bullet Points */}
                    <div className="pt-6 border-t border-slate-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        <span>Key Strategic Objectives</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "Achieve leadership in healthcare innovation",
                          "Foster a culture of professional excellence",
                          "Empower clinicians and hospital networks",
                          "Promote sustainable long-term partnerships",
                          "Integrate global standards with local R&D",
                          "Continuously enhance device efficacy"
                        ].map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/70 hover:border-indigo-200 transition-all duration-200"
                          >
                            <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                            </div>
                            <span className="text-xs font-medium text-slate-700 leading-snug">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-900 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-indigo-600" /> 1,000M INR Roadmap 2028
                    </span>
                    <span className="text-slate-400 font-normal">Global Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR HISTORY SECTION */}
      <section id="our-history" className="py-20 sm:py-24 bg-gradient-to-b from-slate-50/70 via-sky-50/30 to-white border-b border-sky-100 relative overflow-hidden">
        {/* Subtle background ambient elements */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-14 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 border border-sky-200/80 text-xs sm:text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                Our History
              </div>
            </div>
            <div className="lg:max-w-2xl text-left lg:text-right">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Tracing Our Journey of Growth
                <div className="mt-1">
                  <span className="font-semibold text-slate-900">Innovation and </span>
                  <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Healthcare Excellence
                  </span>
                </div>
              </h2>
            </div>
          </div>

          {/* 6 Cards in 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-sky-100/90 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col justify-start overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-6 shadow-xs group-hover:bg-sky-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-3 leading-snug">
                Founding and Early Focus (2010)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                Emsurg was founded in 2010, initially operating in biologics, vertebroplasty, and kyphoplasty, laying the foundation for expertise in advanced medical procedures.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-sky-100/90 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col justify-start overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-6 shadow-xs group-hover:bg-sky-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-3 leading-snug">
                Channel Partnership with Smith & Nephew (2012)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                In 2012, Emsurg became a channel partner of Smith & Nephew, a global leader in sports medicine, bringing minimally invasive joint surgery technologies to India.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-sky-100/90 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col justify-start overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-6 shadow-xs group-hover:bg-sky-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                <FileSignature className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-3 leading-snug">
                Exclusive Importer for Teknimed and MDL
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                Emsurg gained exclusive import rights for spine bone cement and biopsy devices from Teknimed and MDL, establishing itself as a trusted partner for leading medical firms.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-sky-100/90 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col justify-start overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-6 shadow-xs group-hover:bg-sky-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-3 leading-snug">
                Expansion into Indigenous Manufacturing (2020)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                In 2020, Emsurg established a state-of-the-art production facility in Kolkata for dry citrate powder and hemodialysate, marking the start of domestic manufacturing excellence.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-sky-100/90 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col justify-start overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-6 shadow-xs group-hover:bg-sky-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-3 leading-snug">
                Diversification into Wound Care and Ortho Biologics (2023)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                Emsurg expanded its portfolio in 2023 to include wound care materials and orthopedic biologics, broadening its impact in advanced healthcare solutions.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group relative bg-white/95 backdrop-blur-xl rounded-2xl p-7 sm:p-8 border border-sky-100/90 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col justify-start overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mb-6 shadow-xs group-hover:bg-sky-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-3 leading-snug">
                Manufacturing and Marketing Medical Devices (2024)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                By 2024, Emsurg began producing and marketing innovative medical devices, including negative pressure wound therapy machines, strengthening its role in patient-centered healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP SHOWCASE & FROM THE MD'S DESK */}
      <section id="md-desk" className="py-20 sm:py-24 bg-white border-b border-sky-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              From the MD’s Desk
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              We are excited about the opportunities that lie ahead and look forward to consistent success.
            </p>
          </div>

          {/* Two-Column Executive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
            {/* Left Column: Authentic Address & Philosophy (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-between order-2 lg:order-1">
              {/* High-Impact Quote Box */}
              <div className="bg-sky-50/60 border-l-4 border-sky-500 rounded-r-2xl p-6 text-slate-900 shadow-sm relative overflow-hidden mb-8">
                <Quote className="absolute -top-3 -right-3 w-28 h-28 text-sky-900/[0.04] pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-sky-600 text-xs font-bold tracking-widest uppercase mb-3">
                    Company's Core Commitment
                  </div>
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light italic leading-snug text-slate-900">
                    “We at <span className="font-semibold text-sky-800">“Emsurg”</span> believe, never die before the death and <span className="font-semibold text-sky-700">IF YOU TRY, YOU RISK FAILURE. IF YOU DON'T, YOU ENSURE IT.</span>”
                  </blockquote>
                  <div className="mt-4 pt-4 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">— Mr. Kunal Mukherjee, Managing Director</span>
                  </div>
                </div>
              </div>

              {/* Core Narrative */}
              <div className="space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed">
                <p>
                  That's the way we grew from <strong className="text-slate-900">Zero to 500 million INR</strong> company with diversified interests in <strong>Nephro-care, Orthobiologics, Wound Care, Orthopaedics, Industrial Microbiology & Innovation</strong> through our state-of-the-art R&D facility headed by Our Ace Team.
                </p>

                <p>
                  By year 2028, we should be a <strong className="text-slate-900">1000 million INR</strong> company with <strong className="text-slate-900">300+ employees</strong>. We are excited about the opportunities that lie ahead and look forward to continuing success.
                </p>

                <p className="text-slate-600">
                  We are thankful to our employees, our teachers, and of course our stakeholders who believed in us and even in tough times never left us. We are thankful to our banks and financial institutions who are also our valued stakeholders.
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
              </div>
            </div>

            {/* Right Column: Portrait & Profile (5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end order-1 lg:order-2">
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
                    State-of-the-Art R&D Facility & Ace Team
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. MD ADDRESS & OPERATIONAL VISION VIDEO PLAYER */}
          <div className="mt-12 sm:mt-16 pt-12 border-t border-sky-100">
            <div className="max-w-5xl mx-auto">
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
              <div className="mt-4 p-4 rounded-2xl bg-white border border-sky-100 shadow-sm flex items-center gap-2.5 text-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                <span className="font-semibold text-slate-900">
                  Executive Vision & Indigenous Roadmap · Mr. Kunal Mukherjee
                </span>
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

      {/* 4. INFRASTRUCTURE & SPECIALIZED UNITS (4 KOLKATA HUBS) */}
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
                    {loc.type.includes("CORPORATE") ? (
                      <Building2 className="w-5 h-5" />
                    ) : loc.type.includes("R&D") ? (
                      <Microscope className="w-5 h-5" />
                    ) : loc.type.includes("MANUFACTURING") ? (
                      <Factory className="w-5 h-5" />
                    ) : (
                      <Landmark className="w-5 h-5" />
                    )}
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
                    {item.year === "2012" && "Launch of sports medicine for Eastern India"}
                    {item.year === "2020" && "Indigenous Manufacturing Launch"}
                    {item.year === "2023" && "Orthobiologics"}
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
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <TrendingUp className="w-5 h-5 text-white" />
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
    </div>
  );
}
