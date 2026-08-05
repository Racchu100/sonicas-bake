"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ZoomIn, Heart } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "Tiered" | "Floral" | "Minimalist" | "Modern Gold";
  image: string;
  likes: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "4-Tier Royal Burgundy & Gold Wedding Sculpt",
    category: "Tiered",
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=800&q=80",
    likes: 342,
  },
  {
    id: "g2",
    title: "Hand-Piped Cream Meringue Rose Tower",
    category: "Floral",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    likes: 218,
  },
  {
    id: "g3",
    title: "Sleek Midnight Chocolate Velvet Minimalist",
    category: "Minimalist",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    likes: 195,
  },
  {
    id: "g4",
    title: "24K Edible Gold Leaf Champagne Masterpiece",
    category: "Modern Gold",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
    likes: 412,
  },
  {
    id: "g5",
    title: "Whimsical Pastel Meringue & Spun Pearls",
    category: "Floral",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
    likes: 167,
  },
  {
    id: "g6",
    title: "Parisian Macaron Tower Tiered Stand",
    category: "Tiered",
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=800&q=80",
    likes: 289,
  },
];

export function PinterestGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="py-20 bg-brand-pinkSoft/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Visual Inspiration</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-brand-burgundy">
            Couture Cake Gallery
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70">
            Immerse yourself in our portfolio of wedding centerpieces and bespoke celebratory designs.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {["All", "Tiered", "Floral", "Minimalist", "Modern Gold"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-poppins font-medium transition-all ${
                  activeFilter === filter
                    ? "gold-btn font-semibold shadow-md"
                    : "glass-card text-brand-burgundy hover:bg-brand-pink/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative rounded-2xl overflow-hidden glass-card group cursor-pointer border border-brand-gold/30 shadow-md"
              onClick={() => setActiveLightbox(item)}
            >
              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity text-brand-burgundy">
                  <ZoomIn className="w-5 h-5" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-poppins uppercase tracking-widest text-brand-gold font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-playfair font-bold text-lg text-white leading-tight mt-0.5">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mt-2 font-poppins">
                    <Heart className="w-4 h-4 text-brand-gold fill-brand-gold" />
                    <span>{item.likes} Admirers</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 py-10 sm:py-12 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightbox(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[85vh] sm:max-h-[90vh] bg-white rounded-3xl overflow-y-auto z-10 shadow-2xl border border-brand-gold/40 grid grid-cols-1 md:grid-cols-2 my-auto"
            >
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-all shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-48 sm:h-64 md:h-full min-h-[220px] sm:min-h-[350px]">
                <Image
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-poppins font-semibold uppercase tracking-widest text-brand-gold">
                    {activeLightbox.category} Creation
                  </span>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-brand-burgundy mt-1">
                    {activeLightbox.title}
                  </h3>
                  <p className="text-xs font-poppins text-brand-midnight/70 mt-3 leading-relaxed">
                    Designed and handcrafted in our Hyderabad bake studio. Request a custom variation tailored to your theme and flavor preferences.
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-pink/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-poppins text-brand-midnight/80">
                    <span>Admirers:</span>
                    <span className="font-bold text-brand-burgundy">{activeLightbox.likes} Likes</span>
                  </div>
                  <a
                    href="/custom-cake"
                    onClick={() => setActiveLightbox(null)}
                    className="w-full py-3.5 rounded-full gold-btn font-poppins font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Recreate This Custom Design</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
