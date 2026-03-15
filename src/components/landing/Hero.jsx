import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";


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

function RocketLaunch() {
  const [active, setActive] = useState(false);
  const [nitro, setNitro]   = useState(false);
  const [gone, setGone]     = useState(false);

  // Total ~10s. Entry delay: 1200ms.
  // Nitro fires at closest point: 1200 + 10000*0.70 = 8200ms
  useEffect(() => {
    const t1 = setTimeout(() => setActive(true), 1200);
    const t2 = setTimeout(() => setNitro(true), 8200);
    const t3 = setTimeout(() => setGone(true), 12000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (gone) return null;

  // Keyframes: rocket travels top-right → center-left (closest) → bottom-left (away)
  // left/top are absolute % positions within the hero section
  // scale simulates depth (small=far, big=close)
  // rotate: nose faces direction of travel (~215° = pointing down-left)
  const lv = ["87%","74%","60%","46%","33%","22%","12%","3%","-6%"];
  const tv = [ "5%","14%","24%","36%","50%","62%","74%","87%","102%"];
  const sv = [0.04, 0.10, 0.22, 0.44, 0.90, 0.46, 0.18, 0.07, 0.02];
  const rv = [ 212,  214,  217,  220,  222,  224,  226,  228,  230];
  const ov = [   0,    1,    1,    1,    1,    1,    1,  0.6,    0];
  // 9 keyframes → 8 segments
  // Times: slow in first half (approach), fast in second half (exit after nitro)
  const tv2= [0, 0.10, 0.21, 0.34, 0.50, 0.62, 0.73, 0.85, 1.0];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {active && (
          <motion.div
            key="rocket"
            className="absolute"
            style={{ originX: 0.5, originY: 0.5 }}
            initial={{ left: lv[0], top: tv[0], scale: sv[0], rotate: rv[0], opacity: 0 }}
            animate={{ left: lv, top: tv, scale: sv, rotate: rv, opacity: ov }}
            transition={{
              duration: 10.0,
              times: tv2,
              // position ease: slow approach (ease-in), fast exit after nitro
              ease: ["easeIn","easeIn","easeIn","easeIn",[0.3,0,0.7,1],[0.5,0,1,1],[0.6,0,1,1],"easeOut"],
              scale: {
                times: tv2,
                ease: ["easeIn","easeIn","easeIn","easeIn",[0.2,0,0.5,1],[0.5,0,1,1],[0.7,0,1,1],"easeOut"],
              },
            }}
          >
            {/* Engine glow trail — elongates as rocket gets closer */}
            <motion.div
              className="absolute"
              style={{
                width: 14, height: 80,
                background: "linear-gradient(to bottom, rgba(242,98,34,0.95), rgba(251,191,36,0.55), transparent)",
                filter: "blur(8px)",
                left: 19, top: 78,
                borderRadius: "50%",
                transformOrigin: "top center",
              }}
              animate={{ scaleY: [1, 2.3, 0.4, 2.0, 1], opacity: [0.8, 1, 0.15, 1, 0.8] }}
              transition={{ duration: 0.14, repeat: Infinity }}
            />
            {/* Outer glow rim on rocket body */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 52, height: 90,
                background: "radial-gradient(ellipse, rgba(242,98,34,0.18) 0%, transparent 70%)",
                filter: "blur(12px)",
                left: 0, top: 0,
              }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />

            {/* Rocket SVG */}
            <svg width="52" height="90" viewBox="0 0 52 90" fill="none">
              <ellipse cx="26" cy="40" rx="12" ry="28" fill="url(#rkB)" />
              <path d="M14 22 Q26 0 38 22Z" fill="url(#rkN)" />
              <circle cx="26" cy="36" r="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
              <circle cx="26" cy="36" r="3" fill="url(#rkW)" />
              <path d="M14 56 L5 73 L14 68Z" fill="#1e293b" />
              <path d="M38 56 L47 73 L38 68Z" fill="#1e293b" />
              <path d="M18 68 L26 79 L34 68Z" fill="#fbbf24" opacity="0.9" />
              <motion.ellipse cx="26" cy="83" rx="7" ry="13" fill="url(#rkF)"
                animate={{ ry: [13, 22, 6, 20, 13] }}
                transition={{ duration: 0.15, repeat: Infinity }}
              />
              <motion.ellipse cx="26" cy="84" rx="4" ry="8" fill="#fef3c7"
                animate={{ ry: [8, 15, 3, 13, 8], opacity: [0.7, 1, 0.15, 0.95, 0.7] }}
                transition={{ duration: 0.12, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="rkB" x1="14" y1="12" x2="38" y2="68" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#334155" /><stop offset="1" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="rkN" x1="14" y1="22" x2="38" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#475569" /><stop offset="1" stopColor="#0f172a" />
                </linearGradient>
                <radialGradient id="rkW" cx="50%" cy="50%" r="50%">
                  <stop stopColor="#bae6fd" /><stop offset="1" stopColor="#64748b" />
                </radialGradient>
                <linearGradient id="rkF" x1="19" y1="72" x2="33" y2="96" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f26222" />
                  <stop offset="0.5" stopColor="#fbbf24" />
                  <stop offset="1" stopColor="#fde68a" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nitro burst — fires at closest point (33% x, 50% y) */}
      <AnimatePresence>
        {nitro && (
          <>
            {/* Lens flare flash */}
            <motion.div
              className="absolute rounded-full"
              style={{ left: "33%", top: "50%", marginLeft: -40, marginTop: -40, width: 80, height: 80,
                background: "radial-gradient(circle, rgba(242,98,34,0.9) 0%, rgba(251,191,36,0.4) 40%, transparent 70%)",
                filter: "blur(4px)" }}
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            {/* Shockwave rings */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: "33%", top: "50%",
                  marginLeft: -5, marginTop: -5,
                  width: 10, height: 10,
                  border: `1.5px solid ${i % 2 === 0 ? "rgba(242,98,34,0.7)" : "rgba(251,191,36,0.5)"}`,
                }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: 18 + i * 9, opacity: 0 }}
                transition={{ duration: 1.3, delay: i * 0.14, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

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
      <RocketLaunch />

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