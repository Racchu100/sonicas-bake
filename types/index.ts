export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  offerPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  shortDesc: string;
  category: string;
  eggless: boolean;
  flavors: string[];
  weights: string[]; // e.g. ["0.5 kg", "1 kg", "2 kg", "3 kg"]
  images: string[];
  tags: string[]; // e.g. ["Featured", "Best Seller", "Trending", "New"]
  isFeatured?: boolean;
  isBestSeller?: boolean;
  ingredients: string[];
  stock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface CakeBooking {
  id: string;
  cakeId?: string;
  cakeName: string;
  weight: string;
  flavor: string;
  eggless: boolean;
  customMessage: string;
  referenceImageUrl?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  specialInstructions?: string;
  paymentMethod: "Online" | "COD";
  paymentStatus: "Pending" | "Paid" | "Refunded";
  totalAmount: number;
  status: "Received" | "Baking" | "Ready" | "Out for Delivery" | "Delivered" | "Cancelled";
  createdAt: string;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  selectedFlavor: string;
  eggless: boolean;
  customMessage?: string;
  quantity: number;
  unitPrice: number;
}

export interface Review {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  cakeName: string;
  verifiedBuyer: boolean;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrderValue: number;
  description: string;
}
