import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const handleComingSoon = (e) => {
    e.preventDefault();
    alert(
      "In-Ear models are dropping in Q4 2026. Join the mailing list for updates!",
    );
  };

  return (
    <footer className="bg-brand-black border-t border-white/5 pt-20 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Newsletter Section */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-black text-brand-white uppercase tracking-widest block mb-6"
            >
              OBSIDIAN
            </Link>
            <p className="text-brand-light/50 text-sm mb-8 max-w-sm leading-relaxed">
              Join our private list for early access to limited edition drops
              and acoustic engineering insights.
            </p>
            <form
              className="relative max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="ENTER EMAIL"
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-brand-white placeholder:text-brand-light/30 focus:outline-none focus:border-brand-white transition-colors uppercase tracking-widest"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-light/50 hover:text-brand-white transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-brand-white text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Products
            </h4>
            <ul className="space-y-4 text-sm text-brand-light/50">
              <li>
                <Link
                  to="/"
                  className="hover:text-brand-white transition-colors duration-300"
                >
                  Over-Ear
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleComingSoon}
                  className="hover:text-brand-white transition-colors duration-300"
                >
                  In-Ear
                </a>
              </li>
              <li>
                <Link
                  to="/buy"
                  className="hover:text-brand-white transition-colors duration-300"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-brand-white text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-brand-light/50">
              <li>
                <Link
                  to="/design"
                  className="hover:text-brand-white transition-colors duration-300"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/specs"
                  className="hover:text-brand-white transition-colors duration-300"
                >
                  Support
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@obsidian.com"
                  className="hover:text-brand-white transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-brand-light/40 uppercase tracking-widest font-mono">
          <p>© 2026 OBSIDIAN ACOUSTICS.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/" className="hover:text-brand-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-brand-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
