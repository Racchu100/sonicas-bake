"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, CheckCircle2, Sparkles } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
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
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponMsg(res.message);
  };

  return (
    <div className="pt-24 pb-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
            <span>Review Your Delicacies</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-brand-burgundy">
            Your Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto border border-brand-pink/50">
            <div className="w-20 h-20 rounded-full bg-brand-pink/40 flex items-center justify-center mx-auto text-brand-burgundy">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-brand-burgundy">Your Cart is Empty</h3>
            <p className="text-xs text-brand-midnight/60 font-poppins">
              You haven&apos;t added any luxury cakes or pastries yet.
            </p>
            <Link
              href="/cakes"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full gold-btn text-xs font-semibold uppercase tracking-wider shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Bakery Catalogue</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Table */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-5 rounded-2xl border border-brand-pink/40 flex flex-col sm:flex-row items-center gap-4 justify-between"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-brand-gold/30">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-playfair font-bold text-base text-brand-burgundy">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-brand-midnight/70 font-poppins mt-0.5">
                        {item.selectedWeight} • {item.selectedFlavor} • {item.eggless ? "Eggless" : "With Egg"}
                      </p>
                      {item.customMessage && (
                        <p className="text-[11px] text-brand-gold font-medium italic mt-1">
                          Inscribed: &ldquo;{item.customMessage}&rdquo;
                        </p>
                      )}
                      <span className="font-playfair font-bold text-sm text-brand-burgundy block mt-2 sm:hidden">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-pink/30">
                    <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full border border-brand-pink/60">
                      <button onClick={() => updateQuantity(idx, item.quantity - 1)} className="text-brand-burgundy font-bold">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-brand-burgundy px-1 font-poppins">{item.quantity}</span>
                      <button onClick={() => updateQuantity(idx, item.quantity + 1)} className="text-brand-burgundy font-bold">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-playfair font-bold text-base text-brand-burgundy hidden sm:block">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeFromCart(idx)}
                      className="text-brand-burgundy/40 hover:text-red-600 transition-colors p-2"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="glass-gold-card p-6 rounded-2xl border border-brand-gold/40 space-y-6 shadow-xl sticky top-28">
                <h3 className="font-playfair text-xl font-bold text-brand-burgundy border-b border-brand-pink/40 pb-3">
                  Order Breakdown
                </h3>

                {/* Coupon Box */}
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="relative">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-brand-gold/40 text-xs font-poppins focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <button type="submit" className="w-full py-2 rounded-xl burgundy-btn text-xs font-semibold uppercase">
                      Apply Promo
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{appliedCoupon} Active</span>
                    </div>
                    <button onClick={removeCoupon} className="underline text-emerald-700 font-bold">
                      Remove
                    </button>
                  </div>
                )}
                {couponMsg && !appliedCoupon && (
                  <p className="text-[11px] font-poppins text-red-600">{couponMsg}</p>
                )}

                <div className="space-y-2 text-xs font-poppins text-brand-midnight/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-midnight">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount Coupon</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>{formatPrice(gstAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span>{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-playfair font-bold text-brand-burgundy pt-3 border-t border-brand-pink/40">
                    <span>Total Amount</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-3.5 rounded-full gold-btn font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
