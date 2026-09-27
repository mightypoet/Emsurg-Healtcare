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
    role: "Director - Clinical Affairs",
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

          {/* OUR MISSION & OUR VISION SECTION */}
          <div className="max-w-4xl mx-auto pt-4">
            {/* Centered Heading & Switcher */}
            <div className="flex flex-col items-center text-center gap-3 mb-8 pb-2">
              <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/70 border border-sky-200/80 text-[11px] font-bold tracking-[0.2em] px-3.5 py-1 rounded-full uppercase">
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                OUR STRATEGIC PILLARS
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
                Our Mission <span className="text-slate-400 font-extralight">&</span> Our Vision
              </h2>

              {/* Centered Pill Toggle Switch */}
              <div className="inline-flex items-center p-1 bg-sky-100/70 rounded-full border border-sky-200/60 shadow-inner mt-2">
                <button
                  type="button"
                  onClick={() => setMissionVisionView("mission")}
                  className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    missionVisionView === "mission"
                      ? "bg-white text-sky-800 shadow-sm"
                      : "text-slate-600 hover:text-sky-900"
                  }`}
                >
                  Our Mission
                </button>
                <button
                  type="button"
                  onClick={() => setMissionVisionView("vision")}
                  className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    missionVisionView === "vision"
                      ? "bg-white text-sky-800 shadow-sm"
                      : "text-slate-600 hover:text-sky-900"
                  }`}
                >
                  Our Vision
                </button>
              </div>
            </div>

            {/* Centered Active Content Card */}
            <div className="max-w-3xl mx-auto text-left">
              {/* 1. OUR MISSION CARD */}
              {missionVisionView === "mission" && (
                <div className="bg-white/95 backdrop-blur-xl border border-sky-100 rounded-3xl p-6 sm:p-9 shadow-md shadow-sky-900/5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/10 transition-all relative overflow-hidden flex flex-col justify-between group animate-in fade-in zoom-in-95 duration-200">
                  {/* Subtle top ambient bar */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform shadow-sm">
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-sky-600">Core Purpose</div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Our Mission</h3>
                      </div>
                    </div>

                    {/* Mission Paragraph */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      To drive innovation and excellence in healthcare by delivering high-quality medical devices, implants, and equipment that improve patient outcomes. We are committed to maintaining the highest standards of safety, quality, and ethical practices, while continuously adapting to the evolving clinical needs and empowering healthcare professionals in India and globally.
                    </p>

                    {/* Mission Bullet Points */}
                    <div className="pt-5 border-t border-sky-50">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-sky-600" /> Strategic Commitments:
                      </div>
                      <ul className="space-y-2.5">
                        {[
                          "Provide innovative and life-saving medical devices",
                          "Continuous innovation in medical technology",
                          "Maintain the highest standards of ethical practices",
                          "Deliver reliable and high-quality solutions",
                          "Focus on sustainable business practices and robust management",
                          "Support healthcare professionals with training and knowledge sharing"
                        ].map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-sky-50 flex items-center justify-between text-xs text-sky-800 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> CDSCO Form MD-9 / Class C
                    </span>
                    <span className="text-slate-400 font-normal">Emsurg Healthcare</span>
                  </div>
                </div>
              )}

              {/* 2. OUR VISION CARD */}
              {missionVisionView === "vision" && (
                <div className="bg-white/95 backdrop-blur-xl border border-sky-100 rounded-3xl p-6 sm:p-9 shadow-md shadow-sky-900/5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/10 transition-all relative overflow-hidden flex flex-col justify-between group animate-in fade-in zoom-in-95 duration-200">
                  {/* Subtle top ambient bar */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shadow-sm">
                        <Eye className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">Future Horizon</div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Our Vision</h3>
                      </div>
                    </div>

                    {/* Vision Paragraph */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      To become a globally recognized, professionally managed medical technology company that expands the possibilities of healthcare. We aim to lead through innovation, collaboration, and ethical business practices while fostering a culture of excellence, meritocracy, and sustainable growth. Our vision is to empower medical professionals and institutions with advanced solutions that set new benchmarks in patient care and clinical efficiency.
                    </p>

                    {/* Vision Bullet Points */}
                    <div className="pt-5 border-t border-sky-50">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Key Strategic Objectives:
                      </div>
                      <ul className="space-y-2.5">
                        {[
                          "Achieve leadership in healthcare innovation",
                          "Foster a culture of professional excellence",
                          "Empower healthcare professionals and institutions",
                          "Promote sustainable growth and long-term partnerships",
                          "Integrate global best practices with indigenous solutions",
                          "Continuously enhance the quality and effectiveness of medical technologies"
                        ].map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-sky-50 flex items-center justify-between text-xs text-indigo-900 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-indigo-600" /> 1,000M INR Roadmap 2028
                    </span>
                    <span className="text-slate-400 font-normal">Global Excellence</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR HISTORY SECTION */}
      <section id="our-history" className="py-20 sm:py-24 bg-slate-50/70 border-b border-sky-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-14 sm:mb-16">
            <div>
              <div className="inline-block bg-[#1e3a8a] text-white text-sm sm:text-base font-bold px-6 py-2.5 rounded-full shadow-sm">
                Our History
              </div>
            </div>
            <div className="lg:max-w-2xl text-left lg:text-right">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Tracing Our Journey of Growth
                <div className="mt-1">
                  <span className="font-semibold text-slate-900">Innovation and </span>
                  <span className="text-[#3730a3]">Healthcare Excellence</span>
                </div>
              </h2>
            </div>
          </div>

          {/* 6 Cards in 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-start">
              <div className="w-12 h-12 rounded-full bg-[#fef08a] flex items-center justify-center text-[#1e3a8a] mb-6 shadow-sm">
                <Sprout className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <h3 className="text-lg font-bold text-[#881337] mb-3 leading-snug">
                Founding and Early Focus (2010)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                Emsurg was founded in 2010, initially operating in biologics, vertebroplasty, and kyphoplasty, laying the foundation for expertise in advanced medical procedures.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-start">
              <div className="w-12 h-12 rounded-full bg-[#fef08a] flex items-center justify-center text-[#1e3a8a] mb-6 shadow-sm">
                <Handshake className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1e293b] mb-3 leading-snug">
                Channel Partnership with Smith & Nephew (2012)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                In 2012, Emsurg became a channel partner of Smith & Nephew, a global leader in sports medicine, bringing minimally invasive joint surgery technologies to India.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-start">
              <div className="w-12 h-12 rounded-full bg-[#fef08a] flex items-center justify-center text-[#1e3a8a] mb-6 shadow-sm">
                <FileSignature className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <h3 className="text-lg font-bold text-[#881337] mb-3 leading-snug">
                Exclusive Importer for Teknimed and MDL
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                Emsurg gained exclusive import rights for spine bone cement and biopsy devices from Teknimed and MDL, establishing itself as a trusted partner for leading medical firms.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-start">
              <div className="w-12 h-12 rounded-full bg-[#fef08a] flex items-center justify-center text-[#1e3a8a] mb-6 shadow-sm">
                <Factory className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <h3 className="text-lg font-bold text-[#881337] mb-3 leading-snug">
                Expansion into Indigenous Manufacturing (2020)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                In 2020, Emsurg established a state-of-the-art production facility in Kolkata for dry citrate powder and hemodialysate, marking the start of domestic manufacturing excellence.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-start">
              <div className="w-12 h-12 rounded-full bg-[#fef08a] flex items-center justify-center text-[#1e3a8a] mb-6 shadow-sm">
                <FlaskConical className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1e293b] mb-3 leading-snug">
                Diversification into Wound Care and Ortho Biologics (2023)
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                Emsurg expanded its portfolio in 2023 to include wound care materials and orthopedic biologics, broadening its impact in advanced healthcare solutions.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-start">
              <div className="w-12 h-12 rounded-full bg-[#fef08a] flex items-center justify-center text-[#1e3a8a] mb-6 shadow-sm">
                <Microscope className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1e293b] mb-3 leading-snug">
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
            <div className="inline-flex items-center gap-2 text-sky-700 bg-sky-100/80 border border-sky-200/80 text-xs font-bold tracking-[0.25em] px-3.5 py-1 rounded-full uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
              OFFICIAL ADDRESS
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              From the MD’s Desk
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              We are excited about the opportunities that lie ahead and look forward to consistent success.
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
                      Zero to 360M INR · Targeting 1,000M INR by 2028 with 300+ Employees
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
                    State-of-the-Art R&D Facility & Ace Team
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
                    Company's Core Commitment
                  </div>
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light italic leading-snug text-slate-900">
                    “We at <span className="font-semibold text-sky-800">“Emsurg”</span> believe, never die before the death and <span className="font-semibold text-sky-700">IF YOU TRY, YOU RISK FAILURE. IF YOU DON'T, YOU ENSURE IT.</span>”
                  </blockquote>
                  <div className="mt-4 pt-4 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">— Mr. Kunal Mukherjee, Managing Director</span>
                    <span className="text-sky-600 font-bold tracking-wider uppercase">YOU ENSURE IT</span>
                  </div>
                </div>
              </div>

              {/* Core Narrative */}
              <div className="space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed">
                <p>
                  We at <strong className="text-slate-900">“Emsurg”</strong> believe, never die before the death and <strong>IF YOU TRY, YOU RISK FAILURE. IF YOU DON'T, YOU ENSURE IT.</strong>
                </p>

                <p>
                  That's the way we grew from <strong className="text-slate-900">Zero to 360 million INR</strong> company with diversified interests in <strong>Nephro-care, Biologics, Wound Care, Orthopaedics, Industrial Microbiology & Innovation</strong> through our state-of-the-art R&D facility headed by Our Ace Team.
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
