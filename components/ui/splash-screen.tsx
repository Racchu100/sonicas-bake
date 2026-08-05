"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// Deterministic particles array to prevent SSR/hydration mismatch
const PARTICLES = [
  { x: -300, y: -200, duration: 3.2, delay: 0.1 },
  { x: 250, y: -150, duration: 4.1, delay: 0.3 },
  { x: -180, y: 120, duration: 2.8, delay: 0.5 },
  { x: 320, y: 220, duration: 3.6, delay: 0.2 },
  { x: -380, y: 50, duration: 4.5, delay: 0.4 },
  { x: 120, y: -280, duration: 3.0, delay: 0.6 },
  { x: -50, y: -190, duration: 3.8, delay: 0.2 },
  { x: 210, y: 80, duration: 4.2, delay: 0.7 },
  { x: -260, y: 280, duration: 3.1, delay: 0.3 },
  { x: 390, y: -80, duration: 2.9, delay: 0.1 },
  { x: -140, y: -120, duration: 3.7, delay: 0.5 },
  { x: 160, y: 240, duration: 4.0, delay: 0.4 },
];

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Automatically dismiss splash screen after 3.2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient Gold Radial Background Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[500px] h-[500px] bg-gradient-to-tr from-brand-pinkSoft via-brand-pink to-brand-gold/30 rounded-full filter blur-[90px]"
            />
          </div>

          {/* Floating Gold Dust Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {PARTICLES.map((pt, i) => (
              <motion.div
                key={i}
                initial={{
                  x: pt.x,
                  y: pt.y,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: [pt.y, pt.y - 40, pt.y],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: pt.duration,
                  repeat: Infinity,
                  delay: pt.delay,
                }}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_8px_#D4AF37]"
              />
            ))}
          </div>

          {/* Core Official Logo Image Container */}
          <motion.div
            initial={{ filter: "blur(25px)", scale: 0.5, opacity: 0 }}
            animate={{ filter: "blur(0px)", scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center text-center z-10 px-6"
          >
            {/* Logo Image with Gold Glow Border */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 p-2 rounded-full bg-white shadow-[0_0_50px_rgba(212,175,55,0.4)] border-2 border-brand-gold/40 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.jpg"
                alt="Sonicas Bake Official Logo"
                fill
                priority
                className="object-contain p-2 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Quick Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            onClick={() => setIsVisible(false)}
            className="absolute bottom-8 text-xs font-poppins text-brand-burgundy/60 hover:text-brand-burgundy tracking-widest uppercase underline cursor-pointer"
          >
            Skip Animation
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
