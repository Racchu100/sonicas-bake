"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Award, Star, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gradient-to-b from-brand-bg via-brand-pinkSoft/40 to-brand-bg">
      {/* Dynamic Background Parallax Glow & Ambient Light */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-radial from-brand-pink to-transparent rounded-full filter blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-radial from-brand-goldLight to-transparent rounded-full filter blur-[140px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold text-brand-burgundy leading-[1.1] tracking-tight"
            >
              Every Celebration <br />
              <span className="gold-gradient-text italic font-serif">Deserves</span> A Beautiful <br />
              Cake.
            </motion.h1>

            {/* Subtext Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="font-poppins text-base md:text-lg text-brand-midnight/80 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Handcrafted couture cakes baked daily with 70% Belgian chocolate, organic vanilla beans, and 24-Karat edible gold leaf. Designed to elevate your special moments.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/cakes"
                className="w-full sm:w-auto px-8 py-4 rounded-full gold-btn font-poppins font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
              >
                <span>Order Cake</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/custom-cake"
                className="w-full sm:w-auto px-8 py-4 rounded-full glass-card border border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-all font-poppins font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Custom Cake Builder</span>
              </Link>
            </motion.div>

            {/* Social Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="pt-6 flex items-center justify-center lg:justify-start gap-8 text-xs font-poppins text-brand-midnight/70 border-t border-brand-pink/50 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <span className="font-playfair font-bold text-xl text-brand-burgundy block">15,000+</span>
                <span>Celebrations Served</span>
              </div>
              <div className="h-8 w-px bg-brand-pink/60" />
              <div>
                <span className="font-playfair font-bold text-xl text-brand-burgundy block">100%</span>
                <span>Eggless Options</span>
              </div>
              <div className="h-8 w-px bg-brand-pink/60" />
              <div>
                <span className="font-playfair font-bold text-xl text-brand-burgundy block">Same Day</span>
                <span>White-Glove Delivery</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Parallax 3D Floating Cake Display */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Rotating Decorative Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-brand-gold/40 pointer-events-none"
            />

            {/* Main Floating Showcase Image */}
            <motion.div
              animate={{
                y: [0, -16, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[300px] h-[360px] sm:w-[380px] sm:h-[460px] rounded-3xl overflow-hidden glass-gold-card p-3 shadow-2xl"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=1000&q=80"
                  alt="Sonicas Bake Royal Gold Crown Cake"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-card text-brand-burgundy border border-brand-gold/30">
                  <p className="text-[10px] font-poppins uppercase tracking-widest text-brand-gold font-semibold">
                    Chef&apos;s Masterpiece
                  </p>
                  <h3 className="font-playfair text-base font-bold text-brand-burgundy">
                    The Royal 24K Gold Crown
                  </h3>
                  <p className="text-[11px] font-poppins text-brand-midnight/70">
                    70% Belgian Dark Truffle & Gold Leaf
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Mini Accent Card */}
            <motion.div
              animate={{
                y: [0, 14, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-4 sm:left-2 glass-card p-3.5 rounded-2xl shadow-xl border border-brand-gold/40 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-brand-burgundy">
                <Sparkles className="w-5 h-5 text-brand-gold animate-spin" />
              </div>
              <div>
                <p className="text-xs font-playfair font-bold text-brand-burgundy">100% Fresh Daily</p>
                <p className="text-[10px] font-poppins text-brand-midnight/70">No Artificial Preservatives</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-brand-burgundy/60 text-[10px] font-poppins uppercase tracking-widest"
      >
        <span>Scroll to Explore</span>
        <ArrowDown className="w-4 h-4 text-brand-gold" />
      </motion.div>
    </section>
  );
}
