import React from "react";
import { PinterestGallery } from "@/components/home/pinterest-gallery";

export const metadata = {
  title: "Couture Cake Gallery | Sonicas Bake",
  description: "Explore our Pinterest-style visual gallery of custom wedding cakes, floral buttercream sculptures, and 24K gold leaf pastries.",
};

export default function GalleryPage() {
  return (
    <div className="pt-16 pb-12 bg-brand-bg min-h-screen">
      <PinterestGallery />
    </div>
  );
}
