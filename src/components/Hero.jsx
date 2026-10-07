import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";

const finishes = [
  {
    name: "MATTE BLACK",
    subLabel: "6061-T6 / BLACK ANODIZE",
    price: 599,
    glow: "#5f6670",
    waveform: "#9ca3af",
    amplitude: 18,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=2000&fm=webp",
    cssFilter: "none",
  },
  {
    name: "ANODIZED SILVER",
    subLabel: "6061-T6 / CLEAR ANODIZE",
    price: 629,
    glow: "#b6c0ca",
    waveform: "#dbe4eb",
    amplitude: 13,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=2000&fm=webp",
    cssFilter: "none",
  },
  {
    name: "MIDNIGHT",
    subLabel: "6061-T6 / BLUE ANODIZE",
    price: 649,
    glow: "#273d69",
    waveform: "#7396d0",
    amplitude: 24,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=2000&fm=webp",
    cssFilter: "sepia(1) hue-rotate(190deg) saturate(400%) brightness(0.6) contrast(1.2)",
  },
];

function RollingPrice({ price }) {
  const value = `$${price}.00`;
  return (
    <span className="inline-flex overflow-hidden align-bottom" aria-label={`$${price}.00 USD`}>
      {value.split("").map((digit, index) => (
        <span key={`${index}-${digit}`} className="inline-block min-w-[0.6ch]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${digit}-${price}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.025 }}
              className="inline-block"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

function Waveform({ finish, reducedMotion }) {
  const path = `M 0 86 C 44 ${86 - finish.amplitude}, 72 ${86 + finish.amplitude}, 116 86 S 188 ${86 - finish.amplitude}, 232 86 S 304 ${86 + finish.amplitude}, 348 86 S 420 ${86 - finish.amplitude}, 464 86 S 536 ${86 + finish.amplitude}, 580 86 S 632 ${86 - finish.amplitude}, 680 86`;
  return (
    <svg viewBox="0 0 680 172" className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
      <motion.path
        d={path}
        fill="none"
        stroke={finish.waveform}
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={reducedMotion ? { opacity: 0.35 } : { d: path, opacity: [0.2, 0.55, 0.2], pathLength: [0.92, 1, 0.92] }}
        transition={reducedMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={finish.waveform}
        strokeWidth="0.75"
        strokeDasharray="2 11"
        animate={reducedMotion ? undefined : { x: [-12, 12] }}
        transition={reducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

export default function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const reducedMotion = useReducedMotion();
  const selectedFinish = finishes[selectedIndex];

  const selectFinish = (index) => setSelectedIndex((index + finishes.length) % finishes.length);
  const handleFinishKeyDown = (event, index) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectFinish(index + 1);
      document.getElementById(`finish-${(index + 1) % finishes.length}`)?.focus();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectFinish(index - 1);
      document.getElementById(`finish-${(index - 1 + finishes.length) % finishes.length}`)?.focus();
    }
  };

  const handleAdd = () => {
    addItem({
      id: `os-01-${selectedFinish.name.toLowerCase().replaceAll(" ", "-")}`,
      name: "OBSIDIAN OS-01",
      finish: selectedFinish.name,
      finishCode: selectedFinish.subLabel,
      subtitle: `${selectedFinish.name} / ${selectedFinish.subLabel}`,
      price: selectedFinish.price,
      image: selectedFinish.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="relative min-h-screen bg-brand-black flex items-center justify-center overflow-hidden pt-20">
      <motion.div
        className="absolute top-[31%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,760px)] h-[min(48vw,440px)] blur-[100px] opacity-25 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse, ${selectedFinish.glow} 0%, transparent 68%)` }}
        transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeOut" }}
      />
      <div className="z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center w-full">
        <div className="relative w-full max-w-xl h-64 md:h-80 mb-8">
          <Waveform finish={selectedFinish} reducedMotion={reducedMotion} />
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedFinish.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: "easeOut" }}
              src={selectedFinish.image}
              alt={`${selectedFinish.name} Obsidian OS-01 headphones`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full mx-auto object-cover mix-blend-lighten"
              style={{
                filter: `${selectedFinish.cssFilter} drop-shadow(0 0 18px ${selectedFinish.glow})`,
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
            />
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={selectedFinish.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="text-xs font-mono uppercase tracking-[0.3em] text-brand-light/50 mb-4">
            OS-01 / {selectedFinish.name}
          </motion.p>
        </AnimatePresence>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.8 }} className="text-6xl md:text-8xl font-black text-brand-white tracking-tighter leading-[0.9] uppercase">
          Silence <br /> is Golden.
        </motion.h1>
        <p className="mt-6 text-brand-light/70 text-lg md:text-xl max-w-lg mx-auto font-light">
          Studio-grade acoustics wrapped in an aerospace-grade aluminum chassis. Engineered with zero compromises.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 w-full">
          <div className="w-full max-w-full overflow-x-auto whitespace-nowrap no-scrollbar snap-x px-4 md:px-0 md:flex-wrap md:justify-center flex items-start gap-5 sm:gap-8" role="radiogroup" aria-label="Choose a material finish">
            {finishes.map((finish, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={finish.name}
                  id={`finish-${index}`}
                  type="button"
                  role="radio"
                  aria-label={`${finish.name}, ${finish.subLabel}`}
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectFinish(index)}
                  onKeyDown={(event) => handleFinishKeyDown(event, index)}
                  className={`relative shrink-0 snap-center pb-3 text-left transition-colors focus-visible:outline-none focus-visible:text-white ${isSelected ? "text-white" : "text-brand-light/40 hover:text-brand-light/70"}`}
                >
                  <span className="block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.12em] whitespace-nowrap">{finish.name}</span>
                  <span className="block mt-1 text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.08em] whitespace-nowrap opacity-70">{finish.subLabel}</span>
                  {isSelected && <motion.span layoutId="finish-underline" className="absolute bottom-0 left-0 right-0 h-px bg-white" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </button>
              );
            })}
          </div>
          <div className="text-2xl font-black tracking-tight text-brand-white" aria-live="polite">
            <RollingPrice price={selectedFinish.price} /> <span className="text-xs font-mono font-normal text-brand-light/40 uppercase tracking-widest">USD</span>
          </div>
        </div>

        <motion.button onClick={handleAdd} whileTap={reducedMotion ? undefined : { scale: 0.98 }} className="mt-8 px-8 py-4 bg-brand-white text-brand-black font-bold uppercase tracking-[0.2em] hover:bg-brand-gray hover:text-brand-white transition-colors duration-300 shadow-lg flex items-center gap-3 focus-visible:outline-white">
          {added ? <><Check className="w-4 h-4" aria-hidden="true" /> Added to bag</> : <><ShoppingBag className="w-4 h-4" aria-hidden="true" /> Pre-Order Now</>}
        </motion.button>
      </div>
    </section>
  );
}
