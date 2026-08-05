"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Sparkles,
  Upload,
  CheckCircle2,
  Clock,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { PRODUCTS, REVIEWS } from "@/lib/data";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0] || "1 kg");
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0] || "Belgian Dark Chocolate");
  const [isEggless, setIsEggless] = useState(product.eggless);
  const [customMessage, setCustomMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [refImage, setRefImage] = useState<string | null>(null);
  const [pincode, setPincode] = useState("");
  const [deliveryAvailable, setDeliveryAvailable] = useState<boolean | null>(null);
  const [added, setAdded] = useState(false);

  // New review state
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleRefImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setRefImage(URL.createObjectURL(file));
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setDeliveryAvailable(true);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      product,
      selectedWeight,
      selectedFlavor,
      eggless: isEggless,
      customMessage,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart({
      product,
      selectedWeight,
      selectedFlavor,
      eggless: isEggless,
      customMessage,
      quantity,
    });
    router.push("/checkout");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewName && newReviewText) {
      setReviewSubmitted(true);
    }
  };

  const inWishlist = isInWishlist(product.id);
  const relatedCakes = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-24 pb-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-poppins text-brand-midnight/60 mb-6">
          <Link href="/" className="hover:text-brand-burgundy">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/cakes" className="hover:text-brand-burgundy">
            Cakes
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-burgundy font-semibold truncate">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Showcase Image */}
            <div className="relative h-[360px] sm:h-[480px] w-full rounded-3xl overflow-hidden glass-gold-card shadow-xl border border-brand-gold/40">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-all duration-500"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-md transition-all ${
                  inWishlist ? "text-red-500" : "text-brand-burgundy hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === i ? "border-brand-gold scale-105 shadow-md" : "border-brand-pink/50 opacity-70"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Specifications & Configuration */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 rounded-full bg-brand-pink/60 text-brand-burgundy text-[10px] font-bold uppercase tracking-wider">
                  {product.category} Collection
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                  {isEggless ? "100% Eggless" : "With Egg"}
                </span>
              </div>

              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-brand-burgundy mt-2">
                {product.name}
              </h1>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs font-poppins">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-brand-midnight/40">•</span>
                <span className="text-brand-midnight/70">({product.reviewsCount} Customer Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-playfair text-3xl font-bold text-brand-burgundy">
                  {formatPrice(product.offerPrice || product.price)}
                </span>
                {product.offerPrice && (
                  <span className="text-base line-through text-brand-midnight/40 font-poppins">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold font-poppins bg-emerald-50 px-2.5 py-1 rounded">
                  Inclusive of all taxes
                </span>
              </div>

              <p className="text-xs sm:text-sm text-brand-midnight/80 font-poppins mt-4 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Customization Options Box */}
            <div className="glass-card p-6 rounded-2xl border border-brand-pink/50 space-y-4 text-xs font-poppins">
              {/* Weight Selector */}
              <div>
                <label className="block font-bold text-brand-burgundy mb-2 uppercase tracking-wider">
                  Select Weight & Serving Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`px-4 py-2 rounded-xl border font-semibold transition-all ${
                        selectedWeight === w
                          ? "gold-btn shadow"
                          : "border-gray-200 text-brand-midnight/70 hover:border-brand-gold"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Selector */}
              <div>
                <label className="block font-bold text-brand-burgundy mb-2 uppercase tracking-wider">
                  Select Cake Sponge & Filling Flavor:
                </label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-brand-pink/60 text-xs font-poppins text-brand-midnight focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  {product.flavors.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Egg/Eggless Toggle */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-brand-burgundy uppercase tracking-wider">Dietary Preference:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEggless(true)}
                    className={`px-4 py-1.5 rounded-lg font-semibold transition-all ${
                      isEggless ? "bg-emerald-700 text-white shadow" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Eggless
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEggless(false)}
                    className={`px-4 py-1.5 rounded-lg font-semibold transition-all ${
                      !isEggless ? "bg-amber-700 text-white shadow" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    With Egg
                  </button>
                </div>
              </div>

              {/* Custom Message on Cake */}
              <div>
                <label className="block font-bold text-brand-burgundy mb-1 uppercase tracking-wider">
                  Piped Custom Message on Cake:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Happy Birthday Ananya!"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  maxLength={40}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60 text-xs text-brand-midnight focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              {/* Reference Image Upload Dropzone */}
              <div>
                <label className="block font-bold text-brand-burgundy mb-1 uppercase tracking-wider">
                  Upload Reference Image (Optional):
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 border-2 border-dashed border-brand-gold/50 hover:border-brand-gold rounded-xl p-3 text-center cursor-pointer bg-white/50 transition-colors">
                    <Upload className="w-4 h-4 text-brand-gold mx-auto mb-1" />
                    <span className="text-[11px] text-brand-midnight/70 font-medium">
                      {refImage ? "Reference Image Uploaded" : "Click to upload inspiration image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleRefImageUpload}
                      className="hidden"
                    />
                  </label>
                  {refImage && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-brand-gold">
                      <Image src={refImage} alt="Reference" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-brand-burgundy uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-xl border border-brand-pink/60">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-brand-burgundy font-bold text-lg px-2"
                  >
                    -
                  </button>
                  <span className="font-bold text-brand-burgundy font-poppins">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-brand-burgundy font-bold text-lg px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="flex-1 py-4 rounded-full gold-btn font-poppins font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? "Added to Cart!" : "Add to Cart"}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 rounded-full burgundy-btn font-poppins font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Buy Now Instant</span>
              </button>
            </div>

            {/* Pincode Delivery Estimation */}
            <div className="glass-card p-4 rounded-2xl border border-brand-pink/40 space-y-2 text-xs font-poppins">
              <label className="block font-bold text-brand-burgundy flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-gold" />
                <span>Check Delivery Availability:</span>
              </label>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 500033)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-brand-pink/60 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl burgundy-btn text-xs font-semibold uppercase"
                >
                  Check
                </button>
              </form>
              {deliveryAvailable !== null && (
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>White-Glove Delivery Available in 2-4 Hours!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 pt-10 border-t border-brand-pink/40 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-brand-burgundy">
                Client Reviews & Feedback
              </h2>
              <p className="text-xs text-brand-midnight/60 font-poppins">
                Verified reviews from customers who ordered {product.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-7 space-y-4">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="glass-card p-6 rounded-2xl border border-brand-pink/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-playfair font-bold text-sm text-brand-burgundy">
                      {rev.customerName}
                    </h4>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-brand-midnight/80 font-poppins italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  <p className="text-[10px] text-brand-midnight/40 font-poppins">{rev.date}</p>
                </div>
              ))}
            </div>

            {/* Submit Review Form */}
            <div className="lg:col-span-5">
              <div className="glass-card p-6 rounded-2xl border border-brand-gold/30 space-y-4">
                <h3 className="font-playfair text-lg font-bold text-brand-burgundy flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-gold" />
                  <span>Leave a Review</span>
                </h3>

                {reviewSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-800 space-y-1">
                    <p className="font-bold">Thank you for your review!</p>
                    <p>Your feedback has been submitted for moderation.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs font-poppins">
                    <div>
                      <label className="block font-semibold text-brand-burgundy mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-brand-burgundy mb-1">Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      >
                        <option value={5}>5 Stars - Exceptional</option>
                        <option value={4}>4 Stars - Great</option>
                        <option value={3}>3 Stars - Average</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-brand-burgundy mb-1">Your Review</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tell us about the taste, presentation, and delivery..."
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full gold-btn font-semibold uppercase tracking-wider"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-10 border-t border-brand-pink/40 space-y-6">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-brand-burgundy">
            You May Also Admire
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedCakes.map((rel) => (
              <Link
                key={rel.id}
                href={`/cakes/${rel.id}`}
                className="glass-card rounded-2xl overflow-hidden border border-brand-pink/40 p-4 flex gap-4 hover:shadow-lg transition-all group"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={rel.images[0]} alt={rel.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-playfair font-bold text-sm text-brand-burgundy group-hover:text-brand-gold transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-[11px] text-brand-midnight/60 font-poppins line-clamp-2 mt-1">
                      {rel.shortDesc}
                    </p>
                  </div>
                  <span className="font-playfair font-bold text-sm text-brand-burgundy">
                    {formatPrice(rel.offerPrice || rel.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
