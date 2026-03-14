import { motion } from "framer-motion";
import { Smartphone, Sparkles, Shield, Calendar, Flame, Camera, Brain, Utensils } from "lucide-react";

const features = [
  { icon: Camera, label: "AI Image Verification" },
  { icon: Brain, label: "LLM Based Judge" },
  { icon: Shield, label: "Patent-Pending Lock System" },
  { icon: Calendar, label: "Flexible Scheduling" },
  { icon: Flame, label: "Streak Tracking" },
];

export default function ProjectCard({ iconUrl }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 sm:p-10 transition-all duration-500 group-hover:border-indigo-200/60 group-hover:shadow-2xl group-hover:shadow-indigo-500/5">
        {/* Accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
        
        <div className="flex flex-col sm:flex-row gap-8">
          {/* App icon + store badges */}
          <div className="flex flex-col items-center sm:items-start gap-5 shrink-0">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/10 ring-1 ring-black/5">
              <img src={iconUrl} alt="PledgeProof app icon" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex flex-col gap-2">
              {/* App Store - black official style */}
              <a href="#" className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-black rounded-xl text-white text-xs font-medium hover:bg-gray-900 transition-colors border border-gray-800 min-w-[140px]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] text-gray-300 font-light">Download on the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </a>
              {/* Google Play - colorful official style */}
              <a href="#" className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-black rounded-xl text-white text-xs font-medium hover:bg-gray-900 transition-colors border border-gray-800 min-w-[140px]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
                  <path d="M3.18 23.76a2 2 0 001.09-.31l11.83-6.76L13 13.5 3.18 23.76z" fill="#EA4335"/>
                  <path d="M20.82 10.32L16.1 7.62 12.76 10.7l3.34 3.08 4.72-2.7a1.5 1.5 0 000-2.76z" fill="#FBBC04"/>
                  <path d="M4.27.55A2 2 0 003.18.24L13 10.5l3.1-2.88L4.27.55z" fill="#4285F4"/>
                  <path d="M3.18.24a2 2 0 00-1.09 1.8v19.92a2 2 0 001.09 1.8L13 13.5 3.18.24z" fill="#34A853"/>
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] text-gray-300 font-light">Get it on</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </a>

              {/* Legal buttons */}
              <div className="flex flex-wrap gap-2 mt-1">
                <a href="/TermsAndConditions" target="_blank" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Terms
                </a>
                <a href="/PrivacyPolicy" target="_blank" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Privacy & Data
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">PledgeProof</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 text-xs font-medium text-indigo-600">
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </span>
            </div>
            
            <p className="text-slate-500 leading-relaxed text-base sm:text-lg font-light mb-6">
              An AI-powered accountability app that uses a patent-pending lock-and-schedule system to keep you disciplined. Create image locks verified by AI, build flexible schedules, track streaks, and prove your progress.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400 font-medium">Available on iOS and Android</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-600">
                <Utensils className="w-3 h-3" />
                Food Lock — Coming Soon
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600"
                >
                  <f.icon className="w-3.5 h-3.5 text-indigo-500" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}