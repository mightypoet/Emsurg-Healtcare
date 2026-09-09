import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LiquidButton } from "../ui/liquid-glass-button";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-center text-white pt-36 pb-20 overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="https://h2urzlmuwdqsab2o.private.blob.vercel-storage.com/10661569-uhd_3840_2160_30fps-compressed%20(1).mp4?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfSDJ1cnpMTXVXRFFTQUIybyIsIm93bmVySWQiOiJ0ZWFtX0pOVU5UaW1oM1BYcHh1blY4Q3E4WXRJayIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg4OTgwNzE2Njc5LCJpYXQiOjE3ODg5Mzc1MTc5ODR9.PGjuqnun1cSywaYi-tNeO5P9ZbhnF0YdzRDzFxT2QMg&vercel-blob-signature=cocDt5QXAm57CIZtpMTPm6HV2mJKnCyNJ0AQWuHPEMs" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
            Advance reliable and<br/>trustworthy healthcare.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Engineering better outcomes through medical innovation, indigenous manufacturing, and global partnerships.
          </p>
          
          <div className="flex justify-center mb-16">
            <LiquidButton size="lg" className="shadow-xl" onClick={() => navigate('/contact')}>
              Schedule A Call <ArrowRight className="w-4 h-4 ml-2" />
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}
