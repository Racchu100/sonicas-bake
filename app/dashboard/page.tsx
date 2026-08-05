"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Package,
  Heart,
  MapPin,
  User,
  CheckCircle2,
  Clock,
  Printer,
  Sparkles,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "orders";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const { wishlist, toggleWishlist, userBookings } = useCart();

  // Mock User Orders
  const mockOrders = [
    {
      id: "SB-ORD-982145",
      date: "August 4, 2026",
      items: "The Royal 24K Gold Crown (2 kg • Belgian Dark Chocolate)",
      total: 2999,
      status: "Baking", // Placed -> Baking -> Quality Check -> Delivery -> Delivered
      progress: 40,
    },
    {
      id: "SB-ORD-871239",
      date: "July 20, 2026",
      items: "Velvet Rose & Champagne Symphony (1 kg)",
      total: 2499,
      status: "Delivered",
      progress: 100,
    },
  ];

  return (
    <div className="pt-24 pb-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Welcome Header */}
        <div className="glass-gold-card p-8 rounded-3xl border border-brand-gold/40 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-burgundy to-brand-gold p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-playfair font-bold text-xl text-brand-burgundy">
                AR
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brand-burgundy">
                  Welcome, Ananya Roy
                </h1>
                <span className="px-2.5 py-0.5 rounded-full gold-btn text-[10px] font-bold uppercase tracking-wider">
                  VIP Gold Member
                </span>
              </div>
              <p className="text-xs font-poppins text-brand-midnight/70">
                ananya.roy@example.com • +91 98765 43210
              </p>
            </div>
          </div>

          <Link
            href="/custom-cake"
            className="px-6 py-3 rounded-full gold-btn font-poppins font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Custom Cake</span>
          </Link>
        </div>

        {/* Dashboard Tabs Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <aside className="md:col-span-3">
            <div className="glass-card p-4 rounded-2xl border border-brand-pink/40 space-y-1 shadow-md">
              {[
                { id: "orders", label: "My Orders & Bookings", icon: Package },
                { id: "wishlist", label: "Saved Wishlist", icon: Heart },
                { id: "addresses", label: "Saved Delivery Addresses", icon: MapPin },
                { id: "profile", label: "Account Profile", icon: User },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-poppins font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-brand-burgundy text-white font-semibold shadow-md"
                        : "text-brand-midnight/80 hover:bg-brand-pink/40"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main Tab Content */}
          <main className="md:col-span-9">
            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-brand-burgundy">Order Progress & History</h2>

                {/* Custom Bookings from local state */}
                {userBookings.map((b) => (
                  <div key={b.id} className="glass-card p-6 rounded-2xl border border-brand-gold/40 space-y-4 shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-brand-pink/30 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Custom Cake Booking</span>
                        <h3 className="font-playfair font-bold text-lg text-brand-burgundy">{b.cakeName}</h3>
                        <p className="text-[11px] text-brand-midnight/50 font-poppins">Booking ID: {b.id} • {b.createdAt}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        Status: {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-poppins">
                      <div>
                        <p className="text-brand-midnight/60">Delivery Date & Slot:</p>
                        <p className="font-bold text-brand-burgundy">{b.deliveryDate} ({b.deliveryTimeSlot})</p>
                      </div>
                      <div>
                        <p className="text-brand-midnight/60">Total Paid:</p>
                        <p className="font-bold text-brand-burgundy">{formatPrice(b.totalAmount)}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button onClick={() => window.print()} className="px-4 py-2 rounded-xl border border-brand-burgundy text-brand-burgundy text-xs font-semibold flex items-center gap-1.5">
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Invoice</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Standard E-Commerce Mock Orders */}
                {mockOrders.map((ord) => (
                  <div key={ord.id} className="glass-card p-6 rounded-2xl border border-brand-pink/40 space-y-4 shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-brand-pink/30 pb-3">
                      <div>
                        <h3 className="font-playfair font-bold text-lg text-brand-burgundy">{ord.id}</h3>
                        <p className="text-[11px] text-brand-midnight/50 font-poppins">Ordered on {ord.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ord.status === "Delivered" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800 animate-pulse"
                      }`}>
                        {ord.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-poppins text-brand-midnight/70 font-semibold">
                        <span>Status Track:</span>
                        <span>{ord.status}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-brand-pink/50 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-burgundy to-brand-gold rounded-full" style={{ width: `${ord.progress}%` }} />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 text-xs font-poppins">
                      <p className="font-medium text-brand-midnight">{ord.items}</p>
                      <span className="font-playfair font-bold text-base text-brand-burgundy">{formatPrice(ord.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-brand-burgundy">Your Saved Wishlist</h2>

                {wishlist.length === 0 ? (
                  <div className="glass-card p-10 rounded-2xl text-center space-y-3">
                    <Heart className="w-10 h-10 text-brand-pink mx-auto" />
                    <p className="text-xs font-poppins text-brand-midnight/60">No saved items in your wishlist yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="glass-card p-4 rounded-2xl border border-brand-pink/40 flex gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-playfair font-bold text-sm text-brand-burgundy">{item.name}</h4>
                            <span className="font-playfair font-bold text-sm text-brand-burgundy block">{formatPrice(item.offerPrice || item.price)}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <Link href={`/cakes/${item.id}`} className="text-xs font-bold text-brand-gold uppercase">View</Link>
                            <button onClick={() => toggleWishlist(item)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-brand-burgundy">Saved Addresses</h2>
                <div className="glass-card p-6 rounded-2xl border border-brand-gold/30 space-y-2 text-xs font-poppins">
                  <span className="px-2.5 py-0.5 rounded-full gold-btn text-[10px] font-bold uppercase">Primary Home</span>
                  <h4 className="font-bold text-brand-burgundy text-sm mt-1">Ananya Roy</h4>
                  <p className="text-brand-midnight/70">Villa 42, Jubilee Hills Road No. 10, Hyderabad, Telangana - 500033</p>
                  <p className="text-brand-midnight/70">Mobile: +91 98765 43210</p>
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-brand-burgundy">Account Information</h2>
                <div className="glass-card p-6 rounded-2xl border border-brand-pink/40 space-y-4 text-xs font-poppins">
                  <div>
                    <label className="block font-bold text-brand-burgundy mb-1">Full Name</label>
                    <input type="text" defaultValue="Ananya Roy" className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60" />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-burgundy mb-1">Email Address</label>
                    <input type="email" defaultValue="ananya.roy@example.com" className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60" />
                  </div>
                  <button className="px-6 py-2.5 rounded-full gold-btn font-bold uppercase">Save Changes</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-brand-burgundy font-playfair">Loading User Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
