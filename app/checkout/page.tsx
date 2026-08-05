"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, Clock, Lock, Sparkles, Printer, FileText } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Online" | "COD">("Online");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `SB-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newId);
    setOrderComplete(true);
    clearCart();

    try {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#8B1E3F", "#D4AF37", "#F5D6E6", "#FFFFFF"],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-24 pb-12 bg-brand-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!orderComplete ? (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
              <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-brand-burgundy">
                Complete Your Order
              </h1>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Delivery Info Form */}
              <div className="md:col-span-7 space-y-6 glass-card p-6 sm:p-8 rounded-3xl border border-brand-pink/40 shadow-xl text-xs font-poppins">
                <h3 className="font-playfair text-xl font-bold text-brand-burgundy border-b border-brand-pink/30 pb-3">
                  Delivery Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-brand-burgundy mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Merchant"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-brand-burgundy mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-burgundy mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. radhika@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-brand-burgundy mb-1">Complete Address</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Flat/House No, Building, Road, Landmark, Pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-pink/30 space-y-3">
                  <h4 className="font-playfair text-lg font-bold text-brand-burgundy">Payment Option</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Online")}
                      className={`p-3.5 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === "Online"
                          ? "gold-btn shadow-md"
                          : "bg-white border-gray-200 text-brand-midnight/70"
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Razorpay / Cards / UPI</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("COD")}
                      className={`p-3.5 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === "COD"
                          ? "gold-btn shadow-md"
                          : "bg-white border-gray-200 text-brand-midnight/70"
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 space-y-6">
                <div className="glass-gold-card p-6 sm:p-8 rounded-3xl border border-brand-gold/40 shadow-xl space-y-4">
                  <h3 className="font-playfair text-xl font-bold text-brand-burgundy border-b border-brand-pink/40 pb-3">
                    Order Summary ({cart.length} items)
                  </h3>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-poppins">
                        <div>
                          <p className="font-bold text-brand-burgundy">{item.product.name}</p>
                          <p className="text-[10px] text-brand-midnight/60">
                            {item.selectedWeight} • Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-brand-burgundy">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-brand-pink/40 space-y-2 text-xs font-poppins">
                    <div className="flex justify-between text-base font-playfair font-bold text-brand-burgundy">
                      <span>Total Pay:</span>
                      <span>{formatPrice(totalAmount)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full gold-btn font-poppins font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Pay {formatPrice(totalAmount)} & Place Order</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <div className="glass-gold-card p-10 sm:p-14 rounded-3xl border border-brand-gold shadow-2xl space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-brand-burgundy">
                Order Placed Successfully!
              </h2>
              <p className="text-xs sm:text-sm font-poppins text-brand-midnight/70 max-w-md mx-auto">
                Thank you for choosing Sonicas Bake. Your order <span className="font-bold text-brand-burgundy">{orderId}</span> has been confirmed. A WhatsApp update and digital invoice have been dispatched to your email.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-full border border-brand-burgundy text-brand-burgundy text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <Link
                  href="/dashboard"
                  className="px-8 py-3 rounded-full gold-btn text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Go to User Dashboard</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
