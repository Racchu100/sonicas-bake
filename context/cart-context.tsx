"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, CakeBooking } from "@/types";
import { COUPONS } from "@/lib/data";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: {
    product: Product;
    selectedWeight: string;
    selectedFlavor: string;
    eggless: boolean;
    customMessage?: string;
    quantity?: number;
    unitPrice?: number;
  }) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  subtotal: number;
  gstAmount: number;
  deliveryCharge: number;
  totalAmount: number;
  userBookings: CakeBooking[];
  addBooking: (booking: CakeBooking) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [userBookings, setUserBookings] = useState<CakeBooking[]>([]);

  // Load initial cart & wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("sonicas_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("sonicas_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedBookings = localStorage.getItem("sonicas_bookings");
      if (savedBookings) setUserBookings(JSON.parse(savedBookings));
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("sonicas_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("sonicas_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("sonicas_bookings", JSON.stringify(userBookings));
  }, [userBookings]);

  const addToCart = ({
    product,
    selectedWeight,
    selectedFlavor,
    eggless,
    customMessage,
    quantity = 1,
    unitPrice,
  }: {
    product: Product;
    selectedWeight: string;
    selectedFlavor: string;
    eggless: boolean;
    customMessage?: string;
    quantity?: number;
    unitPrice?: number;
  }) => {
    const finalUnitPrice = unitPrice || product.offerPrice || product.price;

    setCart((prev) => {
      // Check if identical item already exists in cart
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedWeight === selectedWeight &&
          item.selectedFlavor === selectedFlavor &&
          item.eggless === eggless &&
          item.customMessage === customMessage
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedWeight,
            selectedFlavor,
            eggless,
            customMessage,
            quantity,
            unitPrice: finalUnitPrice,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = qty;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    const couponObj = COUPONS.find((c) => c.code === appliedCoupon);
    if (couponObj && subtotal >= couponObj.minOrderValue) {
      if (couponObj.discountPercent) {
        discountAmount = (subtotal * couponObj.discountPercent) / 100;
      } else if (couponObj.discountFlat) {
        discountAmount = couponObj.discountFlat;
      }
    }
  }

  const applyCoupon = (code: string) => {
    const codeUpper = code.trim().toUpperCase();
    const couponObj = COUPONS.find((c) => c.code === codeUpper);
    if (!couponObj) {
      return { success: false, message: "Invalid coupon code" };
    }
    if (subtotal < couponObj.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for ${codeUpper} is ₹${couponObj.minOrderValue}`,
      };
    }
    setAppliedCoupon(codeUpper);
    return { success: true, message: `Coupon ${codeUpper} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const deliveryCharge = subtotal > 0 && subtotal < 1999 ? 150 : 0;
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05);
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryCharge + gstAmount);

  const addBooking = (booking: CakeBooking) => {
    setUserBookings((prev) => [booking, ...prev]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        subtotal,
        gstAmount,
        deliveryCharge,
        totalAmount,
        userBookings,
        addBooking,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
