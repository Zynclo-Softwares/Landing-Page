import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Redis } from "@upstash/redis";
import { Mail, User, Sparkles, Users, CheckCircle2, ArrowRight } from "lucide-react";

const redis = new Redis({
  url: "https://musical-zebra-80134.upstash.io",
  token: import.meta.env.VITE_REDIS_TOKEN,
});

const WAITLIST_SET_KEY = "waitlist:emails";
const WAITLIST_NAMES_KEY = "waitlist:names";

export default function Waitlist() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "duplicate" | "error"
  const [count, setCount] = useState(null);

  useEffect(() => {
    redis.scard(WAITLIST_SET_KEY).then(setCount).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const email = form.email.toLowerCase().trim();
      // SADD returns 1 if added, 0 if already exists
      const added = await redis.sadd(WAITLIST_SET_KEY, email);
      if (added === 0) {
        setStatus("duplicate");
      } else {
        // Store name alongside email in a hash
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
    <section id="waitlist" className="relative py-28 sm:py-36 overflow-hidden bg-slate-900">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)", top: "-10%", left: "-10%" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)", bottom: "-10%", right: "-5%" }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
      </div>

      <div className="relative max-w-xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Early Access</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Join the Waitlist
          </h2>
          <p className="text-slate-400 text-lg font-light mb-3">
            Be the first to try PledgeProof. Drop your name and email and we'll reach out when we're ready.
          </p>

          {/* Tester count badge */}
          {count !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-8"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span><span className="font-bold text-white">{count}</span> {count === 1 ? "tester" : "testers"} already signed up</span>
            </motion.div>
          )}
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 text-left"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-3xl"
            style={{ background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)" }} />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">You're on the list!</h3>
                  <p className="text-slate-400 font-light">
                    We'll reach out to <span className="text-indigo-400 font-medium">{form.email}</span> when it's time.
                  </p>
                  {count !== null && (
                    <p className="text-slate-500 text-sm mt-2">You're tester #{count} 🎉</p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3 h-3" /> Name
                  </label>
                  <input
                    name="name" type="text" required
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <input
                    name="email" type="email" required
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                {/* Duplicate / Error messages */}
                <AnimatePresence>
                  {status === "duplicate" && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-amber-400 flex items-center gap-2"
                    >
                      <span>✦</span> Looks like <span className="font-medium">{form.email}</span> is already on the list — we've got you covered!
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-400"
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full relative flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/20 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {/* Shimmer */}
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
                      <>
                        Join the Waitlist
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}