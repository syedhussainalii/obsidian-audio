import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Battery, VolumeX, Radio, Zap } from "lucide-react";

// Reusable 3D Tilt Wrapper with Glassy inner border/shadow
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  // Track raw mouse coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply a spring physics configuration so the return to center is buttery smooth
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map the mouse position (from -0.5 to 0.5) to a rotation degree
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to the center of the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative bg-brand-dark rounded-2xl p-8 border border-white/5 hover:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-300 group cursor-crosshair overflow-hidden ${className}`}
    >
      {/* translateZ(50px) pushes the inner content out toward the viewer for the 3D pop */}
      <div
        style={{ transform: "translateZ(50px)" }}
        className="h-full w-full flex flex-col justify-end relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="bg-brand-black py-24 px-4 md:px-8 perspective-1000">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">
          <TiltCard className="md:col-span-2">
            <div className="relative mb-auto self-start">
              <div className="absolute -inset-3 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <VolumeX className="relative w-12 h-12 text-white/50 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-brand-white mb-2 drop-shadow-lg tracking-tight">
              Absolute Silence
            </h3>
            <p className="text-white/60 group-hover:text-white/90 font-light transition-colors duration-300">
              Next-gen adaptive noise cancellation tuning out the world at
              40,000 times per second.
            </p>
          </TiltCard>

          <TiltCard>
            <div className="relative mb-auto self-start">
              <div className="absolute -inset-3 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Battery className="relative w-12 h-12 text-white/50 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-brand-white mb-2 drop-shadow-lg tracking-tight">
              50H Battery
            </h3>
            <p className="text-white/60 group-hover:text-white/90 font-light transition-colors duration-300">
              Two full days of uninterrupted lossless audio.
            </p>
          </TiltCard>

          <TiltCard>
            <div className="relative mb-auto self-start">
              <div className="absolute -inset-3 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Radio className="relative w-12 h-12 text-white/50 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-brand-white mb-2 drop-shadow-lg tracking-tight">
              Lossless Wireless
            </h3>
            <p className="text-white/60 group-hover:text-white/90 font-light transition-colors duration-300">
              Bluetooth 5.4 with aptX Adaptive.
            </p>
          </TiltCard>

          <TiltCard className="md:col-span-2">
            <div className="relative mb-auto self-start">
              <div className="absolute -inset-3 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Zap className="relative w-12 h-12 text-white/50 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-brand-white mb-2 drop-shadow-lg tracking-tight">
              Instant Charge
            </h3>
            <p className="text-white/60 group-hover:text-white/90 font-light transition-colors duration-300">
              Plug in for 5 minutes. Listen for 5 hours.
            </p>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

