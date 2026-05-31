import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Globe, Grid, TreePine, FileJson, Undo2, SlidersHorizontal, Github } from "lucide-react";

const features = [
  { icon: Globe, label: "Vision extraction — AI reads maps, scans & diagrams" },
  { icon: Grid, label: "Smart zoom grid for tiny text and dense regions" },
  { icon: TreePine, label: "Live zoom tree with breadcrumb trail" },
  { icon: FileJson, label: "Structured JSON output with typed schemas" },
  { icon: Undo2, label: "Undo & redo — agent backtracks and refines" },
  { icon: SlidersHorizontal, label: "Custom extraction schemas" },
];

export default function ZoomifyCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
          className="absolute inset-0 rounded-3xl overflow-hidden border border-sky-200/80 shadow-xl shadow-sky-100"
        >
          <div className="relative h-full flex flex-col items-center justify-center px-8 py-10 overflow-hidden bg-white">

            {/* v1.0 tag */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-[10px] font-bold tracking-widest uppercase shadow-md shadow-sky-200">
                v1.0
              </span>
            </div>

            {/* Blobs */}
            <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(circle, #e0f2fe, transparent 70%)" }} />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, #cffafe, transparent 70%)" }} />

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />

            {/* Top accent line */}
            <motion.div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #0ea5e9, #06b6d4, transparent)" }}
              animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* App icon */}
            <div className="relative z-10 mb-4 shrink-0">
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-40"
                style={{ background: "radial-gradient(circle, #7dd3fc, transparent 70%)", margin: "-10px" }}
                animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-24 h-24 rounded-3xl overflow-hidden ring-2 ring-sky-200 shadow-lg shadow-sky-100 relative bg-white flex items-center justify-center">
                <img src="https://zoomify.zynclo.com/zoomify-logo.png" alt="Zoomify app icon" className="w-20 h-20 object-contain" />
              </div>
            </div>

            <h3 className="text-3xl font-bold tracking-tight mb-2 relative z-10 text-slate-900">
              Zoomify
            </h3>

            <div className="flex items-center gap-2 mb-3 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-sky-600">
                <Sparkles className="w-3 h-3" /> AI-Powered
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500">
                <Globe className="w-3 h-3" /> Web App
              </span>
            </div>

            <p className="text-slate-700 text-sm text-center font-light leading-relaxed relative z-10">
              Extract detail from any complex image. Zoomify grids hard-to-read maps, diagrams & scans — then zooms with AI until every field is captured.
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", opacity: flipped ? 1 : 0 }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-sky-200/80 shadow-xl shadow-sky-100 bg-white flex flex-col"
        >
          <motion.div className="h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #0ea5e9, #06b6d4, transparent)" }}
            animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #e0f2fe, transparent 70%)" }} />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #cffafe, transparent 70%)" }} />

          <div className="flex-1 px-6 py-5 flex flex-col relative z-10">
            <div className="text-center mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">Features</p>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-300 mx-auto"></div>
            </div>

            <div className="flex-1 space-y-3 mb-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-2 text-xs">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                  </motion.div>
                  <div className="flex items-start gap-1.5 flex-1 min-w-0">
                    <f.icon className="w-3 h-3 shrink-0 mt-0.5 text-sky-500" />
                    <span className="leading-snug break-words text-slate-700">{f.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="mt-auto pt-3 border-t border-sky-100 flex gap-2">
              <a
                href="https://zoomify.zynclo.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white text-xs font-semibold transition-all shadow-sm shadow-sky-200"
              >
                <Globe className="w-3.5 h-3.5" /> Website
              </a>
              <a
                href="https://github.com/Zynclo-Softwares/Zoomify"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-all shadow-sm shadow-slate-300"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}