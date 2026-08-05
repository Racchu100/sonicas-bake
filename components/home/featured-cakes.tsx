"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, Eye, ShoppingBag, Sparkles, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { QuickViewModal } from "@/components/ui/quick-view-modal";

export function FeaturedCakes() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const featuredList = PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 6);

  const handleQuickAdd = (product: Product) => {
    addToCart({
      product,
      selectedWeight: product.weights[0] || "1 kg",
      selectedFlavor: product.flavors[0] || "Chocolate",
      eggless: product.eggless,
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-20 bg-brand-bg relative overflow-hidden">
      {/* Decorative Gold Sparkles Background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/50 text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Chef&apos;s Signature Collection</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-brand-burgundy">
            Featured Luxury Creations
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70">
            Handcrafted daily using fine Belgian chocolate, organic vanilla, and edible gold accents.
          </p>
        </div>

        {/* 3D Lift Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredList.map((product, idx) => {
            const inWishlist = isInWishlist(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl overflow-hidden border border-brand-pink/50 shadow-luxury transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Container with Badges & Hover Overlay */}
                <div className="relative h-64 w-full overflow-hidden bg-brand-pinkSoft/40">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.isBestSeller && (
                      <span className="px-3 py-1 rounded-full gold-btn text-[10px] font-bold uppercase tracking-wider shadow">
                        Best Seller
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-brand-burgundy text-[10px] font-semibold tracking-wider shadow">
                      {product.eggless ? "Eggless" : "With Egg"}
                    </span>
                  </div>

                  {/* Top Right Wishlist Action */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-md transition-all ${
                      inWishlist ? "text-red-500" : "text-brand-burgundy hover:text-red-500"
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? "fill-red-500" : ""}`} />
                  </button>

                  {/* Quick View Hover Trigger Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="px-4 py-2 rounded-full bg-white/90 text-brand-burgundy text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:bg-brand-burgundy hover:text-white transition-all transform -translate-y-2 group-hover:translate-y-0"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-brand-midnight/60 font-poppins mb-1">
                      <span>{product.category}</span>
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <Link href={`/cakes/${product.id}`}>
                      <h3 className="font-playfair text-xl font-bold text-brand-burgundy group-hover:text-brand-gold transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-brand-midnight/70 font-poppins line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Footer Price & Add To Cart */}
                  <div className="pt-3 border-t border-brand-pink/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-brand-midnight/50 uppercase tracking-widest block font-poppins">
                        Starting from
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-playfair text-xl font-bold text-brand-burgundy">
                          {formatPrice(product.offerPrice || product.price)}
                        </span>
                        {product.offerPrice && (
                          <span className="text-xs line-through text-brand-midnight/40 font-poppins">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={addedId === product.id}
                      className="px-4 py-2.5 rounded-full gold-btn font-poppins font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/cakes"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full burgundy-btn font-poppins font-semibold text-xs uppercase tracking-widest shadow-lg"
          >
            <span>Explore All Cakes</span>
            <Sparkles className="w-4 h-4 text-brand-gold" />
          </Link>
        </div>
      </div>

      {/* Modal View */}
      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
