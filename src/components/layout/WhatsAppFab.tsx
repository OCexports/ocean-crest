"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { companyInfo } from "@/lib/constants/navigation";

export function WhatsAppFab() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    "Hello Ocean Crest! I'm interested in your spice products. Could you please share more details?"
  )}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed right-4 sm:right-6 z-40"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="relative">
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-whatsapp/30 animate-ping" />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="relative flex items-center justify-center w-14 h-14 bg-whatsapp rounded-full shadow-modal hover:scale-110 transition-transform cursor-pointer"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </a>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-ocean-deep text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-modal"
                >
                  Chat with us
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
