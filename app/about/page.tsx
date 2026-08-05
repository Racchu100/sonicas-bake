"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Award, Heart, Leaf, ShieldCheck, ChevronRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-16 pb-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Our Haute Couture Heritage</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-brand-burgundy leading-tight">
            The Story of Sonicas Bake
          </h1>
          <p className="font-poppins text-sm sm:text-base text-brand-midnight/70 leading-relaxed">
            Where classical French pastry tradition meets contemporary luxury cake artistry.
          </p>
        </div>

        {/* Narrative Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden glass-gold-card border border-brand-gold/40 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=1000&q=80"
              alt="Sonicas Bake Studio Craftsmanship"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-brand-burgundy">
              Baking Sweet Artistry Since 2018
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-brand-midnight/80 leading-relaxed">
              Founded in Hyderabad by executive pastry chef Sonica, Sonicas Bake was created with a single vision: to transform standard celebrations into extraordinary memories with haute couture cake design.
            </p>
            <p className="font-poppins text-xs sm:text-sm text-brand-midnight/80 leading-relaxed">
              Every creation is built using 70% dark Belgian chocolate ganache, organic Madagascar vanilla beans, fresh French butter, and hand-gilded 24-Karat edible gold leaf.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-pink/40 text-xs font-poppins">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="font-bold text-brand-burgundy">100% Eggless Mastery</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="font-bold text-brand-burgundy">Master Pastry Chefs</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-gold-card p-10 rounded-3xl text-center space-y-4 border border-brand-gold/40 shadow-xl max-w-3xl mx-auto">
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-brand-burgundy">
            Ready to Design Your Custom Masterpiece?
          </h3>
          <p className="text-xs sm:text-sm font-poppins text-brand-midnight/70">
            Collaborate directly with our cake designers to tailor colors, flavors, and structural tiers.
          </p>
          <Link
            href="/custom-cake"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full gold-btn font-poppins font-bold text-xs uppercase tracking-wider shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Custom Builder</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
