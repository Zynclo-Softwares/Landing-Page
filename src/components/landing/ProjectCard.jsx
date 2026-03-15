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
      className="w-full max-w-xs cursor-pointer"
      style={{ perspective: 1000 }}
      whileHover={{ scale: 1.03, y: -6 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: 360 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-3xl overflow-hidden"
        >
          {/* Dark base */}
          <div
            className="relative h-full flex flex-col items-center justify-center px-8 py-10 overflow-hidden"
            style={{ background: "linear-gradient(145deg, #0f0c29, #1a1040, #0f172a)" }}
          >
            {/* Glowing orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[-10%] right-[-10%] w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)" }} />
            <div className="absolute top-[40%] left-[60%] w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)" }} />

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }} />

            {/* Animated top glow line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, #6366f1, #a78bfa, transparent)" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* App icon with glow ring */}
            <div className="relative z-10 mb-5 shrink-0">
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)", margin: "-12px" }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-24 h-24 rounded-3xl overflow-hidden ring-2 ring-indigo-500/40 shadow-2xl relative">
                <img src={iconUrl} alt="PledgeProof app icon" className="w-24 h-24 object-cover" />
              </div>
            </div>

            <h3 className="text-3xl font-bold tracking-tight mb-2 relative z-10"
              style={{ background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              PledgeProof
            </h3>

            <div className="flex items-center gap-2 mb-3 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-indigo-200"
                style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>
                <Sparkles className="w-3 h-3" /> AI-Powered
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-slate-300"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Smartphone className="w-3 h-3" /> iOS & Android
              </span>
            </div>

            <p className="text-slate-400 text-sm text-center font-light leading-relaxed relative z-10 max-w-[220px]">
              AI-powered accountability app with a patent-pending lock-and-schedule system.
            </p>

            {/* Legal links */}
            <div className="flex gap-2 mt-4 relative z-10">
              <Link
                to="/TermsAndConditions"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 transition-all"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
              >
                <ScrollText className="w-3 h-3" /> Terms
              </Link>
              <Link
                to="/PrivacyPolicy"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-300 transition-all"
                style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}
              >
                <Lock className="w-3 h-3" /> Privacy
              </Link>
            </div>

            {/* Bottom hint */}
            <p className="absolute bottom-4 text-[10px] text-slate-600 tracking-widest uppercase z-10">tap to see features</p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col"
        >
          <div
            className="h-full flex flex-col px-6 py-6 overflow-hidden relative"
            style={{ background: "linear-gradient(145deg, #0f0c29, #1a1040, #0f172a)" }}
          >
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />

            {/* Animated top line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, #6366f1, #a78bfa, transparent)" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 relative z-10">Features</p>

            <div className="grid grid-cols-2 gap-1.5 flex-1 relative z-10">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium"
                  style={f.soon
                    ? { background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24" }
                    : { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", color: "#c7d2fe" }
                  }
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={f.soon
                      ? { background: "rgba(251,191,36,0.15)" }
                      : { background: "rgba(99,102,241,0.2)" }
                    }>
                    <f.icon className="w-3.5 h-3.5" style={{ color: f.soon ? "#fbbf24" : "#818cf8" }} />
                  </div>
                  <span className="leading-tight">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex gap-2 mt-4 relative z-10">
              <a href="#"
                className="flex-1 inline-flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))", border: "1px solid rgba(99,102,241,0.4)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" style={{ fill: "#c7d2fe" }}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] text-indigo-400">Download on the</span>
                  <span className="text-xs font-semibold text-indigo-200">App Store</span>
                </div>
              </a>

              <a href="#"
                className="flex-1 inline-flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(167,139,250,0.25))", border: "1px solid rgba(139,92,246,0.4)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
                  <path d="M3.18 23.76a2 2 0 001.09-.31l11.83-6.76L13 13.5 3.18 23.76z" fill="#c4b5fd" opacity="0.9"/>
                  <path d="M20.82 10.32L16.1 7.62 12.76 10.7l3.34 3.08 4.72-2.7a1.5 1.5 0 000-2.76z" fill="#c4b5fd"/>
                  <path d="M4.27.55A2 2 0 003.18.24L13 10.5l3.1-2.88L4.27.55z" fill="#c4b5fd" opacity="0.9"/>
                  <path d="M3.18.24a2 2 0 00-1.09 1.8v19.92a2 2 0 001.09 1.8L13 13.5 3.18.24z" fill="#c4b5fd" opacity="0.8"/>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] text-violet-400">Get it on</span>
                  <span className="text-xs font-semibold text-violet-200">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}