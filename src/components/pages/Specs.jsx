import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Minus, Plus } from "lucide-react";

const specifications = [
  ["Acoustics", "Driver Type", "40mm Dynamic Titanium-Coated Drivers"],
  ["Acoustics", "Frequency Response", "5 Hz – 45,000 Hz"],
  ["Acoustics", "Impedance", "32 Ohms"],
  ["Acoustics", "Total Harmonic Distortion", "< 0.1% @ 1kHz"],
  ["Battery & Power", "Battery Life", "50 Hours (ANC On) / 65 Hours (ANC Off)"],
  ["Battery & Power", "Fast Charge", "5 mins charge = 5 hours playback"],
  ["Connectivity", "Bluetooth Version", "Bluetooth 5.4 with Multipoint"],
  ["Connectivity", "Codecs", "aptX Lossless, aptX Adaptive, AAC, SBC"],
  ["Build & Comfort", "Weight", "290g (10.2 oz)"],
  ["Build & Comfort", "Chassis Material", "CNC Machined Aerospace Aluminum"],
];

const comparison = [
  ["Adaptive ANC", "Up to 40 dB", "Up to 52 dB"],
  ["Battery life", "50 hours", "70 hours"],
  ["Drivers", "40mm Titanium", "42mm Beryllium"],
  ["Lossless wireless", "aptX Adaptive", "aptX Lossless"],
  ["Travel case", false, true],
  ["Price", "$599", "$799"],
];

function ResponseChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const path =
    "M 0 142 C 36 140, 46 115, 78 124 S 122 134, 155 111 S 190 82, 224 98 S 270 74, 302 82 S 345 62, 378 73 S 420 46, 452 67 S 486 54, 520 63 S 558 49, 590 54 S 624 48, 660 52";
  return (
    <div
      ref={ref}
      className="mt-10 rounded-2xl border border-white/10 bg-black/30 p-5 md:p-8"
    >
      <div className="flex justify-between items-end mb-5">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50">
            Measured in-house
          </p>
          <h3 className="text-2xl font-bold mt-2">Frequency response</h3>
        </div>
        <span className="text-xs font-mono text-brand-light/50">
          5Hz — 45kHz
        </span>
      </div>
      <svg
        viewBox="0 0 660 180"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Frequency response chart"
      >
        {[35, 75, 115, 155].map((y) => (
          <line
            key={y}
            x1="0"
            x2="660"
            y1={y}
            y2={y}
            stroke="white"
            strokeOpacity=".08"
          />
        ))}
        <motion.path
          d={path}
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <path
          d="M 0 142 C 36 140, 46 115, 78 124 S 122 134, 155 111 S 190 82, 224 98 S 270 74, 302 82 S 345 62, 378 73 S 420 46, 452 67 S 486 54, 520 63 S 558 49, 590 54 S 624 48, 660 52 L 660 180 L 0 180 Z"
          fill="url(#chartFill)"
          opacity=".14"
        />
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-between text-[10px] text-brand-light/40 font-mono mt-3">
        <span>20Hz</span>
        <span>100Hz</span>
        <span>1kHz</span>
        <span>10kHz</span>
        <span>40kHz</span>
      </div>
    </div>
  );
}

function NoiseDemo() {
  const [ancOn, setAncOn] = useState(true);
  const noisy =
    "M 0 42 C 18 5, 28 78, 46 34 S 72 68, 88 20 S 110 74, 128 42 S 150 5, 170 52 S 198 80, 218 28 S 244 70, 264 40 S 290 12, 310 52 S 334 77, 356 34 S 380 65, 400 42 S 428 10, 450 48 S 478 74, 500 38 S 530 68, 550 42 S 580 16, 610 42 S 640 66, 660 40";
  const calm =
    "M 0 42 C 90 38, 120 47, 190 42 S 300 45, 370 42 S 490 44, 560 42 S 630 43, 660 42";
  return (
    <div className="rounded-2xl border border-white/10 bg-brand-dark/70 p-6 md:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50">
            Live demonstration
          </p>
          <h3 className="text-2xl font-bold mt-2">
            Adaptive noise cancellation
          </h3>
        </div>
        <button
          onClick={() => setAncOn(!ancOn)}
          aria-pressed={ancOn}
          className={`flex items-center gap-3 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${ancOn ? "bg-white text-black" : "bg-white/10 text-white"}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${ancOn ? "bg-black" : "bg-white/40"}`}
          />{" "}
          ANC {ancOn ? "On" : "Off"}
        </button>
      </div>
      <div className="bg-black/40 rounded-xl p-4">
        <svg viewBox="0 0 660 84" className="w-full h-auto">
          <motion.path
            d={ancOn ? calm : noisy}
            fill="none"
            stroke={ancOn ? "#fff" : "#9ca3af"}
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ d: ancOn ? calm : noisy }}
            transition={{ duration: 0.7 }}
          />
          <line
            x1="0"
            x2="660"
            y1="42"
            y2="42"
            stroke="white"
            strokeOpacity=".1"
            strokeDasharray="4 6"
          />
        </svg>
      </div>
      <p className="text-sm text-brand-light/50 mt-4">
        {ancOn
          ? "External noise is neutralized before it reaches your ear."
          : "Ambient noise is allowed through for awareness."}
      </p>
    </div>
  );
}

