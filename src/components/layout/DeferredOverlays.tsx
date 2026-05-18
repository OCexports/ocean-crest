"use client";

import dynamic from "next/dynamic";

/**
 * Loads the floating WhatsApp FAB and the right-edge "Get in Touch" tab
 * in a separate JS chunk that the browser fetches AFTER the main app
 * bundle. Each has its own internal "wait a beat then appear" delay, so
 * the user-visible behavior is identical — the only thing we're moving
 * is when the JS lands.
 *
 * SmoothScroll is intentionally NOT deferred — Lenis must attach before
 * the user's first scroll or there's a visible jitter when it catches up
 * mid-gesture. It's mounted directly via SmoothScrollProvider in
 * app/layout.tsx.
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

export function DeferredOverlays() {
  return (
    <>
      <ContactSideTab />
      <WhatsAppFab />
    </>
  );
}
