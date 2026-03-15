import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function About({ appIconUrl }) {
  return (
    <section id="about" className="relative py-32 sm:py-40">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4 block">
            Our Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            What We're Building.
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-6 justify-start">
          <ProjectCard iconUrl={appIconUrl} />
        </div>
      </div>
    </section>
  );
}