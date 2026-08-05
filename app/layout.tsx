import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SplashScreen } from "@/components/ui/splash-screen";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sonicas Bake | Luxury Cake Ordering & Custom Pâtisserie",
    template: "%s | Sonicas Bake Luxury",
  },
  description:
    "Order luxury bespoke cakes, 24K gold leaf truffle cakes, French macarons, and custom celebration cakes online with same-day white glove delivery.",
  keywords: [
    "Sonicas Bake",
    "Luxury cakes",
    "Wedding cakes",
    "Custom cake builder",
    "Eggless cakes",
    "Hyderabad bakery",
    "Gold leaf cake",
  ],
  authors: [{ name: "Sonicas Bake Pâtisserie" }],
  openGraph: {
    title: "Sonicas Bake | Haute Couture Cake Ordering",
    description:
      "Every Celebration Deserves A Beautiful Cake. Order 100% fresh artisanal cakes baked with Belgian chocolate and organic ingredients.",
    url: "https://sonicasbake.com",
    siteName: "Sonicas Bake",
    images: [
      {
        url: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=800&q=80",
        width: 1200,
        height: 630,
        alt: "Sonicas Bake Royal Gold Crown Cake",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Sonicas Bake",
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=800&q=80",
    "@id": "https://sonicasbake.com",
    url: "https://sonicasbake.com",
    telephone: "+919876543210",
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "124 Luxury Boulevard, Jubilee Hills",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500033",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.4319,
      longitude: 78.4071,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "22:00",
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-poppins bg-brand-bg text-brand-midnight antialiased min-h-screen flex flex-col justify-between"
        suppressHydrationWarning
      >
        <CartProvider>
          <SplashScreen />
          <Navbar />
          <CartDrawer />
          <div className="flex-1">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