function ComparisonTable() {
  return (
    <section className="mt-24">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50">
          Choose your level
        </p>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2">
          Standard vs. Pro
        </h2>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[620px] text-left">
          <thead>
            <tr className="bg-white/[.04] text-xs font-mono uppercase tracking-widest text-brand-light/50">
              <th className="p-5">Feature</th>
              <th className="p-5 text-white">Obsidian Standard</th>
              <th className="p-5 text-white">Obsidian Pro</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map(([feature, standard, pro]) => (
              <tr key={feature} className="border-t border-white/10 text-sm">
                <td className="p-5 text-brand-light/60">{feature}</td>
                {[standard, pro].map((value, i) => (
                  <td key={i} className="p-5 font-medium">
                    {typeof value === "boolean" ? (
                      value ? (
                        <Plus className="w-4 h-4" />
                      ) : (
                        <Minus className="w-4 h-4 text-white/30" />
                      )
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Support() {
  const [open, setOpen] = useState(0);
  const faqs = [
    [
      "When will my order ship?",
      "Standard orders ship within 1–2 business days. Express delivery arrives in 2–3 business days after dispatch.",
    ],
    [
      "What is your return policy?",
      "Try Obsidian at home for 30 days. If it is not the right fit, return it in its original packaging for a full refund.",
    ],
    [
      "Does the warranty cover batteries?",
      "Every pair includes a two-year international warranty covering manufacturing defects, including the integrated battery.",
    ],
    [
      "Can I use wired audio?",
      "Yes. The included USB-C cable supports lossless digital audio, even when the battery is empty.",
    ],
  ];
  return (
    <section className="mt-16 md:mt-24 grid lg:grid-cols-[1fr_1.2fr] gap-12">
      <div>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50">
          Need to know
        </p>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2">
          Questions,
          <br />
          answered.
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className="border border-white/10 rounded-xl p-5">
            <p className="text-xs uppercase tracking-widest text-brand-light/40">
              Shipping
            </p>
            <p className="mt-3 font-medium">Free express shipping over $650.</p>
          </div>
          <div className="border border-white/10 rounded-xl p-5">
            <p className="text-xs uppercase tracking-widest text-brand-light/40">
              Returns
            </p>
            <p className="mt-3 font-medium">
              30-day, no-questions-asked returns.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        {faqs.map(([question, answer], index) => (
          <div key={question} className="border-b border-white/10">
            <button
              onClick={() => setOpen(open === index ? -1 : index)}
              className="w-full py-6 flex justify-between items-center text-left font-medium"
            >
              <span>{question}</span>
              <ChevronDown
                className={`w-5 h-5 text-white/50 transition-transform ${open === index ? "rotate-180" : ""}`}
              />
            </button>
            <motion.div
              initial={false}
              animate={{
                height: open === index ? "auto" : 0,
                opacity: open === index ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <p className="pb-6 pr-10 text-sm leading-relaxed text-brand-light/60">
                {answer}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Specs() {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  return (
    <div className="bg-brand-black min-h-screen text-brand-white pt-20 overflow-x-hidden w-full max-w-[100vw]">
      <div
        ref={headerRef}
        className="relative h-[60vh] overflow-hidden flex items-center justify-center border-b border-white/5"
      >
        <motion.div
          style={{ y: yImage }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <img
            src="https://images.unsplash.com/photo-1528659128522-8d76d49cb002?auto=format&fit=crop&q=80&w=2000"
            alt="Dark Texture Header"
            className="w-full h-full object-cover grayscale mix-blend-overlay opacity-40"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black" />
        <div className="relative z-10 text-center px-4 w-full mb-10 md:mb-24">
          <span className="text-xs md:text-sm text-brand-light/60 font-mono uppercase tracking-[0.2em]">
            Technical Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-brand-white uppercase tracking-tighter break-words hyphens-auto w-full px-4 md:px-0 leading-[0.9] mt-4">
            Specifications.
          </h1>
          <p className="mt-6 text-brand-light/70 text-lg font-light max-w-xs md:max-w-lg mx-auto">
            Precision engineering quantified. Built without standard
            compromises.
          </p>
        </div>
      </div>
      <main className="max-w-5xl mx-auto px-6 pt-0 pb-16 md:pb-32">
        <div className="mt-8 md:mt-24">
          <ResponseChart />
        </div>
        <div className="mt-8">
          <NoiseDemo />
        </div>
        <div className="mt-8 md:mt-24 rounded-3xl border border-white/10 p-8 md:p-12 bg-brand-dark/60">
          <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Obsidian Standard
            </h2>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50">
              Model OS-01
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {specifications.map(([category, name, value]) => (
              <div
                key={name}
                className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/40 w-32 hidden sm:inline-block">
                    {category}
                  </span>
                  <span className="font-medium text-lg">{name}</span>
                </div>
                <span className="text-brand-light/80 font-light md:text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <ComparisonTable />
        <Support />
      </main>
    </div>
  );
}
