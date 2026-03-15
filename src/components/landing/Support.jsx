import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/components/hooks/useMobile";
import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Send, CheckCircle2, Mail, User, MessageSquare } from "lucide-react";

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const successParticles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i / 8) * 360,
  distance: 55 + Math.random() * 35,
}));

/* ── Shooting Stars ── */
function ShootingStars() {
  const stars = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (i / 24) * 100,
    delay: (i % 6) * 0.5,
    duration: 2.5,
    sway: Math.random() * 40 - 20,
  }));

  return (
    <>
      {stars.map((star) => (
        <motion.svg
          key={star.id}
          className="absolute top-0 pointer-events-none"
          style={{ left: `${star.x}%`, width: 80, height: 80, transform: "translateX(-50%)" }}
          viewBox="0 0 80 80"
          initial={{ opacity: 0, y: -100 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, window.innerHeight + 200],
            x: star.sway,
          }}
          transition={{
            duration: 7 + Math.random() * 3,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 0,
            ease: "easeIn",
          }}
          >
          {/* Star core - oval shaped */}
          <ellipse cx="40" cy="40" rx="4" ry="6" fill="#a855f7" opacity="0.95" />

          {/* Trailing glow */}
          <line
            x1="40"
            y1="40"
            x2="40"
            y2="100"
            stroke="url(#starGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />

          <defs>
            <linearGradient id="starGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      ))}
    </>
  );
}

/* ── Sea Creatures ── */
function SeaProps() {
  return (
    <>
      {/* Shark — top left, slow glide */}
      <motion.svg className="absolute top-[6%] left-[2%] opacity-[0.11] pointer-events-none" width="80" height="40" viewBox="0 0 80 40" fill="none"
        animate={{ x: [0, 18, 0], y: [0, -6, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M4 24 Q20 10 50 20 Q65 24 76 20 Q60 28 50 26 Q30 32 4 24Z" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        <path d="M30 20 L36 6 L42 20Z" stroke="#6366f1" strokeWidth="1.2" fill="none" />
        <path d="M70 20 L76 12 L76 28Z" stroke="#6366f1" strokeWidth="1.2" fill="none" />
        <circle cx="18" cy="22" r="1.5" stroke="#6366f1" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Whale — right side */}
      <motion.svg className="absolute top-[18%] right-[2%] opacity-[0.1] pointer-events-none" width="90" height="50" viewBox="0 0 90 50" fill="none"
        animate={{ x: [0, -12, 0], y: [0, 10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M10 28 Q30 10 60 22 Q72 26 80 20 Q72 34 60 30 Q30 40 10 28Z" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
        <path d="M6 28 L2 18 L10 24Z" stroke="#8b5cf6" strokeWidth="1.2" fill="none" />
        <path d="M6 28 L2 38 L10 32Z" stroke="#8b5cf6" strokeWidth="1.2" fill="none" />
        <circle cx="26" cy="24" r="2" stroke="#8b5cf6" strokeWidth="1" fill="none" />
        <path d="M36 14 Q38 8 40 6 Q42 8 44 14" stroke="#a78bfa" strokeWidth="1" fill="none" strokeLinecap="round" />
      </motion.svg>

      {/* Octopus — bottom left */}
      <motion.svg className="absolute bottom-[8%] left-[3%] opacity-[0.1] pointer-events-none" width="60" height="70" viewBox="0 0 60 70" fill="none"
        animate={{ y: [0, -14, 0], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="30" cy="24" rx="18" ry="16" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="20" r="2.5" stroke="#a78bfa" strokeWidth="1" fill="none" />
        <circle cx="38" cy="20" r="2.5" stroke="#a78bfa" strokeWidth="1" fill="none" />
        {[8, 16, 24, 32, 40, 52].map((x, i) => (
          <path key={i} d={`M${x} 38 Q${x + (i % 2 === 0 ? -5 : 5)} 52 ${x + (i % 2 === 0 ? -2 : 2)} 65`} stroke="#6366f1" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        ))}
      </motion.svg>

      {/* Starfish — top right area */}
      <motion.svg className="absolute top-[10%] right-[18%] opacity-[0.1] pointer-events-none" width="44" height="44" viewBox="0 0 44 44" fill="none"
        animate={{ rotate: [0, 30, -30, 0], y: [0, -8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
        {[0, 72, 144, 216, 288].map((angle) => (
          <path key={angle} d={`M22 22 L${22 + 19 * Math.sin((angle * Math.PI) / 180)} ${22 - 19 * Math.cos((angle * Math.PI) / 180)}`} stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        ))}
        <circle cx="22" cy="22" r="5" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
      </motion.svg>

      {/* Jellyfish — center left */}
      <motion.svg className="absolute top-[38%] left-[1%] opacity-[0.1] pointer-events-none" width="44" height="60" viewBox="0 0 44 60" fill="none"
        animate={{ y: [0, -16, 0], scaleX: [1, 1.06, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M4 20 Q4 4 22 4 Q40 4 40 20 Q40 30 22 30 Q4 30 4 20Z" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
        {[10, 16, 22, 28, 34].map((x, i) => (
          <path key={i} d={`M${x} 30 Q${x + (i % 2 === 0 ? 4 : -4)} 44 ${x} 58`} stroke="#a78bfa" strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="2 2" />
        ))}
      </motion.svg>

      {/* Normal fish — top center */}
      <motion.svg className="absolute top-[5%] left-[40%] opacity-[0.1] pointer-events-none" width="50" height="30" viewBox="0 0 50 30" fill="none"
        animate={{ x: [0, 15, 0], y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="22" cy="15" rx="16" ry="9" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <path d="M38 15 L50 5 L50 25Z" stroke="#06b6d4" strokeWidth="1.2" fill="none" />
        <circle cx="12" cy="13" r="2" stroke="#06b6d4" strokeWidth="1" fill="none" />
        <path d="M16 12 Q22 10 26 12" stroke="#06b6d4" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M16 17 Q22 19 26 17" stroke="#06b6d4" strokeWidth="0.8" strokeLinecap="round" />
      </motion.svg>

      {/* Small fish 2 — middle right */}
      <motion.svg className="absolute top-[52%] right-[5%] opacity-[0.09] pointer-events-none" width="36" height="22" viewBox="0 0 36 22" fill="none"
        animate={{ x: [0, -10, 0], y: [0, 6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="18" cy="11" rx="12" ry="7" stroke="#0ea5e9" strokeWidth="1.3" fill="none" />
        <path d="M6 11 L0 3 L0 19Z" stroke="#0ea5e9" strokeWidth="1.2" fill="none" />
        <circle cx="26" cy="9" r="1.5" stroke="#0ea5e9" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Seahorse — right center */}
      <motion.svg className="absolute top-[30%] right-[3%] opacity-[0.1] pointer-events-none" width="30" height="60" viewBox="0 0 30 60" fill="none"
        animate={{ rotate: [-8, 8, -8], y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M15 8 Q22 8 22 14 Q22 20 15 22 Q8 24 8 30 Q8 40 12 50 Q14 56 15 58" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M15 58 Q18 54 22 56" stroke="#10b981" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <circle cx="15" cy="8" r="5" stroke="#10b981" strokeWidth="1.3" fill="none" />
        <circle cx="12" cy="6" r="1.2" stroke="#10b981" strokeWidth="1" fill="none" />
        <path d="M20 8 L26 4" stroke="#10b981" strokeWidth="1" strokeLinecap="round" />
        {[22, 26, 30, 34, 38].map((y, i) => (
          <path key={i} d={`M${i % 2 === 0 ? 14 : 16} ${y} L${i % 2 === 0 ? 22 : 6} ${y + 1}`} stroke="#10b981" strokeWidth="0.8" strokeLinecap="round" />
        ))}
      </motion.svg>

      {/* Crab — bottom right */}
      <motion.svg className="absolute bottom-[6%] right-[8%] opacity-[0.1] pointer-events-none" width="60" height="40" viewBox="0 0 60 40" fill="none"
        animate={{ x: [0, 8, -8, 0], y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="30" cy="24" rx="14" ry="10" stroke="#ef4444" strokeWidth="1.5" fill="none" />
        <path d="M16 20 L6 12 M16 24 L4 26 M16 28 L8 36" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M44 20 L54 12 M44 24 L56 26 M44 28 L52 36" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M24 16 L22 8 M36 16 L38 8" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="23" cy="21" r="2" stroke="#ef4444" strokeWidth="1" fill="none" />
        <circle cx="37" cy="21" r="2" stroke="#ef4444" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Lobster — bottom center */}
      <motion.svg className="absolute bottom-[12%] left-[35%] opacity-[0.09] pointer-events-none" width="40" height="70" viewBox="0 0 40 70" fill="none"
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="20" cy="30" rx="10" ry="18" stroke="#f97316" strokeWidth="1.5" fill="none" />
        <path d="M10 20 L2 10 M10 16 L4 8" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M30 20 L38 10 M30 16 L36 8" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
        {[38, 44, 50, 56].map((y, i) => (
          <path key={i} d={`M${i % 2 === 0 ? 12 : 28} ${y} L${i % 2 === 0 ? 4 : 36} ${y + 3}`} stroke="#f97316" strokeWidth="1" strokeLinecap="round" />
        ))}
        <path d="M14 62 L10 70 M26 62 L30 70" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="15" cy="22" r="1.5" stroke="#f97316" strokeWidth="1" fill="none" />
        <circle cx="25" cy="22" r="1.5" stroke="#f97316" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Shrimp — left top-mid */}
      <motion.svg className="absolute top-[25%] left-[5%] opacity-[0.09] pointer-events-none" width="30" height="50" viewBox="0 0 30 50" fill="none"
        animate={{ y: [0, -12, 0], rotate: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M15 6 Q22 12 20 22 Q18 32 22 42" stroke="#f43f5e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M22 42 L16 48 M22 42 L28 48" stroke="#f43f5e" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="15" cy="6" r="4" stroke="#f43f5e" strokeWidth="1.3" fill="none" />
        <path d="M11 4 L4 2 M11 6 L4 8" stroke="#f43f5e" strokeWidth="1" strokeLinecap="round" />
        {[16, 20, 24, 28, 32].map((y, i) => (
          <path key={i} d={`M${i % 2 === 0 ? 18 : 22} ${y} L${i % 2 === 0 ? 26 : 10} ${y + 2}`} stroke="#f43f5e" strokeWidth="0.8" strokeLinecap="round" />
        ))}
      </motion.svg>

      {/* Dolphin — top center-right */}
      <motion.svg className="absolute top-[14%] left-[55%] opacity-[0.1] pointer-events-none" width="70" height="40" viewBox="0 0 70 40" fill="none"
        animate={{ x: [0, 12, 0], y: [0, -8, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M8 22 Q20 6 44 18 Q56 22 62 16 Q56 28 44 24 Q20 32 8 22Z" stroke="#0ea5e9" strokeWidth="1.5" fill="none" />
        <path d="M62 16 L70 8 L70 24Z" stroke="#0ea5e9" strokeWidth="1.2" fill="none" />
        <path d="M34 18 L36 6 L44 16" stroke="#0ea5e9" strokeWidth="1.2" fill="none" />
        <circle cx="20" cy="20" r="2" stroke="#0ea5e9" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Bubble cluster — right bottom area */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cyan-400/30 pointer-events-none"
          style={{
            right: `${8 + (i % 3) * 4}%`,
            bottom: `${25 + Math.floor(i / 3) * 8}%`,
            width: 6 + i * 2,
            height: 6 + i * 2,
          }}
          animate={{ y: [0, -(20 + i * 8), 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4 + i, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Seaweed — far left */}
      <motion.svg className="absolute bottom-0 left-[8%] opacity-[0.08] pointer-events-none" width="20" height="80" viewBox="0 0 20 80" fill="none"
        animate={{ scaleX: [1, 1.3, 0.7, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M10 80 Q2 60 10 50 Q18 40 10 30 Q2 20 10 10 Q14 4 10 0" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transformOrigin: "10px 80px" }} />
      </motion.svg>

      {/* Seaweed 2 — far right */}
      <motion.svg className="absolute bottom-0 right-[10%] opacity-[0.08] pointer-events-none" width="20" height="60" viewBox="0 0 20 60" fill="none"
        animate={{ scaleX: [1, 0.7, 1.3, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M10 60 Q18 44 10 34 Q2 24 10 14 Q14 8 10 0" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transformOrigin: "10px 60px" }} />
      </motion.svg>
    </>
  );
}

export default function Support() {
  const isMobile = useMobile();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Contact.create(form);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="support" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Animated background orbs — desktop only */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)", left: "-10%", top: "10%" }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", right: "-5%", bottom: "10%" }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <>
        <ShootingStars />
        <SeaProps />
      </>

      <div className="relative max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <motion.span
            className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Support
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Get In Touch.
          </h2>
          <motion.div
            className="h-1.5 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 opacity-60 mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
          />
          <p className="text-lg text-slate-500 font-light">
            Have questions about our apps? Reach out and we'll get back to you.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl blur-2xl"
            style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.1), rgba(124,58,237,0.08))" }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 sm:p-10 overflow-hidden">

            {/* Animated top accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)" }}
              animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Corner bracket — top left */}
            <motion.svg
              className="absolute top-4 left-4 opacity-[0.12]"
              width="20" height="20" viewBox="0 0 20 20"
              animate={{ opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <path d="M18 2 H2 V18" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>

            {/* Corner bracket — bottom right */}
            <motion.svg
              className="absolute bottom-4 right-4 opacity-[0.12]"
              width="20" height="20" viewBox="0 0 20 20"
              animate={{ opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity }}
            >
              <path d="M2 18 H18 V2" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>

            {/* Subtle internal animated grid lines */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              animate={{ opacity: [0.02, 0.05, 0.02] }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-5"
                >
                  <div className="relative w-20 h-20">
                    {successParticles.map((p) => (
                      <motion.div
                        key={p.id}
                        className="absolute w-2 h-2 rounded-full"
                        style={{ top: "50%", left: "50%", background: p.id % 2 === 0 ? "#6366f1" : "#8b5cf6" }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: Math.cos((p.angle * Math.PI) / 180) * p.distance, y: Math.sin((p.angle * Math.PI) / 180) * p.distance, opacity: 0, scale: 0 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                      />
                    ))}
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-500/30"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-9 h-9 text-white" />
                    </motion.div>
                  </div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Message sent!</h3>
                    <p className="text-slate-500 font-light">We'll get back to you at <span className="text-indigo-600 font-medium">{form.email}</span> shortly.</p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <motion.div custom={0} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <User className="w-3 h-3" /> Name
                      </label>
                      <motion.input
                        name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        whileFocus={{ scale: 1.015, boxShadow: "0 0 0 3px rgba(99,102,241,0.12)" }}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/10 transition-all"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div custom={1} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Email
                      </label>
                      <motion.input
                        name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        placeholder="you@example.com"
                        whileFocus={{ scale: 1.015, boxShadow: "0 0 0 3px rgba(99,102,241,0.12)" }}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/10 transition-all"
                      />
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div custom={2} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" /> Message
                    </label>
                    <motion.textarea
                      name="message" required
                      value={form.message} onChange={handleChange}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      placeholder="How can we help?"
                      rows={5}
                      whileFocus={{ scale: 1.008, boxShadow: "0 0 0 3px rgba(99,102,241,0.12)" }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/10 transition-all resize-none"
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div custom={3} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full relative flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-900 text-white text-sm font-medium tracking-wide overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/10"
                    >
                      {/* Animated shimmer sweep on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      {/* Shimmer highlight */}
                      <motion.div
                        className="absolute top-0 left-0 h-full w-1/3 bg-white/10 skew-x-[-20deg] pointer-events-none"
                        animate={{ x: ["-200%", "400%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      />
                      <span className="relative flex items-center gap-2">
                        {loading ? (
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            Send Message
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Send className="w-4 h-4" />
                            </motion.span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}