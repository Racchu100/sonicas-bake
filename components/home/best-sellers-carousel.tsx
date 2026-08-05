"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Flame } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export function BestSellersCarousel() {
  const { addToCart } = useCart();
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? bestSellers.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === bestSellers.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-poppins text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>Most Loved by Connoisseurs</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-brand-burgundy mt-2">
            Best Seller Showcase
          </h2>
        </div>

        {/* Carousel Active Showcase Wrapper */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Cake"
            className="absolute left-2 sm:-left-5 top-1/3 sm:top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/95 border border-brand-gold/60 text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-all shadow-xl flex items-center justify-center cursor-pointer group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Cake"
            className="absolute right-2 sm:-right-5 top-1/3 sm:top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/95 border border-brand-gold/60 text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-all shadow-xl flex items-center justify-center cursor-pointer group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center glass-gold-card p-4 sm:p-8 rounded-3xl border border-brand-gold/40 shadow-2xl">
            {/* Product Big Image */}
            <div className="lg:col-span-6 relative h-[260px] sm:h-[380px] rounded-2xl overflow-hidden">
              <Image
                src={bestSellers[currentIndex].images[0]}
                alt={bestSellers[currentIndex].name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-brand-gold text-white font-poppins text-[11px] font-bold px-3 py-1 rounded-full uppercase shadow">
                #1 Customer Favorite
              </div>
            </div>

            {/* Product Details & Actions */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-xs font-poppins text-brand-midnight/60">
                <span className="bg-brand-pink/50 px-2.5 py-0.5 rounded-full font-semibold text-brand-burgundy">
                  {bestSellers[currentIndex].category}
                </span>
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span>{bestSellers[currentIndex].rating}</span>
                  <span className="text-brand-midnight/40 ml-1">
                    ({bestSellers[currentIndex].reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-brand-burgundy leading-snug">
                {bestSellers[currentIndex].name}
              </h3>

              <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70 leading-relaxed">
                {bestSellers[currentIndex].description}
              </p>

              <div className="space-y-1.5 text-xs font-poppins">
                <p className="font-bold text-brand-burgundy">Key Ingredients:</p>
                <div className="flex flex-wrap gap-1.5">
                  {bestSellers[currentIndex].ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white border border-brand-pink/60 text-brand-midnight/80 text-[11px]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-brand-pink/40 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-brand-midnight/50 uppercase tracking-widest block font-poppins">
                    Special Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-playfair text-2xl sm:text-3xl font-bold text-brand-burgundy">
                      {formatPrice(
                        bestSellers[currentIndex].offerPrice || bestSellers[currentIndex].price
                      )}
                    </span>
                    {bestSellers[currentIndex].offerPrice && (
                      <span className="text-xs sm:text-sm line-through text-brand-midnight/40 font-poppins">
                        {formatPrice(bestSellers[currentIndex].price)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Link
                    href={`/cakes/${bestSellers[currentIndex].id}`}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-all text-xs font-semibold uppercase tracking-wider"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      addToCart({
                        product: bestSellers[currentIndex],
                        selectedWeight: bestSellers[currentIndex].weights[0],
                        selectedFlavor: bestSellers[currentIndex].flavors[0],
                        eggless: bestSellers[currentIndex].eggless,
                        quantity: 1,
                      })
                    }
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full gold-btn text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
