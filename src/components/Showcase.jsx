import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Showcase() {
  const sectionRef = useRef(null);

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets for subtle motion
  const yImage = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-brand-black overflow-hidden flex items-center justify-center border-t border-b border-white/5"
    >
      {/* Dark Overlay Gradients for smooth fading */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black z-10 pointer-events-none" />

      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: yImage }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-10 flex items-center justify-center bg-brand-dark select-none pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2500&fm=webp"
          alt="Acoustic Texture"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover grayscale opacity-30 mix-blend-overlay"
        />
        <span className="absolute text-[12rem] sm:text-[18rem] md:text-[22rem] font-black text-brand-gray/30 tracking-tighter uppercase whitespace-nowrap">
          OBSIDIAN
        </span>
      </motion.div>

      {/* Parallax Foreground Text Layer */}
      <motion.div
        style={{ y: yText }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center"
      >
        <span className="text-xs md:text-sm text-brand-light/60 font-mono uppercase tracking-[0.2em] mb-4">
          Acoustic Engineering
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-white uppercase tracking-tighter leading-[0.9]">
          Engineered for <br /> Obsession.
        </h2>
        <p className="mt-8 text-brand-light/70 text-lg md:text-xl font-light max-w-xl leading-relaxed">
          Machined from a single block of aerospace-grade aluminum. Every curve
          serves an acoustic purpose.
        </p>
      </motion.div>
    </section>
  );
}
