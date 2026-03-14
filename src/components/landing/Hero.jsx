import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#fafafa]" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #4F46E5 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #7C3AED 0%, transparent 50%),
                            radial-gradient(circle at 50% 80%, #4F46E5 0%, transparent 40%)`
        }}
      />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl top-20 right-20"
        style={{ background: "linear-gradient(225deg, #7C3AED, #4F46E5)" }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
            <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Building the future
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[0.95]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Building Tools
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            That Keep You
          </span>
          <br />
          Accountable.
        </motion.h1>

        <motion.p
          className="mt-8 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Zynclo builds AI-powered apps that turn intentions into actions.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={scrollToAbout}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5"
          >
            See Our Work
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
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