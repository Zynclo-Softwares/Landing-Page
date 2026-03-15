import { motion, AnimatePresence } from "framer-motion";
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

const successParticles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i / 12) * 360,
  distance: 60 + Math.random() * 30,
}));

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
          {/* Glow behind card */}
          <motion.div
            className="absolute inset-0 rounded-3xl blur-2xl"
            style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.08), rgba(124,58,237,0.06))" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 sm:p-10 overflow-hidden">
            {/* Accent top line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
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
                  {/* Particle burst */}
                  <div className="relative w-20 h-20">
                    {successParticles.map((p) => (
                      <motion.div
                        key={p.id}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          top: "50%", left: "50%",
                          background: p.id % 2 === 0 ? "#6366f1" : "#8b5cf6",
                        }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                          y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                          opacity: 0,
                          scale: 0,
                        }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
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
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        whileFocus={{ scale: 1.01 }}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/10 transition-all"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div custom={1} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Email
                      </label>
                      <motion.input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="you@example.com"
                        whileFocus={{ scale: 1.01 }}
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
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="How can we help?"
                      rows={5}
                      whileFocus={{ scale: 1.005 }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/10 transition-all resize-none"
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div custom={3} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-medium tracking-wide overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Hover gradient sweep */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                              animate={{ x: [0, 3, 0] }}
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