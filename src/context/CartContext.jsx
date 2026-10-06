import { useState, useEffect } from "react";
import { CartContext } from "./CartContextDefinition";


const AVAILABLE_ACCESSORIES = [
  {
    id: "case",
    name: "Hard Shell Travel Case",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1584679109597-c656b19974c9?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "cable",
    name: "Braided Silver Audio Cable",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "stand",
    name: "CNC Aluminum Desk Stand",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
  },
];

const INITIAL_ITEMS = [
  {
    id: "os-01",
    name: "OBSIDIAN OS-01",
    finish: "MATTE BLACK",
    finishCode: "6061-T6 / BLACK ANODIZE",
    subtitle: "Matte Black / 6061-T6 Aluminum",
    price: 599,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400",
  },
];

const FREE_SHIPPING_THRESHOLD = 650;

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("obsidian_cart_items");
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  const [promoCode, setPromoCode] = useState(() => {
    try {
      return localStorage.getItem("obsidian_promo_code") || "";
    } catch {
      return "";
    }
  });
  const [discountPercent, setDiscountPercent] = useState(() => {
    try {
      return localStorage.getItem("obsidian_promo_code") === "OBSIDIAN10" ? 10 : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("obsidian_cart_items", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("obsidian_promo_code", promoCode);
    } catch (e) {
      console.error("Failed to save promo to localStorage", e);
    }
  }, [promoCode]);

  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        return prevItems.map((item, idx) =>
          idx === existingIndex ? { ...item, ...product, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleAccessory = (accessory) => {
    setItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === accessory.id);
      if (exists) {
        return prevItems.filter((item) => item.id !== accessory.id);
      }
      return [
        ...prevItems,
        { ...accessory, quantity: 1, subtitle: "Official Accessory" },
      ];
    });
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "OBSIDIAN10") {
      setPromoCode("OBSIDIAN10");
      setDiscountPercent(10);
      return { success: true, message: "10% OBSIDIAN discount applied!" };
    }
    return { success: false, message: "Invalid promo code. Try OBSIDIAN10" };
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountPercent(0);
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        toggleCart,
        openCart,
        closeCart,
        items,
        addItem,
        removeItem,
        updateQuantity,
        toggleAccessory,
        clearCart,
        availableAccessories: AVAILABLE_ACCESSORIES,
        subtotal,
        discountPercent,
        discountAmount,
        grandTotal,
        totalItems,
        promoCode,
        applyPromoCode,
        removePromoCode,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        amountNeededForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

