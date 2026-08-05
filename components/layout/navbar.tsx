"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Cake,
  Sparkles,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/cart-context";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Cakes", href: "/cakes" },
  { name: "Custom Cakes", href: "/custom-cake" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav shadow-md py-3 sm:py-4"
          : "bg-brand-bg/98 backdrop-blur-md shadow-sm border-b border-brand-gold/20 py-3.5 sm:py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Pure Typography */}
        <Link href="/" className="flex flex-col group">
          <span className="font-playfair text-base sm:text-lg md:text-xl font-bold tracking-wider text-brand-burgundy group-hover:text-brand-burgundyLight transition-colors leading-tight">
            SONICAS BAKE
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.22em] font-poppins uppercase text-brand-gold font-semibold">
            LUXURY PATISSERIE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-poppins text-xs font-medium tracking-wide transition-colors py-1 ${
                  isActive
                    ? "text-brand-burgundy font-semibold"
                    : "text-brand-midnight/80 hover:text-brand-burgundy"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-burgundy via-brand-gold to-brand-burgundy rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
          {/* Quick Search Trigger */}
          <Link
            href="/cakes"
            className="p-1 sm:p-1.5 rounded-full text-brand-midnight/80 hover:text-brand-burgundy hover:bg-brand-pink/30 transition-all hidden sm:flex"
            title="Search Cakes"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </Link>

          {/* Book Cake CTA Button */}
          <Link
            href="/custom-cake"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full gold-btn text-[11px] font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3 h-3" />
            <span>Book Cake</span>
          </Link>

          {/* Wishlist Icon */}
          <Link
            href="/dashboard?tab=wishlist"
            className="relative p-1 sm:p-1.5 rounded-full text-brand-midnight/80 hover:text-brand-burgundy hover:bg-brand-pink/30 transition-all"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-burgundy text-white text-[8.5px] font-bold flex items-center justify-center shadow-md animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1 sm:p-1.5 rounded-full text-brand-midnight/80 hover:text-brand-burgundy hover:bg-brand-pink/30 transition-all cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-gold text-white text-[8.5px] font-bold flex items-center justify-center shadow-md">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Profile & Admin Portal Link */}
          <div className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="p-1 sm:p-1.5 rounded-full text-brand-midnight/80 hover:text-brand-burgundy hover:bg-brand-pink/30 transition-all"
              title="User Account"
            >
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </Link>

            <Link
              href="/admin"
              className="p-1 sm:p-1.5 rounded-full text-brand-burgundy hover:text-brand-gold hover:bg-brand-pink/30 transition-all border border-brand-gold/30 hidden md:flex items-center gap-1 text-[11px] font-medium px-2"
              title="Admin Control Panel"
            >
              <ShieldCheck className="w-3 h-3 text-brand-gold" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 sm:p-1.5 rounded-full text-brand-burgundy hover:bg-brand-pink/30 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" /> : <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-brand-gold/20 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-poppins text-base py-2 border-b border-brand-pink/30 ${
                    pathname === link.href
                      ? "text-brand-burgundy font-semibold pl-2"
                      : "text-brand-midnight/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-3">
                <Link
                  href="/custom-cake"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full gold-btn font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Custom Cake</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full border border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Panel Portal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
