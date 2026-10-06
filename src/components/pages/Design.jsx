import { motion } from "framer-motion";
import ExplodedView from "../ExplodedView";

export default function Design() {
  return (
    <div className="bg-brand-black min-h-screen text-brand-white pt-28 pb-24 overflow-hidden">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-brand-light/60 block mb-4"
        >
          Form & Functionality
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-brand-white max-w-5xl"
        >
          Sculpted for Pure Acoustics.
        </motion.h1>
      </section>

      {/* Main Studio Image Block */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 h-[50vh] md:h-[70vh]"
        >
          <img
src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&q=80&w=2000&fm=webp"
            alt="Minimalist Dark Studio Setup"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-end gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/70">
              Studio Environment // Acoustic Isolation
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50">
              Fig. 01 — Obsidian Design Lab
            </span>
          </div>
        </motion.div>
      </section>

      <ExplodedView />

      {/* Magazine Editorial Asymmetric Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-brand-white mb-8">
              Zero Distraction. <br /> Maximum Fidelity.
            </h2>
            <p className="text-brand-light/80 text-lg md:text-xl font-light leading-relaxed mb-6">
              Our design philosophy is rooted in extreme minimalist subtraction.
              We eliminated every visible fastener, seam, and unneeded
              embellishment. What remains is a pure silhouette driven entirely
              by acoustic performance.
            </p>
            <p className="text-brand-light/60 text-base font-light leading-relaxed">
              Every curve has been tuned using finite element analysis to
              suppress resonance and eliminate unwanted harmonic vibrations
              before they reach the ear.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 bg-brand-dark/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 block mb-3">
              Ergonomic Balance
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-brand-white mb-4">
              Featherweight Pressure Distribution
            </h3>
            <p className="text-brand-light/70 text-sm font-light leading-relaxed">
              Custom memory foam ear cushions lined with ultra-breathable
              protein leather ensure ideal clamping force, providing passive
              noise isolation without pressure fatigue during extended listening
              sessions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Aerospace-Grade Aluminum Chassis Section */}
      <section className="bg-brand-dark border-t border-b border-white/5 py-28 my-12 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/60 block mb-4">
              Materiality & Engineering
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-brand-white mb-8">
              Aerospace-Grade <br /> Aluminum Chassis.
            </h2>
            <p className="text-brand-light/80 text-lg font-light leading-relaxed mb-6">
              Precision CNC-machined from solid billets of 6061-T6 aluminum.
              Each ear cup takes over 140 minutes of continuous milling to
              produce, yielding unmatched structural rigidity and acoustic
              dampening properties.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/10">
              <div>
                <span className="text-3xl md:text-4xl font-black text-brand-white block tracking-tighter">
                  6061-T6
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50">
                  Aluminum Alloy
                </span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-black text-brand-white block tracking-tighter">
                  0.05mm
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50">
                  Milling Tolerance
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand-black/60 rounded-3xl p-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-lg font-bold text-brand-white uppercase tracking-tight mb-1">
                  Anodized Matte Finish
                </h4>
                <p className="text-brand-light/60 text-sm font-light">
                  Electrochemically sealed coat providing extreme scratch
                  resistance and a velvety tactile touch.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-lg font-bold text-brand-white uppercase tracking-tight mb-1">
                  Tactile Rotary Controls
                </h4>
                <p className="text-brand-light/60 text-sm font-light">
                  Custom knurled physical dials engineered with dampening fluid
                  for precise tactile volume adjustment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
