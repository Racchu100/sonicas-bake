"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16 pb-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-brand-burgundy font-poppins text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Connect With Us</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-brand-burgundy">
            Visit Studio or Get in Touch
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-brand-midnight/70">
            Have questions regarding wedding cake tastings, corporate hampers, or custom designs? We are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-brand-pink/40 space-y-6 text-xs font-poppins shadow-lg">
              <h3 className="font-playfair text-xl font-bold text-brand-burgundy border-b border-brand-pink/30 pb-3">
                Studio Information
              </h3>

              <div className="space-y-4 text-brand-midnight/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-burgundy text-sm">Main Bake Studio</p>
                    <p>124 Luxury Boulevard, Jubilee Hills, Hyderabad, Telangana 500033</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-burgundy text-sm">Direct Phone & WhatsApp</p>
                    <p>+91 98765 43210 / +91 40 2345 6789</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-burgundy text-sm">Email Enquiries</p>
                    <p>orders@sonicasbake.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-burgundy text-sm">Opening Hours</p>
                    <p>Monday - Sunday: 9:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Placeholder */}
            <div className="glass-card rounded-3xl overflow-hidden border border-brand-gold/30 h-64 relative shadow-md">
              <iframe
                title="Sonicas Bake Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827253578761!2d78.4045!3d17.4319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzU0LjgiTiA3OMKwMjQnMTYuMiJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-10 rounded-3xl border border-brand-gold/30 shadow-xl text-xs font-poppins space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-brand-burgundy">
                Send Us a Direct Inquiry
              </h3>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-800 text-sm">Message Sent Successfully!</h4>
                  <p className="text-emerald-700">Our concierge will contact you within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-brand-burgundy mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-brand-burgundy mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-brand-burgundy mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. vikram@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-burgundy mb-1">Your Message or Event Date</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify event details, guest count, or flavor inquiries..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-pink/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full gold-btn font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Direct Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
