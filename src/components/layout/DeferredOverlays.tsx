"use client";

import dynamic from "next/dynamic";

/**
 * Loads the floating WhatsApp FAB, the right-edge "Get in Touch" tab, and
 * the Lenis smooth-scroll initializer in a separate JS chunk that the
 * browser fetches AFTER the main app bundle. Each component has its own
 * internal "wait a beat then appear" delay, so the user-visible behavior
 * is identical — the only thing we're moving is when the JS lands.
 *
 * IMPORTANT: framer-motion lives inside the dynamic-imported children
 * (each wraps its own LazyMotion provider), NOT in this file — importing
 * `LazyMotion` here would pull framer-motion into the layout chunk and
 * negate the deferral.
 *
 * Wrapped in a "use client" component because next/dynamic with ssr:false
 * can't sit directly in the Server-Component root layout.
 */
const WhatsAppFab = dynamic(
  () => import("./WhatsAppFab").then((m) => ({ default: m.WhatsAppFab })),
  { ssr: false },
);

const ContactSideTab = dynamic(
  () => import("./ContactSideTab").then((m) => ({ default: m.ContactSideTab })),
  { ssr: false },
);

const SmoothScroll = dynamic(
  () => import("./SmoothScroll").then((m) => ({ default: m.SmoothScroll })),
  { ssr: false },
);

export function DeferredOverlays() {
  return (
    <>
      <SmoothScroll />
      <ContactSideTab />
      <WhatsAppFab />
    </>
  );
}
