"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    deliveryCharge,
    gstAmount,
    totalAmount,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMessage({ type: "success", text: res.message });
    } else {
      setCouponMessage({ type: "error", text: res.message });
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-pink/40 flex items-center justify-between glass-nav">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-pink/50 flex items-center justify-center text-brand-burgundy">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-brand-burgundy">Your Cake Selection</h3>
                  <p className="text-xs font-poppins text-brand-midnight/60">
                    {cart.length} item{cart.length !== 1 && "s"} in cart
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-brand-pink/40 text-brand-burgundy transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-brand-pink/30 flex items-center justify-center text-brand-burgundy/40 mb-2">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h4 className="font-playfair text-2xl text-brand-burgundy font-semibold">Your Cart is Empty</h4>
                  <p className="text-xs text-brand-midnight/60 max-w-xs font-poppins">
                    Explore our luxury cakes and fresh pastries to add sweet perfection to your celebration.
                  </p>
                  <Link
                    href="/cakes"
                    onClick={() => setIsCartOpen(false)}
                    className="gold-btn px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Browse Luxury Cakes</span>
                  </Link>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-4 rounded-xl border border-brand-pink/40 flex gap-4 relative group"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-brand-gold/30">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-playfair font-bold text-sm text-brand-burgundy truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="text-brand-burgundy/40 hover:text-brand-burgundy transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-brand-midnight/70 font-poppins mt-0.5">
                          {item.selectedWeight} • {item.selectedFlavor} • {item.eggless ? "Eggless" : "With Egg"}
                        </p>
                        {item.customMessage && (
                          <p className="text-[10px] text-brand-gold font-medium italic mt-1 bg-brand-pink/20 px-2 py-0.5 rounded border border-brand-gold/20">
                            Msg: &ldquo;{item.customMessage}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-pink/30">
                        <div className="flex items-center gap-2 bg-white rounded-full border border-brand-pink/60 px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(idx, item.quantity - 1)}
                            className="text-brand-burgundy hover:text-brand-gold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-brand-burgundy px-1 font-poppins">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(idx, item.quantity + 1)}
                            className="text-brand-burgundy hover:text-brand-gold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-playfair font-bold text-sm text-brand-burgundy">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Coupon */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-pink/40 bg-brand-bg/80 backdrop-blur-md space-y-4">
                {/* Coupon Input */}
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                      <input
                        type="text"
                        placeholder="Coupon (e.g. SONICA10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-brand-gold/40 text-xs font-poppins focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg burgundy-btn text-xs font-semibold uppercase"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">{appliedCoupon} Applied!</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 underline font-medium hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponMessage && !appliedCoupon && (
                  <p
                    className={`text-[11px] font-poppins ${
                      couponMessage.type === "success" ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}

                {/* Pricing Summary */}
                <div className="space-y-1.5 text-xs font-poppins text-brand-midnight/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-midnight">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>{formatPrice(gstAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</span>
                  </div>
                  <div className="flex justify-between text-base font-playfair font-bold text-brand-burgundy pt-2 border-t border-brand-pink/40">
                    <span>Total Amount</span>
                    <span className="text-brand-burgundy">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                {/* Checkout Action Button */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 rounded-full gold-btn font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
