import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ExplodedView() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The left third of the image moves left
  const leftSliceX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  // The right third of the image moves right
  const rightSliceX = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  // The center stays put but scales up slightly to create depth
  const centerScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Text fades in exactly at the midpoint of the scroll
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], ["20px", "0px"]);

  // Reuse the dark headphone image from the hero section.
  const imageUrl =
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1500";

  return (
    <section
      ref={containerRef}
      className="relative h-[120vh] bg-brand-black w-full border-t border-white/5"
    >
      {/* Sticky Container locks to the screen while you scroll through the 300vh */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Ambient glow behind the headphones */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-gray/40 rounded-full blur-[100px]"></div>

        <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center mix-blend-lighten drop-shadow-2xl">
          {/* Layer 1: Left Slice */}
          {/* Layer 1: Left Slice */}
          <motion.img
            style={{
              x: leftSliceX,
              clipPath: "polygon(0 0, 33% 0, 33% 100%, 0 100%)",
            }}
            src={imageUrl}
            alt="Left Chassis"
            loading="lazy"
            decoding="async"
            className="absolute z-30 w-full h-full object-contain grayscale contrast-200 mix-blend-screen"
          />

          {/* Layer 2: Center Slice */}
          <motion.img
            style={{
              scale: centerScale,
              clipPath: "polygon(33% 0, 66% 0, 66% 100%, 33% 100%)",
            }}
            src={imageUrl}
            alt="Center Band"
            loading="lazy"
            decoding="async"
            className="absolute z-20 w-full h-full object-contain grayscale contrast-200 mix-blend-screen"
          />

          {/* Layer 3: Right Slice */}
          <motion.img
            style={{
              x: rightSliceX,
              clipPath: "polygon(66% 0, 100% 0, 100% 100%, 66% 100%)",
            }}
            src={imageUrl}
            alt="Right Chassis"
            loading="lazy"
            decoding="async"
            className="absolute z-10 w-full h-full object-contain grayscale contrast-200 mix-blend-screen"
          />
        </div>

        {/* Forensic breakdown text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-20 md:bottom-32 text-center px-6 z-40 pointer-events-none"
        >
          <p className="text-brand-light/50 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Deconstructed Architecture
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-brand-white uppercase tracking-tighter">
            Shatter the mold.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
