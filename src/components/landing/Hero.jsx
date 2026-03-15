import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";


const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 5,
}));

const WORDS = ["Software", "That"];
const GRADIENT_WORD = "Surprises.";

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-500"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.12,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 15 : -15, 0],
            opacity: [0.05, 0.2, 0.05],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const wordVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.15 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};



export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#fafafa]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orb 1 — main */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)",
          top: "10%", left: "5%",
        }}
        animate={{ x: [0, 80, -30, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — top right */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          top: "-5%", right: "-5%",
        }}
        animate={{ x: [0, -50, 20, 0], y: [0, 60, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 3 — bottom */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)",
          bottom: "5%", right: "20%",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating ring decorations */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border border-indigo-300/10"
        style={{ top: "15%", right: "10%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-violet-300/10"
        style={{ bottom: "20%", left: "8%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <ParticleField />

      {/* ── SPACE OBJECTS ── */}

      {/* Rocket — top right */}
      <motion.svg className="absolute top-[8%] right-[7%] opacity-[0.13] pointer-events-none" width="36" height="60" viewBox="0 0 36 60" fill="none"
        animate={{ y: [0, -18, 0], rotate: [-8, 8, -8] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="18" cy="28" rx="8" ry="18" stroke="#6366f1" strokeWidth="1.5" />
        <path d="M10 16 Q18 2 26 16Z" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="26" r="4" stroke="#6366f1" strokeWidth="1.2" fill="none" />
        <path d="M10 38 L4 50 L10 46Z" stroke="#6366f1" strokeWidth="1.2" fill="none" />
        <path d="M26 38 L32 50 L26 46Z" stroke="#6366f1" strokeWidth="1.2" fill="none" />
        <line x1="18" y1="46" x2="18" y2="56" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      </motion.svg>

      {/* Planet with rings — left center */}
      <motion.svg className="absolute top-[38%] left-[3%] opacity-[0.11] pointer-events-none" width="64" height="40" viewBox="0 0 64 40" fill="none"
        animate={{ y: [0, -14, 0], x: [0, 6, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="32" cy="20" rx="14" ry="14" stroke="#8b5cf6" strokeWidth="1.5" />
        <ellipse cx="32" cy="20" rx="30" ry="8" stroke="#6366f1" strokeWidth="1.2" />
        <ellipse cx="32" cy="20" rx="22" ry="5.5" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
      </motion.svg>

      {/* Small planet — top left */}
      <motion.svg className="absolute top-[22%] left-[15%] opacity-[0.1] pointer-events-none" width="34" height="34" viewBox="0 0 34 34" fill="none"
        animate={{ y: [0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx="17" cy="17" r="13" stroke="#6366f1" strokeWidth="1.5" />
        <path d="M6 12 Q17 8 28 14" stroke="#a78bfa" strokeWidth="1" strokeLinecap="round" />
        <path d="M5 18 Q17 14 29 20" stroke="#a78bfa" strokeWidth="1" strokeLinecap="round" />
        <path d="M7 24 Q17 20 27 25" stroke="#a78bfa" strokeWidth="1" strokeLinecap="round" />
      </motion.svg>

      {/* Satellite — top center */}
      <motion.svg className="absolute top-[12%] left-[42%] opacity-[0.11] pointer-events-none" width="56" height="24" viewBox="0 0 56 24" fill="none"
        animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        <rect x="20" y="8" width="16" height="8" rx="2" stroke="#6366f1" strokeWidth="1.5" />
        <rect x="2" y="9" width="16" height="6" rx="1" stroke="#8b5cf6" strokeWidth="1.2" />
        <rect x="38" y="9" width="16" height="6" rx="1" stroke="#8b5cf6" strokeWidth="1.2" />
        <line x1="18" y1="12" x2="20" y2="12" stroke="#6366f1" strokeWidth="1.5" />
        <line x1="36" y1="12" x2="38" y2="12" stroke="#6366f1" strokeWidth="1.5" />
        <circle cx="28" cy="12" r="2" stroke="#a78bfa" strokeWidth="1" />
      </motion.svg>

      {/* UFO — bottom center-right */}
      <motion.svg className="absolute bottom-[28%] right-[20%] opacity-[0.1] pointer-events-none" width="52" height="30" viewBox="0 0 52 30" fill="none"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="26" cy="20" rx="24" ry="8" stroke="#6366f1" strokeWidth="1.5" />
        <ellipse cx="26" cy="16" rx="12" ry="10" stroke="#8b5cf6" strokeWidth="1.5" />
        <ellipse cx="26" cy="21" rx="8" ry="3" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" />
        {[10, 20, 30, 40].map((x) => (
          <line key={x} x1={x} y1="26" x2={x - 2} y2="30" stroke="#6366f1" strokeWidth="1" strokeLinecap="round" />
        ))}
      </motion.svg>

      {/* Shooting star — top right area */}
      <motion.svg className="absolute top-[5%] right-[25%] opacity-[0.12] pointer-events-none" width="60" height="14" viewBox="0 0 60 14" fill="none"
        animate={{ x: [0, 20, 0], opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx="52" cy="7" r="3" stroke="#a78bfa" strokeWidth="1.5" />
        <line x1="48" y1="7" x2="2" y2="7" stroke="url(#shootGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="shootGrad" x1="48" y1="7" x2="2" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Space shuttle — bottom left */}
      <motion.svg className="absolute bottom-[15%] left-[5%] opacity-[0.1] pointer-events-none" width="44" height="50" viewBox="0 0 44 50" fill="none"
        animate={{ y: [0, -16, 0], rotate: [5, -5, 5] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M22 2 L30 18 L30 36 L22 42 L14 36 L14 18Z" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        <path d="M14 22 L4 30 L14 32Z" stroke="#8b5cf6" strokeWidth="1.2" fill="none" />
        <path d="M30 22 L40 30 L30 32Z" stroke="#8b5cf6" strokeWidth="1.2" fill="none" />
        <circle cx="22" cy="20" r="4" stroke="#a78bfa" strokeWidth="1.2" fill="none" />
        <line x1="22" y1="42" x2="22" y2="50" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      </motion.svg>

      {/* Asteroid — right side */}
      <motion.svg className="absolute top-[60%] right-[4%] opacity-[0.09] pointer-events-none" width="38" height="32" viewBox="0 0 38 32" fill="none"
        animate={{ rotate: [0, 360], y: [0, -10, 0] }} transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}>
        <path d="M8 16 Q4 6 14 4 Q22 2 30 8 Q38 14 34 22 Q30 30 20 30 Q10 30 8 22 Z" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
        <circle cx="14" cy="12" r="2" stroke="#6366f1" strokeWidth="1" fill="none" />
        <circle cx="24" cy="20" r="1.5" stroke="#6366f1" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Moon — bottom right */}
      <motion.svg className="absolute bottom-[10%] right-[10%] opacity-[0.1] pointer-events-none" width="36" height="36" viewBox="0 0 36 36" fill="none"
        animate={{ y: [0, -12, 0], rotate: [-10, 10, -10] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M20 4 A14 14 0 1 0 20 32 A10 10 0 1 1 20 4Z" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
      </motion.svg>

      {/* Comet — center top */}
      <motion.svg className="absolute top-[30%] left-[28%] opacity-[0.08] pointer-events-none" width="50" height="18" viewBox="0 0 50 18" fill="none"
        animate={{ x: [0, -15, 0], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx="42" cy="9" r="5" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        <path d="M37 9 L2 9" stroke="url(#cometGrad)" strokeWidth="2" strokeLinecap="round" />
        <path d="M37 7 L10 4" stroke="url(#cometGrad2)" strokeWidth="1" strokeLinecap="round" />
        <path d="M37 11 L10 14" stroke="url(#cometGrad2)" strokeWidth="1" strokeLinecap="round" />
        <defs>
          <linearGradient id="cometGrad" x1="37" y1="9" x2="2" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" /><stop offset="1" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cometGrad2" x1="37" y1="9" x2="10" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" stopOpacity="0.5" /><stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Small satellite dish — bottom center-left */}
      <motion.svg className="absolute bottom-[32%] left-[22%] opacity-[0.09] pointer-events-none" width="32" height="32" viewBox="0 0 32 32" fill="none"
        animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M16 28 L16 18" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 28 L24 28" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 18 Q16 6 26 18" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M9 18 Q16 10 23 18" stroke="#a78bfa" strokeWidth="1" fill="none" strokeLinecap="round" />
        <circle cx="16" cy="18" r="2" stroke="#6366f1" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Orbiting dots (mini solar system) — right upper */}
      <motion.svg className="absolute top-[28%] right-[16%] opacity-[0.09] pointer-events-none" width="50" height="50" viewBox="0 0 50 50" fill="none"
        animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
        <circle cx="25" cy="25" r="5" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
        <ellipse cx="25" cy="25" rx="20" ry="8" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="45" cy="25" r="2.5" stroke="#a78bfa" strokeWidth="1" fill="none" />
        <ellipse cx="25" cy="25" rx="14" ry="5" stroke="#8b5cf6" strokeWidth="0.8" strokeDasharray="2 3" />
        <circle cx="39" cy="25" r="1.5" stroke="#6366f1" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Floating geometric props */}

      {/* Top-left triangle */}
      <motion.svg
        className="absolute top-[12%] left-[8%] opacity-[0.12] pointer-events-none"
        width="40" height="40" viewBox="0 0 40 40"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.12, rotate: 360, y: [0, -18, 0] }}
        transition={{ rotate: { duration: 28, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <polygon points="20,2 38,36 2,36" fill="none" stroke="#6366f1" strokeWidth="2" />
      </motion.svg>

      {/* Top-right diamond */}
      <motion.svg
        className="absolute top-[18%] right-[12%] opacity-[0.1] pointer-events-none"
        width="32" height="32" viewBox="0 0 32 32"
        animate={{ rotate: [0, 180, 360], x: [0, 10, 0], y: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="8" y="8" width="16" height="16" fill="none" stroke="#8b5cf6" strokeWidth="2" transform="rotate(45 16 16)" />
      </motion.svg>

      {/* Left mid — dotted circle */}
      <motion.svg
        className="absolute top-[45%] left-[4%] opacity-[0.08] pointer-events-none"
        width="80" height="80" viewBox="0 0 80 80"
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="40" cy="40" r="35" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5 6" />
      </motion.svg>

      {/* Right mid — plus sign */}
      <motion.svg
        className="absolute top-[50%] right-[6%] opacity-[0.1] pointer-events-none"
        width="28" height="28" viewBox="0 0 28 28"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="14" y1="2" x2="14" y2="26" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="14" x2="26" y2="14" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>

      {/* Bottom-left hexagon */}
      <motion.svg
        className="absolute bottom-[18%] left-[10%] opacity-[0.08] pointer-events-none"
        width="50" height="50" viewBox="0 0 50 50"
        animate={{ rotate: [0, -360], y: [0, -15, 0] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
      >
        <polygon points="25,3 46,14 46,36 25,47 4,36 4,14" fill="none" stroke="#6366f1" strokeWidth="1.5" />
      </motion.svg>

      {/* Bottom-right small square */}
      <motion.svg
        className="absolute bottom-[22%] right-[14%] opacity-[0.09] pointer-events-none"
        width="24" height="24" viewBox="0 0 24 24"
        animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] }}
        transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <rect x="3" y="3" width="18" height="18" fill="none" stroke="#8b5cf6" strokeWidth="2" rx="2" />
      </motion.svg>

      {/* Floating horizontal line — top center */}
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent pointer-events-none"
        animate={{ scaleX: [1, 1.6, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating dot cluster — right side */}
      <div className="absolute right-[9%] top-[35%] pointer-events-none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-violet-400"
            style={{ left: (i % 3) * 10, top: Math.floor(i / 3) * 10 }}
            animate={{ opacity: [0.1, 0.35, 0.1], scale: [1, 1.4, 1] }}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Floating dot cluster — left side */}
      <div className="absolute left-[7%] top-[30%] pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400"
            style={{ left: (i % 2) * 12, top: Math.floor(i / 2) * 12 }}
            animate={{ opacity: [0.08, 0.25, 0.08], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm mb-10"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Building the future
          </span>
        </motion.div>

        {/* Headline — 3D word reveal */}
        <div className="perspective-[800px]">
          <motion.div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[0.95] mb-2"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden">
              {WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  variants={wordVariants}
                  custom={i}
                  style={{ display: "inline-block", transformOrigin: "bottom center" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden mt-1">
              <motion.span
                className="inline-block bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-600 bg-clip-text text-transparent"
                variants={wordVariants}
                custom={WORDS.length}
                style={{ display: "inline-block", transformOrigin: "bottom center" }}
              >
                {GRADIENT_WORD}
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Zynclo builds creative, one-of-a-kind apps that actually make a difference.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-12 relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Pulsing ring behind button */}
          <motion.div
            className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white text-sm font-medium tracking-wide shadow-xl shadow-indigo-500/10 transition-colors duration-300 hover:bg-slate-800"
          >
            See Our Work
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-slate-300 flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-slate-400"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}