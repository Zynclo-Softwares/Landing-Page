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
const WAITLIST_IOS_KEY = "waitlist:ios";
const WAITLIST_ANDROID_KEY = "waitlist:android";

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
  const [iosCount, setIosCount] = useState(null);
  const [androidCount, setAndroidCount] = useState(null);

  useEffect(() => {
    if (open) {
      Promise.all([
        redis.scard(WAITLIST_SET_KEY),
        redis.scard(WAITLIST_IOS_KEY),
        redis.scard(WAITLIST_ANDROID_KEY),
      ]).then(([total, ios, android]) => {
        setCount(total);
        setIosCount(ios);
        setAndroidCount(android);
      }).catch(() => {});
      setStatus(null);
      setForm({ name: "", email: "", platform: "" });
    }
  }, [open]);

  // Close on Escape + disable scroll when open
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    if (open) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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
        await redis.hset(WAITLIST_NAMES_KEY, { [email]: `${form.name.trim()} | ${form.platform}` });
        const platformKey = form.platform === "iOS" ? WAITLIST_IOS_KEY : WAITLIST_ANDROID_KEY;
        await redis.sadd(platformKey, email);
        const [newTotal, newIos, newAndroid] = await Promise.all([
          redis.scard(WAITLIST_SET_KEY),
          redis.scard(WAITLIST_IOS_KEY),
          redis.scard(WAITLIST_ANDROID_KEY),
        ]);
        setCount(newTotal);
        setIosCount(newIos);
        setAndroidCount(newAndroid);
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
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Users className="w-4 h-4 text-indigo-400" />
                                <span><span className="font-bold text-white">{count}</span> {count === 1 ? "tester" : "testers"} already signed up</span>
                              </div>
                              <div className="flex gap-2">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs">
                                  <svg className="w-3 h-3 text-slate-300" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 134.4-318 266.5-318 79.5 0 145.6 52.4 195.6 52.4 47.8 0 122.7-56.1 209.8-56.1 33.5 0 121.9 3.2 185.9 85.9zm-124.6-174.4c33.8-40.1 57.9-95.9 57.9-151.7 0-7.7-.6-15.4-1.9-22.4-54.4 1.9-119.4 36.2-158.6 82.8-31.4 37.1-61.2 93-61.2 149.5 0 8.3 1.3 16.6 1.9 19.1 3.2.6 8.4 1.3 13.6 1.3 49 0 109.5-32.7 148.3-78.6z"/></svg>
                                  <span className="text-slate-300 font-semibold">{iosCount ?? 0}</span>
                                  <span className="text-slate-500">iOS</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs">
                                  <svg className="w-3 h-3 text-slate-300" viewBox="0 0 32 32" fill="currentColor"><path d="M18.677 5.245l1.32-2.424a.277.277 0 0 0-.114-.375.277.277 0 0 0-.375.114l-1.336 2.453A8.937 8.937 0 0 0 16 4.75a8.937 8.937 0 0 0-2.172.263L12.492 2.56a.277.277 0 0 0-.375-.114.277.277 0 0 0-.114.375l1.32 2.424C10.856 6.42 9.124 8.52 9 11h14c-.124-2.48-1.856-4.58-4.323-5.755zM13 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9 12v13.5A1.5 1.5 0 0 0 10.5 27H12v3.5A1.5 1.5 0 0 0 13.5 32a1.5 1.5 0 0 0 1.5-1.5V27h2v3.5A1.5 1.5 0 0 0 18.5 32a1.5 1.5 0 0 0 1.5-1.5V27h1.5A1.5 1.5 0 0 0 23 25.5V12zm-2.5 0A1.5 1.5 0 0 0 5 13.5v9A1.5 1.5 0 0 0 6.5 24 1.5 1.5 0 0 0 8 22.5v-9A1.5 1.5 0 0 0 6.5 12zm19 0A1.5 1.5 0 0 0 24 13.5v9a1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 25.5 12z"/></svg>
                                  <span className="text-slate-300 font-semibold">{androidCount ?? 0}</span>
                                  <span className="text-slate-500">Android</span>
                                  <span className="text-slate-600">/</span>
                                  <span className="text-green-500 font-medium">12 goal</span>
                                </div>
                              </div>
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

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                              Platform
                            </label>
                            <div className="flex gap-3">
                              {["iOS", "Android"].map((p) => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => setForm(prev => ({ ...prev, platform: p }))}
                                  className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                                    form.platform === p
                                      ? "border-indigo-500 bg-indigo-500/15 text-indigo-300"
                                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                                  }`}
                                >
                                  {p === "iOS" ? (
                                    <span className="flex items-center justify-center gap-2">
                                      <svg className="w-4 h-4" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 134.4-318 266.5-318 79.5 0 145.6 52.4 195.6 52.4 47.8 0 122.7-56.1 209.8-56.1 33.5 0 121.9 3.2 185.9 85.9zm-124.6-174.4c33.8-40.1 57.9-95.9 57.9-151.7 0-7.7-.6-15.4-1.9-22.4-54.4 1.9-119.4 36.2-158.6 82.8-31.4 37.1-61.2 93-61.2 149.5 0 8.3 1.3 16.6 1.9 19.1 3.2.6 8.4 1.3 13.6 1.3 49 0 109.5-32.7 148.3-78.6z"/></svg>
                                      iOS
                                    </span>
                                  ) : (
                                    <span className="flex items-center justify-center gap-2">
                                      <svg className="w-4 h-4" viewBox="0 0 32 32" fill="currentColor"><path d="M18.677 5.245l1.32-2.424a.277.277 0 0 0-.114-.375.277.277 0 0 0-.375.114l-1.336 2.453A8.937 8.937 0 0 0 16 4.75a8.937 8.937 0 0 0-2.172.263L12.492 2.56a.277.277 0 0 0-.375-.114.277.277 0 0 0-.114.375l1.32 2.424C10.856 6.42 9.124 8.52 9 11h14c-.124-2.48-1.856-4.58-4.323-5.755zM13 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9 12v13.5A1.5 1.5 0 0 0 10.5 27H12v3.5A1.5 1.5 0 0 0 13.5 32a1.5 1.5 0 0 0 1.5-1.5V27h2v3.5A1.5 1.5 0 0 0 18.5 32a1.5 1.5 0 0 0 1.5-1.5V27h1.5A1.5 1.5 0 0 0 23 25.5V12zm-2.5 0A1.5 1.5 0 0 0 5 13.5v9A1.5 1.5 0 0 0 6.5 24 1.5 1.5 0 0 0 8 22.5v-9A1.5 1.5 0 0 0 6.5 12zm19 0A1.5 1.5 0 0 0 24 13.5v9a1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 25.5 12z"/></svg>
                                      Android
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
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

                          <p className="text-xs text-slate-500 leading-relaxed border border-white/5 bg-white/[0.03] rounded-xl px-4 py-3">
                             ⚠️ <span className="text-slate-400 font-medium">Please only join if you're willing to voluntarily test the app for 14 days.</span> You'll receive a confirmation email when it's time to opt out.
                           </p>

                          <motion.button
                           type="submit"
                            disabled={loading || !form.platform}
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