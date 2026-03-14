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
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg text-white text-xs font-medium hover:bg-slate-800 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg text-white text-xs font-medium hover:bg-slate-800 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/></svg>
                Google Play
              </a>
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