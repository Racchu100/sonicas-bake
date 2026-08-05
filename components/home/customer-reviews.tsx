"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Sparkles, Quote } from "lucide-react";
import { REVIEWS } from "@/lib/data";

export function CustomerReviews() {
  return (
    <section className="py-20 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Google Rating Badge */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold-card border border-brand-gold/40 text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider shadow">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="font-bold text-brand-burgundy text-sm">4.9 / 5.0</span>
            <span className="text-brand-midnight/60 font-medium font-poppins text-[11px]">
              (500+ Google Reviews)
            </span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-brand-burgundy">
            Stories of Sweet Celebrations
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70">
            Read authentic reviews from clients who trusted Sonicas Bake for their weddings, birthdays, and grand galas.
          </p>
        </div>

        {/* Reviews Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 rounded-3xl border border-brand-gold/30 shadow-luxury flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-brand-gold/30 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-poppins text-xs sm:text-sm text-brand-midnight/80 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Ordered Cake Badge */}
                <div className="inline-block px-3 py-1 rounded-md bg-brand-pink/40 text-[11px] font-poppins font-medium text-brand-burgundy border border-brand-pink">
                  Ordered: <span className="font-semibold">{rev.cakeName}</span>
                </div>
              </div>

              {/* Customer Profile Footer */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-brand-pink/30">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold flex-shrink-0">
                  <Image src={rev.avatar} alt={rev.customerName} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-playfair font-bold text-sm text-brand-burgundy">
                      {rev.customerName}
                    </h4>
                    {rev.verifiedBuyer && (
                      <span title="Verified Customer">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-poppins text-brand-midnight/50">{rev.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
