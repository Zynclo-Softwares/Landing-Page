import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Calendar, Flame, Camera, Brain, Utensils, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Camera, label: "AI Image Verification" },
  { icon: Brain, label: "LLM Based Judge" },
  { icon: Shield, label: "Patent-Pending Locks" },
  { icon: Calendar, label: "Flexible Scheduling" },
  { icon: Flame, label: "Streak Tracking" },
  { icon: Utensils, label: "Food Lock — Soon", soon: true },
];

export default function ProjectCard({ iconUrl }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-sm mx-auto"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onTouchStart={() => setFlipped((f) => !f)}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: 340 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl shadow-indigo-500/10 border border-slate-200/80"
        >
          {/* Header gradient */}
          <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 h-full flex flex-col items-center justify-center px-8 py-10 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-32 rounded-full bg-black/10 blur-2xl" />

            {/* App icon */}
            <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20 mb-6 relative z-10 shrink-0">
              <img src={iconUrl} alt="PledgeProof app icon" className="w-24 h-24 object-cover" />
            </div>

            <h3 className="text-3xl font-bold text-white tracking-tight mb-2 relative z-10">PledgeProof</h3>

            <div className="flex items-center gap-2 mb-4 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold text-white">
                <Sparkles className="w-3 h-3" /> AI-Powered
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-white/80">
                <Smartphone className="w-3 h-3" /> iOS & Android
              </span>
            </div>

            <p className="text-white/70 text-sm text-center font-light leading-relaxed relative z-10 max-w-xs">
              AI-powered accountability app with a patent-pending lock-and-schedule system.
            </p>

            {/* Legal links */}
            <div className="flex gap-2 mt-6 relative z-10">
              <Link to="/TermsAndConditions" target="_blank" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white/80 transition-colors">
                Terms
              </Link>
              <Link to="/PrivacyPolicy" target="_blank" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white/80 transition-colors">
                Privacy
              </Link>
            </div>


          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl shadow-indigo-500/10 border border-slate-200/80 bg-white flex flex-col"
        >
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

          <div className="flex-1 px-7 py-6 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">Features</p>

            <div className="grid grid-cols-2 gap-2 flex-1">
              {features.map((f) => (
                <div
                  key={f.label}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium ${f.soon ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-slate-50 border-slate-100 text-slate-700"}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${f.soon ? "bg-amber-100" : "bg-indigo-50"}`}>
                    <f.icon className={`w-3.5 h-3.5 ${f.soon ? "text-amber-500" : "text-indigo-500"}`} />
                  </div>
                  <span className="leading-tight">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex gap-2 mt-5">
              <a href="#" className="flex-1 inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 transition-all border border-indigo-500/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] text-indigo-200">Download on the</span>
                  <span className="text-xs font-semibold">App Store</span>
                </div>
              </a>

              <a href="#" className="flex-1 inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 transition-all border border-violet-500/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
                  <path d="M3.18 23.76a2 2 0 001.09-.31l11.83-6.76L13 13.5 3.18 23.76z" fill="white" opacity="0.9"/>
                  <path d="M20.82 10.32L16.1 7.62 12.76 10.7l3.34 3.08 4.72-2.7a1.5 1.5 0 000-2.76z" fill="white"/>
                  <path d="M4.27.55A2 2 0 003.18.24L13 10.5l3.1-2.88L4.27.55z" fill="white" opacity="0.9"/>
                  <path d="M3.18.24a2 2 0 00-1.09 1.8v19.92a2 2 0 001.09 1.8L13 13.5 3.18.24z" fill="white" opacity="0.8"/>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] text-purple-200">Get it on</span>
                  <span className="text-xs font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}