import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Smartphone, FileText, Zap, Bell, BarChart2, Globe } from "lucide-react";

const features = [
  { icon: FileText, label: "Tailored resume + cover letter in your own template" },
  { icon: Zap, label: "20× faster — no copy-pasting, no tab switching" },
  { icon: Globe, label: "Browser agent fills & submits forms for you" },
  { icon: Bell, label: "Deep company research before every application" },
  { icon: BarChart2, label: "Smart job tracker — every artifact auto-logged" },
];

export default function JustApplyCard({ iconUrl }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xs cursor-pointer"
      style={{ perspective: 1000 }}
      whileHover={{ scale: 1.03, y: -6 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", perspective: "1200px", position: "relative", width: "100%", height: 360, willChange: "transform" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", opacity: flipped ? 0 : 1 }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-amber-200/80 shadow-xl shadow-amber-100"
        >
          <div className="relative h-full flex flex-col items-center justify-center px-8 py-10 overflow-hidden bg-white">

            {/* Coming Soon tag */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold tracking-widest uppercase shadow-md shadow-amber-200">
                Coming Soon
              </span>
            </div>

            {/* Soft color blobs */}
            <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(circle, #fef3c7, transparent 70%)" }} />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, #fed7aa, transparent 70%)" }} />

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />

            {/* Top accent line */}
            <motion.div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #f59e0b, #fb923c, transparent)" }}
              animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* App icon */}
            <div className="relative z-10 mb-4 shrink-0">
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-40"
                style={{ background: "radial-gradient(circle, #fcd34d, transparent 70%)", margin: "-10px" }}
                animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-24 h-24 rounded-3xl overflow-hidden ring-2 ring-amber-200 shadow-lg shadow-amber-100 relative">
                <img src={iconUrl} alt="Just Apply app icon" className="w-24 h-24 object-cover" />
              </div>
            </div>

            <h3 className="text-3xl font-bold tracking-tight mb-2 relative z-10 text-slate-900">
              Just Apply
            </h3>

            <div className="flex items-center gap-2 mb-3 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-xs font-semibold text-amber-600">
                <Sparkles className="w-3 h-3" /> Semi-Autonomous
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500">
                <Zap className="w-3 h-3" /> Private Beta
              </span>
            </div>

            <p className="text-slate-700 text-sm text-center font-light leading-relaxed relative z-10">
              The semi-autonomous apply studio. Build your profile once — Just Apply researches, writes, fills, and tracks every application at 20× the speed.
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", opacity: flipped ? 1 : 0 }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-amber-200/80 shadow-xl shadow-amber-100 bg-white flex flex-col"
        >
          <motion.div className="h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #f59e0b, #fb923c, transparent)" }}
            animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fef3c7, transparent 70%)" }} />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fed7aa, transparent 70%)" }} />

          <div className="flex-1 px-6 py-5 flex flex-col relative z-10">
            <div className="text-center mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Features</p>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 mx-auto"></div>
            </div>

            <div className="flex-1 space-y-3 mb-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-2 text-xs">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  </motion.div>
                  <div className="flex items-start gap-1.5 flex-1 min-w-0">
                    <f.icon className="w-3 h-3 shrink-0 mt-0.5 text-amber-500" />
                    <span className="leading-snug break-words text-slate-700">{f.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Website link */}
            <div className="mt-auto pt-3 border-t border-amber-100 text-center">
              <a
                href="https://just-apply.zynclo.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold transition-all shadow-sm shadow-amber-200"
              >
                <Globe className="w-3.5 h-3.5" /> just-apply.zynclo.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}