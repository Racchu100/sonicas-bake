import React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCakes } from "@/components/home/featured-cakes";
import { CategoryGrid } from "@/components/home/category-grid";
import { BestSellersCarousel } from "@/components/home/best-sellers-carousel";
import { PinterestGallery } from "@/components/home/pinterest-gallery";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { WhySonicas } from "@/components/home/why-sonicas";

export const metadata = {
  title: "Sonicas Bake | Luxury Haute Couture Cakes & Parisian Pastries",
  description: "Bespoke luxury cakes, artisanal wedding masterworks, and 24K gold leaf truffle pastries. Fresh white-glove home delivery across Hyderabad.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <HeroSection />
      <FeaturedCakes />
      <CategoryGrid />
      <BestSellersCarousel />
      <PinterestGallery />
      <CustomerReviews />
      <WhySonicas />
    </main>
  );
}
