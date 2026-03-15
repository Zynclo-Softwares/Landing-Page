import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const TECH_ICONS = [
  { label: "JS",  color: "#F7DF1E", bg: "#323330", x: "8%",  y: "12%", rot: -12, dur: 9  },
  { label: "Py",  color: "#3776AB", bg: "#FFD43B", x: "80%", y: "8%",  rot: 10,  dur: 11 },
  { label: "C++", color: "#00599C", bg: "#e8f0fb", x: "90%", y: "55%", rot: 8,   dur: 8  },
  { label: "TS",  color: "#fff",    bg: "#3178C6", x: "5%",  y: "60%", rot: -8,  dur: 10 },
  { label: "⚡",  color: "#646CFF", bg: "#f0f0ff", x: "70%", y: "75%", rot: 5,   dur: 7  },
  { label: "🐍",  color: "#fff",    bg: "#3776AB", x: "18%", y: "80%", rot: -6,  dur: 13 },
  { label: "⚛",  color: "#61DAFB", bg: "#20232a", x: "55%", y: "5%",  rot: 15,  dur: 10 },
  { label: "🦀",  color: "#fff",    bg: "#CE412B", x: "3%",  y: "35%", rot: -10, dur: 8  },
  { label: "Go",  color: "#fff",    bg: "#00ACD7", x: "85%", y: "30%", rot: 7,   dur: 12 },
  { label: "{}",  color: "#E44D26", bg: "#fff3ee", x: "40%", y: "88%", rot: -5,  dur: 9  },
  { label: "#",   color: "#512BD4", bg: "#f0ecff", x: "62%", y: "92%", rot: 12,  dur: 11 },
  { label: "λ",   color: "#fff",    bg: "#764ABC", x: "28%", y: "5%",  rot: -15, dur: 14 },
];

export default function About({ appIconUrl }) {
  return (
    <section id="about" className="relative py-32 sm:py-40 overflow-hidden">

      {/* Tech icons background */}
      {TECH_ICONS.map((t, i) => (
        <motion.div
          key={t.label + i}
          className="absolute pointer-events-none select-none"
          style={{ left: t.x, top: t.y }}
          animate={{ y: [0, -14, 0], rotate: [t.rot, t.rot + 6, t.rot], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: t.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-sm"
            style={{ background: t.bg, color: t.color }}
          >
            {t.label}
          </div>
        </motion.div>
      ))}

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4 block">
            Our Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            What We're Building.
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-6 justify-start">
          <ProjectCard iconUrl={appIconUrl} />
        </div>
      </div>
    </section>
  );
}