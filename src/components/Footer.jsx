import { useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubscribe = async (event) => {
    event?.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const payload = await response.json().catch(() => ({}));
        setStatus("error");
        setMessage(payload.error || "We could not complete your subscription.");
      }
    } catch {
      setStatus("error");
      setMessage("Newsletter service unavailable. Please try again.");
    }
  };

  return (
    <footer className="bg-brand-black border-t border-white/5 pt-20 pb-10 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand & Newsletter */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-black text-brand-white uppercase tracking-[0.2em] mb-4">
            Obsidian
          </h2>
          <p className="text-brand-light/50 font-light max-w-sm mb-6">
            Join our private list for early access to limited edition drops and
            acoustic engineering insights.
          </p>

          <form onSubmit={handleSubscribe} className="flex w-full max-w-md border-b border-brand-light/20 focus-within:border-brand-white transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              placeholder={status === "success" ? "SUBSCRIBED" : "ENTER EMAIL"}
              disabled={status === "success" || status === "loading"}
              aria-label="Email address"
              aria-invalid={status === "error"}
              className="w-full bg-transparent outline-none text-brand-white placeholder-brand-light/30 uppercase tracking-[0.2em] py-2 text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "success" || status === "loading"}
              aria-label="Subscribe"
              className="text-brand-light/50 hover:text-brand-white transition-colors p-2 disabled:opacity-50"
            >
              {status === "success" ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : status === "loading" ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </form>

          {status === "success" && (
            <p className="text-green-400 text-xs mt-2 uppercase tracking-widest">You are on the list. Welcome to Obsidian.</p>
          )}
          {status === "error" && (
            <p role="alert" className="text-red-400 text-xs mt-2 uppercase tracking-widest">{message}</p>
          )}
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-brand-white text-sm font-bold uppercase tracking-[0.2em] mb-6">
            Products
          </h4>
          <ul className="space-y-4 text-brand-light/50 text-sm font-light">
            <li className="hover:text-brand-white transition-colors cursor-pointer">
              Over-Ear
            </li>
            <li className="hover:text-brand-white transition-colors cursor-pointer">
              In-Ear
            </li>
            <li className="hover:text-brand-white transition-colors cursor-pointer">
              Accessories
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-brand-white text-sm font-bold uppercase tracking-[0.2em] mb-6">
            Company
          </h4>
          <ul className="space-y-4 text-brand-light/50 text-sm font-light">
            <li className="hover:text-brand-white transition-colors cursor-pointer">
              Our Story
            </li>
            <li className="hover:text-brand-white transition-colors cursor-pointer">
              Support
            </li>
            <li className="hover:text-brand-white transition-colors cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-brand-light/30 uppercase tracking-[0.2em]">
        <p>© 2026 OBSIDIAN ACOUSTICS.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-brand-white transition-colors cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-brand-white transition-colors cursor-pointer">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}
