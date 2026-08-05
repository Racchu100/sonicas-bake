"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  Upload,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Cake,
  Palette,
  CreditCard,
  Printer,
  Share2,
  FileText,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { CakeBooking } from "@/types";

const CAKE_SHAPES = [
  { name: "Classic Round Tier", image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=400&q=80" },
  { name: "Romantic Heart Shape", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80" },
  { name: "Opulent Square Tower", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" },
  { name: "3-Tier Wedding Grand", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=400&q=80" },
];

const FLAVORS = [
  "Belgian Dark Chocolate 70%",
  "Swiss Salted Caramel Praline",
  "Velvet Rose & Pink Champagne",
  "Sicilian Pistachio & Blueberry",
  "Lotus Biscoff Speculoos",
  "Madagascar Vanilla Bean Chantilly",
];

const TIME_SLOTS = [
  "10:00 AM - 01:00 PM (Morning Slot)",
  "02:00 PM - 05:00 PM (Afternoon Slot)",
  "06:00 PM - 09:00 PM (Evening Gala Slot)",
];

export default function CustomCakeBuilderPage() {
  const { addBooking } = useCart();
  const [step, setStep] = useState(1);

  // Form State
  const [shape, setShape] = useState("Classic Round Tier");
  const [weightKg, setWeightKg] = useState(2);
  const [flavor, setFlavor] = useState("Belgian Dark Chocolate 70%");
  const [eggless, setEggless] = useState(true);
  const [colorTheme, setColorTheme] = useState("Burgundy & 24K Gold");
  const [customMessage, setCustomMessage] = useState("");
  const [refImage, setRefImage] = useState<string | null>(null);

  const [minDateStr, setMinDateStr] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];
    setMinDateStr(dateStr);
    setDeliveryDate(dateStr);
  }, []);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Online" | "COD">("Online");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Booking result
  const [confirmedBooking, setConfirmedBooking] = useState<CakeBooking | null>(null);

  const pricePerKg = 1500;
  const estimatedPrice = weightKg * pricePerKg + (shape.includes("3-Tier") ? 1000 : 0);

  const handleRefUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRefImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newBooking: CakeBooking = {
      id: `SB-BOOK-${Math.floor(100000 + Math.random() * 900000)}`,
      cakeName: `${shape} (${colorTheme})`,
      weight: `${weightKg} kg`,
      flavor,
      eggless,
      customMessage,
      referenceImageUrl: refImage || undefined,
      deliveryDate,
      deliveryTimeSlot: timeSlot,
      customerName,
      phone,
      email,
      address,
      specialInstructions: specialNotes,
      paymentMethod,
      paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
      totalAmount: estimatedPrice,
      status: "Received",
      createdAt: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    };

    setTimeout(() => {
      addBooking(newBooking);
      setConfirmedBooking(newBooking);
      setIsSubmitting(false);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#8B1E3F", "#D4AF37", "#F5D6E6", "#FFFFFF"],
        });
      } catch (err) {
        console.error(err);
      }
    }, 400);
  };

  return (
    <div className="pt-24 pb-12 bg-brand-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Artisanal Studio Studio</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-brand-burgundy">
            Bespoke Custom Cake Builder
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70">
            Design your dream cake step-by-step. Select custom shapes, weights, color themes, and reserve your white-glove delivery date.
          </p>
        </div>

        {!confirmedBooking ? (
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-2xl space-y-8">
            {/* Step Wizard Progress Bar */}
            <div className="flex items-center justify-between border-b border-brand-pink/40 pb-6 text-xs font-poppins">
              {[
                { step: 1, label: "Design & Shape" },
                { step: 2, label: "Weight & Flavor" },
                { step: 3, label: "Piping & Image" },
                { step: 4, label: "Slot & Address" },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`flex items-center gap-2 ${
                    step >= s.step ? "text-brand-burgundy font-bold" : "text-brand-midnight/40"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      step >= s.step ? "bg-brand-gold text-white" : "bg-brand-pink/50 text-brand-midnight/60"
                    }`}
                  >
                    {s.step}
                  </div>
                  <span className="hidden md:inline">{s.label}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: Shape & Design */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="font-playfair text-2xl font-bold text-brand-burgundy flex items-center gap-2">
                  <Cake className="w-6 h-6 text-brand-gold" />
                  <span>Step 1: Choose Cake Structure & Shape</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CAKE_SHAPES.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setShape(item.name)}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-3 glass-card ${
                        shape === item.name
                          ? "border-brand-gold shadow-lg scale-105"
                          : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <h4 className="font-playfair font-bold text-sm text-brand-burgundy text-center">
                        {item.name}
                      </h4>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-brand-pink/40">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-full gold-btn font-poppins font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap shadow-md"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Weight & Flavor */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-xs font-poppins">
                <h3 className="font-playfair text-2xl font-bold text-brand-burgundy flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-brand-gold" />
                  <span>Step 2: Weight & Gourmet Flavor</span>
                </h3>

                {/* Weight Slider */}
                <div className="glass-card p-6 rounded-2xl border border-brand-pink/50 space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold text-brand-burgundy">
                    <span>Weight Selector: {weightKg} kg</span>
                    <span className="text-brand-gold">Estimated Servings: {weightKg * 8 - 2} to {weightKg * 8 + 4} Guests</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={0.5}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-brand-gold cursor-pointer"
                  />
                  <p className="text-[11px] text-brand-midnight/60">
                    Need larger 10kg+ corporate or wedding grand tiers? Mention special notes in Step 4.
                  </p>
                </div>

                {/* Flavor Selection */}
                <div>
                  <label className="block font-bold text-brand-burgundy text-sm mb-2">
                    Select Gourmet Flavor & Sponge:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FLAVORS.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFlavor(f)}
                        className={`p-3.5 rounded-xl border text-left font-medium transition-all ${
                          flavor === f
                            ? "border-brand-gold bg-brand-pinkSoft/60 text-brand-burgundy font-bold shadow-sm"
                            : "border-gray-200 text-brand-midnight/70 hover:border-brand-gold"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diet Preference */}
                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-brand-burgundy text-sm">Dietary Choice:</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEggless(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                        eggless ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      100% Eggless
                    </button>
                    <button
                      type="button"
                      onClick={() => setEggless(false)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                        !eggless ? "bg-amber-700 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      With Egg
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-brand-pink/40">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-full border border-brand-burgundy text-brand-burgundy font-semibold text-xs hover:bg-brand-burgundy hover:text-white transition-all whitespace-nowrap"
                  >
                    ‹ Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-full gold-btn font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap shadow-md"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Message & Reference Image */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-xs font-poppins">
                <h3 className="font-playfair text-2xl font-bold text-brand-burgundy flex items-center gap-2">
                  <Palette className="w-6 h-6 text-brand-gold" />
                  <span>Step 3: Color Palette & Inscriptions</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-bold text-brand-burgundy text-sm mb-2">
                      Color Palette & Aesthetic Theme:
                    </label>
                    <select
                      value={colorTheme}
                      onChange={(e) => setColorTheme(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    >
                      <option value="Burgundy & 24K Gold">Sonicas Signature: Burgundy & 24K Gold</option>
                      <option value="Blush Pink & Rose Gold">Soft Blush Pink & Rose Gold</option>
                      <option value="Midnight Espresso & Dark Chocolate">Midnight Espresso & Dark Chocolate</option>
                      <option value="Pastel Lavender & White Pearl">Pastel Lavender & White Pearl</option>
                      <option value="Emerald Green & Gold Leaf">Emerald Green & Gold Leaf</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-brand-burgundy text-sm mb-2">
                      Custom Message Piped on Cake:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Happy 25th Anniversary Mom & Dad!"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                {/* Reference Photo Dropzone */}
                <div>
                  <label className="block font-bold text-brand-burgundy text-sm mb-2">
                    Upload Reference Image or Pinterest Design Concept:
                  </label>
                  <label className="border-2 border-dashed border-brand-gold/50 hover:border-brand-gold rounded-2xl p-6 text-center cursor-pointer bg-white/50 block transition-all">
                    <Upload className="w-8 h-8 text-brand-gold mx-auto mb-2" />
                    <span className="text-xs font-semibold text-brand-burgundy block">
                      {refImage ? "Reference Image Uploaded Successfully!" : "Click to select image file"}
                    </span>
                    <span className="text-[10px] text-brand-midnight/50">PNG, JPG, WEBP accepted (Max 10MB)</span>
                    <input type="file" accept="image/*" onChange={handleRefUpload} className="hidden" />
                  </label>
                  {refImage && (
                    <div className="mt-3 flex justify-center">
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-brand-gold shadow">
                        <Image src={refImage} alt="Ref Upload" fill className="object-cover" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-brand-pink/40">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-full border border-brand-burgundy text-brand-burgundy font-semibold text-xs hover:bg-brand-burgundy hover:text-white transition-all whitespace-nowrap"
                  >
                    ‹ Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 rounded-full gold-btn font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap shadow-md"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Slot Picker & Customer Form */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-xs font-poppins">
                <h3 className="font-playfair text-2xl font-bold text-brand-burgundy flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-brand-gold" />
                  <span>Step 4: Delivery Date, Slot & Contact</span>
                </h3>

                <form onSubmit={handleCompleteBooking} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date Picker */}
                    <div>
                      <label className="block font-bold text-brand-burgundy text-sm mb-1">
                        Delivery Date (Past dates disabled):
                      </label>
                      <input
                        type="date"
                        min={minDateStr}
                        required
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>

                    {/* Time Slot Picker */}
                    <div>
                      <label className="block font-bold text-brand-burgundy text-sm mb-1">
                        Select Delivery Time Slot:
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      >
                        {TIME_SLOTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-brand-burgundy text-sm mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Roy"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-burgundy text-sm mb-1">WhatsApp Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-burgundy text-sm mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. ananya@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-brand-burgundy text-sm mb-1">Complete Delivery Address</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House No, Apartment, Street, Landmark, Pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  {/* Payment Selection */}
                  <div>
                    <label className="block font-bold text-brand-burgundy text-sm mb-2">Payment Choice:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Online")}
                        className={`p-4 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                          paymentMethod === "Online"
                            ? "gold-btn shadow-md"
                            : "bg-white border-gray-200 text-brand-midnight/70"
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span>Online Razorpay / UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("COD")}
                        className={`p-4 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
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

                  {/* Summary & Submit */}
                  <div className="pt-4 border-t border-brand-pink/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-brand-midnight/50 font-bold block">
                        Estimated Custom Price
                      </span>
                      <span className="font-playfair text-3xl font-bold text-brand-burgundy">
                        {formatPrice(estimatedPrice)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-4 py-2 rounded-full border border-brand-burgundy text-brand-burgundy font-semibold text-xs hover:bg-brand-burgundy hover:text-white transition-all whitespace-nowrap"
                      >
                        ‹ Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 rounded-full gold-btn font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg whitespace-nowrap cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Sparkles className="w-4 h-4 animate-spin" />
                            <span>Confirming...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Confirm Booking</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        ) : (
          /* CONFIRMED BOOKING INVOICE CARD */
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="glass-gold-card p-8 sm:p-12 rounded-3xl border border-brand-gold shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-poppins uppercase tracking-widest text-brand-gold font-bold">
                  Booking Confirmed!
                </span>
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-brand-burgundy">
                  Invoice & Booking Receipt
                </h2>
                <p className="text-xs font-poppins text-brand-midnight/70">
                  Order ID: <span className="font-bold text-brand-burgundy">{confirmedBooking.id}</span>
                </p>
              </div>

              {/* Invoice Table Grid */}
              <div className="max-w-xl mx-auto glass-card p-6 rounded-2xl border border-brand-pink/50 text-xs font-poppins text-left space-y-3">
                <div className="flex justify-between pb-2 border-b border-brand-pink/30">
                  <span className="text-brand-midnight/60">Customer Name:</span>
                  <span className="font-bold text-brand-burgundy">{confirmedBooking.customerName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-brand-pink/30">
                  <span className="text-brand-midnight/60">Phone / WhatsApp:</span>
                  <span className="font-bold text-brand-burgundy">{confirmedBooking.phone}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-brand-pink/30">
                  <span className="text-brand-midnight/60">Custom Cake Specification:</span>
                  <span className="font-bold text-brand-burgundy">{confirmedBooking.cakeName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-brand-pink/30">
                  <span className="text-brand-midnight/60">Weight & Flavor:</span>
                  <span className="font-bold text-brand-burgundy">
                    {confirmedBooking.weight} • {confirmedBooking.flavor} ({confirmedBooking.eggless ? "Eggless" : "With Egg"})
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-brand-pink/30">
                  <span className="text-brand-midnight/60">Reserved Date & Slot:</span>
                  <span className="font-bold text-brand-gold">{confirmedBooking.deliveryDate} ({confirmedBooking.deliveryTimeSlot})</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-playfair font-bold text-brand-burgundy">
                  <span>Total Amount Paid:</span>
                  <span>{formatPrice(confirmedBooking.totalAmount)}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-full border border-brand-burgundy text-brand-burgundy text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-brand-burgundy hover:text-white transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tax Invoice</span>
                </button>

                <Link
                  href="/dashboard"
                  className="px-8 py-3 rounded-full gold-btn text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Track in User Dashboard</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
