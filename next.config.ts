import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "three",
      "@react-three/fiber",
    ],
    // Inline the per-page Tailwind stylesheet into <style> in <head>.
    // Eliminates the render-blocking CSS request flagged by Lighthouse and
    // collapses the network dependency tree (HTML → CSS waterfall).
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ocexports.com",
      },
      {
        protocol: "https",
        hostname: "www.ocexports.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    // Conservative defaults — tightens common attack surfaces without breaking
    // the embedded Google Maps iframe (frame-src google.com) or next/image.
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Origin isolation for cross-window references — flagged by Lighthouse
      // "Best Practices > Ensure proper origin isolation with COOP".
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: blob: https://images.unsplash.com https://*.googleapis.com https://*.gstatic.com https://maps.gstatic.com",
          "media-src 'self' blob:",
          "font-src 'self' data: https://fonts.gstatic.com",
          "connect-src 'self' https://*.googleapis.com",
          "frame-src 'self' https://www.google.com https://maps.google.com",
          "frame-ancestors 'self'",
          "form-action 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          "upgrade-insecure-requests",
        ].join("; "),
      },
    ];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
