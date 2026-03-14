import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Support() {
  return (
    <section id="support" className="relative py-32 sm:py-40">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4 block">
            Support
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Get In Touch.
          </h2>
          <p className="text-lg text-slate-500 font-light max-w-md mx-auto mb-12">
            Have questions about our apps? Reach out and we'll get back to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <a
            href="mailto:support@zynclo.com"
            className="group relative inline-flex items-center gap-4 px-8 py-6 bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-2xl transition-all duration-500 hover:border-indigo-200/60 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">
                Email us
              </p>
              <p className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                support@zynclo.com
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}