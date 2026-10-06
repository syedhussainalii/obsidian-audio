import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";

export default function Navbar() {
  const { openCart, totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-4 bg-brand-black/40 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-brand-white font-black tracking-widest uppercase text-xl"
        >
          Obsidian
        </Link>

        <ul className="hidden md:flex gap-8 text-sm text-brand-light/70 uppercase tracking-widest font-medium">
          <li>
            <Link
              to="/specs"
              className="hover:text-brand-white transition-colors"
            >
              Specs
            </Link>
          </li>
          <li>
            <Link
              to="/design"
              className="hover:text-brand-white transition-colors"
            >
              Design
            </Link>
          </li>
          <li>
            <Link
              to="/reviews"
              className="hover:text-brand-white transition-colors"
            >
              Reviews
            </Link>
          </li>
        </ul>

        {/* Trigger Drawer Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            aria-label={`Open bag${totalItems ? `, ${totalItems} items` : ""}`}
            className="relative flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-black bg-brand-white px-4 md:px-5 py-2 hover:bg-brand-gray hover:text-brand-white transition-all group"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Bag</span>
            {totalItems > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-brand-black text-brand-white font-mono rounded">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="md:hidden p-2 text-brand-white focus-visible:outline-none"
          >
            {menuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden">
            <div className="pt-5 pb-2 flex flex-col gap-5 text-sm text-brand-light/70 uppercase tracking-widest font-medium">
              <Link to="/specs" onClick={closeMenu} className="focus-visible:text-white">Specs</Link>
              <Link to="/design" onClick={closeMenu} className="focus-visible:text-white">Design</Link>
              <Link to="/reviews" onClick={closeMenu} className="focus-visible:text-white">Reviews</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
