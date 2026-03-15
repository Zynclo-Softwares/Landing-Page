import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
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

const successParticles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  angle: (i / 14) * 360,
  distance: 55 + Math.random() * 35,
}));

/* ── Floating Prop Shapes ── */
function FloatingProps() {
  return (
    <>
      {/* Spiral / arc — top left */}
      <motion.svg
        className="absolute top-[5%] left-[3%] opacity-[0.1] pointer-events-none"
        width="60" height="60" viewBox="0 0 60 60"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <path d="M30 5 A25 25 0 1 1 5 30" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="5" r="3" fill="#6366f1" />
      </motion.svg>

      {/* Wavy brackets — top right */}
      <motion.svg
        className="absolute top-[8%] right-[4%] opacity-[0.09] pointer-events-none"
        width="36" height="60" viewBox="0 0 36 60"
        animate={{ y: [0, -14, 0], scaleY: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M26 4 C14 4 14 28 14 30 C14 32 14 56 26 56" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 4 C22 4 22 28 22 30 C22 32 22 56 10 56" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>

      {/* Orbiting planet system — left mid */}
      <motion.div
        className="absolute left-[2%] top-[42%] pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg width="56" height="56" viewBox="0 0 56 56" className="opacity-[0.1]">
          <circle cx="28" cy="28" r="7" fill="#6366f1" />
          <circle cx="28" cy="28" r="20" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 4" />
          <motion.circle
            cx="28" cy="8" r="3.5" fill="#a78bfa"
            style={{ transformOrigin: "28px 28px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </motion.svg>
      </motion.div>

      {/* Starburst — right mid */}
      <motion.svg
        className="absolute right-[3%] top-[38%] opacity-[0.09] pointer-events-none"
        width="44" height="44" viewBox="0 0 44 44"
        animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        {[0, 45, 90, 135].map((angle) => (
          <line
            key={angle}
            x1="22" y1="4" x2="22" y2="40"
            stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"
            transform={`rotate(${angle} 22 22)`}
          />
        ))}
        <circle cx="22" cy="22" r="4" fill="#8b5cf6" />
      </motion.svg>

      {/* DNA / zigzag wave — bottom left */}
      <motion.svg
        className="absolute bottom-[10%] left-[4%] opacity-[0.08] pointer-events-none"
        width="50" height="80" viewBox="0 0 50 80"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M10 5 Q40 20 10 35 Q40 50 10 65 Q40 80 10 80" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M40 5 Q10 20 40 35 Q10 50 40 65 Q10 80 40 80" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" />
        {[20, 50].map((y) => (
          <line key={y} x1="10" y1={y} x2="40" y2={y} stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 3" />
        ))}
      </motion.svg>

      {/* Floating envelope icon — bottom right */}
      <motion.svg
        className="absolute bottom-[12%] right-[5%] opacity-[0.1] pointer-events-none"
        width="40" height="32" viewBox="0 0 40 32"
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="2" y="2" width="36" height="28" rx="4" fill="none" stroke="#6366f1" strokeWidth="1.8" />
        <path d="M2 8 L20 18 L38 8" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" />
      </motion.svg>

      {/* Floating asterisk — top center-left */}
      <motion.svg
        className="absolute top-[20%] left-[18%] opacity-[0.07] pointer-events-none"
        width="30" height="30" viewBox="0 0 30 30"
        animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
        transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        {[0, 60, 120].map((a) => (
          <line key={a} x1="15" y1="2" x2="15" y2="28" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 15 15)`} />
        ))}
      </motion.svg>

      {/* Glowing dot trail — right top */}
      <div className="absolute top-[25%] right-[8%] pointer-events-none flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="rounded-full bg-indigo-500"
            style={{ width: 4 - i * 0.5, height: 4 - i * 0.5, opacity: 0.08 }}
            animate={{ opacity: [0.05, 0.18, 0.05], x: [0, i % 2 === 0 ? 5 : -5, 0] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Corner bracket decorations on the card */}
    </>
  );
}

export default function Support() {
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
      {/* Animated background orbs */}
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

      <FloatingProps />

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
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Get In Touch.
          </h2>
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
                        className="absolute top-0 left-0 h-full w-12 bg-white/10 skew-x-[-20deg] pointer-events-none"
                        animate={{ x: ["-100%", "500%"] }}
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