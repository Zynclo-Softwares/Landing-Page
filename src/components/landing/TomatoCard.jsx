import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Globe, Heart, Users, Calendar, Shapes, ListOrdered, CloudSun } from "lucide-react";

const features = [
  { icon: Shapes, label: "Count the Tomatoes & Sort It Out — counting and sorting" },
  { icon: ListOrdered, label: "My Day in Order — everyday routines in pictures" },
  { icon: Calendar, label: "Where Is Today? — find today on the calendar" },
  { icon: CloudSun, label: "What's the Weather? — stamp today's weather" },
  { icon: Users, label: "A profile per child, with progress saved for every game" },
];

export default function TomatoCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
          className="absolute inset-0 rounded-3xl overflow-hidden border border-rose-200/80 shadow-xl shadow-rose-100"
        >
          <div className="relative h-full flex flex-col items-center justify-center px-8 py-10 overflow-hidden bg-white">

            {/* Beta tag */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-400 to-red-500 text-white text-[10px] font-bold tracking-widest uppercase shadow-md shadow-rose-200">
                New
              </span>
            </div>

            {/* Blobs */}
            <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(circle, #ffe4e6, transparent 70%)" }} />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, #fee2e2, transparent 70%)" }} />

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, #f43f5e 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />

            {/* Top accent line */}
            <motion.div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #f43f5e, #ef4444, transparent)" }}
              animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* App icon */}
            <div className="relative z-10 mb-4 shrink-0">
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-40"
                style={{ background: "radial-gradient(circle, #fda4af, transparent 70%)", margin: "-10px" }}
                animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-24 h-24 rounded-3xl overflow-hidden ring-2 ring-rose-200 shadow-lg shadow-rose-100 relative bg-white flex items-center justify-center">
                <span className="text-6xl leading-none" role="img" aria-label="tomato">🍅</span>
              </div>
            </div>

            <h3 className="text-3xl font-bold tracking-tight mb-2 relative z-10 text-slate-900">
              Tomato Playroom
            </h3>

            <div className="flex items-center gap-2 mb-3 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-600">
                <Heart className="w-3 h-3" /> For Kids
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500">
                <Globe className="w-3 h-3" /> Web App
              </span>
            </div>

            <p className="text-slate-700 text-sm text-center font-light leading-relaxed relative z-10">
              Cheerful, calm mini games designed for autistic children to play and learn — with a profile for every child and progress saved as they go.
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", opacity: flipped ? 1 : 0 }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-rose-200/80 shadow-xl shadow-rose-100 bg-white flex flex-col"
        >
          <motion.div className="h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #f43f5e, #ef4444, transparent)" }}
            animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #ffe4e6, transparent 70%)" }} />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fee2e2, transparent 70%)" }} />

          <div className="flex-1 px-6 py-5 flex flex-col relative z-10">
            <div className="text-center mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">Features</p>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-rose-400 via-red-400 to-rose-300 mx-auto"></div>
            </div>

            <div className="flex-1 space-y-3 mb-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-2 text-xs">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  </motion.div>
                  <div className="flex items-start gap-1.5 flex-1 min-w-0">
                    <f.icon className="w-3 h-3 shrink-0 mt-0.5 text-rose-500" />
                    <span className="leading-snug break-words text-slate-700">{f.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Website link */}
            <div className="mt-auto pt-3 border-t border-rose-100 text-center">
              <a
                href="https://tomato.zynclo.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600 text-white text-xs font-semibold transition-all shadow-sm shadow-rose-200"
              >
                <Globe className="w-3.5 h-3.5" /> Website
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}