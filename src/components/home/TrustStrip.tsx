import { Building2 } from "lucide-react";

const hospitals = [
  { name: "Apollo Hospitals", scale: "scale-150", logo: "https://h2urzlmuwdqsab2o.private.blob.vercel-storage.com/Apollo_Hospitals_Logo.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfSDJ1cnpMTXVXRFFTQUIybyIsIm93bmVySWQiOiJ0ZWFtX0pOVU5UaW1oM1BYcHh1blY4Q3E4WXRJayIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg4OTg2ODkwNzI5LCJpYXQiOjE3ODg5NDM2OTIwNjR9.2bPPtrq5RvZEigvUSppxA82DL6FiABT9JgQD7wGlXcg&vercel-blob-signature=MBKkdVeNoxu1finF_9yEIx8oLOnvYo45hDgP_hOKXp0" },
  { name: "Fortis Hospitals", scale: "scale-100", logo: "https://h2urzlmuwdqsab2o.private.blob.vercel-storage.com/FORTIS.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfSDJ1cnpMTXVXRFFTQUIybyIsIm93bmVySWQiOiJ0ZWFtX0pOVU5UaW1oM1BYcHh1blY4Q3E4WXRJayIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg4OTg2ODk4MzU5LCJpYXQiOjE3ODg5NDM2OTkzMTV9.RyxZfQNuH2vNmnESLEqjNXvNQQ4v39C0Uw3nrra7TnY&vercel-blob-signature=EVaBM-vLf9wy7B6n2G-HUUm7Pae4fqoJlw1MbXCIKvU" },
  { name: "Narayana Health", scale: "scale-100", logo: "https://h2urzlmuwdqsab2o.private.blob.vercel-storage.com/Narayana_Health.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfSDJ1cnpMTXVXRFFTQUIybyIsIm93bmVySWQiOiJ0ZWFtX0pOVU5UaW1oM1BYcHh1blY4Q3E4WXRJayIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg4OTg2OTE0Nzg0LCJpYXQiOjE3ODg5NDM3MTU3NDZ9.-lzq24az4ivoS2_1N9KljFHUjZAdk-uKrnOF3lTZ7RM&vercel-blob-signature=0wXjp97SZnG1zmA6myCERBymZBVqp_maeQihCK8-VQY" },
  { name: "Manipal Hospitals", scale: "scale-100", logo: "https://h2urzlmuwdqsab2o.private.blob.vercel-storage.com/MANIPAL-HOSPITAL.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfSDJ1cnpMTXVXRFFTQUIybyIsIm93bmVySWQiOiJ0ZWFtX0pOVU5UaW1oM1BYcHh1blY4Q3E4WXRJayIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg4OTg2OTA2ODQxLCJpYXQiOjE3ODg5NDM3MDc4MDZ9.eUH4E9NTTm7QS4PpCqzlsz4XAcS7UJ5pOQ7rk9CRmhU&vercel-blob-signature=EVgWzb97bVGVGjBUeUqfEDPTFc0yb9RMwU9l6_ueZLk" },
  { name: "Woodlands", scale: "scale-100", logo: "https://h2urzlmuwdqsab2o.private.blob.vercel-storage.com/WOODLANDS.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfSDJ1cnpMTXVXRFFTQUIybyIsIm93bmVySWQiOiJ0ZWFtX0pOVU5UaW1oM1BYcHh1blY4Q3E4WXRJayIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg4OTg2OTIwODY5LCJpYXQiOjE3ODg5NDM3MjE4NDR9.Cyik6EUmPcCwaMz4K9zMQcQfqg28Ax1sNGbWJnmV3Zs&vercel-blob-signature=750-aQ2IPJWpOKqf5jcR_PBOmHG-XIhWbKT_X1W_qwE" },
  { name: "CK Birla", scale: "scale-100", logo: "https://h2urzlmuwdqsab2o.private.blob.vercel-storage.com/CK%20BIRLA.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfSDJ1cnpMTXVXRFFTQUIybyIsIm93bmVySWQiOiJ0ZWFtX0pOVU5UaW1oM1BYcHh1blY4Q3E4WXRJayIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg4OTg2ODk1MjU5LCJpYXQiOjE3ODg5NDM2OTYyMzJ9.MbwkFN95Z--H7TV22nabi29OPz-sFH0GmOzWN8xEMuA&vercel-blob-signature=t7zr61er6g6s9P4APoo6uL_zvDM_jhw1jXj_2UqJhHs" },
];

export default function TrustStrip() {
  return (
    <div className="bg-slate-50 border-y border-slate-200/80 pt-10 pb-16 mb-16 md:mb-24 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center mb-8">
          Trusted by leading hospitals, including
        </h3>
        
        <div className="relative flex overflow-hidden w-full group">
          {/* Left Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          {/* Right Fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

          {/* First Track */}
          <div className="flex shrink-0 items-center gap-8 animate-marquee group-hover:[animation-play-state:paused] pr-8">
            {hospitals.map((hospital, idx) => (
              <div key={`set1-${idx}`} className="bg-white px-8 py-3 rounded-full border border-slate-200/90 shadow-sm flex items-center justify-center shrink-0 h-16 min-w-[170px]">
                <img src={hospital.logo} alt={hospital.name} className={`h-8 w-auto max-w-[140px] object-contain ${hospital.scale || 'scale-100'}`} />
              </div>
            ))}
          </div>

          {/* Second Track for seamless loop */}
          <div className="flex shrink-0 items-center gap-8 animate-marquee group-hover:[animation-play-state:paused] pr-8" aria-hidden="true">
            {hospitals.map((hospital, idx) => (
              <div key={`set2-${idx}`} className="bg-white px-8 py-3 rounded-full border border-slate-200/90 shadow-sm flex items-center justify-center shrink-0 h-16 min-w-[170px]">
                <img src={hospital.logo} alt={hospital.name} className={`h-8 w-auto max-w-[140px] object-contain ${hospital.scale || 'scale-100'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
