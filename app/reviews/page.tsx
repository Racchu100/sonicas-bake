import React from "react";
import { CustomerReviews } from "@/components/home/customer-reviews";

export const metadata = {
  title: "Customer Reviews & Google 4.9★ Rating | Sonicas Bake",
  description: "Read real client testimonials and reviews for Sonicas Bake luxury custom cakes and wedding pâtisserie in Hyderabad.",
};

export default function ReviewsPage() {
  return (
    <div className="pt-16 pb-12 bg-brand-bg min-h-screen">
      <CustomerReviews />
    </div>
  );
}
