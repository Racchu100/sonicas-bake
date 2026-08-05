"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Heart, ShoppingBag, Check, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [customMessage, setCustomMessage] = useState<string>("");
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (product) {
      setSelectedWeight(product.weights[0] || "1 kg");
      setSelectedFlavor(product.flavors[0] || "Chocolate Truffle");
      setIsEggless(product.eggless);
      setCustomMessage("");
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      product,
      selectedWeight,
      selectedFlavor,
      eggless: isEggless,
      customMessage: customMessage.trim(),
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 py-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
          className="relative w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto z-10 grid grid-cols-1 md:grid-cols-2 border border-brand-gold/30 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-all shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Product Image */}
          <div className="relative h-48 sm:h-60 md:h-full bg-brand-pinkSoft/40 min-h-[200px] sm:min-h-[300px]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isBestSeller && (
                <span className="px-3 py-1 rounded-full gold-btn text-[10px] font-bold uppercase tracking-wider">
                  Best Seller
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/90 text-brand-burgundy text-[10px] font-bold uppercase tracking-wider shadow">
                {isEggless ? "100% Eggless" : "Contains Egg"}
              </span>
            </div>
          </div>

          {/* Product Details Form */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-[10px] font-poppins font-semibold uppercase tracking-widest text-brand-gold">
                {product.category} Collection
              </span>
              <h2 className="font-playfair text-2xl font-bold text-brand-burgundy mt-0.5">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold ml-1 text-brand-midnight">{product.rating}</span>
                </div>
                <span className="text-brand-midnight/40">•</span>
                <span className="text-brand-midnight/60 font-poppins">({product.reviewsCount} Reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-playfair text-2xl font-bold text-brand-burgundy">
                  {formatPrice(product.offerPrice || product.price)}
                </span>
                {product.offerPrice && (
                  <span className="text-sm font-poppins line-through text-brand-midnight/40">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <p className="text-xs text-brand-midnight/70 font-poppins mt-3 leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-brand-pink/40 text-xs font-poppins">
              {/* Weight Selector */}
              <div>
                <label className="block font-semibold text-brand-burgundy mb-1.5">Select Weight:</label>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedWeight === w
                          ? "border-brand-gold bg-brand-pinkSoft/60 text-brand-burgundy font-bold shadow-sm"
                          : "border-gray-200 text-brand-midnight/70 hover:border-brand-gold/50"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eggless Option Toggle */}
              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold text-brand-burgundy">Dietary Choice:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEggless(true)}
                    className={`px-3 py-1 rounded-md text-xs transition-all ${
                      isEggless ? "bg-emerald-100 text-emerald-800 font-bold border border-emerald-300" : "text-gray-500"
                    }`}
                  >
                    Eggless
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEggless(false)}
                    className={`px-3 py-1 rounded-md text-xs transition-all ${
                      !isEggless ? "bg-amber-100 text-amber-800 font-bold border border-amber-300" : "text-gray-500"
                    }`}
                  >
                    With Egg
                  </button>
                </div>
              </div>

              {/* Custom Cake Message */}
              <div>
                <label className="block font-semibold text-brand-burgundy mb-1">
                  Message on Cake (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Happy 30th Birthday Rahul!"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  maxLength={40}
                  className="w-full px-3 py-1.5 rounded-lg border border-brand-pink/60 text-xs text-brand-midnight focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="flex-1 py-3 rounded-full gold-btn font-poppins font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-full border transition-all ${
                  inWishlist
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-brand-pink/80 text-brand-burgundy hover:bg-brand-pink/30"
                }`}
                title="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
