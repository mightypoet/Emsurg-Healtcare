import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Velaris from "../ui/velaris";

export default function Hero() {
  return (
    <Velaris 
      height="calc(100vh - 114px)" 
      colors={["#ec4899", "#8b5cf6", "#38bdf8", "#2563eb"]}
      bg="#2563eb"
      className="flex flex-col justify-center text-white pt-32 pb-20"
    >
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
            Advance reliable and<br/>trustworthy healthcare.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Engineering better outcomes through medical innovation, indigenous manufacturing, and global partnerships.
          </p>
          
          <div className="flex justify-center mb-16">
            <Link to="/contact" className="bg-slate-900 text-white font-medium px-8 py-3.5 rounded-full hover:bg-black transition-colors flex items-center text-sm shadow-xl">
              Schedule A Call <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </Velaris>
  );
}
