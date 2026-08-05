"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Star,
  Heart,
  Eye,
  ShoppingBag,
  Sparkles,
  X,
  Check,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { QuickViewModal } from "@/components/ui/quick-view-modal";

function CakesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [dietFilter, setDietFilter] = useState<"All" | "Eggless" | "Egg">("All");
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedFlavor, setSelectedFlavor] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Extract all available flavors
  const allFlavors = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.flavors.forEach((f) => set.add(f)));
    return Array.from(set);
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search keyword
      if (
        searchTerm &&
        !p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !p.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Category
      if (selectedCategory !== "All") {
        const catObj = CATEGORIES.find(
          (c) => c.slug.toLowerCase() === selectedCategory.toLowerCase() || c.name.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (catObj && p.category.toLowerCase() !== catObj.name.toLowerCase()) {
          return false;
        }
      }

      // Diet
      if (dietFilter === "Eggless" && !p.eggless) return false;
      if (dietFilter === "Egg" && p.eggless) return false;

      // Price
      const finalPrice = p.offerPrice || p.price;
      if (finalPrice > maxPrice) return false;

      // Flavor
      if (selectedFlavor !== "All" && !p.flavors.includes(selectedFlavor)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.offerPrice || a.price;
      const priceB = b.offerPrice || b.price;

      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular default
    });
  }, [searchTerm, selectedCategory, dietFilter, maxPrice, selectedFlavor, sortBy]);

  const handleQuickAdd = (product: Product) => {
    addToCart({
      product,
      selectedWeight: product.weights[0] || "1 kg",
      selectedFlavor: product.flavors[0] || "Belgian Dark Chocolate",
      eggless: product.eggless,
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Haute Pâtisserie Menu</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-brand-burgundy">
            Our Luxury Cake Directory
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70">
            Browse our full repertoire of artisanal cakes, Parisian tarts, and custom creations. Filter by dietary choices, flavors, and weight preferences.
          </p>
        </div>

        {/* Top Search & Filter Control Bar */}
        <div className="glass-card p-4 rounded-2xl border border-brand-gold/30 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          {/* Keyword Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
            <input
              type="text"
              placeholder="Search by cake name or flavor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-brand-pink/60 text-xs font-poppins text-brand-midnight focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-burgundy"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-poppins">
              <span className="text-brand-midnight/60 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-white border border-brand-pink/60 text-xs font-poppins font-medium text-brand-burgundy focus:outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated (★)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden px-4 py-2 rounded-xl gold-btn text-xs font-semibold uppercase flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Cake Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block md:col-span-3 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-brand-gold/30 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-brand-pink/40 pb-3">
                <h3 className="font-playfair text-lg font-bold text-brand-burgundy flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
                  <span>Filter Directory</span>
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setDietFilter("All");
                    setMaxPrice(5000);
                    setSelectedFlavor("All");
                    setSearchTerm("");
                  }}
                  className="text-[11px] font-poppins text-brand-gold hover:underline font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold font-poppins text-brand-burgundy uppercase tracking-wider">
                  Category
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-poppins transition-all ${
                      selectedCategory === "All"
                        ? "bg-brand-burgundy text-white font-semibold"
                        : "text-brand-midnight/70 hover:bg-brand-pink/30"
                    }`}
                  >
                    All Collections ({PRODUCTS.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-poppins transition-all ${
                        selectedCategory === cat.name
                          ? "bg-brand-burgundy text-white font-semibold"
                          : "text-brand-midnight/70 hover:bg-brand-pink/30"
                      }`}
                    >
                      {cat.name} ({cat.itemCount})
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Choice (Egg / Eggless) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold font-poppins text-brand-burgundy uppercase tracking-wider">
                  Dietary Choice
                </label>
                <div className="grid grid-cols-3 gap-1 bg-brand-pink/20 p-1 rounded-xl">
                  {(["All", "Eggless", "Egg"] as const).map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setDietFilter(diet)}
                      className={`py-1.5 rounded-lg text-[11px] font-poppins font-medium transition-all ${
                        dietFilter === diet
                          ? "bg-brand-gold text-white font-bold shadow-sm"
                          : "text-brand-midnight/70 hover:text-brand-burgundy"
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-poppins">
                  <span className="font-bold text-brand-burgundy uppercase tracking-wider">Max Price</span>
                  <span className="font-bold text-brand-burgundy">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={5000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-gold cursor-pointer"
                />
              </div>

              {/* Flavor Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold font-poppins text-brand-burgundy uppercase tracking-wider">
                  Flavor Profile
                </label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60 text-xs font-poppins text-brand-midnight focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  <option value="All">All Flavors</option>
                  {allFlavors.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="glass-card p-12 rounded-3xl text-center space-y-4 border border-brand-pink/40">
                <div className="w-16 h-16 rounded-full bg-brand-pink/40 flex items-center justify-center mx-auto text-brand-burgundy">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-brand-burgundy">
                  No Luxury Cakes Match Your Filter
                </h3>
                <p className="text-xs text-brand-midnight/60 font-poppins max-w-sm mx-auto">
                  Try broadening your price limit or clearing specific flavor filters to see our full catalogue.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setDietFilter("All");
                    setMaxPrice(5000);
                    setSelectedFlavor("All");
                    setSearchTerm("");
                  }}
                  className="px-6 py-2.5 rounded-full gold-btn text-xs font-semibold uppercase"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const inWishlist = isInWishlist(product.id);

                  return (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -6 }}
                      className="glass-card rounded-2xl overflow-hidden border border-brand-pink/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="relative h-60 w-full overflow-hidden bg-brand-pinkSoft/40">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                          {product.isBestSeller && (
                            <span className="px-2.5 py-0.5 rounded-full gold-btn text-[9px] font-bold uppercase tracking-wider">
                              Best Seller
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-white/90 text-brand-burgundy text-[9px] font-semibold tracking-wider">
                            {product.eggless ? "Eggless" : "With Egg"}
                          </span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(product)}
                          className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md shadow transition-all ${
                            inWishlist ? "text-red-500" : "text-brand-burgundy hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${inWishlist ? "fill-red-500" : ""}`} />
                        </button>

                        {/* Quick View */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="px-4 py-2 rounded-full bg-white/90 text-brand-burgundy text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-brand-burgundy hover:text-white transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-brand-midnight/60 font-poppins mb-1">
                            <span>{product.category}</span>
                            <div className="flex items-center text-amber-500 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                              <span>{product.rating}</span>
                            </div>
                          </div>

                          <Link href={`/cakes/${product.id}`}>
                            <h3 className="font-playfair font-bold text-lg text-brand-burgundy group-hover:text-brand-gold transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                          </Link>

                          <p className="text-[11px] text-brand-midnight/70 font-poppins line-clamp-2 mt-1">
                            {product.shortDesc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-brand-pink/30 flex items-center justify-between">
                          <div>
                            <span className="font-playfair text-lg font-bold text-brand-burgundy block">
                              {formatPrice(product.offerPrice || product.price)}
                            </span>
                          </div>

                          <button
                            onClick={() => handleQuickAdd(product)}
                            disabled={addedId === product.id}
                            className="px-3 py-2 rounded-full gold-btn font-poppins font-semibold text-xs uppercase tracking-wider flex items-center gap-1 shadow cursor-pointer"
                          >
                            {addedId === product.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
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
            )}
          </main>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

export default function CakesPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-brand-burgundy font-playfair">Loading Luxury Catalogue...</div>}>
      <CakesContent />
    </Suspense>
  );
}
