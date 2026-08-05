"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Calendar as CalendarIcon,
  Users,
  Star,
  Tag,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Printer,
  ShieldAlert,
  Search,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { PRODUCTS, REVIEWS, COUPONS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "bookings" | "orders" | "customers" | "reviews" | "coupons"
  >("overview");

  // Local admin state for dynamic demo edits
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [disabledDates, setDisabledDates] = useState<string[]>(["2026-08-15"]);
  const [newDisabledDate, setNewDisabledDate] = useState("");
  const [reviewsList, setReviewsList] = useState(REVIEWS);

  // New product form modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Wedding");
  const [newProductPrice, setNewProductPrice] = useState(2999);
  const [newProductDesc, setNewProductDesc] = useState("");

  // Booking items
  const [adminBookings, setAdminBookings] = useState([
    {
      id: "SB-BOOK-102938",
      customer: "Dr. Ananya Roy",
      phone: "+91 98765 43210",
      cake: "4-Tier Royal Burgundy & Gold",
      date: "2026-08-10",
      slot: "06:00 PM - 09:00 PM",
      status: "Confirmed",
      amount: 4500,
    },
    {
      id: "SB-BOOK-102939",
      customer: "Vikramaditya Sharma",
      phone: "+91 91234 56789",
      cake: "Golden Ferrero Hazelnut Elegance",
      date: "2026-08-12",
      slot: "02:00 PM - 05:00 PM",
      status: "Pending Approval",
      amount: 2299,
    },
  ]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `cake-${Date.now()}`,
      name: newProductName,
      slug: newProductName.toLowerCase().replace(/\s+/g, "-"),
      price: newProductPrice,
      offerPrice: newProductPrice - 300,
      rating: 5.0,
      reviewsCount: 1,
      description: newProductDesc || "Handcrafted haute couture luxury cake.",
      shortDesc: newProductDesc || "Handcrafted haute couture luxury cake.",
      category: newProductCategory,
      eggless: true,
      flavors: ["Belgian Dark Chocolate", "Vanilla Bean"],
      weights: ["1 kg", "2 kg"],
      images: ["https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=800&q=80"],
      tags: ["New", "Featured"],
      ingredients: ["Belgian Chocolate", "French Butter", "Gold Leaf"],
      stock: true,
    };
    setProductsList([created, ...productsList]);
    setShowAddProductModal(false);
    setNewProductName("");
    setNewProductDesc("");
  };

  const handleDeleteProduct = (id: string) => {
    setProductsList(productsList.filter((p) => p.id !== id));
  };

  const handleAddDisabledDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDisabledDate && !disabledDates.includes(newDisabledDate)) {
      setDisabledDates([...disabledDates, newDisabledDate]);
      setNewDisabledDate("");
    }
  };

  const handleRemoveDisabledDate = (d: string) => {
    setDisabledDates(disabledDates.filter((date) => date !== d));
  };

  const handleBookingStatus = (id: string, status: string) => {
    setAdminBookings(
      adminBookings.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  return (
    <div className="pt-24 pb-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header Banner */}
        <div className="glass-gold-card p-6 rounded-3xl border border-brand-gold/40 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-brand-gold" />
              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-brand-burgundy">
                Sonicas Bake Admin Portal
              </h1>
            </div>
            <p className="text-xs font-poppins text-brand-midnight/70 mt-1">
              Store Control Suite • Live Sales, Inventory, Slot Capacities & Order Management
            </p>
          </div>

          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-5 py-2.5 rounded-full gold-btn font-poppins font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Cake</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Menu */}
          <aside className="lg:col-span-3">
            <div className="glass-card p-4 rounded-2xl border border-brand-pink/40 space-y-1 shadow-md">
              {[
                { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
                { id: "products", label: "Products Catalog", icon: ShoppingBag },
                { id: "bookings", label: "Booking Calendar", icon: CalendarIcon },
                { id: "orders", label: "Orders Management", icon: Clock },
                { id: "customers", label: "Customer CRM", icon: Users },
                { id: "reviews", label: "Review Moderation", icon: Star },
                { id: "coupons", label: "Promo Offers", icon: Tag },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
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

          {/* Main Workspace */}
          <main className="lg:col-span-9">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* 4 Stat Widgets - 2 in a row on mobile */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="glass-card p-3.5 sm:p-5 rounded-2xl border border-brand-gold/30 space-y-1 sm:space-y-2">
                    <span className="text-[10px] sm:text-[11px] font-poppins text-brand-midnight/60 font-semibold uppercase block truncate">
                      Today&apos;s Revenue
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-brand-burgundy truncate">
                      ₹48,950
                    </h3>
                    <span className="text-[9.5px] sm:text-[10px] text-emerald-600 font-semibold flex items-center gap-1 truncate">
                      <TrendingUp className="w-3 h-3 flex-shrink-0" /> +18.4% vs yesterday
                    </span>
                  </div>

                  <div className="glass-card p-3.5 sm:p-5 rounded-2xl border border-brand-gold/30 space-y-1 sm:space-y-2">
                    <span className="text-[10px] sm:text-[11px] font-poppins text-brand-midnight/60 font-semibold uppercase block truncate">
                      Today&apos;s Orders
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-brand-burgundy truncate">
                      16 Orders
                    </h3>
                    <span className="text-[9.5px] sm:text-[10px] text-amber-600 font-semibold block truncate">
                      4 Pending in Kitchen
                    </span>
                  </div>

                  <div className="glass-card p-3.5 sm:p-5 rounded-2xl border border-brand-gold/30 space-y-1 sm:space-y-2">
                    <span className="text-[10px] sm:text-[11px] font-poppins text-brand-midnight/60 font-semibold uppercase block truncate">
                      Active Custom Bookings
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-brand-burgundy truncate">
                      8 Bookings
                    </h3>
                    <span className="text-[9.5px] sm:text-[10px] text-brand-gold font-semibold block truncate">
                      Next: Aug 10 Gala
                    </span>
                  </div>

                  <div className="glass-card p-3.5 sm:p-5 rounded-2xl border border-brand-gold/30 space-y-1 sm:space-y-2">
                    <span className="text-[10px] sm:text-[11px] font-poppins text-brand-midnight/60 font-semibold uppercase block truncate">
                      Total Customers
                    </span>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-brand-burgundy truncate">
                      1,420
                    </h3>
                    <span className="text-[9.5px] sm:text-[10px] text-emerald-600 font-semibold block truncate">
                      94% Repeat Rate
                    </span>
                  </div>
                </div>

                {/* Popular Cakes Table & Quick Calendar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 glass-card p-6 rounded-2xl border border-brand-pink/40 space-y-4">
                    <h3 className="font-playfair text-lg font-bold text-brand-burgundy">
                      Top Selling Cakes This Month
                    </h3>
                    <div className="space-y-3">
                      {productsList.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/70 border border-brand-pink/30 text-xs font-poppins"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-brand-burgundy">{p.name}</p>
                              <p className="text-[10px] text-brand-midnight/50">{p.category}</p>
                            </div>
                          </div>
                          <span className="font-bold text-brand-burgundy">
                            {formatPrice(p.offerPrice || p.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 glass-card p-6 rounded-2xl border border-brand-gold/30 space-y-4">
                    <h3 className="font-playfair text-lg font-bold text-brand-burgundy">
                      Studio Status
                    </h3>
                    <div className="space-y-3 text-xs font-poppins">
                      <div className="flex justify-between p-2 rounded bg-emerald-50 text-emerald-800 font-semibold">
                        <span>Kitchen Capacity:</span>
                        <span>85% Full</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-amber-50 text-amber-800 font-semibold">
                        <span>Disabled Dates:</span>
                        <span>{disabledDates.length} Holiday(s)</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-purple-50 text-purple-800 font-semibold">
                        <span>Delivery Vans:</span>
                        <span>3 Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-playfair text-2xl font-bold text-brand-burgundy">
                    Cake Catalogue ({productsList.length} Items)
                  </h2>
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="px-4 py-2 rounded-full gold-btn text-xs font-semibold uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Cake</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {productsList.map((p) => (
                    <div
                      key={p.id}
                      className="glass-card p-4 rounded-2xl border border-brand-pink/40 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-playfair font-bold text-base text-brand-burgundy">
                            {p.name}
                          </h4>
                          <p className="text-xs text-brand-midnight/60 font-poppins">
                            {p.category} • {p.eggless ? "Eggless" : "With Egg"} • Rating: ★{p.rating}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <span className="font-playfair font-bold text-base text-brand-burgundy">
                          {formatPrice(p.offerPrice || p.price)}
                        </span>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BOOKINGS CALENDAR & HOLIDAY MANAGEMENT TAB */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-brand-burgundy">
                  Booking & Capacity Calendar
                </h2>

                {/* Disable Date Form */}
                <div className="glass-card p-6 rounded-2xl border border-brand-gold/30 space-y-4">
                  <h3 className="font-playfair text-lg font-bold text-brand-burgundy">
                    Disable Holiday / Fully Booked Dates
                  </h3>
                  <form onSubmit={handleAddDisabledDate} className="flex gap-3 max-w-md">
                    <input
                      type="date"
                      required
                      value={newDisabledDate}
                      onChange={(e) => setNewDisabledDate(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-brand-pink/60 text-xs font-poppins"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl burgundy-btn text-xs font-semibold uppercase"
                    >
                      Disable Date
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {disabledDates.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-poppins font-semibold"
                      >
                        <span>{d} (Blocked)</span>
                        <button
                          onClick={() => handleRemoveDisabledDate(d)}
                          className="hover:text-red-900 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Admin Bookings Table */}
                <div className="space-y-3">
                  <h3 className="font-playfair text-lg font-bold text-brand-burgundy">
                    Custom Bookings Received
                  </h3>
                  {adminBookings.map((b) => (
                    <div
                      key={b.id}
                      className="glass-card p-5 rounded-2xl border border-brand-pink/40 space-y-3 text-xs font-poppins"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <span className="font-bold text-brand-burgundy text-sm">{b.cake}</span>
                          <p className="text-brand-midnight/60">
                            Client: {b.customer} ({b.phone})
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            b.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-brand-midnight/80 pt-2 border-t border-brand-pink/30">
                        <span>Date: {b.date} ({b.slot})</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleBookingStatus(b.id, "Confirmed")}
                            className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-semibold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleBookingStatus(b.id, "Rejected")}
                            className="px-3 py-1 rounded-lg bg-red-600 text-white font-semibold"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS MODERATION TAB */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-brand-burgundy">
                  Review Moderation
                </h2>
                <div className="space-y-4">
                  {reviewsList.map((r) => (
                    <div
                      key={r.id}
                      className="glass-card p-5 rounded-2xl border border-brand-pink/40 space-y-2 text-xs font-poppins"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-brand-burgundy text-sm">{r.customerName}</h4>
                        <div className="flex text-amber-400">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-brand-midnight/80 italic">&ldquo;{r.comment}&rdquo;</p>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-brand-midnight/40 text-[10px]">On: {r.cakeName}</span>
                        <button
                          onClick={() => setReviewsList(reviewsList.filter((rev) => rev.id !== r.id))}
                          className="text-red-600 font-semibold hover:underline"
                        >
                          Remove Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROMO COUPONS TAB */}
            {activeTab === "coupons" && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-brand-burgundy">
                  Promo Offers & Discount Codes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {COUPONS.map((c) => (
                    <div
                      key={c.code}
                      className="glass-gold-card p-5 rounded-2xl border border-brand-gold/40 space-y-2 text-xs font-poppins"
                    >
                      <span className="px-3 py-1 rounded-md bg-brand-gold text-white font-bold tracking-wider">
                        {c.code}
                      </span>
                      <p className="text-brand-midnight/80 pt-2 font-medium">{c.description}</p>
                      <p className="text-[10px] text-brand-midnight/50">Min Order: ₹{c.minOrderValue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ORDERS & CUSTOMERS FALLBACK TABS */}
            {(activeTab === "orders" || activeTab === "customers") && (
              <div className="glass-card p-10 rounded-2xl text-center space-y-3">
                <LayoutDashboard className="w-10 h-10 text-brand-gold mx-auto" />
                <h3 className="font-playfair text-xl font-bold text-brand-burgundy">
                  Active Live Data Stream
                </h3>
                <p className="text-xs font-poppins text-brand-midnight/70">
                  All customer records and kitchen order progress updates are synced seamlessly.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowAddProductModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 z-10 border border-brand-gold shadow-2xl text-xs font-poppins">
            <h3 className="font-playfair text-2xl font-bold text-brand-burgundy">
              Add New Cake to Catalogue
            </h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block font-bold text-brand-burgundy mb-1">Cake Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Imperial Belgian Chocolate Truffle"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-burgundy mb-1">Category</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Cupcakes">Cupcakes</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-brand-burgundy mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-burgundy mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter gourmet description..."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-full border border-brand-burgundy text-brand-burgundy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full gold-btn font-bold uppercase"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
