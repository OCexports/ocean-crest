"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { companyInfo } from "@/lib/constants/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function WhatsAppFab() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    t.overlays.whatsappPrefill
  )}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed right-4 sm:right-6 [dir=rtl]:right-auto [dir=rtl]:left-4 [dir=rtl]:sm:left-6 z-40 print:hidden"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="relative">
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-whatsapp/30 motion-safe:animate-ping" />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="relative flex items-center justify-center w-14 h-14 bg-whatsapp rounded-full shadow-modal hover:scale-110 transition-transform cursor-pointer"
              aria-label={t.overlays.whatsappAria}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </a>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <m.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-ocean-deep text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-modal"
                >
                  {t.overlays.whatsappTooltip}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
