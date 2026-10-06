import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    toggleAccessory,
    availableAccessories,
    subtotal,
    discountPercent,
    discountAmount,
    grandTotal,
    promoCode,
    applyPromoCode,
    removePromoCode,
    freeShippingProgress,
    amountNeededForFreeShipping,
  } = useCart();

  const [inputPromoCode, setInputPromoCode] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCart();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll("button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex='-1'])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    closeCart();
    navigate("/buy");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
            className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Slide-Over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-black/95 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col justify-between shadow-2xl text-brand-white"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-light/70" />
                <h2 id="cart-title" className="text-lg font-black uppercase tracking-widest">
                  Your Order
                </h2>
              </div>
              <button
                onClick={closeCart}
                ref={closeButtonRef}
                aria-label="Close shopping bag"
                className="p-2 text-brand-light/50 hover:text-brand-white hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
              {/* Free Shipping Progress Bar */}
              <div className="bg-brand-dark/60 border border-white/10 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-brand-light/70 uppercase">
                    {amountNeededForFreeShipping > 0
                      ? `Add $${amountNeededForFreeShipping.toFixed(0)} for Free Express Shipping`
                      : "🎉 You unlocked Free Express Shipping!"}
                  </span>
                  <span className="text-brand-white font-bold">
                    {freeShippingProgress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-white transition-all duration-500 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Selected Items List */}
              <div className="space-y-4">
                {items.length === 0 ? (
                  <p className="text-center text-brand-light/40 py-12 text-sm uppercase tracking-wider font-mono">
                    Your bag is empty
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-brand-dark/80 border border-white/5 flex gap-4 items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 object-contain grayscale mix-blend-lighten bg-brand-black/50 p-1 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-brand-white uppercase truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-brand-light/50 font-mono truncate">
                          {item.subtitle}
                        </p>
                        <p className="text-sm font-bold text-brand-white mt-1">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/10 rounded-lg bg-brand-black/40">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="p-1.5 text-brand-light/60 hover:text-brand-white transition-colors"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          ) : (
                            <Minus className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="p-1.5 text-brand-light/60 hover:text-brand-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 border-t border-white/5">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light/50 block mb-2">
                  Promo Code
                </label>
                {promoCode ? (
                  <div className="flex items-center justify-between p-3 bg-white/5 border border-emerald-500/30 rounded-xl text-xs font-mono">
                    <span className="text-emerald-400 font-bold">
                      PROMO: {promoCode} (-{discountPercent}%)
                    </span>
                    <button
                      onClick={removePromoCode}
                      aria-label="Remove promo code"
                      className="text-brand-light/50 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const res = applyPromoCode(inputPromoCode);
                      setPromoMsg(res.message);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={inputPromoCode}
                      onChange={(e) => setInputPromoCode(e.target.value)}
                      placeholder="TRY OBSIDIAN10"
                      className="flex-1 bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-brand-white uppercase outline-none focus:border-brand-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-brand-white text-xs font-mono uppercase font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMsg && !promoCode && (
                  <p className="text-[10px] font-mono text-amber-400 mt-1">
                    {promoMsg}
                  </p>
                )}
              </div>

              {/* Recommended Accessories Section */}
              <div className="pt-4 border-t border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light/50 mb-4">
                  Companion Upgrades
                </h3>
                <div className="space-y-3">
                  {availableAccessories.map((acc) => {
                    const isAdded = items.some((item) => item.id === acc.id);
                    return (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccessory(acc)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isAdded
                            ? "bg-white/10 border-white/30"
                            : "bg-brand-dark/40 border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={acc.image}
                            alt={acc.name}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400";
                            }}
                            className="w-10 h-10 object-cover rounded-md grayscale"
                          />
                          <div>
                            <p className="text-xs font-bold text-brand-white">
                              {acc.name}
                            </p>
                            <p className="text-xs text-brand-light/50 font-mono">
                              +${acc.price}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label={`${isAdded ? "Remove" : "Add"} ${acc.name}`}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isAdded
                              ? "bg-brand-white text-brand-black border-brand-white"
                              : "text-brand-light/50 border-white/10 hover:text-brand-white"
                          }`}
                        >
                          {isAdded ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Summary & CTA */}
            <div className="p-6 border-t border-white/10 bg-brand-black/90 space-y-4">
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between text-brand-light/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-light/60">
                  <span>Shipping</span>
                  <span className="text-emerald-400 uppercase text-xs font-bold">
                    {amountNeededForFreeShipping === 0 ? "Free" : "$15.00"}
                  </span>
                </div>
                <div className="flex justify-between text-brand-white font-bold text-base pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      grandTotal + (amountNeededForFreeShipping === 0 ? 0 : 15)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                disabled={items.length === 0}
                onClick={handleCheckout}
                className="w-full py-4 bg-brand-white text-brand-black font-bold uppercase tracking-widest text-xs hover:bg-brand-gray hover:text-brand-white transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
