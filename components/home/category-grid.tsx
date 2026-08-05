"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export function CategoryGrid() {
  return (
    <section className="py-20 bg-brand-pinkSoft/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-brand-burgundy">
              Explore By Category
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70 max-w-xl">
              From majestic wedding tiers to artisanal bite-sized cupcakes, discover our handcrafted baked luxuries.
            </p>
          </div>

          <Link
            href="/cakes"
            className="inline-flex items-center gap-2 text-xs font-poppins font-bold uppercase tracking-wider text-brand-burgundy hover:text-brand-gold transition-colors"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                href={`/cakes?category=${cat.slug}`}
                className="group relative block h-64 sm:h-72 rounded-2xl overflow-hidden glass-gold-card shadow-md hover:shadow-xl transition-all duration-300 border border-brand-gold/30"
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/80 via-brand-midnight/30 to-transparent group-hover:from-brand-burgundy/80 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white z-10">
                  <span className="text-[10px] font-poppins uppercase tracking-widest text-brand-gold font-semibold">
                    {cat.itemCount} Designs Available
                  </span>
                  <h3 className="font-playfair text-xl font-bold text-white group-hover:text-brand-goldLight transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-poppins font-medium text-white/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <span>Explore Collection</span>
                    <ChevronRight className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
