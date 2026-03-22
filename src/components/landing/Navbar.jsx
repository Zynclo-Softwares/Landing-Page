import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import WaitlistPopup from "./WaitlistPopup";

const links = [
  { label: "About", href: "#about" },
  { label: "Support", href: "#support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-8 h-16 md:h-20 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center shrink-0">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b591daf6da87ce28f820e7/11f9eb1d1_zynclo-logo.png"
            alt="Zynclo"
            className="h-10 w-auto md:h-16"
          />
        </a>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium hidden sm:block"
            >
              {link.label}
            </a>
          ))}

          {/* Become a Tester button */}
          <motion.button
            onClick={() => setWaitlistOpen(true)}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wide shadow-md shadow-indigo-500/10 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            />
            <motion.div
              className="absolute top-0 left-0 h-full w-1/2 bg-white/10 skew-x-[-20deg] pointer-events-none"
              animate={{ x: ["-200%", "300%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />
            <span className="relative flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              Become a Tester
            </span>
          </motion.button>
        </div>
      </div>

      <WaitlistPopup open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </motion.nav>
  );
}