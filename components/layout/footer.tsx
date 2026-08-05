"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cake,
  Instagram,
  Facebook,
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-midnight text-white pt-16 pb-8 relative overflow-hidden border-t border-brand-gold/30">
      {/* Background Subtle Gold Glow Pattern */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-brand-burgundy/20 to-transparent rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radial from-brand-gold/10 to-transparent rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col">
              <span className="font-playfair text-xl font-bold tracking-wider text-white">
                SONICAS BAKE
              </span>
              <span className="text-[9px] tracking-[0.25em] font-poppins uppercase text-brand-gold">
                HAUTE PATISSERIE
              </span>
            </Link>
            <p className="text-xs text-white/70 font-poppins leading-relaxed">
              Crafting bespoke luxury cakes, Parisian pastries, and haute couture dessert tables for unforgettable celebrations across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-midnight transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-midnight transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-midnight transition-all"
              >
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-bold text-brand-gold tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-poppins text-white/70">
              <li>
                <Link href="/" className="hover:text-brand-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cakes" className="hover:text-brand-gold transition-colors">
                  All Cakes Directory
                </Link>
              </li>
              <li>
                <Link href="/custom-cake" className="hover:text-brand-gold transition-colors">
                  Bespoke Custom Cake Builder
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-gold transition-colors">
                  Pinterest Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-brand-gold transition-colors">
                  Customer Reviews (4.9★)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  Our Culinary Heritage
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-gold transition-colors text-brand-gold/90 font-medium">
                  Admin Control Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Working Hours */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-bold text-brand-gold tracking-wide">
              Studio & Working Hours
            </h4>
            <div className="space-y-2.5 text-xs font-poppins text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>124 Luxury Boulevard, Jubilee Hills, Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>+91 98765 43210 / +91 40 2345 6789</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>orders@sonicasbake.com</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Bake Studio Hours:</p>
                  <p>Mon - Sun: 9:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & VIP Club */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-bold text-brand-gold tracking-wide">
              The Gold Club Newsletter
            </h4>
            <p className="text-xs font-poppins text-white/70 leading-relaxed">
              Subscribe to receive exclusive secret menu releases, seasonal fruit tarts announcements, and 10% off your first order.
            </p>
            {subscribed ? (
              <div className="bg-brand-burgundy/40 border border-brand-gold/40 p-3 rounded-lg text-xs font-poppins text-brand-gold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Welcome to Sonicas VIP Gold Club! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white/10 border border-white/20 text-xs font-poppins text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-brand-gold text-brand-midnight hover:bg-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-poppins text-white/50">
          <p>© {new Date().getFullYear()} Sonicas Bake. All Rights Reserved. Crafted with Passion.</p>
          <div className="flex items-center gap-1 text-white/60">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 text-brand-burgundy fill-brand-burgundy" />
            <span>for Connoisseurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
