import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMobile } from "@/components/hooks/useMobile";


const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
}));

const STARS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
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
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.1, willChange: "transform, opacity" }}
          animate={{ y: [0, -25, 0], opacity: [0.05, 0.18, 0.05] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Hero() {
  const isMobile = useMobile();

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#fafafa]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbs — static on mobile, animated on desktop */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)", top: "10%", left: "5%" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", top: "-5%", right: "-5%" }}
      />

      {/* Desktop-only decorations */}
      {!isMobile && (
        <>
          <ParticleField />

          <motion.div className="absolute w-64 h-64 rounded-full border border-indigo-300/10" style={{ top: "15%", right: "10%" }}
            animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute w-40 h-40 rounded-full border border-violet-300/10" style={{ bottom: "20%", left: "8%" }}
            animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />

          {/* Rocket */}
          <motion.svg className="absolute top-[8%] right-[7%] opacity-[0.13] pointer-events-none" width="36" height="60" viewBox="0 0 36 60" fill="none"
            animate={{ y: [0, -18, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
            <ellipse cx="18" cy="28" rx="8" ry="18" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M10 16 Q18 2 26 16Z" stroke="#6366f1" strokeWidth="1.5" fill="none" />
            <circle cx="18" cy="26" r="4" stroke="#6366f1" strokeWidth="1.2" fill="none" />
            <path d="M10 38 L4 50 L10 46Z" stroke="#6366f1" strokeWidth="1.2" fill="none" />
            <path d="M26 38 L32 50 L26 46Z" stroke="#6366f1" strokeWidth="1.2" fill="none" />
          </motion.svg>

          {/* Planet */}
          <motion.svg className="absolute top-[38%] left-[3%] opacity-[0.11] pointer-events-none" width="64" height="40" viewBox="0 0 64 40" fill="none"
            animate={{ y: [0, -12, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}>
            <ellipse cx="32" cy="20" rx="14" ry="14" stroke="#8b5cf6" strokeWidth="1.5" />
            <ellipse cx="32" cy="20" rx="30" ry="8" stroke="#6366f1" strokeWidth="1.2" />
          </motion.svg>

          {/* Moon */}
          <motion.svg className="absolute bottom-[10%] right-[10%] opacity-[0.1] pointer-events-none" width="36" height="36" viewBox="0 0 36 36" fill="none"
            animate={{ y: [0, -10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}>
            <path d="M20 4 A14 14 0 1 0 20 32 A10 10 0 1 1 20 4Z" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
          </motion.svg>

          {/* UFO */}
          <motion.svg className="absolute bottom-[28%] right-[20%] opacity-[0.1] pointer-events-none" width="52" height="30" viewBox="0 0 52 30" fill="none"
            animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <ellipse cx="26" cy="20" rx="24" ry="8" stroke="#6366f1" strokeWidth="1.5" />
            <ellipse cx="26" cy="16" rx="12" ry="10" stroke="#8b5cf6" strokeWidth="1.5" />
          </motion.svg>

          {/* Geometric shapes */}
          <motion.svg className="absolute top-[12%] left-[8%] opacity-[0.1] pointer-events-none" width="40" height="40" viewBox="0 0 40 40"
            animate={{ rotate: 360, y: [0, -15, 0] }}
            transition={{ rotate: { duration: 28, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}>
            <polygon points="20,2 38,36 2,36" fill="none" stroke="#6366f1" strokeWidth="2" />
          </motion.svg>

          <motion.svg className="absolute top-[45%] left-[4%] opacity-[0.08] pointer-events-none" width="80" height="80" viewBox="0 0 80 80"
            animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
            <circle cx="40" cy="40" r="35" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5 6" />
          </motion.svg>

          <motion.svg className="absolute bottom-[18%] left-[10%] opacity-[0.08] pointer-events-none" width="50" height="50" viewBox="0 0 50 50"
            animate={{ rotate: [0, -360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            <polygon points="25,3 46,14 46,36 25,47 4,36 4,14" fill="none" stroke="#6366f1" strokeWidth="1.5" />
          </motion.svg>

          {/* Dot clusters */}
          <div className="absolute right-[9%] top-[35%] pointer-events-none">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-violet-400"
                style={{ left: (i % 3) * 10, top: Math.floor(i / 3) * 10 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }} />
            ))}
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Astronaut decoration */}
        <div className="absolute -left-20 top-0 opacity-10 pointer-events-none hidden lg:block">
          <svg width="100" height="140" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Helmet */}
            <circle cx="50" cy="35" r="25" stroke="#6366f1" strokeWidth="2" fill="none"/>
            {/* Helmet shine */}
            <ellipse cx="40" cy="25" rx="8" ry="10" fill="#6366f1" opacity="0.2"/>
            {/* Body */}
            <rect x="35" y="58" width="30" height="35" stroke="#6366f1" strokeWidth="2" fill="none" rx="4"/>
            {/* Arms */}
            <line x1="35" y1="65" x2="15" y2="55" stroke="#6366f1" strokeWidth="2"/>
            <line x1="65" y1="65" x2="85" y2="55" stroke="#6366f1" strokeWidth="2"/>
            {/* Gloves */}
            <circle cx="15" cy="55" r="4" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <circle cx="85" cy="55" r="4" stroke="#6366f1" strokeWidth="2" fill="none"/>
            {/* Legs */}
            <line x1="40" y1="93" x2="40" y2="120" stroke="#6366f1" strokeWidth="2"/>
            <line x1="60" y1="93" x2="60" y2="120" stroke="#6366f1" strokeWidth="2"/>
            {/* Boots */}
            <circle cx="40" cy="125" r="4" stroke="#6366f1" strokeWidth="2" fill="none"/>
            <circle cx="60" cy="125" r="4" stroke="#6366f1" strokeWidth="2" fill="none"/>
            {/* Antenna */}
            <line x1="50" y1="10" x2="50" y2="2" stroke="#8B5CF6" strokeWidth="1.5"/>
            <circle cx="50" cy="1" r="1.5" fill="#8B5CF6"/>
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm mb-10"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">Building the future</span>
        </motion.div>

        <motion.div
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[0.95] mb-2"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-hidden">
            {WORDS.map((word, i) => (
              <motion.span key={word} className="inline-block mr-[0.25em]" variants={wordVariants} custom={i}>
                {word}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden mt-1">
            <motion.span
              className="inline-block bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-600 bg-clip-text text-transparent"
              variants={wordVariants} custom={WORDS.length}
            >
              {GRADIENT_WORD}
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          className="mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 opacity-50 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        />

        <motion.p
          className="mt-8 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Zynclo builds creative, one-of-a-kind apps that actually make a difference.
        </motion.p>

        <motion.div
          className="mt-12 relative inline-block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {!isMobile && (
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.button
            onClick={scrollToAbout}
            whileHover={!isMobile ? { scale: 1.04, y: -2 } : {}}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white text-sm font-medium tracking-wide shadow-xl shadow-indigo-500/10 transition-colors duration-300 hover:bg-slate-800"
          >
            See Our Work
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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
        transition={{ delay: 1.2, duration: 0.8 }}
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