import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Redis } from "@upstash/redis";
import { Mail, User, Users, CheckCircle2, ArrowRight, X, Sparkles, Zap } from "lucide-react";

const redis = new Redis({
  url: "https://musical-zebra-80134.upstash.io",
  token: import.meta.env.VITE_REDIS_TOKEN,
});

const WAITLIST_SET_KEY = "waitlist:emails";
const WAITLIST_NAMES_KEY = "waitlist:names";

const floatingParticles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 3,
}));

export default function WaitlistPopup({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", platform: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "duplicate" | "error"
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (open) {
      redis.scard(WAITLIST_SET_KEY).then(setCount).catch(() => {});
      setStatus(null);
      setForm({ name: "", email: "", platform: "" });
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const email = form.email.toLowerCase().trim();
      const added = await redis.sadd(WAITLIST_SET_KEY, email);
      if (added === 0) {
        setStatus("duplicate");
      } else {
        await redis.hset(WAITLIST_NAMES_KEY, { [email]: form.name.trim() });
        const newCount = await redis.scard(WAITLIST_SET_KEY);
        setCount(newCount);
        setStatus("success");
      }
    } catch (err) {
      console.error("Waitlist error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto">
              {/* Outer glow */}
              <div className="absolute -inset-1 rounded-3xl blur-xl opacity-50"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)" }} />

              <div className="relative bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                {/* Animated floating particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {floatingParticles.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute rounded-full bg-indigo-400"
                      style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.06 }}
                      animate={{ y: [0, -20, 0], opacity: [0.04, 0.12, 0.04] }}
                      transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                  {/* Grid */}
                  <div className="absolute inset-0 opacity-[0.035]"
                    style={{
                      backgroundImage: "linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }} />
                </div>

                {/* Top gradient bar */}
                <div className="h-1 w-full"
                  style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #6366f1)" }} />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative p-8">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center text-center py-6 gap-4"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-500/30"
                        >
                          <CheckCircle2 className="w-10 h-10 text-white" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                          <h3 className="text-2xl font-bold text-white mb-2">You're in! 🎉</h3>
                          <p className="text-slate-400 font-light">
                            We'll reach out to{" "}
                            <span className="text-indigo-400 font-medium">{form.email}</span> when it's time.
                          </p>
                          {count !== null && (
                            <p className="text-slate-500 text-sm mt-2">You're tester #{count} — thanks for the support!</p>
                          )}
                        </motion.div>
                        <motion.button
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          onClick={onClose}
                          className="mt-2 px-6 py-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm transition-colors"
                        >
                          Close
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {/* Header */}
                        <div className="mb-6">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 mb-4">
                            <Sparkles className="w-3 h-3 text-violet-400" />
                            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Early Access</span>
                          </div>
                          <h2 className="text-2xl font-bold text-white mb-1">Join the Waitlist</h2>
                          <p className="text-slate-400 text-sm font-light">
                            Be first in line to test PledgeProof. We'll notify you the moment it's ready.
                          </p>
                          {count !== null && (
                            <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                              <Users className="w-4 h-4 text-indigo-400" />
                              <span><span className="font-bold text-white">{count}</span> {count === 1 ? "tester" : "testers"} already signed up</span>
                            </div>
                          )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <User className="w-3 h-3" /> Name
                            </label>
                            <input
                              type="text" required
                              value={form.name}
                              onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                              placeholder="Your name"
                              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Mail className="w-3 h-3" /> Email
                            </label>
                            <input
                              type="email" required
                              value={form.email}
                              onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                          </div>

                          <AnimatePresence>
                            {status === "duplicate" && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="text-sm text-amber-400"
                              >
                                ✦ <span className="font-medium">{form.email}</span> is already on the list — we've got you covered!
                              </motion.p>
                            )}
                            {status === "error" && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="text-sm text-red-400"
                              >
                                Something went wrong. Please try again.
                              </motion.p>
                            )}
                          </AnimatePresence>

                          <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/25 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                          >
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
                                <>Join the Waitlist <ArrowRight className="w-4 h-4" /></>
                              )}
                            </span>
                          </motion.button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}