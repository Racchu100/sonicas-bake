"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Award, Truck, Palette, Leaf } from "lucide-react";

const PILLARS = [
  {
    icon: Leaf,
    title: "100% Organic Ingredients",
    description: "Finest Grade-A French butter, organic Madagascar vanilla beans, and non-GMO unbleached flour.",
  },
  {
    icon: Heart,
    title: "Handmade Artisanal Care",
    description: "Every sponge is baked fresh from scratch in small batches by master pastry chefs.",
  },
  {
    icon: Award,
    title: "70% Belgian Chocolate",
    description: "Authentic Valrhona and Callebaut chocolate ganache with 24-Karat edible gold accents.",
  },
  {
    icon: Truck,
    title: "White-Glove Home Delivery",
    description: "Temperature-controlled luxury vehicle transit to ensure your cake arrives in immaculate condition.",
  },
  {
    icon: Palette,
    title: "Bespoke Customization",
    description: "Collaborate with our head cake designer to turn your moodboard and reference images into reality.",
  },
];

export function WhySonicas() {
  return (
    <section className="py-20 bg-brand-pinkSoft/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>The Sonicas Standard</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-brand-burgundy">
            Why Discerning Connoisseurs Choose Us
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70">
            Uncompromising commitment to culinary excellence, aesthetic perfection, and effortless luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-gold-card p-6 rounded-2xl border border-brand-gold/30 shadow-md text-center space-y-3 flex flex-col items-center justify-start"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-burgundy to-brand-gold p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-brand-burgundy">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-playfair text-lg font-bold text-brand-burgundy">
                  {pillar.title}
                </h3>
                <p className="font-poppins text-xs text-brand-midnight/70 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
