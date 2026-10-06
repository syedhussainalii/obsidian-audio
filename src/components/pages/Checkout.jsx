import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Truck, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    discountPercent,
    discountAmount,
    grandTotal,
    amountNeededForFreeShipping,
    clearCart,
  } = useCart();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [orderRef, setOrderRef] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const shippingFee = amountNeededForFreeShipping === 0 || subtotal === 0 ? 0 : 15;
  const finalTotal = grandTotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email address is required";
    if (!formData.address.trim()) newErrors.address = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, "").length < 15)
      newErrors.cardNumber = "Valid 16-digit card number required";
    if (!formData.expDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expDate.trim()))
      newErrors.expDate = "Use MM/YY format";
    if (!formData.cvv.trim() || formData.cvv.trim().length < 3)
      newErrors.cvv = "Valid CVV code required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateShipping()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validatePayment()) {
        const ref = `OBS-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderRef(ref);
        setStep(3);
        clearCart();
      }
    }
  };

  return (
    <div className="bg-brand-black min-h-screen text-brand-white pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-light/60 block mb-2">
            Secure Order Process
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-brand-white">
            Checkout.
          </h1>
        </motion.div>

        {/* Multi-step progress indicator */}
        {step !== 3 && (
          <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6 text-xs font-mono uppercase tracking-widest">
            <div
              className={`flex items-center gap-2 ${
                step === 1 ? "text-brand-white font-bold" : "text-brand-light/40"
              }`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
                1
              </span>
              <span>Shipping</span>
            </div>
            <div className="w-8 h-[1px] bg-white/10" />
            <div
              className={`flex items-center gap-2 ${
                step === 2 ? "text-brand-white font-bold" : "text-brand-light/40"
              }`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
                2
              </span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {step === 3 ? (
          /* Step 3: Success Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-brand-dark/80 rounded-3xl p-10 md:p-12 border border-white/10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] my-8"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-white">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-brand-white mb-4">
              Order Confirmed
            </h2>
            <p className="text-brand-light/70 font-light mb-6 max-w-md mx-auto text-base">
              Thank you for choosing Obsidian Acoustics. A confirmation receipt has been dispatched to{" "}
              <span className="text-brand-white font-medium">{formData.email}</span>.
            </p>

            <div className="inline-block bg-white/5 border border-white/10 px-6 py-3 rounded-xl mb-8 font-mono text-xs uppercase tracking-[0.2em] text-brand-light/80">
              Order Reference: <span className="text-brand-white font-bold">{orderRef}</span>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-brand-white text-brand-black font-bold uppercase tracking-[0.2em] hover:bg-brand-gray hover:text-brand-white transition-all text-xs"
              >
                Return to Storefront
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleNextStep} className="space-y-8">
                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-brand-white mb-6 flex items-center gap-3">
                      <Truck className="w-5 h-5 text-brand-light/60" /> Shipping Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${
                            errors.firstName ? "border-red-500" : "border-white/20 focus:border-brand-white"
                          } py-3 text-brand-white outline-none transition-colors text-sm`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-400 mt-1 font-mono">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${
                            errors.lastName ? "border-red-500" : "border-white/20 focus:border-brand-white"
                          } py-3 text-brand-white outline-none transition-colors text-sm`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-400 mt-1 font-mono">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b ${
                          errors.email ? "border-red-500" : "border-white/20 focus:border-brand-white"
                        } py-3 text-brand-white outline-none transition-colors text-sm`}
                        placeholder="john.doe@domain.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>
                      )}
                    </div>

                    <div className="mt-6">
                      <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b ${
                          errors.address ? "border-red-500" : "border-white/20 focus:border-brand-white"
                        } py-3 text-brand-white outline-none transition-colors text-sm`}
                        placeholder="123 Audio Way, Suite 400"
                      />
                      {errors.address && (
                        <p className="text-xs text-red-400 mt-1 font-mono">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${
                            errors.city ? "border-red-500" : "border-white/20 focus:border-brand-white"
                          } py-3 text-brand-white outline-none transition-colors text-sm`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="text-xs text-red-400 mt-1 font-mono">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${
                            errors.postalCode ? "border-red-500" : "border-white/20 focus:border-brand-white"
                          } py-3 text-brand-white outline-none transition-colors text-sm`}
                          placeholder="10001"
                        />
                        {errors.postalCode && (
                          <p className="text-xs text-red-400 mt-1 font-mono">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-brand-white mb-6 flex items-center gap-3">
                      <Lock className="w-5 h-5 text-brand-light/60" /> Payment Information
                    </h3>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b ${
                          errors.cardNumber ? "border-red-500" : "border-white/20 focus:border-brand-white"
                        } py-3 text-brand-white outline-none transition-colors text-sm font-mono`}
                        placeholder="4242 4242 4242 4242"
                      />
                      {errors.cardNumber && (
                        <p className="text-xs text-red-400 mt-1 font-mono">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expDate"
                          value={formData.expDate}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${
                            errors.expDate ? "border-red-500" : "border-white/20 focus:border-brand-white"
                          } py-3 text-brand-white outline-none transition-colors text-sm font-mono`}
                          placeholder="MM/YY"
                        />
                        {errors.expDate && (
                          <p className="text-xs text-red-400 mt-1 font-mono">{errors.expDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-brand-light/50 mb-2">
                          CVV Code
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${
                            errors.cvv ? "border-red-500" : "border-white/20 focus:border-brand-white"
                          } py-3 text-brand-white outline-none transition-colors text-sm font-mono`}
                          placeholder="•••"
                        />
                        {errors.cvv && (
                          <p className="text-xs text-red-400 mt-1 font-mono">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-6 flex gap-4">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-4 bg-white/5 border border-white/10 text-brand-white text-xs font-mono uppercase tracking-widest hover:bg-white/10 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 py-4 bg-brand-white text-brand-black font-bold uppercase tracking-[0.2em] transition-all hover:bg-brand-gray hover:text-brand-white flex items-center justify-center gap-2 text-xs"
                  >
                    <span>
                      {step === 1 ? "Proceed to Payment" : `Confirm Order — $${finalTotal.toFixed(2)}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Sidebar Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <div className="bg-brand-dark/80 rounded-3xl p-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
                <h3 className="text-xl font-black uppercase tracking-tighter text-brand-white mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 pb-6 border-b border-white/10 max-h-60 overflow-y-auto custom-scrollbar">
                  {items.length === 0 ? (
                    <p className="text-xs font-mono text-brand-light/50">Your cart is empty.</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex gap-3 items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-10 h-10 object-contain grayscale mix-blend-lighten bg-black/40 rounded"
                          />
                          <div>
                            <h4 className="font-bold text-brand-white uppercase text-xs truncate max-w-[150px]">
                              {item.name}
                            </h4>
                            <p className="text-[10px] text-brand-light/50 font-mono">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-brand-white text-xs">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3 py-6 border-b border-white/10 text-xs font-mono">
                  <div className="flex justify-between text-brand-light/60">
                    <span>Subtotal</span>
                    <span className="text-brand-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-light/60">
                    <span>Express Shipping</span>
                    <span className="text-brand-white">
                      {shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 text-lg font-black uppercase tracking-tight">
                  <span className="text-brand-white">Total</span>
                  <span className="text-brand-white text-2xl tracking-tighter">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-light/40">
                  <ShieldCheck className="w-4 h-4 text-brand-light/60" /> 2-Year International Warranty
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
