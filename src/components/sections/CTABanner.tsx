"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CTABanner() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section className="relative py-28 lg:py-36 bg-primary overflow-hidden">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="text-[100px] lg:text-[200px] font-bold text-white/[0.015] font-[family-name:var(--font-display)] whitespace-nowrap select-none">
          OCEAN CREST
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold">
              {t.common.getInTouch}
            </span>
            <h2 className="mt-4 text-3xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)] leading-tight">
              Ready to Source
              <br />
              <span className="text-gradient-copper">Quality Products?</span>
            </h2>
            <div className="gold-line-left mt-6" />
            <p className="mt-6 text-base text-white/60 leading-relaxed max-w-md font-light">
              Fill in your details and our team will get back to you with a
              customized quote within 24 hours.
            </p>
          </ScrollReveal>

          {/* Right: Inline Form */}
          <ScrollReveal direction="right">
            {isSubmitted ? (
              <div className="glass rounded-[var(--radius-lg)] p-10 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white font-[family-name:var(--font-display)]">
                  {t.contact.success}
                </h3>
                <p className="mt-2 text-white/60 text-sm">
                  {t.contact.successMsg}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-sm text-gold hover:text-gold-light transition-colors cursor-pointer underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-[var(--radius-lg)] p-6 lg:p-8 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="cta-name" className="text-[11px] font-medium tracking-wider uppercase text-white/85">
                      {t.contact.name} *
                    </label>
                    <input
                      id="cta-name"
                      name="name"
                      autoComplete="name"
                      required
                      className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-[var(--radius-sm)] text-white text-sm placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white/10 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="cta-email" className="text-[11px] font-medium tracking-wider uppercase text-white/85">
                      {t.contact.email} *
                    </label>
                    <input
                      id="cta-email"
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-[var(--radius-sm)] text-white text-sm placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white/10 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="cta-phone" className="text-[11px] font-medium tracking-wider uppercase text-white/85">
                      {t.contact.phone} *
                    </label>
                    <input
                      id="cta-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-[var(--radius-sm)] text-white text-sm placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white/10 transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="cta-company" className="text-[11px] font-medium tracking-wider uppercase text-white/85">
                      {t.contact.company}
                    </label>
                    <input
                      id="cta-company"
                      name="company"
                      autoComplete="organization"
                      className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-[var(--radius-sm)] text-white text-sm placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white/10 transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="cta-product" className="text-[11px] font-medium tracking-wider uppercase text-white/85">
                    {t.contact.product}
                  </label>
                  <select id="cta-product" name="product" className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-[var(--radius-sm)] text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white/10 transition-colors cursor-pointer">
                    <option value="" className="bg-primary">Select a product</option>
                    <option value="dehydrated-garlic-flakes" className="bg-primary">Garlic Flakes</option>
                    <option value="dehydrated-garlic-chopped" className="bg-primary">Garlic Chopped</option>
                    <option value="dehydrated-garlic-minced" className="bg-primary">Garlic Minced</option>
                    <option value="dehydrated-garlic-granules" className="bg-primary">Garlic Granules</option>
                    <option value="dehydrated-garlic-powder" className="bg-primary">Garlic Powder</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="cta-message" className="text-[11px] font-medium tracking-wider uppercase text-white/85">
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    required
                    rows={3}
                    className="w-full px-3 py-2.5 bg-white/8 border border-white/15 rounded-[var(--radius-sm)] text-white text-sm placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white/10 transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gold text-white font-semibold text-sm tracking-wider uppercase rounded-[var(--radius-sm)] hover:bg-gold-muted transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Sending..." : t.contact.submit}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
