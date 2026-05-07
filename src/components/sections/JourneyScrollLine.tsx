"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function JourneyScrollLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px pointer-events-none">
      <div className="absolute inset-0 bg-white/10" />
      <motion.div
        style={{ scaleX: lineScale }}
        className="absolute inset-0 origin-left bg-gradient-to-r from-gold via-gold to-gold/60"
      />
    </div>
  );
}
