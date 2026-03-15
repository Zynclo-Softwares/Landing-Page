import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Calendar, Flame, Camera, Brain, Utensils, Smartphone, ScrollText, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Camera, label: "AI Image Verification" },
  { icon: Brain, label: "LLM Based Judge" },
  { icon: Shield, label: "Pending Locks" },
  { icon: Calendar, label: "Flexible Scheduling" },
  { icon: Flame, label: "Streak Tracking" },
  { icon: Utensils, label: "Food Lock", soon: true },
];

export default function ProjectCard({ iconUrl }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xs cursor-pointer"
      style={{ perspective: 1000 }}
      whileHover={{ scale: 1.03, y: -6 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: 360, willChange: "transform" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl shadow-indigo-100"
        >
          <div className="relative h-full flex flex-col items-center justify-center px-8 py-10 overflow-hidden bg-white">

            {/* Soft color wash blobs */}
            <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(circle, #e0e7ff, transparent 70%)" }} />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, #ede9fe, transparent 70%)" }} />

            {/* Subtle dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }} />

            {/* App icon */}
            <div className="relative z-10 mb-4 shrink-0">
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-40"
                style={{ background: "radial-gradient(circle, #a5b4fc, transparent 70%)", margin: "-10px" }}
                animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-24 h-24 rounded-3xl overflow-hidden ring-2 ring-indigo-200 shadow-lg shadow-indigo-100 relative">
                <img src={iconUrl} alt="PledgeProof app icon" className="w-24 h-24 object-cover" />
              </div>
            </div>

            <h3 className="text-3xl font-bold tracking-tight mb-2 relative z-10 text-slate-900">
              PledgeProof
            </h3>

            <div className="flex items-center gap-2 mb-3 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600">
                <Sparkles className="w-3 h-3" /> AI-Powered
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500">
                <Smartphone className="w-3 h-3" /> iOS & Android
              </span>
            </div>

            <p className="text-slate-500 text-sm text-center font-light leading-relaxed relative z-10 max-w-[220px]">
              AI-powered accountability app with a patent-pending lock-and-schedule system.
            </p>

            {/* Legal links */}
            <div className="flex gap-2 mt-4 relative z-10">
              <Link
                to="/TermsAndConditions"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <ScrollText className="w-3 h-3" /> Terms
              </Link>
              <Link
                to="/PrivacyPolicy"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-violet-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:text-violet-600 transition-colors"
              >
                <Lock className="w-3 h-3" /> Privacy
              </Link>
            </div>


          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl shadow-indigo-100 bg-white flex flex-col"
        >
          {/* Top accent */}
          <div className="h-[3px] rounded-t-3xl"
            style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }} />

          {/* Soft blob */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #e0e7ff, transparent 70%)" }} />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #ede9fe, transparent 70%)" }} />

          <div className="flex-1 px-6 py-5 flex flex-col relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">Features</p>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
              {features.map((f, idx) => (
                <div
                  key={f.label}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs font-medium transition-colors ${f.soon ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-indigo-50/60 border-indigo-100 text-slate-700"}`}
                >
                  <span className="font-bold text-sm mt-0.5 w-5 shrink-0">{idx + 1}</span>
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${f.soon ? "bg-amber-100" : "bg-indigo-100"}`}>
                      <f.icon className={`w-3 h-3 ${f.soon ? "text-amber-500" : "text-indigo-500"}`} />
                    </div>
                    <span className="leading-snug break-words">{f.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex gap-2 mt-4">
              <a href="#" className="flex-1 inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] text-indigo-200">Download on the</span>
                  <span className="text-xs font-semibold">App Store</span>
                </div>
              </a>
              <a href="#" className="flex-1 inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white transition-all">
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