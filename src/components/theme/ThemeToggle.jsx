import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-orange-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
